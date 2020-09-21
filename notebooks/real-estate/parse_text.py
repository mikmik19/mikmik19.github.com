import re
import json
import pandas as pd

streets = pd.read_csv('streets.csv')
postnummer = list(streets.post_code)
streetnames = list(streets.street_name)

EXTRACT_DATE = '08-09-2020'
rows = []

for street, postcode in zip(streetnames,postnummer):
    with open(f"data/txt/{street}.txt","r", encoding='utf8') as f:
        body = f.read()
    addresses = re.findall(f'{street} ' + '\d{1,3}, [0-9a-z., ]'+f'*{postcode}', body)
    address_chuncks = re.split(f'{street} '+ '\d{1,2},', body)

    prices = re.findall('[\d{1,3}.]*\d{3}.\d{3}', body)
    square_meters = re.findall(' \d{2,3}\n', body)
    
    price_cnt = 0
    for address, m2, text in zip(addresses, square_meters, address_chuncks[1:]):
        m2 = int(m2.replace('\n',''))
        dates = re.findall('\d\d-\d\d-\d\d\d\d', text)
        sale_types = re.findall('Familiehandel|Fri handel|I øvrigt|Auktion', text)
        try:
            dates.remove(EXTRACT_DATE)
        except ValueError:
            pass 

        for (date, sale_type) in zip(dates, sale_types):
            try:
                price = prices[price_cnt]
                price = int(price.replace('.',''))
                
            except:
                break

            m2_price = round(price/m2)
            street_number = address.replace(f', {postnummer}','').replace(street, '').replace(' ','').replace(',',' ').replace('.','')
            
            rows.append(
                [
                    street,
                    street_number,
                    date,
                    price,
                    m2,
                    m2_price,
                    sale_type
                ]
            )
            price_cnt += 1

df = pd.DataFrame(columns=[
        'streetName',
        'streetNumber',
        'salesDate',
        'price',
        'm2',
        'm2Price',
        'saleType'
    ],
    data=rows)

SAVE_PATH = './data/processed/'

df[df.saleType=="Fri handel"].to_csv(f'{SAVE_PATH}sales.csv')

addressesJson = {}
streetJsons = []
for street in df.streetName.unique():
    street_df = df[df.streetName==street]
    streetJson = {
        'street':street,
        'numbers': list(street_df.streetNumber.unique())
    }
    streetJsons.append(streetJson)
addressesJson['streets'] = streetJsons 

def save_addresses(addressesJson):
    with open(f'{SAVE_PATH}addresses.json', 'w', encoding='utf8') as json_file:
        json.dump(addressesJson, json_file)

def save_square_meters(df):
    pd.DataFrame(
        df.m2.unique(),
        columns=['m2']
    ).to_csv(f'{SAVE_PATH}squaremeters.csv')
    
save_square_meters(df)
save_addresses(addressesJson)