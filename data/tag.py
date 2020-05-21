#!/usr/bin/env python

from csv import writer
from glob import glob
from os.path import basename
import spacy
from bs4 import BeautifulSoup


model = spacy.load('en_core_web_lg')
GAP = ' %_% '


def doc_token(filename):
    with open(filename, 'r') as file:
        soup = BeautifulSoup(file)
    for doc in soup.find_all('doc'):
        yield str(doc.string)


def locate(string):
    last = 0
    chunks, types = [], []
    doc = model(string)
    sents = doc.sents
    sent = next(sents)

    def add_zero(start):
        chunks.append(sent[last:start].text)
        types.append(0)
        return start

    def add_regular(token):
        foo = token.i - sent.start
        chunks.append(sent[last:foo].text)
        types.append(len(token.text))
        return foo + 1

    def is_article(token):
        return token.tag_ == 'DT' and token.text.lower() in {'a', 'an', 'the'}

    def fixTitleCase(chunk, token):
        return chunk if token.pos_ == 'PROPN' else chunk.lower()

    for np in doc.noun_chunks:
        if np.start >= sent.end:
            chunks.append(sent[last:].text)
            if len(types) > 0 and chunks[0] == '' and types[0] == 0:
                chunks[1] = fixTitleCase(chunks[1], sent[0])
            yield chunks, types
            sent, chunks, types = next(sents), [], []
        if len(np) < 2:
            last = add_zero(np.start - sent.start)
        elif is_article(np[0]):
            last = add_regular(np[0])
        elif is_article(np[1]):
            last = add_regular(np[1])
        elif np[0].tag_ not in {'PDT', 'DT', 'PRP', 'PRP$', 'IN'}:
            last = add_zero(np.start - sent.start + (1 if np[0].tag_ in {'-LRB-'} else 0))


def process_dump(filename, low=4, high=8):
    with open(f'tagged/{basename(filename)}.csv', 'w', newline='') as out:
        i = 0
        csv_writer = writer(out)
        for doc in doc_token(filename):
            for chunks, types in locate(doc):
                if not (low < len(types) < high): continue
                res = GAP.join(chunks).strip()
                csv_writer.writerow([res, ' '.join(map(str, types))])
                i += 1
                if i == 100: return


for filename in sorted(glob('extracted/*/*')):
    process_dump(filename)
