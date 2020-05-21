from glob import glob
import sys
import csv


def baz(fizz):
    sys.stdout.write(fizz + "\r\n")


def array(args):
    baz(f"*{len(args)}")
    for arg in args:
        string(arg)


def string(val):
    baz(f"${len(val.encode('utf-8'))}")
    baz(val)


for filename in sorted(glob('tagged/*')):
    with open(filename, newline='') as file:
        reader = csv.reader(file)
        for i, row in enumerate(reader):
            array(['HSET', f'sentences:{i}', 'text', row[0]])
            array(['HSET', f'sentences:{i}', 'answer', row[1]])
