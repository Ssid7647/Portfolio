import transformers
from transformers import get_scheduler
# from utils import accuracy_fn
import os
import sys
import json
import csv
import gc
import random
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from datetime import datetime
import pandas as pd
import numpy as np
from tqdm import tqdm
from utils import collate_fn
torch.autograd.set_detect_anomaly(True)
language = "hin"
split_percentage = 80
MAX_LENGTH = 128
batch_size = 256*2
EPOCHS = 100
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print("RUNNING ON DEVICE:::::::::::::::: ", device)
# device="cpu"
current_date = datetime.now().date()
print("::: Current Date ::: ", current_date)
INST_NAME = f"eng-{language}-updated-4"
LOG_PATH = os.path.join(INST_NAME+"/")
WGT_PREFIX = os.path.join(LOG_PATH, "weights", INST_NAME)
if not os.path.exists(LOG_PATH+"weights"):
    os.makedirs(os.path.join(LOG_PATH, "weights"))


with open("vocab.json", 'r') as json_file:
    vocab = json.load(json_file)

with open("numerals.json", 'r') as json_file:
    numerals = json.load(json_file)

# Now 'data' contains the JSON data as a Python dictionary
# print(vocab,numerals)


indoarab_num = [chr(alpha) for alpha in range(48, 58)]
english_lower_script = [chr(alpha)
                        for alpha in range(97, 123)] + ['é', 'è', 'á']
joiners = [chr(0x200c),  # ZeroWidth-NonJoiner U+200c
           chr(0x200d)]

devanagari_script = [
    chr(0x200c),  # ZeroWidth-NonJoiner U+200c
    chr(0x200d),  # ZeroWidthJoiner U+200d
    "ऀ",
    "ँ",
    "ं",
    "ः",
    "ऄ",
    "अ",
    "आ",
    "इ",
    "ई",
    "उ",
    "ऊ",
    "ऋ",
    "ऌ",
    "ऍ",
    "ऎ",
    "ए",
    "ऐ",
    "ऑ",
    "ऒ",
    "ओ",
    "औ",
    "क",
    "ख",
    "ग",
    "घ",
    "ङ",
    "च",
    "छ",
    "ज",
    "झ",
    "ञ",
    "ट",
    "ठ",
    "ड",
    "ढ",
    "ण",
    "त",
    "थ",
    "द",
    "ध",
    "न",
    "ऩ",
    "प",
    "फ",
    "ब",
    "भ",
    "म",
    "य",
    "र",
    "ऱ",
    "ल",
    "ळ",
    "ऴ",
    "व",
    "श",
    "ष",
    "स",
    "ह",
    "ऺ",
    "ऻ",
    "़",
    "ऽ",
    "ा",
    "ि",
    "ी",
    "ु",
    "ू",
    "ृ",
    "ॄ",
    "ॅ",
    "ॆ",
    "े",
    "ै",
    "ॉ",
    "ॊ",
    "ो",
    "ौ",
    "्",
    "ॎ",
    "ॏ",
    "ॐ",
    "॑",
    "॒",
    "॓",
    "॔",
    "ॕ",
    "ॖ",
    "ॗ",
    "क़",
    "ख़",
    "ग़",
    "ज़",
    "ड़",
    "ढ़",
    "फ़",
    "य़",
    "ॠ",
    "ॡ",
    "ॢ",
    "ॣ",
    "।",
    "॥",
    "०",
    "१",
    "२",
    "३",
    "४",
    "५",
    "६",
    "७",
    "८",
    "९",
    "॰",
    "ॱ",
    "ॲ",
    "ॳ",
    "ॴ",
    "ॵ",
    "ॶ",
    "ॷ",
    "ॸ",
    "ॹ",
    "ॺ",
    "ॻ",
    "ॼ",
    "ॽ",
    "ॾ",
    "ॿ"

]

if language == "dev":
    language_vocab = devanagari_script
# elif language == "arb":
#     language_vocab =list(set([*vocab["kas"],*vocab["snd"],*vocab["urd"],*numerals[language] ]))
else:

    language_vocab = [*vocab[language], *joiners, *numerals[language]]
print(english_lower_script)
print(language_vocab)


class Vocabulary():
    def __init__(self, lang_script=english_lower_script):

        self.glyphs = lang_script
        self.char2idx = {}
        self.idx2char = {}
        self.PAD_token = "[PAD]"
        self.SOS_token = "[SOS]"
        self.EOS_token = "[EOS]"
        self.MASK_token = "[MASK]"
        self._create_index()

    def _create_index(self):
        self.char2idx[self.PAD_token] = 0  # pad
        self.char2idx[self.SOS_token] = 1  # start
        self.char2idx[self.EOS_token] = 2  # end
        self.char2idx[self.MASK_token] = 3  # Mask
        self.char2idx["'"] = 4  # apostrophe U+0027
        self.char2idx['%'] = 5  # unused
        self.char2idx['!'] = 6  # unused
        self.char2idx['?'] = 7
        self.char2idx[':'] = 8
        self.char2idx[' '] = 9
        self.char2idx['-'] = 10
        self.char2idx[','] = 11
        self.char2idx['.'] = 12
        self.char2idx['('] = 13
        self.char2idx[')'] = 14
        self.char2idx['/'] = 15
        self.char2idx['^'] = 16

        for idx, char in enumerate(indoarab_num):
            self.char2idx[char] = idx+17

        for idx, char in enumerate(self.glyphs):
            self.char2idx[char] = idx+27

        for char, idx in self.char2idx.items():
            self.idx2char[idx] = char

    def size(self):
        return len(self.char2idx)

    def word2xlitvec(self, word):
        try:
            vec = [self.char2idx[self.SOS_token]]

            for char in list(str(word)):
                try:
                    vec.append(self.char2idx[char])
                except Exception as error:
                    print("[ERROR] in char : ", word, char,
                          " Error token not in Vocabulary:", error)
                    sys.exit()
            vec.append(self.char2idx[self.EOS_token])
            vec = np.asarray(vec, dtype=np.int64)
            return vec

        except Exception as error:
            print("[ERROR] in word : ", str(word),
                  " Error token not in Vocabulary:", error)
            sys.exit()

    def xlitvec2word(self, vector):
        tokens_to_ignore = {
            self.char2idx[self.EOS_token],
            self.char2idx[self.SOS_token],
            self.char2idx[self.PAD_token],
            self.char2idx[self.MASK_token]
        }

        char_list = [self.idx2char[i]
                     for i in vector if i not in tokens_to_ignore]
        return "".join(char_list)


class Transliteration_Dataset(Dataset):

    def __init__(self, src, tgt, src_vocab, tgt_vocab, padding=True, max_seq_length=None):
        self.src_vocab = src_vocab
        self.tgt_vocab = tgt_vocab

        __svec = self.src_vocab.word2xlitvec
        __tvec = self.tgt_vocab.word2xlitvec
        self.src = [__svec(s) for s in src]
        self.tgt = [__tvec(s) for s in tgt]

        self.tgt_class_weights = self._char_class_weights(self.tgt)

        self.padding = padding
        if max_seq_length:
            self.max_tgt_size = max_seq_length
            self.max_src_size = max_seq_length
        else:
            self.max_src_size = max(len(t) for t in self.src)
            self.max_tgt_size = max(len(t) for t in self.tgt)

    def __len__(self):
        return len(self.src)

    def __getitem__(self, index):
        # x_sz = len(self.src[index])
        # y_sz = len(self.tgt[index])

        if self.padding:
            x = self._pad_sequence(self.src[index], self.max_src_size)
            y = self._pad_sequence(self.tgt[index], self.max_tgt_size)
        else:
            x = self.src[index]
            y = self.tgt[index]
        return torch.tensor(x), torch.tensor(y)

    def _pad_sequence(self, x, max_len):
        """ Pad sequence to maximum length;
        Pads zero if word < max
        Clip word if word > max
        """
        padded = np.zeros((max_len), dtype=np.int64)
        if len(x) > max_len:
            padded[:] = x[:max_len]
        else:
            padded[:len(x)] = x
        return padded

    def _char_class_weights(self, x_list, scale=10):
        """For handling class imbalance in the characters
        Return: 1D-tensor will be fed to CEloss weights for error calculation
        """
        from collections import Counter
        full_list = []
        for x in x_list:
            full_list += list(x)
        count_dict = dict(Counter(full_list))

        class_weights = np.ones(self.tgt_vocab.size(), dtype=np.float32)
        for k in count_dict:
            class_weights[k] = (1/count_dict[k]) * scale

        return class_weights


def load_pretrained(model, weight_path, flexible=False):
    if not weight_path:
        return model
    state_dict = torch.load(
        weight_path, map_location=torch.device('cpu'))

    state_dict = {k.replace("module.", ""): v for k, v in state_dict.items()}
    missing_keys = set(model.state_dict().keys()) - set(state_dict.keys())
    for missing_key in missing_keys:
        state_dict[missing_key] = model.state_dict()[missing_key]

    model.load_state_dict(state_dict)
    print("::::::::::::::::loaded pretrained weights::::::::::::")

    return model


def split_array_by_percent(array, percent):
    """
    Split an array into two parts based on a certain percentage.

    Parameters:
        array (list): The input array.
        percent (float): The percentage at which to split the array (0-100).

    Returns:
        tuple: A tuple containing two lists, representing the two parts of the split array.
    """
    # Calculate the index at which to split the array
    split_index = int(len(array) * (percent / 100.0))

    # Split the array into two parts
    first_part = array[:split_index]
    second_part = array[split_index:]

    return first_part, second_part


# creating vocab
src_vocab = Vocabulary(english_lower_script)
tgt_vocab = Vocabulary(language_vocab)

# creating dataset
devanagari_languages = ["hin", "mai", "brx", "mar", "kok",  "nep", "san"]
arabic_languages = ["kas", "snd", "urd"]

english_words_train = []
lang_words_train = []

english_words_test = []
lang_words_test = []
english_words = []
lang_words = []


# if language == "dev":
#     for lang in devanagari_languages:
#         try:
#             train_dataset = pd.read_json(
#                 os.path.join("data", lang, f"{lang}_train.json"), lines=True)
#             val_dataset = pd.read_json(
#                 os.path.join("data", lang, f"{lang}_valid.json"), lines=True)
#             test_dataset = pd.read_json(
#                 os.path.join("data", lang, f"{lang}_test.json"), lines=True)

#             english_words.extend(list(train_dataset["english word"]))
#             english_words.extend(list(val_dataset["english word"]))
#             english_words.extend(list(test_dataset["english word"]))
#             lang_words.extend(list(train_dataset["native word"]))
#             lang_words.extend(list(val_dataset["native word"]))
#             lang_words.extend(list(test_dataset["native word"]))

#             del train_dataset
#             del test_dataset
#             del val_dataset
#             gc.collect()

#         except Exception as e:
#             print(f"An error occurred {language} : {e}")
#             # Continue to the next iteration

# elif language == "arb":
#     for lang in arabic_languages:
#         try:
#             train_dataset = pd.read_json(
#                 os.path.join("data", lang, f"{lang}_train.json"), lines=True)
#             val_dataset = pd.read_json(
#                 os.path.join("data", lang, f"{lang}_valid.json"), lines=True)
#             test_dataset = pd.read_json(
#                 os.path.join("data", lang, f"{lang}_test.json"), lines=True)

#             english_words.extend(list(train_dataset["english word"]))
#             english_words.extend(list(val_dataset["english word"]))
#             english_words.extend(list(test_dataset["english word"]))
#             lang_words.extend(list(train_dataset["native word"]))
#             lang_words.extend(list(val_dataset["native word"]))
#             lang_words.extend(list(test_dataset["native word"]))

#             del train_dataset
#             del test_dataset
#             del val_dataset
#             gc.collect()

#         except Exception as e:
#             print(f"An error occurred {language} : {e}")
#             # Continue to the next iteration


# else:
try:

    column_names = ["native word", "english word", "score"]
# Read the TSV file into a DataFrame
    # df = pd.read_csv(file_path, sep='\t', header=None, names=column_names)
# Display the first few rows of the DataFrame
    # print(df["native"])
    train_dataset = pd.read_csv(
        os.path.join('./dakshina_dataset_v1.0/hi/lexicons/hi.translit.sampled.train.tsv'), sep='\t', header=None, names=column_names)
    val_dataset = pd.read_csv(
        os.path.join('./dakshina_dataset_v1.0/hi/lexicons/hi.translit.sampled.dev.tsv'), sep='\t', header=None, names=column_names)
    test_dataset = pd.read_csv(
        os.path.join('./dakshina_dataset_v1.0/hi/lexicons/hi.translit.sampled.test.tsv'), sep='\t', header=None, names=column_names)

    english_words.extend(list(train_dataset["english word"]))
    english_words.extend(list(val_dataset["english word"]))
    english_words.extend(list(test_dataset["english word"]))
    lang_words.extend(list(train_dataset["native word"]))
    lang_words.extend(list(val_dataset["native word"]))
    lang_words.extend(list(test_dataset["native word"]))

    del train_dataset
    del test_dataset
    del val_dataset
    gc.collect()
    print("current length testing", len(english_words), len(lang_words))
    print("last word:::::::::: ", english_words[-10], lang_words[-10])

    train_dataset = pd.read_json(
        os.path.join("..", "data", language, f"{language}_train.json"), lines=True)
    val_dataset = pd.read_json(
        os.path.join("..", "data", language, f"{language}_valid.json"), lines=True)
    test_dataset = pd.read_json(
        os.path.join("..", "data", language, f"{language}_test.json"), lines=True)

    english_words.extend(list(train_dataset["english word"]))
    english_words.extend(list(val_dataset["english word"]))
    english_words.extend(list(test_dataset["english word"]))
    lang_words.extend(list(train_dataset["native word"]))
    lang_words.extend(list(val_dataset["native word"]))
    lang_words.extend(list(test_dataset["native word"]))

    del train_dataset
    del test_dataset
    del val_dataset
    gc.collect()

    print("current length train", len(english_words), len(lang_words))
    print("last word:::::::::: ", english_words[len(
        english_words)-1], lang_words[len(lang_words)-1])
except Exception as e:
    print(f"An error occurred {language} : {e}")
    # Continue to the next iteration


# random.shuffle(english_words)
# random.shuffle(lang_words)
# print(english_words)


train_eng, test_eng = split_array_by_percent(
    english_words, split_percentage)
train_lang, test_lang = split_array_by_percent(
    lang_words, split_percentage)

print(len(train_eng), len(test_eng), len(train_lang), len(test_lang))

train_dataset = Transliteration_Dataset(
    src=train_eng, tgt=train_lang, src_vocab=src_vocab, tgt_vocab=tgt_vocab, padding=False, max_seq_length=MAX_LENGTH)
test_dataset = Transliteration_Dataset(
    src=test_eng, tgt=test_lang, src_vocab=src_vocab, tgt_vocab=tgt_vocab, padding=False, max_seq_length=MAX_LENGTH)

# creating Dataloaders

train_dataloader = DataLoader(
    train_dataset, shuffle=True, batch_size=batch_size, num_workers=torch.cuda.device_count(), collate_fn=collate_fn)
val_dataloader = DataLoader(test_dataset, shuffle=True,
                            batch_size=batch_size, num_workers=torch.cuda.device_count(), collate_fn=collate_fn)

del train_dataset
del test_dataset

gc.collect()


# def accuracy_fn(model, src,trg, device):
#     """
#     Optimized batch-wise accuracy calculation for a model over a dataset.
#     """
#     # model = model.module if isinstance(model, nn.DataParallel) else model
#     # model = model.to(device)
#     model.eval()  # Set the model to evaluation mode
#     total_correct_sequences = 0
#     total_sequences = 0

#     pad_and_eos_tokens = {0,1,2,3}  # Set of tokens to remove

#     with torch.no_grad():  # No gradient calculation
       
#         # Move input sequences to devi
#         src = src.to(device)  # Source sequences
#         trg = trg.to(device)  # Target sequences
        
#         # print(src,trg,src.shape,trg.shape,sep="\n")
#         # Get the predictions using the optimized greedy decoding function
#         predictions = model(src,None,False)
#         # print("predictions ::::::::::::::::::",predictions)
#         predictions = predictions.to(device)
        
#         # Mask to filter out padding, EOS, and special tokens
#         trg_mask = torch.isin(trg, torch.tensor(list(pad_and_eos_tokens)).to(device), invert=True)
#         pred_mask = torch.isin(predictions, torch.tensor(list(pad_and_eos_tokens)).to(device), invert=True)
        
#         # Apply masks to clean the target and predicted sequences
#         cleaned_trg = [t[mask] for t, mask in zip(trg, trg_mask)]
#         cleaned_preds = [p[mask] for p, mask in zip(predictions, pred_mask)]
#         # print("claned trg::::::::::: ",cleaned_trg)
#         # print("claned preds::::::::::: ",cleaned_preds)
#         # Compare predicted sequences to target sequences
#         correct = [torch.equal(p, t) for p, t in zip(cleaned_preds, cleaned_trg)]
#         # print("correct::::::::::",correct)
#         total_correct_sequences += sum(correct)
#         total_sequences += len(correct)

#     # Overall accuracy
#     # print(total_correct_sequences,total_sequences,sep="\n")
#     overall_accuracy = (total_correct_sequences / total_sequences) * 100.0
#     return overall_accuracy



def accuracy_fn(model, src, trg, device):
    """
    Optimized batch-wise accuracy calculation for a model over a dataset, supporting multi-GPU inference.
    """
    model = model.module if isinstance(model, nn.DataParallel) else model
    model = model.to(device)
    model.eval()  # Set the model to evaluation mode
    total_correct_sequences = 0
    total_sequences = 0

    pad_and_eos_tokens = {0, 1, 2, 3}  # Set of tokens to remove

    with torch.no_grad():  # No gradient calculation
        src = src.to(device)  # Move source to device
        trg = trg.to(device)  # Move target to device

        # Use model with DataParallel for multi-GPU inference
        if torch.cuda.device_count() > 1:
            model = nn.DataParallel(model)

        # Get predictions using the optimized greedy decoding function
        predictions = model(src, None, False)

        # Ensure consistent tensor shape by padding outputs
        max_pred_len = max([p.size(0) for p in predictions])
        predictions_padded = [torch.nn.functional.pad(p, (0, max_pred_len - p.size(0))) for p in predictions]
        predictions = torch.stack(predictions_padded).to(device)

        # Mask to filter out padding, EOS, and special tokens
        trg_mask = torch.isin(trg, torch.tensor(list(pad_and_eos_tokens)).to(device), invert=True)
        pred_mask = torch.isin(predictions, torch.tensor(list(pad_and_eos_tokens)).to(device), invert=True)

        # Apply masks to clean the target and predicted sequences
        cleaned_trg = [t[mask] for t, mask in zip(trg, trg_mask)]
        cleaned_preds = [p[mask] for p, mask in zip(predictions, pred_mask)]

        # Compare predicted sequences to target sequences
        correct = [torch.equal(p, t) for p, t in zip(cleaned_preds, cleaned_trg)]
        total_correct_sequences += sum(correct)
        total_sequences += len(correct)

    # Overall accuracy
    overall_accuracy = (total_correct_sequences / total_sequences) * 100.0
    return overall_accuracy


class TransformerEncoder(nn.Module):
    def __init__(self, input_dim, hid_dim, n_layers, n_heads, pf_dim, dropout, max_length=128):
        super().__init__()

        self.tok_embedding = nn.Embedding(input_dim, hid_dim, padding_idx=0)
        self.pos_embedding = nn.Embedding(max_length, hid_dim, padding_idx=0)
        enc_norm = nn.LayerNorm(hid_dim)
        encoder_layer = nn.TransformerEncoderLayer(
            hid_dim, n_heads, pf_dim, dropout, batch_first=True, norm_first=False)
        self.encoder = nn.TransformerEncoder(
            encoder_layer, n_layers, norm=enc_norm)

        self.dropout = nn.Dropout(dropout)
        self.scale = torch.sqrt(torch.FloatTensor([hid_dim]))


# self,
#             src: Tensor,
#             mask: Optional[Tensor] = None,
#             src_key_padding_mask: Optional[Tensor] = None,
#             is_causal: Optional[bool] = None) -> Tensor:

        # return self.encoder.encode(src,self.get_src_mask(src),self.get_src_key_padding_mask(src))

    # def encode(self, src, mask, key_padding_mask):
    #     batch_size = src.shape[0]
    #     src_len = src.shape[1]

    #     pos = torch.arange(0, src_len).unsqueeze(
    #         0).repeat(batch_size, 1)
    #     pos = pos.to(device)
    #     src = (self.tok_embedding(src) * self.scale.to(device)) + self.pos_embedding(pos)
    #     # print("encoder input")
    #     # print(src, src.shape)
    #     return self.encoder(src=src, mask=mask, src_key_padding_mask=key_padding_mask)

    def forward(self, src, src_mask, src_padding_mask, is_training=True):
        # print("::::::::inside encoder:::::::::::")
        # print(src,src_mask,src.shape,src_mask.shape,sep="\n")
        # src: [batch_size, src_len]
        batch_size = src.shape[0]
        src_len = src.shape[1]

        pos = torch.arange(0, src_len).unsqueeze(
            0).repeat(batch_size, 1)
        pos = pos.to(device)

        if is_training == True:
            src = self.dropout(
                (self.tok_embedding(src) * self.scale.to(device)) + self.pos_embedding(pos))
        else:
            src = (self.tok_embedding(src) * self.scale.to(device)) + \
                self.pos_embedding(pos)
        # src = src.permute(1, 0, 2)  # [src_len, batch_size, hid_dim]

        # print(src.shape,src_mask.shape)
        # print(torch.isnan(src).sum(), torch.isinf(src).sum())
        # [src_len, batch_size, hid_dim]
        enc_output = self.encoder(
            src=src, mask=src_mask, src_key_padding_mask=src_padding_mask)
        # print("encoder output::::",enc_output)
        return enc_output


class TransformerDecoder(nn.Module):
    def __init__(self, output_dim, hid_dim, n_layers, n_heads, pf_dim, dropout, max_length=128):
        super().__init__()

        self.tok_embedding = nn.Embedding(output_dim, hid_dim, padding_idx=0)
        self.pos_embedding = nn.Embedding(max_length, hid_dim, padding_idx=0)
        dec_norm = nn.LayerNorm(hid_dim)
        decoder_layer = nn.TransformerDecoderLayer(
            hid_dim, n_heads, pf_dim, dropout, batch_first=True, norm_first=False)
        self.decoder = nn.TransformerDecoder(
            decoder_layer, n_layers, norm=dec_norm)

        self.fc_out = nn.Linear(hid_dim, output_dim)
        self.dropout = nn.Dropout(dropout)
        self.scale = torch.sqrt(torch.FloatTensor([hid_dim]))

    # self, tgt: Tensor, memory: Tensor, tgt_mask: Optional[Tensor] = None,
    #             memory_mask: Optional[Tensor] = None, tgt_key_padding_mask: Optional[Tensor] = None,
    #             memory_key_padding_mask: Optional[Tensor] = None, tgt_is_causal: Optional[bool] = None,
    #             memory_is_causal: bool = False) -> Tensor:

# (trg, enc_output, trg_mask,
        #   trg_padding_mask, memory_mask, memory_key_padding_mask

    # def decode(self, trg, memory, mask, trg_padding_mask, memeory_mask, memory_key_padding_mask):

    #     batch_size = trg.shape[0]
    #     trg_len = trg.shape[1]

    #     pos = torch.arange(0, trg_len).unsqueeze(
    #         0).repeat(batch_size, 1).to(device)

    #     trg = (self.tok_embedding(trg) * self.scale.to(device)) + \
    #         self.pos_embedding(pos)
    #     # print("decoder input ::::")
    #     # print(trg, trg.shape)
    #     # print(mask, mask.shape)
    #     trg = trg.to(device)
    #     memory = memory.to(device)
    #     mask = mask.to(device)
    #     dec_output = self.decoder(tgt=trg, memory=memory, tgt_mask=mask, memory_mask=memeory_mask,
    #                               tgt_key_padding_mask=trg_padding_mask, memory_key_padding_mask=memory_key_padding_mask)
    #     # print("decoder output ::::", dec_output, dec_output.shape)
    #     return self.fc_out(dec_output)

    def forward(self, trg, enc_output, trg_mask, trg_padding_mask, memory_mask, memory_key_padding_mask, is_training=True):
        # trg: [batch_size, trg_len]
        batch_size = trg.shape[0]
        trg_len = trg.shape[1]

        pos = torch.arange(0, trg_len).unsqueeze(
            0).repeat(batch_size, 1).to(device)

        if is_training == True:

            trg = self.dropout(
                (self.tok_embedding(trg) * self.scale.to(device)) + self.pos_embedding(pos))
        else:
            trg = (self.tok_embedding(trg) * self.scale.to(device)) + \
                self.pos_embedding(pos)

        dec_output = self.decoder(tgt=trg, memory=enc_output, tgt_mask=trg_mask, memory_mask=memory_mask,
                                  tgt_key_padding_mask=trg_padding_mask, memory_key_padding_mask=memory_key_padding_mask)
        # print("decoder output::::::::::: ",dec_output,dec_output.shape)
        output = self.fc_out(dec_output)

        return output


class Seq2Seq(nn.Module):
    def __init__(self, encoder, decoder, src_pad_idx, trg_pad_idx, start_symbol, end_symbol, max_length, device):
        super().__init__()

        self.encoder = encoder
        self.decoder = decoder
        self.src_pad_idx = src_pad_idx
        self.trg_pad_idx = trg_pad_idx
        self.device = device
        self.start_symbol = start_symbol
        self.end_symbol = end_symbol
        self.max_length = max_length
        self._reset_parameters()

    def _reset_parameters(self):
        for p in self.parameters():
            if p.dim() > 1:
                nn.init.xavier_uniform_(p)

    # Generates the padding mask for the source input
    def get_src_key_padding_mask(self, src_tensor, batch_first=True):
        if batch_first:
            # Input shape: [batch_size, seq_len]
            src_padding_mask = (src_tensor == self.src_pad_idx)
        else:
            # Input shape: [seq_len, batch_size]
            src_padding_mask = (src_tensor == self.src_pad_idx).transpose(0, 1)
        return src_padding_mask  # Shape: [batch_size, seq_len]

    # Generates the padding mask for the target input
    def get_tgt_key_padding_mask(self, tgt_tensor,  batch_first=True):
        if batch_first:
            # Input shape: [batch_size, seq_len]
            tgt_padding_mask = (tgt_tensor == self.trg_pad_idx)
        else:
            # Input shape: [seq_len, batch_size]
            tgt_padding_mask = (tgt_tensor == self.trg_pad_idx).transpose(0, 1)
        return tgt_padding_mask  # Shape: [batch_size, seq_len]

    # Generates the memory key padding mask (for decoder self-attention to ignore padded source tokens)
    def get_memory_key_padding_mask(self, src_tensor, batch_first=True):
        return self.get_src_key_padding_mask(src_tensor, batch_first)

    # Generates the source mask (optional, usually zero for no constraints)
    def get_src_mask(self, src_tensor, batch_first=True):
        seq_len = src_tensor.size(1 if batch_first else 0)
        # Shape: [seq_len, seq_len] for no masking (all values are 0)
        src_mask = torch.zeros(
            (seq_len, seq_len), device=self.device).type(torch.bool)
        return src_mask  # Shape: [seq_len, seq_len]

    # Generates the target mask to enforce causal masking
    def get_tgt_mask(self, tgt_tensor, batch_first=True):
        seq_len = tgt_tensor.size(1 if batch_first else 0)
        # Causal mask for decoder: prevents attending to future positions
        tgt_mask = (torch.triu(torch.ones(seq_len, seq_len))
                    == 1).transpose(0, 1)
        tgt_mask = tgt_mask.float().masked_fill(tgt_mask == 0, float('-inf')
                                                ).masked_fill(tgt_mask == 1, float(0.0))
        return tgt_mask  # Shape: [seq_len, seq_len]

    # Generates the memory mask (decoder attending to encoder output)
    def get_memory_mask(self, tgt_tensor, src_tensor, batch_first=True):
        tgt_seq_len = tgt_tensor.size(1 if batch_first else 0)
        src_seq_len = src_tensor.size(1 if batch_first else 0)
        # No memory masking by default, all positions attend to source
        memory_mask = torch.zeros(
            (tgt_seq_len, src_seq_len), device=self.device).type(torch.bool)
        return memory_mask  # Shape: [tgt_seq_len, src_seq_len]

    # def encode(self, src):
    #     return self.encoder.encode(src, self.get_src_mask(src), self.get_src_key_padding_mask(src))

    # def decode(self, src, tgt, memory):
    #     return self.decoder.decode(tgt, memory, self.get_tgt_mask(tgt), self.get_tgt_key_padding_mask(tgt), self.get_memory_mask(tgt, src), self.get_memory_key_padding_mask(src))

    def forward(self, src, trg=None, is_training=True):
        # src: [batch_size, src_len]
        # trg: [batch_size, trg_len]
        # print(src,trg,sep="\n")
        src_mask = self.get_src_mask(src).to(self.device)
        # print(src_mask)
      
        # print(trg_mask)
        src_padding_mask = self.get_src_key_padding_mask(src).to(self.device)
        # print(src_padding_mask)
      
        # print(trg_padding_mask)
        
        memory_key_padding_mask = self.get_memory_key_padding_mask(
            src).to(self.device)
        # print(memory_key_padding_mask)
        if trg is not None:
            trg_mask = self.get_tgt_mask(trg).to(self.device)
            trg_padding_mask = self.get_tgt_key_padding_mask(trg).to(self.device)  
            memory_mask = self.get_memory_mask(trg, src).to(self.device)
        # print(memory_mask)

        # tgt_key_padding_mask = (trg_attention_mask[:, :-1] == 0)
        # print(src_mask,trg_mask,src_mask.shape,trg_mask.shape,sep="\n")
        # print(src.shape)
        # print(src_mask.shape)
        # print(trg.shape)
        # print(trg_mask.shape)
        if is_training == True:

            enc_output = self.encoder(src, src_mask, src_padding_mask, is_training)
            # print(enc_output)
            # print(enc_output.shape)
            # print(trg.shape,trg_mask.shape,tgt_key_padding_mask.shape)
            # tgt: Tensor, memory: Tensor, tgt_mask: Optional[Tensor] = None,
            #         memory_mask: Optional[Tensor] = None, tgt_key_padding_mask: Optional[Tensor] = None,
            #         memory_key_padding_mask: Optional[Tensor] = None, tgt_is_causal: Optional[bool] = None,
            #         memory_is_causal: bool = False
            output = self.decoder(trg, enc_output, trg_mask,
                                  trg_padding_mask, memory_mask, memory_key_padding_mask, is_training)
            # print("decoder output::::::::::",output)

            return output
        
        else:
            return self.inference(src, src_mask) 
        
    def inference(self, src, src_mask):
        start_symbol = self.start_symbol
        end_symbol = self.end_symbol
        max_len = self.max_length
        batch_size = src.size(0)

        # Encode the input sequences
        memory = self.encoder(src, src_mask, self.get_src_key_padding_mask(src).to(self.device), is_training=False)

        # Initialize output tensor
        ys = torch.ones(batch_size, 1, dtype=torch.long).fill_(start_symbol).to(self.device)
        finished_sequences = torch.zeros(batch_size, dtype=torch.bool).to(self.device)

        for _ in range(max_len - 1):
            trg_mask = self.get_tgt_mask(ys).to(self.device)
            trg_padding_mask = self.get_tgt_key_padding_mask(ys).to(self.device)
            memory_mask = self.get_memory_mask(ys, src).to(self.device)
            memory_padding_mask = self.get_memory_key_padding_mask(src).to(self.device)

            out = self.decoder(ys, memory, trg_mask, trg_padding_mask, memory_mask, memory_padding_mask, is_training=False)

            # Get the next predicted token for each batch
            _, next_word = torch.max(out[:, -1, :], dim=-1)
            next_word = next_word.unsqueeze(1)

            # Concatenate the next word to the current output
            ys = torch.cat([ys, next_word], dim=1)

            # Update finished sequences if they have reached the end symbol
            finished_sequences = finished_sequences | (next_word == end_symbol)

            # If all sequences are finished, break early
            if finished_sequences.all():
                break

        # Pad the output to the maximum length in the batch
        output_length = ys.size(1)
        padded_output = torch.full((batch_size, self.max_length), self.trg_pad_idx, dtype=torch.long).to(self.device)
        padded_output[:, :output_length] = ys
        
        return padded_output       
#             start_symbol = self.start_symbol
#             end_symbol = self.end_symbol
#             max_len = self.max_length
#             # Squeeze source and move to device
#             src = src.to(self.device)
#             batch_size = src.size(0)
#             # if isinstance(model, nn.DataParallel):
#             #     model = model.module
#             # Encode the input sequences
#             memory = self.encoder(src, src_mask, src_padding_mask, is_training)
#             memory = memory.to(self.device)
#             # print("memory::::::::",memory)
#             # Initialize ys with the start symbol for each batch
#             ys = torch.ones(batch_size, 1, dtype=torch.long).fill_(
#                 start_symbol).to(self.device)
#             # print("ys::::::::::",ys)
#             # Keep track of completed sequences
#             finished_sequences = torch.zeros(
#                 batch_size, dtype=torch.bool).to(self.device)

#             for i in range(max_len - 1):
#                 # Decode the next step
# # return self.decoder.decode(tgt, memory, self.get_tgt_mask(tgt), self.get_tgt_key_padding_mask(tgt), self.get_memory_mask(tgt, src), self.get_memory_key_padding_mask(src))
                
#                 trg_mask=self.get_tgt_mask(ys).to(self.device)
#                 trg_key_mask=self.get_tgt_key_padding_mask(ys).to(self.device)
#                 memory_mask=self.get_memory_mask(ys, src).to(self.device)
#                 memory_padding_mask=self.get_memory_key_padding_mask(src).to(self.device)
                
#                 out = self.decoder(ys, memory,trg_mask, trg_key_mask, memory_mask, memory_padding_mask, is_training)

#                 # Get the next predicted token for each batch
#                 _, next_word = torch.max(out[:, -1, :], dim=-1)
#                 next_word = next_word.unsqueeze(1)

#                 # Concatenate the next word to the current output
#                 ys = torch.cat([ys, next_word], dim=1)

#                 # Update finished sequences if they have reached the end symbol
#                 finished_sequences = finished_sequences | (
#                     next_word == end_symbol)

#                 # If all sequences are finished, break early
#                 if finished_sequences.all():
#                     break

#             return ys


num_encoder_layers = 6
num_decoder_layers = 6
nhead = 4
embedding_size = 256
dropout = 0.3
batch_size = 512
split_percent = 70
dim_feedforward = 512*2


# num_encoder_layers = 8
# num_decoder_layers = 8
# nhead = 16
# embedding_size = 512
# dropout = 0.3
# batch_size =512
# split_percent = 70
# dim_feedforward = 512*4

# index of the padding token in source vocabulary
src_pad_idx = 0
# index of the padding token in target vocabulary
trg_pad_idx = 0
start_symbol=1
end_symbol=2

# number of unique tokens in source vocabulary
src_vocab_size = src_vocab.size()
# number of unique tokens in target vocabulary
trg_vocab_size = tgt_vocab.size()
# d_model=512

encoder = TransformerEncoder(input_dim=src_vocab_size, hid_dim=embedding_size, n_layers=num_encoder_layers,
                             n_heads=nhead, pf_dim=dim_feedforward, dropout=dropout, max_length=MAX_LENGTH)
decoder = TransformerDecoder(output_dim=trg_vocab_size, hid_dim=embedding_size, n_layers=num_decoder_layers,
                             n_heads=nhead, pf_dim=dim_feedforward, dropout=dropout, max_length=MAX_LENGTH)

model = Seq2Seq(encoder=encoder, decoder=decoder, src_pad_idx=src_pad_idx,
                trg_pad_idx=trg_pad_idx,start_symbol=start_symbol,end_symbol=end_symbol,max_length=MAX_LENGTH ,device=device).to(device)
# print(model)

model_path = "./eng-hin-updated-4/weights/eng-hin-updated-4_best_model.pth"

state_dict = torch.load(
    model_path, map_location=torch.device('cpu'))

state_dict = {k.replace("module.", ""): v for k, v in state_dict.items()}
missing_keys = set(model.state_dict().keys()) - set(state_dict.keys())
for missing_key in missing_keys:
    state_dict[missing_key] = model.state_dict()[missing_key]

model.load_state_dict(state_dict)

if torch.cuda.device_count() > 1:
    print("Using", torch.cuda.device_count(), "GPUs for training.")
    model = nn.DataParallel(model)

# Move the model to GPU(s)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
# print(vars(model))


criterion = torch.nn.CrossEntropyLoss(ignore_index=0)


def loss_estimator(pred, truth):
    """ Only consider non-zero inputs in the loss; mask needed
    pred: batch
    """

    mask = truth.ge(1).type(torch.FloatTensor).to(device)
    loss_ = criterion(pred, truth) * mask
    return torch.mean(loss_)


optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

# scheduler = torch.optim.lr_scheduler.StepLR(optimizer, step_size=3, gamma=0.1)
scheduler = get_scheduler("inverse_sqrt", optimizer=optimizer,
                          num_warmup_steps=4000, num_training_steps=len(train_dataloader) * EPOCHS)
# scheduler= transformers.get_inverse_sqrt_schedule()
# Initialize optimizer


# Define your scheduler
# scheduler = torch.optim.lr_scheduler.StepLR(optimizer, step_size=5, gamma=0.1)

# Early stopping parameters
early_stopping_patience = 3
best_valid_loss = float('inf')
early_stopping_counter = 0
model_save_path = WGT_PREFIX+'_best_model.pth'
log_file = LOG_PATH+'_training_log.txt'
best_accuracy = 0.0
# Open log file
with open(log_file, 'w') as log:
    log.write('Epoch\tTrain Loss\tValid Loss\taccuracy\n')

    for epoch in range(EPOCHS):
        model.train()
        train_loss = 0.0

        for src, trg in tqdm(train_dataloader, desc=f'Epoch {epoch+1}/{EPOCHS}'):
            model.train()
            # Move data to device
            # print("source:::::::",src,src.shape)
            # print("target::::::",trg,trg.shape)
            # src_attention_mask = src.attention_mask
            # trg_attention_mask = trg.attention_mask
            # src = src.input_ids
            # trg = trg.input_ids
            # print(src.shape,trg.shape)
            # src = src.squeeze(1)
            # trg = trg.squeeze(1)
            # src_attention_mask = src_attention_mask.squeeze(1)
            # trg_attention_mask = trg_attention_mask.squeeze(1)

            optimizer.zero_grad()
            src = src.to(device)
            trg = trg.to(device)
            # src_attention_mask = src_attention_mask.to(device)
            # trg_attention_mask = trg_attention_mask.to(device)

            # print("src:::::::::::::::::",src,src.shape)
            # print("trg:::::::::::::::::",trg,trg.shape)

            output = model(src, trg[:, :-1],True)
            # print("output:::::::::::", output, output.shape,sep="\n")
            output_dim = output.shape[-1]
            output = output.contiguous().view(-1, output_dim)
            # print("output contiguous:::::::::::", output, output.shape,sep="\n")
            # print("trg normal :::::::",trg[:,1:],trg[:,1:].shape,sep="\n")
            trg = trg[:, 1:].contiguous().view(-1)
            # print("trg contiguous:::::::::::", trg, trg.shape,sep="\n")
            loss = criterion(output, trg)
            # print("losss:::::::::::::",loss)
            train_loss += loss.item()
            # sys.exit()
            loss.backward()
            optimizer.step()
            scheduler.step()

        # Update the learning rate scheduler

        # Log training loss
        avg_train_loss = train_loss / len(train_dataloader)

        print("average train loss ::::", avg_train_loss)

        # Validation phase
        model.eval()
        valid_loss = 0.0
        val_accuracy = 0.0
        with torch.no_grad():
            # try:
            for src, trg in tqdm(val_dataloader, desc='Validation'):

                src = src.to(device)
                trg = trg.to(device)

                val_accuracy += accuracy_fn(model, src, trg, device)
                output = model(src, trg[:, :-1],True)

                output_dim = output.shape[-1]
                output = output.contiguous().view(-1, output_dim)
                # print(output)
                trg = trg[:, 1:].contiguous().view(-1)

                loss = criterion(output, trg)
                valid_loss += loss.item()
                # val_accuracy += accuracy_fn(model, src, trg, device)

        # Log validation loss
        avg_valid_loss = valid_loss / len(val_dataloader)
        avg_val_accuracy = val_accuracy / len(val_dataloader)
        # scheduler.step()
        
        current_lr = optimizer.param_groups[0]['lr']
        print(f"Epoch {epoch+1}/{EPOCHS} - Current Learning Rate: {current_lr:.6f}")
        # Write to log file
        with open(log_file, 'a') as log:
            log.write(
                f'{epoch+1}\t{avg_train_loss:.4f}\t{avg_valid_loss:.4f}\t {avg_val_accuracy}\n')

        print(
            f'Epoch {epoch+1}/{EPOCHS} - Train Loss: {avg_train_loss:.4f} - Valid Loss: {avg_valid_loss:.4f} - accuracy: {avg_val_accuracy}')

        # Early stopping and model saving
        if avg_val_accuracy > best_accuracy:
            best_accuracy = avg_val_accuracy
            early_stopping_counter = 0
            torch.save(model.state_dict(), model_save_path)
            print(
                f'Saved model with best accuracy: {best_accuracy:.4f}')
        else:
            early_stopping_counter += 1
            # if early_stopping_counter >= early_stopping_patience:
            #     print(f'Early stopping triggered after {epoch+1} epochs')
            #     break

    log.write('Epoch\tTrain Loss\tValid Loss\n')
