"""
The provided code snippet includes the setup for a sequence-to-sequence transformer model for
transliteration, including data preprocessing, model architecture, training loop, evaluation, and
translation function.

:param sz: The `sz` parameter in the `generate_square_subsequent_mask` function is used to determine
the size of the square mask matrix that is generated. This matrix is a square matrix of size `sz x
sz` where `sz` is the input parameter provided to the function. The purpose of this
:return: The code snippet provided is a PyTorch implementation for training a sequence-to-sequence
Transformer model for transliteration tasks. The code includes the setup for data loading, model
architecture definition, training loop, evaluation, and decoding functions.
"""
from transformers import PreTrainedTokenizer, AutoTokenizer
import json
import os
from timeit import default_timer as timer
from torch.utils.data import DataLoader
from torch.nn.utils.rnn import pad_sequence
from torch import Tensor
import torch
import torch.nn as nn
from torch.nn import Transformer
import math

import sys

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
DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')


language = input("language code to process:::::: ")
device = torch.device('cuda:0' if torch.cuda.is_available() else 'cpu')
print("Number of CUDA devices available:", torch.cuda.device_count())
current_date = datetime.now().date()
print("::: Current Date ::: ", current_date)
INST_NAME = f"eng-{language}-transformer"
LOG_PATH = os.path.join(INST_NAME+"/")
WGT_PREFIX = os.path.join(LOG_PATH, "weights", INST_NAME)
if not os.path.exists(LOG_PATH+"weights"):
    os.makedirs(os.path.join(LOG_PATH, "weights"))


MAX_LENGTH = 64  # max possible length of word to be entertained
num_epochs = 30
batch_size = 32
learning_rate = 5e-4
acc_grad = 1
teacher_forcing, teach_force_till, teach_decay_pereph = .5, 20, 0
pretrained_wgt_path = None
split_percent = 70


with open("vocab.json", 'r') as json_file:
    vocab = json.load(json_file)

with open("numerals.json", 'r') as json_file:
    numerals = json.load(json_file)

# Now 'data' contains the JSON data as a Python dictionary
# print(vocab,numerals)


indoarab_num = [chr(alpha) for alpha in range(48, 58)]
english_lower_script = [chr(alpha)
                        for alpha in range(65, 91)]+[chr(alpha)
                                                     for alpha in range(97, 123)] + ['é', 'è', 'á']
# english_lower_script = [chr(alpha)
#                         for alpha in range(97, 123)] + ['é', 'è', 'á']
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


# class Vocabulary():
#     def __init__(self, lang_script=english_lower_script):

#         self.glyphs = lang_script
#         self.char2idx = {}
#         self.idx2char = {}
#         self.PAD_token = "[PAD]"
#         self.SOS_token = "[SOS]"
#         self.EOS_token = "[EOS]"
#         self.MASK_token = "[MASK]"
#         self._create_index()

#     def _create_index(self):
#         self.char2idx[self.PAD_token] = 0  # pad
#         self.char2idx[self.SOS_token] = 1  # start
#         self.char2idx[self.EOS_token] = 2  # end
#         self.char2idx[self.MASK_token] = 3  # Mask
#         self.char2idx["'"] = 4  # apostrophe U+0027
#         self.char2idx['%'] = 5  # unused
#         self.char2idx['!'] = 6  # unused
#         self.char2idx['?'] = 7
#         self.char2idx[':'] = 8
#         self.char2idx[' '] = 9
#         self.char2idx['-'] = 10
#         self.char2idx[','] = 11
#         self.char2idx['.'] = 12
#         self.char2idx['('] = 13
#         self.char2idx[')'] = 14
#         self.char2idx['/'] = 15
#         self.char2idx['^'] = 16

#         for idx, char in enumerate(indoarab_num):
#             self.char2idx[char] = idx+17

#         for idx, char in enumerate(self.glyphs):
#             self.char2idx[char] = idx+27

#         for char, idx in self.char2idx.items():
#             self.idx2char[idx] = char

#     def size(self):
#         return len(self.char2idx)

#     def word2xlitvec(self, word,):
#         try:
#             vec = [self.char2idx[self.SOS_token]]

#             for char in list(str(word)):
#                 try:
#                     vec.append(self.char2idx[char])
#                 except Exception as error:
#                     print("[ERROR] in char : ", word, char,
#                           " Error token not in Vocabulary:", error)
#                     sys.exit()
#             vec.append(self.char2idx[self.EOS_token])
#             vec = np.asarray(vec, dtype=np.int64)
#             return vec

#         except Exception as error:
#             print("[ERROR] in word : ", word,
#                   " Error token not in Vocabulary:", error)
#             sys.exit()

#     def xlitvec2word(self, vector):
#         tokens_to_ignore = {
#             self.char2idx[self.EOS_token],
#             self.char2idx[self.SOS_token],
#             self.char2idx[self.PAD_token],
#             self.char2idx[self.MASK_token]
#         }

#         char_list = [self.idx2char[i]
#                      for i in vector if i not in tokens_to_ignore]
#         return "".join(char_list)


# class Transliteration_Dataset(Dataset):
#     def __init__(self, src, tgt, src_vocab, tgt_vocab, padding=True, max_seq_length=None):
#         self.src_vocab = src_vocab
#         self.tgt_vocab = tgt_vocab
#         self.padding = padding

#         # Convert source and target sentences to sequences of indices
#         self.src = [self.src_vocab.word2xlitvec(s) for s in src]
#         self.tgt = [self.tgt_vocab.word2xlitvec(t) for t in tgt]

#         # Calculate class weights for the target vocabulary (optional)
#         self.tgt_class_weights = self._char_class_weights(self.tgt)

#         # Set maximum sequence lengths
#         if max_seq_length:
#             self.max_src_size = max_seq_length
#             self.max_tgt_size = max_seq_length
#         else:
#             self.max_src_size = max(len(s) for s in self.src)
#             self.max_tgt_size = max(len(t) for t in self.tgt)

#     def __len__(self):
#         return len(self.src)

#     def __getitem__(self, index):
#         src_seq = self.src[index]
#         tgt_seq = self.tgt[index]

#         # Apply padding if necessary
#         if self.padding:
#             src_seq = self._pad_sequence(src_seq, self.max_src_size)
#         tgt_seq = self._pad_sequence(tgt_seq, self.max_tgt_size)

#         # Convert sequences to PyTorch tensors
#         src_seq = torch.tensor(src_seq, dtype=torch.long)
#         tgt_seq = torch.tensor(tgt_seq, dtype=torch.long)

#         return src_seq, tgt_seq

#     def _pad_sequence(self, seq, max_len):
#         """Pad or truncate sequence to a specified length."""
#         padded = np.zeros((max_len), dtype=np.int64)
#         padded[:len(seq)] = seq[:max_len]
#         return padded

#     def _char_class_weights(self, sequences, scale=10):
#         """Calculate class weights to handle character imbalance."""
#         from collections import Counter
#         full_list = [char for seq in sequences for char in seq]
#         count_dict = dict(Counter(full_list))

#         class_weights = np.ones(self.tgt_vocab.size(), dtype=np.float32)
#         for char_idx, count in count_dict.items():
#             class_weights[char_idx] = (1 / count) * scale

#         return class_weights
class TransliterationDataset(Dataset):
    def __init__(self, source, target, tokenizer_src, tokenizer_tgt, max_len=32):
        self.source = source
        self.target = target
        self.tokenizer_src = tokenizer_src
        self.tokenizer_tgt = tokenizer_tgt
        self.max_len = max_len

    def __len__(self):
        return len(self.source)

    def __getitem__(self, idx):
        src_text = self.source[idx]
        tgt_text = self.target[idx]

        src_tokenized = self.tokenizer_src(
            src_text, padding="max_length", max_length=self.max_len, truncation=True, return_tensors="pt")
        tgt_tokenized = self.tokenizer_tgt(
            tgt_text, padding="max_length", max_length=self.max_len, truncation=True, return_tensors="pt")

        return {
            "input_ids": src_tokenized.input_ids.squeeze(0),
            "attention_mask": src_tokenized.attention_mask.squeeze(0),
            "labels": tgt_tokenized.input_ids.squeeze(0)
        }

# helper Module that adds positional encoding to the token embedding to introduce a notion of word order.


class PositionalEncoding(nn.Module):
    def __init__(self,
                 emb_size: int,
                 dropout: float,
                 maxlen: int = 5000):
        super(PositionalEncoding, self).__init__()
        den = torch.exp(- torch.arange(0, emb_size, 2)
                        * math.log(10000) / emb_size)
        pos = torch.arange(0, maxlen).reshape(maxlen, 1)
        pos_embedding = torch.zeros((maxlen, emb_size))
        pos_embedding[:, 0::2] = torch.sin(pos * den)
        pos_embedding[:, 1::2] = torch.cos(pos * den)
        pos_embedding = pos_embedding.unsqueeze(-2)

        self.dropout = nn.Dropout(dropout)
        self.register_buffer('pos_embedding', pos_embedding)

    def forward(self, token_embedding: Tensor):
        return self.dropout(token_embedding + self.pos_embedding[:token_embedding.size(0), :])

# helper Module to convert tensor of input indices into corresponding tensor of token embeddings


class TokenEmbedding(nn.Module):
    def __init__(self, vocab_size: int, emb_size):
        super(TokenEmbedding, self).__init__()
        self.embedding = nn.Embedding(vocab_size, emb_size)
        self.emb_size = emb_size

    def forward(self, tokens: Tensor):
        return self.embedding(tokens.long()) * math.sqrt(self.emb_size)

# Seq2Seq Network

class TransformerSeq2SeqModel(nn.Module):
    def __init__(self, vocab_size_src, vocab_size_tgt, embedding_size=256, num_heads=8, num_encoder_layers=3, num_decoder_layers=3, max_len=32):
        super(TransformerSeq2SeqModel, self).__init__()
        self.embedding_src = nn.Embedding(vocab_size_src, embedding_size)
        self.embedding_tgt = nn.Embedding(vocab_size_tgt, embedding_size)
        self.positional_encoding = nn.Parameter(torch.zeros(1, max_len, embedding_size))
        
        self.transformer = nn.Transformer(
            d_model=embedding_size,
            nhead=num_heads,
            num_encoder_layers=num_encoder_layers,
            num_decoder_layers=num_decoder_layers
        )
        
        self.fc_out = nn.Linear(embedding_size, vocab_size_tgt)
        self.max_len = max_len
        self.embedding_size = embedding_size

    def forward(self, src, tgt):
        # Add positional encoding
        src_embedded = self.embedding_src(src) + self.positional_encoding[:, :src.size(1), :]
        tgt_embedded = self.embedding_tgt(tgt) + self.positional_encoding[:, :tgt.size(1), :]
        
        # Transformer forward pass
        transformer_output = self.transformer(src_embedded.permute(1, 0, 2), tgt_embedded.permute(1, 0, 2))
        
        # Output layer
        output = self.fc_out(transformer_output.permute(1, 0, 2))
        
        return output
# class Seq2SeqTransformer(nn.Module):
#     def __init__(self,
#                  num_encoder_layers: int,
#                  num_decoder_layers: int,
#                  emb_size: int,
#                  nhead: int,
#                  src_vocab_size: int,
#                  tgt_vocab_size: int,
#                  dim_feedforward: int = 512,
#                  dropout: float = 0.1):
#         super(Seq2SeqTransformer, self).__init__()
#         self.transformer = Transformer(d_model=emb_size,
#                                        nhead=nhead,
#                                        num_encoder_layers=num_encoder_layers,
#                                        num_decoder_layers=num_decoder_layers,
#                                        dim_feedforward=dim_feedforward,
#                                        dropout=dropout)
#         self.fc_out = nn.Linear(emb_size, tgt_vocab_size)
#         self.src_tok_emb = TokenEmbedding(src_vocab_size, emb_size)
#         self.tgt_tok_emb = TokenEmbedding(tgt_vocab_size, emb_size)
#         self.positional_encoding = PositionalEncoding(
#             emb_size, dropout=dropout)

#     def forward(self,
#                 src: Tensor,
#                 trg: Tensor,
#                 src_mask: Tensor,
#                 tgt_mask: Tensor,
#                 src_padding_mask: Tensor,
#                 tgt_padding_mask: Tensor,
#                 memory_key_padding_mask: Tensor):
#         src_emb = self.positional_encoding(self.src_tok_emb(src))
#         tgt_emb = self.positional_encoding(self.tgt_tok_emb(trg))
#         outs = self.transformer(src_emb, tgt_emb, src_mask, tgt_mask, None,
#                                 src_padding_mask, tgt_padding_mask, memory_key_padding_mask)
#         return self.fc_out(outs)

#     def encode(self, src: Tensor, src_mask: Tensor):
#         return self.transformer.encoder(self.positional_encoding(
#             self.src_tok_emb(src)), src_mask)

#     def decode(self, tgt: Tensor, memory: Tensor, tgt_mask: Tensor):
#         return self.transformer.decoder(self.positional_encoding(
#             self.tgt_tok_emb(tgt)), memory,
#             tgt_mask)


class CustomTokenizer(PreTrainedTokenizer):
    def __init__(self, vocab, **kwargs):
        super().__init__(**kwargs)
        self.vocab = vocab
        self.ids_to_tokens = {i: tok for i, tok in enumerate(vocab)}
        self.tokens_to_ids = {tok: i for i, tok in enumerate(vocab)}

    def _tokenize(self, text):
        # Implement simple tokenization logic (e.g., split by character)
        return list(text)

    def _convert_token_to_id(self, token):
        return self.tokens_to_ids.get(token, self.tokens_to_ids[self.unk_token])

    def _convert_id_to_token(self, index):
        return self.ids_to_tokens.get(index, self.unk_token)

    def get_vocab(self):
        return self.tokens_to_ids

    @property
    def vocab_size(self):
        return len(self.vocab)

    def save_vocabulary(self, save_directory, filename_prefix=""):
        vocab_file = os.path.join(save_directory, "vocab.json")
        with open(vocab_file, 'w') as f:
            json.dump(self.vocab, f)
        # Return a tuple containing the file path
        return (vocab_file,)

    @classmethod
    def from_pretrained(cls, save_directory):
        # Load vocab from file
        vocab_file = os.path.join(save_directory, "vocab.json")
        with open(vocab_file, 'r') as f:
            vocab = json.load(f)
        # Instantiate tokenizer with loaded vocab
        return cls(vocab=vocab, unk_token="<unk>", pad_token="<pad>", bos_token="<s>", eos_token="</s>")


def generate_square_subsequent_mask(sz):
    mask = (torch.triu(torch.ones((sz, sz), device=DEVICE)) == 1).transpose(0, 1)
    mask = mask.float().masked_fill(mask == 0, float(
        '-inf')).masked_fill(mask == 1, float(0.0))
    return mask


def create_mask(src, tgt):
    src_seq_len = src.shape[0]
    tgt_seq_len = tgt.shape[0]

    tgt_mask = generate_square_subsequent_mask(tgt_seq_len)
    src_mask = torch.zeros((src_seq_len, src_seq_len),
                           device=DEVICE).type(torch.bool)

    src_padding_mask = (src == PAD_IDX).transpose(0, 1)
    tgt_padding_mask = (tgt == PAD_IDX).transpose(0, 1)
    return src_mask, tgt_mask, src_padding_mask, tgt_padding_mask


def LOG2CSV(data, csv_file, flag='a'):
    '''
    data: List of elements to be written
    '''
    with open(csv_file, flag) as csvFile:
        writer = csv.writer(csvFile)
        writer.writerow(data)
    csvFile.close()


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


def count_train_param(model):
    train_params_count = sum(p.numel()
                             for p in model.parameters() if p.requires_grad)
    print('The model has {} trainable parameters'.format(train_params_count))
    return train_params_count


def freeze_params(model, exclusion_list=[]):
    # TODO: Exclusion lists
    for param in model.parameters():
        param.requires_grad = False
    return model


def accuracy_score(pred_tnsr, tgt_tnsr, glyph_obj):
    '''Simple accuracy calculation for char2char seq TRAINING phase
    pred_tnsr: torch tensor :shp: (batch, voc_size, seq_len)
    tgt_tnsr: torch tensor :shp: (batch, seq_len)
    '''
    pred_seq = torch.argmax(pred_tnsr, dim=1)
    batch_sz = pred_seq.shape[0]
    crt_cnt = 0
    for i in range(batch_sz):
        pred = glyph_obj.xlitvec2word(pred_seq[i, :].cpu().numpy())
        tgt = glyph_obj.xlitvec2word(tgt_tnsr[i, :].cpu().numpy())
        if pred == tgt:
            crt_cnt += 1
    return torch.tensor(crt_cnt/batch_sz)


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
# src_vocab = Vocabulary(english_lower_script)
# tgt_vocab = Vocabulary(language_vocab)

# creating dataset
devanagari_languages = ["hin", "mai", "brx", "mar", "kok",  "nep", "san"]
arabic_languages = ["kas", "snd", "urd"]

english_words = []
lang_words = []


if language == "dev":
    for lang in devanagari_languages:
        try:
            train_dataset = pd.read_json(
                os.path.join("data", lang, f"{lang}_train.json"), lines=True)
            val_dataset = pd.read_json(
                os.path.join("data", lang, f"{lang}_valid.json"), lines=True)
            test_dataset = pd.read_json(
                os.path.join("data", lang, f"{lang}_test.json"), lines=True)

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

        except Exception as e:
            print(f"An error occurred {language} : {e}")
            # Continue to the next iteration

elif language == "arb":
    for lang in arabic_languages:
        try:
            train_dataset = pd.read_json(
                os.path.join("data", lang, f"{lang}_train.json"), lines=True)
            val_dataset = pd.read_json(
                os.path.join("data", lang, f"{lang}_valid.json"), lines=True)
            test_dataset = pd.read_json(
                os.path.join("data", lang, f"{lang}_test.json"), lines=True)

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

        except Exception as e:
            print(f"An error occurred {language} : {e}")
            # Continue to the next iteration
else:
    try:

        # column_names = ["native word", "english word", "score"]
        # train_dataset = pd.read_csv(
        #     os.path.join('./dakshina_dataset_v1.0/hi/lexicons/hi.translit.sampled.train.tsv'), sep='\t', header=None, names=column_names)
        # val_dataset = pd.read_csv(
        #     os.path.join('./dakshina_dataset_v1.0/hi/lexicons/hi.translit.sampled.dev.tsv'), sep='\t', header=None, names=column_names)
        # test_dataset = pd.read_csv(
        #     os.path.join('./dakshina_dataset_v1.0/hi/lexicons/hi.translit.sampled.test.tsv'), sep='\t', header=None, names=column_names)

        # english_words.extend(list(train_dataset["english word"]))
        # english_words.extend(list(val_dataset["english word"]))
        # english_words.extend(list(test_dataset["english word"]))
        # lang_words.extend(list(train_dataset["native word"]))
        # lang_words.extend(list(val_dataset["native word"]))
        # lang_words.extend(list(test_dataset["native word"]))

        # del train_dataset
        # del test_dataset
        # del val_dataset

        train_dataset = pd.read_json(
            os.path.join("data", language, f"{language}_train.json"), lines=True)
        val_dataset = pd.read_json(
            os.path.join("data", language, f"{language}_valid.json"), lines=True)
        test_dataset = pd.read_json(
            os.path.join("data", language, f"{language}_test.json"), lines=True)

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
        print("current length", len(english_words), len(lang_words))
        print("last word:::::::::: ", english_words[len(
            english_words)-1], lang_words[len(lang_words)-1])
    except Exception as e:
        print(f"An error occurred {language} : {e}")
        # Continue to the next iteration


# random.shuffle(english_words)
# random.shuffle(lang_words)
# print(english_words)

print("current length", len(english_words), len(lang_words))
print("last word:::::::::: ", english_words[-10], lang_words[-10])

train_eng, test_eng = split_array_by_percent(
    english_words, split_percent)
train_lang, test_lang = split_array_by_percent(
    lang_words, split_percent)

print(len(train_eng), len(test_eng), len(train_lang), len(test_lang))

# train_dataset = Transliteration_Dataset(
#     src=train_eng, tgt=train_lang, src_vocab=src_vocab, tgt_vocab=tgt_vocab, padding=True, max_seq_length=MAX_LENGTH)
# test_dataset = Transliteration_Dataset(
#     src=test_eng, tgt=test_lang, src_vocab=src_vocab, tgt_vocab=tgt_vocab, padding=True, max_seq_length=MAX_LENGTH)

# creating
torch.manual_seed(0)
tokenizer_src = CustomTokenizer.from_pretrained("tokenizer_eng")
tokenizer_tgt = CustomTokenizer.from_pretrained("tokenizer_hin")
print(tokenizer_src.vocab_size, tokenizer_tgt.vocab_size)


MAX_LENGTH = 64  # max possible length of word to be entertained
EPOCHS = 30
batch_size = 32
learning_rate = 5e-4
acc_grad = 1
teacher_forcing, teach_force_till, teach_decay_pereph = .5, 20, 0
pretrained_wgt_path = None
split_percent = 70

SRC_VOCAB_SIZE = tokenizer_src.vocab_size
TGT_VOCAB_SIZE = tokenizer_tgt.vocab_size
EMB_SIZE = 512*2
NHEAD = 16
FFN_HID_DIM = 512*4

NUM_ENCODER_LAYERS = 12
NUM_DECODER_LAYERS = 12


train_dataset = TransliterationDataset(
    train_eng, train_lang, tokenizer_src, tokenizer_tgt, MAX_LENGTH)
val_dataset = TransliterationDataset(
    test_eng, test_lang, tokenizer_src, tokenizer_tgt, MAX_LENGTH)


def collate_fn(batch):
    src_batch, tgt_batch = zip(*batch)
    src_lens = [len(seq) for seq in src_batch]
    tgt_lens = [len(seq) for seq in tgt_batch]

    max_src_len = max(src_lens)
    max_tgt_len = max(tgt_lens)

    padded_src = torch.zeros((len(src_batch), max_src_len), dtype=torch.long)
    padded_tgt = torch.zeros((len(tgt_batch), max_tgt_len), dtype=torch.long)

    for i, (src_seq, tgt_seq) in enumerate(zip(src_batch, tgt_batch)):
        padded_src[i, :len(src_seq)] = torch.tensor(src_seq, dtype=torch.long)
        padded_tgt[i, :len(tgt_seq)] = torch.tensor(tgt_seq, dtype=torch.long)

    return padded_src, padded_tgt


train_dataloader = DataLoader(
    train_dataset, shuffle=True, batch_size=batch_size, num_workers=torch.cuda.device_count())
val_dataloader = DataLoader(val_dataset, shuffle=True,
                            batch_size=batch_size, num_workers=torch.cuda.device_count())


# print(next(iter(train_dataloader)))
del train_dataset
del val_dataset
del english_words
del lang_words
del train_lang
del test_lang
del train_eng
del test_eng
gc.collect()


# Hyperparameters and model setup


# transformer = Seq2SeqTransformer(NUM_ENCODER_LAYERS, NUM_DECODER_LAYERS, EMB_SIZE,
#                                  NHEAD, SRC_VOCAB_SIZE, TGT_VOCAB_SIZE, FFN_HID_DIM)

transformer= TransformerSeq2SeqModel(SRC_VOCAB_SIZE,TGT_VOCAB_SIZE,EMB_SIZE,16,12,12,MAX_LENGTH)

for p in transformer.parameters():
    if p.dim() > 1:
        nn.init.xavier_uniform_(p)

transformer = transformer.to(DEVICE)

loss_fn = torch.nn.CrossEntropyLoss(
    ignore_index=tokenizer_src._convert_token_to_id("<pad>"))

optimizer = torch.optim.Adam(
    transformer.parameters(), lr=0.00011e-4, betas=(0.9, 0.98), eps=1e-9)

# optimizer = AdamW(model.parameters(), lr=1e-4)
criterion = nn.CrossEntropyLoss(ignore_index=tokenizer_tgt.pad_token_id)


def train_epoch(model, optimizer, epoch, epochs):
    model.train()
    total_loss = 0
    for batch in tqdm(train_dataloader):
        input_ids = batch["input_ids"].to(device)
        labels = batch["labels"].to(device)

        # Shift the labels to create target input
        tgt_input = torch.cat([torch.full((labels.size(
            0), 1), tokenizer_tgt.pad_token_id, device=device), labels[:, :-1]], dim=-1)

        optimizer.zero_grad()
        outputs = model(input_ids, tgt_input)

        loss = criterion(outputs.view(-1, outputs.size(-1)), labels.view(-1))
        loss.backward()
        optimizer.step()

        total_loss += loss.item()

    print(
        f"Epoch {epoch + 1}/{epochs}, Loss: {total_loss / len(train_dataloader)}")


def evaluate(model):
    model.eval()
    total_loss = 0
    with torch.no_grad():
        for batch in tqdm(val_dataloader, desc="Evaluating"):
            input_ids = batch["input_ids"].to(device)
            labels = batch["labels"].to(device)

            # Shift the labels to create target input
            tgt_input = torch.cat([torch.full((labels.size(
                0), 1), tokenizer_tgt.pad_token_id, device=device), labels[:, :-1]], dim=-1)

            # Forward pass
            outputs = model(input_ids, tgt_input)

            # Compute loss
            loss = criterion(
                outputs.view(-1, outputs.size(-1)), labels.view(-1))
            total_loss += loss.item()

    average_loss = total_loss / len(val_dataloader)
    return average_loss

# Prepare validation dataset and dataloader
# Assuming `val_dataset` is your validation dataset


for epoch in range(1, EPOCHS+1):
    start_time = timer()
    train_loss = train_epoch(transformer, optimizer, epoch, EPOCHS)
    end_time = timer()
    val_loss = evaluate(transformer)
    print((f"Epoch: {epoch}, Train loss: {train_loss:.3f}, Val loss: {val_loss:.3f}, "f"Epoch time = {(end_time - start_time):.3f}s"))


# # function to generate output sequence using greedy algorithm
# def greedy_decode(model, src, src_mask, max_len, start_symbol):
#     src = src.to(DEVICE)
#     src_mask = src_mask.to(DEVICE)

#     memory = model.encode(src, src_mask)
#     ys = torch.ones(1, 1).fill_(start_symbol).type(torch.long).to(DEVICE)
#     for i in range(max_len-1):
#         memory = memory.to(DEVICE)
#         tgt_mask = (generate_square_subsequent_mask(ys.size(0))
#                     .type(torch.bool)).to(DEVICE)
#         out = model.decode(ys, memory, tgt_mask)
#         out = out.transpose(0, 1)
#         prob = model.generator(out[:, -1])
#         _, next_word = torch.max(prob, dim=1)
#         next_word = next_word.item()

#         ys = torch.cat([ys,
#                         torch.ones(1, 1).type_as(src.data).fill_(next_word)], dim=0)
#         if next_word == EOS_IDX:
#             break
#     return ys



def greedy_decode(model, tokenizer_src, tokenizer_tgt, src_text, max_len=32, start_symbol=None, eos_token_id=None):
    # Prepare input
    model.eval()
    with torch.no_grad():
        src = tokenizer_src(src_text, return_tensors="pt", padding="max_length", max_length=max_len).input_ids.to(device)
        src_mask = torch.zeros(src.size(1), src.size(1), device=device).type(torch.bool)

        # Encode source
        memory = model.embedding_src(src) + model.positional_encoding[:, :src.size(1), :]
        memory = model.transformer.encoder(memory.permute(1, 0, 2))

        # Initialize target with the start symbol
        if start_symbol is None:
            start_symbol = tokenizer_tgt.bos_token_id
        ys = torch.ones(1, 1).fill_(start_symbol).type(torch.long).to(device)

        for i in range(max_len - 1):
            tgt_mask = generate_square_subsequent_mask(ys.size(0)).type(torch.bool).to(device)
            tgt_embedded = model.embedding_tgt(ys) + model.positional_encoding[:, :ys.size(1), :]

            # Decode target
            output = model.transformer.decoder(tgt_embedded.permute(1, 0, 2), memory)
            output = model.fc_out(output.permute(1, 0, 2))
            prob = output[:, -1, :]
            _, next_word = torch.max(prob, dim=1)
            next_word = next_word.item()

            # Append the predicted token to the sequence
            ys = torch.cat([ys, torch.ones(1, 1).type_as(src.data).fill_(next_word)], dim=0)

            # Stop if end-of-sequence token is generated
            if next_word == eos_token_id:
                break

    return tokenizer_tgt.decode(ys.squeeze().tolist(), skip_special_tokens=True)

# Example usage




# actual function to translate input sentence into target language
# def translate(model: torch.nn.Module, src_sentence: str):
#     model.eval()
#     src = text_transform[SRC_LANGUAGE](src_sentence).view(-1, 1)
#     num_tokens = src.shape[0]
#     src_mask = (torch.zeros(num_tokens, num_tokens)).type(torch.bool)
#     tgt_tokens = greedy_decode(
#         model,  src, src_mask, max_len=num_tokens + 5, start_symbol=BOS_IDX).flatten()
#     return " ".join(vocab_transform[TGT_LANGUAGE].lookup_tokens(list(tgt_tokens.cpu().numpy()))).replace("<bos>", "").replace("<eos>", "")
