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


device = "cuda" if torch.cuda.is_available() else "cpu"
# device="cpu"
current_date = datetime.now().date()
print("::: Current Date ::: ", current_date)
INST_NAME = f"Training_{current_date.strftime('%d-%m-%Y')}_eng-dev-updated"
LOG_PATH = os.path.join(INST_NAME+"/")
WGT_PREFIX = os.path.join(LOG_PATH, "weights", INST_NAME)
if not os.path.exists(LOG_PATH+"weights"):
    os.makedirs(os.path.join(LOG_PATH,"weights"))

MAX_LENGTH = 256  # max possible length of word to be entertained
num_epochs = 20
batch_size = 512
learning_rate = 5e-4

acc_grad = 1
teacher_forcing, teach_force_till, teach_decay_pereph = 1, 20, 0
pretrained_wgt_path = None
split_percent = 70


indoarab_num = [chr(alpha) for alpha in range(48, 58)]
english_lower_script = [chr(alpha)
                        for alpha in range(97, 123)] + ['é', 'è', 'á']
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


# class to build vocubalory on defined language
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
            for char in list(word):
                vec.append(self.char2idx[char])
            vec.append(self.char2idx[self.EOS_token])
            vec = np.asarray(vec, dtype=np.int64)
            return vec

        except Exception as error:
            print("[ERROR] in word : ", word,
                  " Error token not in Vocabulary:", error)
            sys.exit()

    def xlitvec2word(self, vector):
        char_list = []
        for i in vector:
            if i != (self.char2idx[self.EOS_token] or self.char2idx[self.SOS_token] or self.char2idx[self.PAD_token] or self.char2idx[self.MASK_token]):
                char_list.append(self.idx2char[i])
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
        
        self.padding=padding
        if max_seq_length:
            self.max_tgt_size = max_seq_length
            self.max_src_size = max_seq_length
        else:
            self.max_src_size = max(len(t) for t in self.src)
            self.max_tgt_size = max(len(t) for t in self.tgt)
      

    def __len__(self):
        return len(self.src)

    def __getitem__(self, index):
        x_sz = len(self.src[index])
        y_sz = len(self.src[index])

        if self.padding:
            x = self._pad_sequence(self.src[index], self.max_src_size)
            y = self._pad_sequence(self.tgt[index], self.max_tgt_size)
        else:
            x = self.src[index]
            y = self.tgt[index]
        return x,y,x_sz    

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


class Encoder(nn.Module):

    def __init__(self, input_dim, embedding_dim, hidden_dim, rnn_type="gru", layers=1, bidirectional=True, dropout=0, device="cpu"):
        super(Encoder, self).__init__()
        self.input_dim = input_dim
        self.encoder_embedding_dim = embedding_dim
        self.encoder_hidden_dim = hidden_dim
        self.encoder_rnn_type = rnn_type
        self.encoder_layers = layers
        self.encoder_direction = 2 if bidirectional else 1
        self.device = device

        # layers
        self.embedding = nn.Embedding(
            self.input_dim, self.encoder_embedding_dim, padding_idx=0)

        if self.encoder_rnn_type == "gru":
            self.encoder_rnn = nn.GRU(input_size=self.encoder_embedding_dim, hidden_size=self.encoder_hidden_dim,
                                      num_layers=self.encoder_layers, bidirectional=bidirectional)
        elif self.encoder_rnn_type == "lstm":
            self.encoder_rnn = nn.LSTM(input_size=self.encoder_embedding_dim, hidden_size=self.encoder_hidden_dim,
                                       num_layers=self.encoder_layers, bidirectional=bidirectional)
        else:
            raise Exception("unknown RNN type mentioned")
        self.encoder_rnn.flatten_parameters()

    def forward(self, x: torch.Tensor, x_sz: torch.Tensor, hidden=None):
        batch_sz = x.shape[0]
        x = self.embedding(x)
        # putting size to cpu
        x_sz = x_sz.cpu()
        x = x.permute(1, 0, 2)
        x = nn.utils.rnn.pack_padded_sequence(x, x_sz, enforce_sorted=False)
        output, hidden = self.encoder_rnn(x)
        output, _ = nn.utils.rnn.pad_packed_sequence(output)
        output = output.permute(1, 0, 2)
        return output, hidden


class Decoder(nn.Module):
    def __init__(self, output_dim, decoder_embedding_dim, hidden_dim, rnn_type="gru", layers=1, use_attention=True, encoder_outstate_dim=None, dropout=0, device="cpu"):
        super(Decoder, self).__init__()
        self.output_dim = output_dim
        self.decoder_embedding_dim = decoder_embedding_dim
        self.decoder_hidden_dim = hidden_dim
        self.decoder_rnn_type = rnn_type
        self.decoder_layers = layers
        self.use_attention = use_attention
        self.device = device
        if self.use_attention:
            self.encoder_outstate_dim = encoder_outstate_dim if encoder_outstate_dim else None
        else:
            self.encoder_outstate_dim = 0

        # layers
        self.embedding = nn.Embedding(
            self.output_dim, self.decoder_embedding_dim)

        if self.decoder_rnn_type == 'gru':
            self.decoder_rnn = nn.GRU(input_size=self.decoder_embedding_dim + self.encoder_outstate_dim,  # to concat attention_output
                                      hidden_size=self.decoder_hidden_dim,  # previous Hidden
                                      num_layers=self.decoder_layers,
                                      batch_first=True)
        elif self.decoder_rnn_type == "lstm":
            self.decoder_rnn = nn.LSTM(input_size=self.decoder_embedding_dim + self.encoder_outstate_dim,  # to concat attention_output
                                       hidden_size=self.decoder_hidden_dim,  # previous Hidden
                                       num_layers=self.decoder_layers,
                                       batch_first=True)
        else:
            raise Exception("unknown RNN type mentioned")
        self.decoder_rnn.flatten_parameters()

        self.fc = nn.Sequential(
            nn.Linear(self.decoder_hidden_dim,self.decoder_embedding_dim), nn.LeakyReLU(),
            nn.Linear(self.decoder_embedding_dim, self.output_dim)
        )

        if self.use_attention:
            self.W1 = nn.Linear(self.encoder_outstate_dim,
                                self.decoder_hidden_dim)
            self.W2 = nn.Linear(self.decoder_hidden_dim,
                                self.decoder_hidden_dim)
            self.V = nn.Linear(self.decoder_hidden_dim, 1)

    def attention(self, x, hidden, encoder_output):

        hidden_with_time_axis = torch.sum(hidden, axis=0)
        hidden_with_time_axis = hidden_with_time_axis.unsqueeze(1)

        score = torch.tanh(self.W1(encoder_output) +
                           self.W2(hidden_with_time_axis))

        attention_weights = torch.softmax(self.V(score), dim=1)

        context_vector = attention_weights * encoder_output
        context_vector = torch.sum(context_vector, dim=1)
        context_vector = context_vector.unsqueeze(1)

        attention_out = torch.cat((context_vector, x), -1)
        return attention_out, attention_weights

    def forward(self, x, hidden, encoder_output):
        if (hidden is None) and (self.use_attention is False):
            raise Exception("no use of decoder without attention layer")

        batch_sz = x.shape[0]
        if hidden is None:
            hidden_for_attention = torch.zeros(
                (self.decoder_layers, batch_sz, self.decoder_hidden_dim)).to(self.device)
        elif self.decoder_rnn_type == "lstm":
            hidden_for_attention = hidden[0]
        else:
            hidden_for_attention = hidden

        x = self.embedding(x)

        if self.use_attention:
            x, aw = self.attention(x, hidden_for_attention, encoder_output)
        else:
            x, aw = x, 0

        output, hidden = self.decoder_rnn(
            x, hidden) if hidden is not None else self.decoder_rnn(x)
        output = output.view(-1, output.size(2))
        output = self.fc(output)

        return output, hidden, aw


class Seq2seq(nn.Module):
    def __init__(self, encoder, decoder, pass_encoder2decoder_hidden=False, dropout=0, device="cpu"):
        super(Seq2seq,self).__init__()
        self.encoder = encoder
        self.decoder = decoder
        self.device = device
        self.pass_encoder2decoder_hidden = pass_encoder2decoder_hidden
        if self.pass_encoder2decoder_hidden:
            assert self.decoder.decoder_hidden_dim == self.encoder.encoder_hidden_dim, "Hidden Dimension of encoder and decoder must be same, or unset `pass_enc2dec_hid`"
        if self.decoder.use_attention:
            assert self.decoder.encoder_outstate_dim == self.encoder.encoder_direction* encoder.encoder_hidden_dim ,"Set `enc_out_dim` correctly in decoder"
        assert self.pass_encoder2decoder_hidden or self.decoder.use_attention

    
    __constants__=["device","pass_encoder2decoder_hidden","dropout"]
    def forward(self, src: torch.tensor, tgt: torch.tensor, src_sz: torch.tensor, teacher_forcing_ratio: float = 0):

        batch_size = tgt.shape[0]
        

        encoder_output, encoder_hidden = self.encoder(src, src_sz)

        if self.pass_encoder2decoder_hidden:
            decoder_hidden = encoder_hidden
        else:
            decoder_hidden = None

        prediction_vectors = torch.zeros(
            batch_size, self.decoder.output_dim, tgt.size(1)).to(self.device)

        decoder_input = tgt[:, 0].unsqueeze(1).to(self.device)

        prediction_vectors[:, 1, 0] = 1

        for t in range(tgt.size(1)):

            decoder_output, decoder_hidden, _ = self.decoder(
                decoder_input, decoder_hidden, encoder_output)
            prediction_vectors[:, :, t] = decoder_output

            prediction = torch.argmax(decoder_output, dim=1)

            if random.random() < teacher_forcing_ratio:
                decoder_input = tgt[:, t].unsqueeze(1)
            else:
                decoder_input = prediction.unsqueeze(1)

        return prediction_vectors


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

    pretrain_dict = torch.load(weight_path)
    model_dict = model.state_dict()
    if flexible:
        pretrain_dict = {k: v for k,
                         v in pretrain_dict.items() if k in model_dict}
    print("Pretrained layers:", pretrain_dict.keys())
    model_dict.update(pretrain_dict)
    model.load_state_dict(model_dict)

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

src_vocab = Vocabulary(english_lower_script)
tgt_vocab = Vocabulary(devanagari_script)

# creating dataset
# devanagari_languages = ["hin", "mai", "brx", "mar", "kok",  "nep", "san"]
devanagari_languages = ["hin"]

english_words = []
dev_words = []


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
        dev_words.extend(list(train_dataset["native word"]))
        dev_words.extend(list(val_dataset["native word"]))
        dev_words.extend(list(test_dataset["native word"]))

        del train_dataset
        del test_dataset
        del val_dataset
        gc.collect()
        print("current length", len(english_words), len(dev_words))
        print("last word:::::::::: ", english_words[len(
            english_words)-1], dev_words[len(dev_words)-1])
    except Exception as e:
        print(f"An error occurred {lang} : {e}")
        # Continue to the next iteration

        continue


train_eng, test_eng = split_array_by_percent(english_words, split_percent)
train_dev, test_dev = split_array_by_percent(dev_words, split_percent)


train_dataset = Transliteration_Dataset(
    src=train_eng, tgt=train_dev, src_vocab=src_vocab, tgt_vocab=tgt_vocab, padding=True, max_seq_length=MAX_LENGTH)
test_dataset = Transliteration_Dataset(
    src=test_eng, tgt=test_dev, src_vocab=src_vocab, tgt_vocab=tgt_vocab, padding=True, max_seq_length=MAX_LENGTH)

# creating Dataloaders

train_dataloader = DataLoader(
    train_dataset, shuffle=True, batch_size=batch_size,num_workers=torch.cuda.device_count())
val_dataloader = DataLoader(test_dataset, shuffle=True, batch_size=batch_size,num_workers=torch.cuda.device_count())

del train_dataset
del test_dataset
del english_words
del dev_words
gc.collect()

# model params

input_dim = src_vocab.size()
output_dim = tgt_vocab.size()
encoder_emb_dim = MAX_LENGTH
decoder_emb_dim = MAX_LENGTH
encoder_hidden_dim = MAX_LENGTH*2
decoder_hidden_dim = MAX_LENGTH*2
rnn_type = "lstm"
encoder2decoder_hidden = True
use_attention = True
encoder_layers = 2
decoder_layers = 4
m_dropout = 0
encoder_bidirectional = True
encoder_outstate_dim = encoder_hidden_dim * (2 if encoder_bidirectional else 1)


encoder = Encoder(input_dim=input_dim,embedding_dim=encoder_emb_dim,hidden_dim=encoder_hidden_dim,rnn_type=rnn_type,layers=encoder_layers,bidirectional=encoder_bidirectional,dropout=m_dropout,device=device)
decoder = Decoder(output_dim=output_dim,decoder_embedding_dim=decoder_emb_dim,hidden_dim=decoder_hidden_dim,rnn_type=rnn_type,layers=decoder_layers,use_attention=use_attention,encoder_outstate_dim=encoder_outstate_dim,device=device)
model = Seq2seq(encoder=encoder,decoder=decoder,pass_encoder2decoder_hidden=encoder2decoder_hidden,device=device)


if torch.cuda.device_count() > 1:
    print("Using", torch.cuda.device_count(), "GPUs for training.")
    model = nn.DataParallel(model)

# Move the model to GPU(s)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
print(vars(model))
# ----- Load Embeds -----
# For Loading charecter embedding from pretrained fasttext model

# hi_emb_vecs = np.load("hi_char_fasttext.npy")
# model.decoder.embedding.weight.data.copy_(torch.from_numpy(hi_emb_vecs))

# en_emb_vecs = np.load("en_char_fasttext.npy")
# model.encoder.embedding.weight.data.copy_(torch.from_numpy(en_emb_vecs))


criterion = torch.nn.CrossEntropyLoss()
# weight = torch.from_numpy(train_dataset.tgt_class_weights).to(device)  )  ## For class balancing during training


def loss_estimator(pred, truth):
    """ Only consider non-zero inputs in the loss; mask needed
    pred: batch
    """
    mask = truth.ge(1).type(torch.FloatTensor).to(device)
    loss_ = criterion(pred, truth) * mask
    return torch.mean(loss_)


optimizer = torch.optim.AdamW(model.parameters(), lr=learning_rate,)

scheduler = torch.optim.lr_scheduler.StepLR(optimizer, step_size=10, gamma=0.1)

best_loss = float("inf")
best_accuracy = 0
early_stopping_counter = 0
patience = 2


for epoch in tqdm(range(num_epochs)):

    # -------- Training -------------------
    model.train()
    acc_loss = 0
    running_loss = []
    if epoch >= teach_force_till:
        teacher_forcing = 0
    else:
        teacher_forcing = max(0, teacher_forcing - teach_decay_pereph)

    for ith, (src, tgt, src_sz) in enumerate(train_dataloader):

        src = src.to(device)
        tgt = tgt.to(device)

        # --- forward ------
        output = model(src=src, tgt=tgt, src_sz=src_sz,
                       teacher_forcing_ratio=teacher_forcing)
        loss = loss_estimator(output, tgt) / acc_grad
        acc_loss += loss

        # --- backward ------
        loss.backward()
        if ((ith+1) % acc_grad == 0):
            optimizer.step()
            optimizer.zero_grad()

            # print('epoch[{}/{}], MiniBatch-{} loss:{:.4f}'.format(epoch+1, num_epochs, (ith+1)//acc_grad, acc_loss.data))
            running_loss.append(acc_loss.item())
            acc_loss = 0
            # break

    # LOG2CSV(running_loss, LOG_PATH+"trainLoss.csv")

    # --------- Validate ---------------------
    model.eval()
    val_loss = 0
    val_accuracy = 0
    for jth, (v_src, v_tgt, v_src_sz) in enumerate(tqdm(val_dataloader)):
        v_src = v_src.to(device)
        v_tgt = v_tgt.to(device)
        with torch.no_grad():
            v_output = model(src=v_src, tgt=v_tgt, src_sz=v_src_sz)
            val_loss += loss_estimator(v_output, v_tgt)

            # in Utils section
            val_accuracy += accuracy_score(v_output, v_tgt, tgt_vocab)
        # break
    val_loss = val_loss / len(val_dataloader)
    val_accuracy = val_accuracy / len(val_dataloader)

    print('epoch[{}/{}], [-----TEST------] loss:{:.4f}  Accur:{:.4f}'
          .format(epoch+1, num_epochs, val_loss.data, val_accuracy.data))
    LOG2CSV([val_loss.item(), val_accuracy.item()],
            LOG_PATH+"valLoss.csv")

    # -------- save Checkpoint -------------------
    if val_accuracy > best_accuracy:
        # if val_loss < best_loss:
        print("***saving best optimal state [Loss:{} Accur:{}] ***".format(
            val_loss.data, val_accuracy.data))
        best_loss = val_loss
        best_accuracy = val_accuracy
        torch.save(model.state_dict(), WGT_PREFIX+"_model.pth")
        LOG2CSV([epoch+1, val_loss.item(), val_accuracy.item()],
                LOG_PATH+"bestCheckpoint.csv")

    # Early stopping
    if val_loss < best_loss:
        best_loss = val_loss
        best_accuracy = val_accuracy
        early_stopping_counter = 0
        torch.save(model.state_dict(), WGT_PREFIX+"_model.pth")
    else:
        early_stopping_counter += 1
        if early_stopping_counter >= patience:
            print("Early stopping triggered at epoch", epoch+1)
            break
    
    # LR step
    scheduler.step()


def save_to_json(path, data_dict):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data_dict, f, ensure_ascii=False, indent=4, sort_keys=True,)


def toggle_json(read_path, save_prefix=""):
    with open(read_path, 'r', encoding="utf-8") as f:
        data = json.load(f)

    tog_dict = dict()
    for d in data.keys():
        for v in data[d]:
            tog_dict[v] = set()

    for d in data.keys():
        for v in data[d]:
            tog_dict[v].add(d)

    for t in tog_dict.keys():
        tog_dict[t] = list(tog_dict[t])

    save_file = save_prefix+"/Toggled-" + os.path.basename(read_path)
    with open(save_file, "w", encoding="utf-8") as f:
        json.dump(tog_dict, f, ensure_ascii=False, indent=4, sort_keys=True,)

    return save_file


def get_from_json(path, ret_data="key"):
    with open(path, 'r', encoding="utf-8") as f:
        data = json.load(f)

    if ret_data == "key":
        out = list(data.keys())
    elif ret_data == "value":
        temp = data.values()
        temp = {i for t in temp for i in t}
        out = list(temp)
    elif ret_data == "both":
        out = []
        for k in data.keys():
            for v in data[k]:
                out.append([k, v])
    return sorted(out)


# class VocabSanitizer():
#     '''
#     Sanitize topK vocab prediction using ancillary vocab list
#     by reranking or removing etc
#     '''

#     def __init__(self, data_file):
#         '''
#         data_file: path to file conatining vocabulary list
#         '''
#         extension = os.path.splitext(data_file)[-1]
#         if extension == ".json":
#             self.vocab_set = set(json.load(open(data_file)))
#         elif extension == ".csv":
#             self.vocab_df = pd.read_csv(data_file).set_index('WORD')
#             self.vocab_set = set(self.vocab_df.index)
#         else:
#             print("Only Json/CSV file extension supported")

#     def remove_astray(self, word_list):
#         '''Remove words that are not present in vocabulary
#         '''
#         new_list = []
#         for v in word_list:
#             if v in self.vocab_set:
#                 new_list.append(v)
#         if new_list == []:
#             return word_list.copy()
#             # return [" "]
#         return new_list

#     def reposition(self, word_list):
#         '''Reorder Words in list
#         '''
#         new_list = []
#         temp_ = word_list.copy()
#         for v in word_list:
#             if v in self.vocab_set:
#                 new_list.append(v)
#                 temp_.remove(v)
#         new_list.extend(temp_)

#         return new_list


def inferencer(word, topk=10):
    in_vec = torch.from_numpy(src_vocab.word2xlitvec(word)).to(device)
    # change to active or passive beam
    p_out_list = model.to(device).active_beam_inference(
        in_vec, beam_width=topk)
    p_result = [tgt_vocab.xlitvec2word(out.cpu().numpy())
                for out in p_out_list]

    result = p_result
    # result = voc_sanitize.reposition(p_result) ## Uncomment for repositioning

    return result


def inference_looper(in_words, topk=3):
    out_dict = {}
    for i in tqdm(in_words):
        out_dict[i] = inferencer(i, topk=topk)
    return out_dict

print(inferencer("shayad",topk=5))

