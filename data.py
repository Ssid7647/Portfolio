from torch import Tensor
import torch
import torch.nn as nn
from torch.nn import Transformer
import math
import torch.optim as optim
from torch.optim.lr_scheduler import ReduceLROnPlateau
import sys
import os
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
import json


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

        # src_tokenized = self.tokenizer_src.encode(
        #     src_text, padding="max_length", max_length=self.max_len, truncation=True, return_tensors="pt")
        # tgt_tokenized = self.tokenizer_tgt(
        #     tgt_text, padding="max_length", max_length=self.max_len, truncation=True, return_tensors="pt")
        src_tokenized = self.tokenizer_src.encode(
            src_text, max_length=self.max_len)
        tgt_tokenized = self.tokenizer_tgt.encode(
            tgt_text,  max_length=self.max_len)
        src = src_tokenized
        tgt = tgt_tokenized
        # return {
        #     "input_ids": src_tokenized.input_ids.squeeze(0),
        #     "attention_mask": src_tokenized.attention_mask.squeeze(0),
        #     "labels": tgt_tokenized.input_ids.squeeze(0)
        # }
        return src, tgt


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
    second_part = array[-split_index:]

    return first_part, second_part


devanagari_languages = ["hin", "mai", "brx", "mar", "kok",  "nep", "san"]
arabic_languages = ["kas", "snd", "urd"]


def preprocessData(language, tokenizer_src, tokenizer_tgt, batch_size, MAX_LENGTH, split_percent):
    english_words = []
    lang_words = []

    if language == "dev":
        for lang in devanagari_languages:
            try:
                train_dataset = pd.read_json(
                    os.path.join("../data", lang, f"{lang}_train.json"), lines=True)
                val_dataset = pd.read_json(
                    os.path.join("../data", lang, f"{lang}_valid.json"), lines=True)
                test_dataset = pd.read_json(
                    os.path.join("../data", lang, f"{lang}_test.json"), lines=True)

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
                    os.path.join("../data", lang, f"{lang}_train.json"), lines=True)
                val_dataset = pd.read_json(
                    os.path.join("../data", lang, f"{lang}_valid.json"), lines=True)
                test_dataset = pd.read_json(
                    os.path.join("../data", lang, f"{lang}_test.json"), lines=True)

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
                os.path.join("../data", language, f"{language}_train.json"), lines=True)
            val_dataset = pd.read_json(
                os.path.join("../data", language, f"{language}_valid.json"), lines=True)
            test_dataset = pd.read_json(
                os.path.join("../data", language, f"{language}_test.json"), lines=True)

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

    train_eng, test_eng = split_array_by_percent(
        english_words, split_percent)
    train_lang, test_lang = split_array_by_percent(
        lang_words, split_percent)

    print(len(train_eng), len(test_eng), len(train_lang), len(test_lang))

    print(tokenizer_src.vocab_size, tokenizer_tgt.vocab_size)

    UNK_IDX, PAD_IDX, BOS_IDX, EOS_IDX = tokenizer_src._convert_token_to_id("<unk>"), tokenizer_src._convert_token_to_id(
        "<pad>"), tokenizer_src._convert_token_to_id("<s>"), tokenizer_src._convert_token_to_id("</s>")

    train_dataset = TransliterationDataset(
        train_eng, train_lang, tokenizer_src, tokenizer_tgt, MAX_LENGTH)
    val_dataset = TransliterationDataset(
        test_eng, test_lang, tokenizer_src, tokenizer_tgt, MAX_LENGTH)

    train_dataloader = DataLoader(
        train_dataset, shuffle=True, batch_size=batch_size, num_workers=torch.cuda.device_count())
    val_dataloader = DataLoader(val_dataset, shuffle=True,
                                batch_size=batch_size, num_workers=torch.cuda.device_count())
    return train_dataloader, val_dataloader
