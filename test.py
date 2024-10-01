'''https://www.kaggle.com/code/alejopaullier/introduction-to-transformers'''

import torch
import torch.optim as optim
import torch.nn as nn
from torch.utils.data import DataLoader
import numpy as np
import random
import numpy as np
import pandas as pd
import os
import json
from transformers import PreTrainedTokenizer
import processedData
from tqdm import tqdm

language = "hin"

with open("vocab.json", 'r') as json_file:
    vocab = json.load(json_file)

with open("numerals.json", 'r') as json_file:
    numerals = json.load(json_file)


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
# print(english_lower_script)
# print(language_vocab)


class CustomTokenizer(PreTrainedTokenizer):
    def __init__(self, vocab, **kwargs):
        super().__init__(**kwargs)
        self.vocab = vocab
        self.ids_to_tokens = {i: tok for i, tok in enumerate(vocab)}
        self.tokens_to_ids = {tok: i for i, tok in enumerate(vocab)}

    def _tokenize(self, text):
        # Implement simple tokenization logic (e.g., split by character)
        return ["<s>"]+list(text)+["</s>"]

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


class MultiHeadAttention(nn.Module):
    def __init__(self, embed_size, heads):
        super(MultiHeadAttention, self).__init__()
        """
        MultiHeadAttention mechanism. The input of the MultiHeadAttention mechanism is an embedding (or sequence of embeddings).
        The embeddings are split into different parts and each part is fed into a head.
        :param embed_size: the size of the embedding.
        :param heads: the number of heads you wish to create.
        """
        self.embed_size = embed_size  # 512 in Transformer
        self.heads = heads  # 8 in Transformer
        self.head_dim = embed_size // heads  # 64 in Transformer
        assert (
            self.head_dim * heads == embed_size
        ), "Embedding size needs to be divisible by heads"
        # === Project Embeddings into three vectors: Query, Key and Value ===
        # Note: some implementations do: nn.Linear(embed_size, head_dim). We won't do this. We will project it
        # on a space of size embed_size and then split it into N heads of head_dim shape.
        self.values = nn.Linear(embed_size, embed_size)
        self.keys = nn.Linear(embed_size, embed_size)
        self.queries = nn.Linear(embed_size, embed_size)
        self.fc_out = nn.Linear(embed_size, embed_size)

    def forward(self, values, keys, query, mask):
        # Values, Keys and Queries have size: (batch_size, sequence_len, embedding_size)
        # Get number of training examples/batch size.
        batch_size = query.shape[0]
        value_len, key_len, query_len = values.shape[1], keys.shape[1], query.shape[1]
        # === Pass through Linear Layer ===
        values = self.values(values)  # (batch_size, value_len, embed_size)
        keys = self.keys(keys)  # (batch_size, key_len, embed_size)
        queries = self.queries(query)  # (batch_size, query_len, embed_size)

        # Split the embedding into self.heads different pieces
        values = values.reshape(batch_size, value_len,
                                self.heads, self.head_dim)
        keys = keys.reshape(batch_size, key_len, self.heads, self.head_dim)
        queries = queries.reshape(
            batch_size, query_len, self.heads, self.head_dim)

        # Einsum does matrix mult. for query*keys for each training example
        # with every other training example, don't be confused by einsum
        # it's just how I like doing matrix multiplication & bmm

        energy = torch.einsum("nqhd,nkhd->nhqk", [queries, keys])
        # queries shape: (batch_size, query_len, heads, heads_dim),
        # keys shape: (batch_size, key_len, heads, heads_dim)
        # energy: (batch_size, heads, query_len, key_len)

        # Mask padded indices so their weights become 0
        if mask is not None:
            energy = energy.masked_fill(mask == 0, float("-1e20"))

        # Normalize energy values similarly to seq2seq + attention
        # so that they sum to 1. Also divide by scaling factor for
        # better stability
        attention = torch.softmax(energy / (self.embed_size ** (1 / 2)), dim=3)
        # attention shape: (batch_size, heads, query_len, key_len)
        # values shape: (batch_size, value_len, heads, heads_dim)
        # out after matrix multiply: (batch_size, query_len, heads, head_dim), then
        # we reshape and flatten the last two dimensions.
        out = torch.einsum("nhql,nlhd->nqhd", [attention, values]).reshape(
            batch_size, query_len, self.heads * self.head_dim
        )
        # Linear layer doesn't modify the shape, final shape will be
        # (batch_size, query_len, embed_size)
        out = self.fc_out(out)
        return out


class TransformerLayer(nn.Module):
    def __init__(self, embed_size, heads, dropout, forward_expansion=4):
        super(TransformerLayer, self).__init__()
        self.attention = MultiHeadAttention(embed_size, heads)
        self.norm1 = nn.LayerNorm(embed_size)
        self.norm2 = nn.LayerNorm(embed_size)
        self.feed_forward = nn.Sequential(
            nn.Linear(embed_size, forward_expansion * embed_size),
            nn.ReLU(),
            nn.Linear(forward_expansion * embed_size, embed_size),
        )
        self.dropout = nn.Dropout(dropout)

    def forward(self, value, key, query, mask):
        # Values, Keys and Queries have size: (batch_size, query_len, embedding_size)
        # attention shape: (batch_size, query_len, embedding_size)
        attention = self.attention(value, key, query, mask)
        # Add skip connection, run through normalization and finally dropout
        # x shape: (batch_size, query_len, embedding_size)
        x = self.dropout(self.norm1(attention + query))
        # forward shape: (batch_size, query_len, embedding_size)
        forward = self.feed_forward(x)
        # out shape: (batch_size, query_len, embedding_size)
        out = self.dropout(self.norm2(forward + x))
        return out


class Encoder(nn.Module):
    def __init__(self, src_vocab_size, embed_size, num_layers, heads,
                 device, forward_expansion, dropout, max_length):
        super(Encoder, self).__init__()
        self.embed_size = embed_size  # size of the input embedding
        self.device = device  # either "cuda" or "cpu"
        # Lookup table with an embedding for each word in the vocabulary
        self.word_embedding = nn.Embedding(src_vocab_size, embed_size)
        # Lookup table with a positional embedding for each word in the sequence
        self.position_embedding = nn.Embedding(max_length, embed_size)
        self.layers = nn.ModuleList(
            [
                TransformerLayer(
                    embed_size,
                    heads,
                    dropout=dropout,
                    forward_expansion=forward_expansion,
                )
                for _ in range(num_layers)
            ]
        )
        self.dropout = nn.Dropout(dropout)

    def forward(self, x, mask):
        """
        Forward pass.
        :param x: source sequence. Shape: (batch_size, source_sequence_len).
        :param mask: source mask is used when we need to pad the input.
        :return output: torch tensor of shape (batch_size, src_sequence_length, embedding_size)
        """
        batch_size, seq_length = x.shape
        # positions is an arange from (0,seq_len), e.g: torch.tensor([[0,1,2,...,N], [0,1,2,...,N], ..., [0,1,2,...,N]])
        positions = torch.arange(0, seq_length).expand(
            batch_size, seq_length).to(self.device)
        out = self.dropout((self.word_embedding(
            x) + self.position_embedding(positions)))
        # In the Encoder the query, key, value are all the same, in the
        # decoder this will change. This might look a bit odd in this case.
        for layer in self.layers:
            out = layer(out, out, out, mask)
        # output shape: torch.Size([batch_size, sequence_length, embedding_size])
        return out


class DecoderLayer(nn.Module):
    def __init__(self, embed_size, heads, forward_expansion, dropout, device):
        super(DecoderLayer, self).__init__()
        self.norm = nn.LayerNorm(embed_size)
        self.attention = MultiHeadAttention(embed_size, heads=heads)
        self.transformer_block = TransformerLayer(
            embed_size, heads, dropout, forward_expansion
        )
        self.dropout = nn.Dropout(dropout)

    def forward(self, x, value, key, src_mask, trg_mask):
        """
        :param x: target input. Shape: (batch_size, target_sequence_len, embedding_size)
        :param value: value extracted from encoder.
        :param key: key extracted from encoder.
        :param src_mask: source mask is used when we need to pad the input.
        :param trg_mask: target mask is used to pass one element of the target at a time.
        """

        attention = self.attention(x, x, x, trg_mask)
        query = self.dropout(self.norm(attention + x))
        out = self.transformer_block(value, key, query, src_mask)
        return out


class Decoder(nn.Module):
    def __init__(self, trg_vocab_size, embed_size, num_layers, heads, forward_expansion,
                 dropout, device, max_length):
        """
        :param trg_vocab_size: number of unique tokens in target vocabulary.
        :param embed_size: size of output embeddings.
        :param num_layers: number of DecoderLayers in the Decoder.
        :param heads: number of heads in the MultiAttentionHeads inside the DecoderLayer.
        :param forward_expansion: expansion factor in LinearLayer at the end of the TransformerLayer.
        :param dropout: dropout probability.
        :param device: either "cuda" or "cpu".
        :param max_length: maximum length of sequence.
        """
        super(Decoder, self).__init__()
        self.device = device
        # === For each token in target vocab there is a token embedding ===
        self.word_embedding = nn.Embedding(trg_vocab_size, embed_size)
        self.position_embedding = nn.Embedding(max_length, embed_size)
        self.layers = nn.ModuleList(
            [
                DecoderLayer(embed_size, heads,
                             forward_expansion, dropout, device)
                for _ in range(num_layers)
            ]
        )
        self.fc_out = nn.Linear(embed_size, trg_vocab_size)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x, enc_out, src_mask, trg_mask):
        """
        :param x: target sequence. Shape: (batch_size, target_sequence_len)
        :param enc_out: encoder output. Shape: (batch_size, src_sequence_length, embedding_size)
        :param src_mask: source mask.
        :param trg_mask: target mask.
        """
        batch_size, seq_length = x.shape  # x shape: (batch_size, target_sequence_len)
        # positions is an arange from (0,seq_len), e.g: torch.tensor([[0,1,2,...,N], [0,1,2,...,N], ..., [0,1,2,...,N]])
        positions = torch.arange(0, seq_length).expand(batch_size, seq_length).to(
            self.device)  # positions shape: (batch_size, target_sequence_len)
        x = self.dropout((self.word_embedding(
            x) + self.position_embedding(positions)))

        for layer in self.layers:
            x = layer(x, enc_out, enc_out, src_mask, trg_mask)

        out = self.fc_out(x)
        return out


class Transformer(nn.Module):
    def __init__(self, src_vocab_size, trg_vocab_size, src_pad_idx, trg_pad_idx, embed_size,
                 num_encoder_layers, num_decoder_layers,  heads, dropout, device, max_length, forward_expansion=4):

        super(Transformer, self).__init__()
        # === Encoder ===
        self.encoder = Encoder(src_vocab_size, embed_size, num_encoder_layers,
                               heads, device, forward_expansion, dropout, max_length)
        # === Decoder ===
        self.decoder = Decoder(trg_vocab_size, embed_size, num_decoder_layers,
                               heads, forward_expansion, dropout, device, max_length)
        self.src_pad_idx = src_pad_idx
        self.trg_pad_idx = trg_pad_idx
        self.device = device

    def make_src_mask(self, src):
        src_mask = (src != self.src_pad_idx).unsqueeze(1).unsqueeze(2)
        # (N, 1, 1, src_len)
        return src_mask.to(self.device)

    def make_trg_mask(self, trg):
        """
        Returns a lower triangular matrix filled with 1s. The shape of the mask is (target_size, target_size).
        Example: for a target of shape (batch_size=1, target_size=4)
        tensor([[[[1., 0., 0., 0.],
                  [1., 1., 0., 0.],
                  [1., 1., 1., 0.],
                  [1., 1., 1., 1.]]]])
        """
        N, trg_len = trg.shape
        trg_mask = torch.tril(torch.ones((trg_len, trg_len))).expand(
            N, 1, trg_len, trg_len
        )
        return trg_mask.to(self.device)

    def forward(self, src, trg):
        src_mask = self.make_src_mask(src)  # src_mask shape:
        trg_mask = self.make_trg_mask(trg)  # trg_mask shape:
        # print(src, trg)
        # print(src_mask, trg_mask)

        enc_src = self.encoder(src, src_mask)  # enc_src shape:
        out = self.decoder(trg, enc_src, src_mask, trg_mask)  # out shape:
        return out


# # Function to compute accuracy
# def accuracy_fn(predictions, targets):
#     # print(predictions,targets,sep="\t")
#     pred_tokens = predictions.argmax(dim=2)  # Get predicted token indices
#     # Ignore padding tokens
#     non_pad_elements = (targets != trg_pad_idx).nonzero(as_tuple=True)

#     print(pred_tokens.shape)
#     print(targets.shape)
#     print(non_pad_elements.shape)


#     correct = pred_tokens[non_pad_elements].eq(targets[non_pad_elements]).sum()
#     total = non_pad_elements.shape[0]
#     return correct / total

def accuracy_fn(predictions, targets, trg_pad_idx=1):
    pred_tokens = predictions.argmax(dim=2)  # Get predicted token indices

    # Ignore padding tokens
    non_pad_elements = (targets != trg_pad_idx).nonzero(as_tuple=True)

    if len(non_pad_elements[0]) == 0:
        return torch.tensor(0.0),  # No valid tokens to calculate accuracy

    # Print shapes for debugging
    # print(pred_tokens.shape)
    # print(targets.shape)
    # print(non_pad_elements)
    # print(non_pad_elements[0].shape)  # Shape of the tensor containing the indices

    # Use the indices to select elements from pred_tokens and targets
    correct = pred_tokens[non_pad_elements].eq(
        targets[non_pad_elements]).sum().float()
    total = len(non_pad_elements[0])  # Total number of non-padding tokens

    # print(total)

    return correct / total,


# def accuracy_score(pred_tnsr, tgt_tnsr, glyph_obj):
#     '''Simple accuracy calculation for char2char seq TRAINING phase
#     pred_tnsr: torch tensor :shp: (batch, voc_size, seq_len)
#     tgt_tnsr: torch tensor :shp: (batch, seq_len)
#     '''
#     pred_seq = torch.argmax(pred_tnsr, dim=2)
#     batch_sz = pred_seq.shape[0]
#     crt_cnt = 0
#     for i in range(batch_sz):
#         pred = glyph_obj.xlitvec2word(pred_seq[i, :].cpu().numpy())
#         tgt = glyph_obj.xlitvec2word(tgt_tnsr[i, :].cpu().numpy())
#         if pred == tgt:
#             crt_cnt += 1
#     return torch.tensor(crt_cnt/batch_sz)

# Training loop


# def train_model(model, train_loader, val_loader, src_pad_idx, trg_pad_idx, epochs=20, lr=0.0005, clip=1,
#                 teacher_forcing_ratio=0.5, patience=5, save_path="best_model.pth"):
#     optimizer = optim.Adam(model.parameters(), lr=lr)
#     # Ignore padding index in loss computation
#     criterion = nn.CrossEntropyLoss(ignore_index=trg_pad_idx)
#     scheduler = optim.lr_scheduler.ReduceLROnPlateau(
#         optimizer, mode='max', patience=3, factor=0.5, verbose=True)

#     best_val_acc = 0
#     early_stopping_counter = 0

#     for epoch in range(epochs):
#         print(f"Epoch {epoch+1}/{epochs}")

#         # Training phase
#         model.train()
#         train_loss = 0
#         train_acc = 0
#         for batch_idx, (src, trg) in enumerate(train_loader):
#             src, trg = src.to(model.device), trg.to(model.device)
#             print(src.shape, trg.shape)
#             optimizer.zero_grad()

#             # Teacher forcing
#             trg_input = trg[:, :-1]  # Remove <eos> token from target input
#             # Offset target by 1 (for predicting the next token)
#             trg_output = trg[:, 1:]

#             output = model(src, trg_input)  # Model's output
#             print({"src": src,
#              "tgt": trg, "trg_input" : trg_input, "tgr_output": trg_output, "output": output})
#             # Compute loss
#             # Flatten the output for loss calculation
#             output = output.view(-1, output.shape[-1])
#             # Flatten the target for loss calculation
#             trg_output = trg_output.view(-1)
#             loss = criterion(output, trg_output)
#             loss.backward()

#             # Gradient clipping
#             torch.nn.utils.clip_grad_norm_(model.parameters(), clip)

#             optimizer.step()

#             # Compute accuracy for the batch
#             with torch.no_grad():
#                 predictions = model(src, trg_input)
#                 acc = accuracy_fn(predictions, trg[:, 1:])

#             train_loss += loss.item()
#             train_acc += acc.item()

#         train_loss /= len(train_loader)
#         train_acc /= len(train_loader)

#         # Validation phase
#         val_loss = 0
#         val_acc = 0
#         model.eval()
#         with torch.no_grad():
#             for batch_idx, (src, trg) in enumerate(val_loader):
#                 src, trg = src.to(model.device), trg.to(model.device)

#                 trg_input = trg[:, :-1]
#                 trg_output = trg[:, 1:]

#                 output = model(src, trg_input)

#                 # Compute validation loss
#                 output = output.view(-1, output.shape[-1])
#                 trg_output = trg_output.view(-1)
#                 loss = criterion(output, trg_output)

#                 # Compute validation accuracy
#                 predictions = model(src, trg_input)
#                 acc = accuracy_fn(predictions, trg[:, 1:])

#                 val_loss += loss.item()
#                 val_acc += acc.item()

#         val_loss /= len(val_loader)
#         val_acc /= len(val_loader)

#         # Print metrics
#         print(
#             f"Training Loss: {train_loss:.4f}, Training Accuracy: {train_acc:.4f}")
#         print(
#             f"Validation Loss: {val_loss:.4f}, Validation Accuracy: {val_acc:.4f}")

#         # Scheduler step
#         scheduler.step(val_acc)

#         # Early stopping and model saving based on accuracy
#         if val_acc > best_val_acc:
#             best_val_acc = val_acc
#             early_stopping_counter = 0
#             torch.save(model.state_dict(), save_path)
#             print(
#                 f"Best model saved with Validation Accuracy: {best_val_acc:.4f}")
#         else:
#             early_stopping_counter += 1

#         if early_stopping_counter >= patience:
#             print(f"Early stopping at epoch {epoch+1}")
#             break

#     print("Training complete.")

def train_model(
    model, train_loader, val_loader, src_pad_idx, trg_pad_idx,
    epochs=20, lr=0.0005, clip=1, teacher_forcing_ratio=0.5, patience=5,
    device="cpu",save_path="best_model.pth"
):
    optimizer = optim.Adam(model.parameters(), lr=lr)
    criterion = nn.CrossEntropyLoss(ignore_index=trg_pad_idx)
    scheduler = optim.lr_scheduler.ReduceLROnPlateau(
        optimizer, mode='max', patience=3, factor=0.5, verbose=True)

    best_val_acc = 0
    early_stopping_counter = 0

    for epoch in tqdm(range(epochs)):
        print(f"\nEpoch {epoch+1}/{epochs}")

        # Training phase
        model.train()
        train_loss, train_acc = 0, 0

        for batch_idx, (src, trg) in enumerate(tqdm(train_loader)):
            # print(src, trg)
            src, trg = src.to(device), trg.to(device)
            optimizer.zero_grad()
            # print(src.shape,src,sep="\n")
            # print(trg.shape,trg,sep="\n")

            # Prepare inputs and targets for training
            # print(src,trg,sep="\t")
            trg_input = trg[:, :-1]  # Remove <eos> from the target input
            trg_output = trg[:, 1:]  # Offset target for prediction
            # print(trg_input,trg_output)
            # print(trg_input.shape,trg_output.shape)

            # Forward pass
            output = model(src, trg_input)
            # print("output size:::::::::",output.shape)
            # Reshape for loss computation
            output_flat = output.view(-1, output.shape[-1])
            # trg_output_flat = trg_output.view(-1)
            trg_output_flat = trg_output.reshape(-1)

            # print("output flat:::::::: ",output_flat.shape," tgt_flat::::::  ",trg_output_flat.shape)
            # Calculate loss and perform backpropagation
            loss = criterion(output_flat, trg_output_flat)
            # print("loss :::::::: ",loss)
            loss.backward()

            # Gradient clipping
            torch.nn.utils.clip_grad_norm_(model.parameters(), clip)
            optimizer.step()

            # Compute accuracy for the current batch
            with torch.no_grad():
                predictions = model(src, trg_input)
                acc = accuracy_fn(predictions, trg[:, 1:])
                # print(acc)
                # print("accuracy ::::: ", acc)

            # Accumulate loss and accuracy
            train_loss += loss.item()
            train_acc += acc[0].item()

        # Average metrics for the epoch
        train_loss /= len(train_loader)
        train_acc /= len(train_loader)

        # Validation phase
        model.eval()
        val_loss, val_acc = 0, 0
        with torch.no_grad():
            for batch_idx, (src, trg) in enumerate(tqdm(val_loader)):
                src, trg = src.to(device), trg.to(device)

                trg_input = trg[:, :-1]
                trg_output = trg[:, 1:]

                output = model(src, trg_input)

                # Reshape for loss computation
                output_flat = output.view(-1, output.shape[-1])
                trg_output_flat = trg_output.reshape(-1)

                # Calculate validation loss
                val_loss += criterion(output_flat, trg_output_flat).item()

                # Compute validation accuracy
                predictions = model(src, trg_input)
                val_acc += accuracy_fn(predictions, trg[:, 1:])[0].item()

        val_loss /= len(val_loader)
        val_acc /= len(val_loader)

        # Print metrics for current epoch
        print(
            f"Training Loss: {train_loss:.4f} | Training Accuracy: {train_acc:.4f}")
        print(
            f"Validation Loss: {val_loss:.4f} | Validation Accuracy: {val_acc:.4f}")

        # Update learning rate scheduler
        scheduler.step(val_acc)

        # Save the best model based on validation accuracy
        if val_acc > best_val_acc:
            best_val_acc = val_acc
            early_stopping_counter = 0
            torch.save(model.module.state_dict(), save_path)
            print(
                f"Best model saved with Validation Accuracy: {best_val_acc:.4f}")
        else:
            early_stopping_counter += 1

        # Check for early stopping
        if early_stopping_counter >= patience:
            print(
                f"Early stopping at epoch {epoch+1}. Best validation accuracy: {best_val_acc:.4f}")
            break

    print("Training complete.")


if __name__ == "__main__":
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    MAX_LENGTH = 64
    num_encoder_layers = 6
    num_decoder_layers = 6
    num_of_heads = 8
    embedding_size = MAX_LENGTH
    dropout = 0.3
    batch_size = 512*2
    split_percent = 80
    tokenizer_src = CustomTokenizer.from_pretrained("tokenizer_eng")
    tokenizer_tgt = CustomTokenizer.from_pretrained("tokenizer_hin")
    # index of the padding token in source vocabulary
    src_pad_idx = tokenizer_src._convert_token_to_id("<pad>")
    # index of the padding token in target vocabulary
    trg_pad_idx = tokenizer_tgt._convert_token_to_id("<pad>")
    # number of unique tokens in source vocabulary
    src_vocab_size = tokenizer_src.vocab_size
    # number of unique tokens in target vocabulary
    trg_vocab_size = tokenizer_tgt.vocab_size

    print(src_vocab_size, trg_vocab_size)
    model = Transformer(src_vocab_size=src_vocab_size, trg_vocab_size=trg_vocab_size, src_pad_idx=src_pad_idx, trg_pad_idx=trg_pad_idx, embed_size=embedding_size,
                        num_encoder_layers=num_encoder_layers, num_decoder_layers=num_decoder_layers, forward_expansion=4, heads=num_of_heads, dropout=dropout, device=device, max_length=MAX_LENGTH).to(device)
    if torch.cuda.device_count() > 1:
        print("Using", torch.cuda.device_count(), "GPUs!")
        model = torch.nn.DataParallel(model)
    model = model.to(device)
    train_loader, val_loader = processedData.preprocessData(
        language, tokenizer_src, tokenizer_tgt, batch_size, MAX_LENGTH, split_percent)
    # print(train_loader, val_loader)
    train_model(model, train_loader, val_loader, src_pad_idx,
                trg_pad_idx, epochs=50, teacher_forcing_ratio=0.5,device=device)
