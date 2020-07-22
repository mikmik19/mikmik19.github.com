import os
import requests

road_names = [
    'lærke',
    'ege',
    'tjørne',
    'ahorn',
    'poppel',
    'pile',
    'aske',
    'linde',
    'bøge',
    'birke',
    'plantan'
]
base_url = 'https://www.boligsiden.dk/pdf/salgspris/solgt/alle/1?periode.from=1992-01-01&sortdescending=true&sort=salgsdato&postnummer=2000&vej='


for road in road_names:
    url = base_url + road + 'skellet'
    response = requests.get(url)
    with open(f'./{road}.pdf', 'wb') as f:
        f.write(response.content)
        
for road in road_names:
    os.system(f'pdftotext -layout -enc UTF-8 {road}.pdf')