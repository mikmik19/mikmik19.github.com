import os
import requests

postnummer = 2000
road_names = [
    'lærkeskellet',
    'egeskellet',
    'tjørneskellet',
    'ahornskellet',
    'poppelskellet',
    'pileskellet',
    'askeskellet',
    'lindeskellet',
    'bøgeskellet',
    'birkeskellet',
    'plantanskellet',
    'johannes v. jensens alle'
    
]
base_url = f'https://www.boligsiden.dk/pdf/salgspris/solgt/alle/1?periode.from=1992-01-01&sortdescending=true&sort=salgsdato&postnummer={postnummer}&vej='


for road in road_names:
    url = base_url + road
    response = requests.get(url)
    pdf_name =road.replace(" ","")
    with open(f'./{pdf_name}.pdf', 'wb') as f:
        f.write(response.content)
        
for road in road_names:
    os.system(f'pdftotext -layout -enc UTF-8 {pdf_name}.pdf')