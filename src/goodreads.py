import pandas as pd
import json
from os import listdir
from os.path import isfile, join

def remove_series_name(row):
    return row.split("(")[0]


def remove_subtitle(row):
    return row.split(":")[0]


def get_subtitle(title):
    return row.split(":")[-1] if ':' in title else ''

def add_note_link(row, path='books'):
    notes = [f.split('.')[0] for f in listdir(path) if isfile(join(path, f))]
    if row in notes:
        return 1
    else:
        return 0


df = pd.read_csv('data/books/goodreads_library_export.csv')

columns = [
    'Book Id',
    'Title',
    'Author',
    'My Rating',
    'Read Count',
    'Date Read'
]
subset_df = df[df["Exclusive Shelf"]=="read"].copy()

subset_df["Date Read"] = pd.to_datetime(subset_df["Date Read"])
subset_df.sort_values("Date Read", ascending=False, inplace=True)

subset_df["Title"] = subset_df["Title"]\
                        .copy()\
                        .apply(remove_series_name)\
                        .apply(remove_subtitle)

subset_df["Subtitle"] = subset_df["Title"]\
                        .copy()\
                        .apply(get_subtitle)\

subset_df["Link"] = subset_df["Title"].copy().apply(add_note_link)

to_save = subset_df[subset_df['Read Count']>0].copy()

books_json = dict()
for idx, row in to_save.iterrows():
    books_json[row["Book Id"]] = {
        "title": row["Title"],
        "subtitle": row["Subtitle"],
        "author": row["Author"],
        "stars": row["My Rating"],
        "link": row["Link"]
    }

with open('data/books/books.json', 'w') as outfile:  
    json.dump(books_json, outfile)