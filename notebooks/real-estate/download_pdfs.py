import os
import requests
import pandas as pd

streets = pd.read_csv('streets.csv')
postnummer = list(streets.post_code)
streetnames = list(streets.street_name)

for street, postcode in zip(streetnames,postnummer):
    base_url = f'https://www.boligsiden.dk/pdf/salgspris/solgt/alle/1?periode.from=1992-01-01&sortdescending=true&sort=salgsdato&postnummer={postcode}&vej='
    url = base_url + street
    response = requests.get(url)
    with open(f'./data/pdfs/{street}.pdf', 'wb') as f:
        f.write(response.content)
        
for street in streetnames:
    street = street.replace(' ', '\ ')
    cmd = f'pdftotext -layout -enc UTF-8 ./data/pdfs/{street}.pdf ./data/txt/{street}.txt'
    os.system(cmd)