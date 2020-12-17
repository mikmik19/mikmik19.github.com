# Local Real Estate Prices
This projects extracts data from boligsiden.dk.

## Setup

### Poetry
```
    poetry install
```

### pdftotext
pdftotext is used to parse the pdf files downloaded from boligsiden.dk.

## The Data
You get the data by running two scripts

```
    poetry run python download_pdfs.py
```

```
    poetry run python parse_text.py
```
## Scripts
You are expected to run the scripts from this folder.

