import pandas as pd

#open text file in read mode
with open("./data/raw/UCTESPO_asof_20210223.txt", "r") as f:
    skipLines = f.readlines()[2:-1]
    csvString = ''
    for line in skipLines:
        csvString = csvString + line.replace('<tr>', '').replace('</tr>', '')\
        .replace(',','').replace('</td>',',').replace('<td>','').replace(',\n','')

with open('./data/UCTESPO.csv', 'w') as f:
    f.write(csvString)


df = pd.read_csv('./data/UCTESPO.csv')
sub_df = df[['Ticker', 'Holding', '% of net assets']].dropna().copy()
sub_df.rename(
    columns={'% of net assets':'Weight', 'Holding':'Name'},
    inplace=True
)
sub_df.Weight = sub_df.Weight.apply(lambda x: x.replace('%',''))
sub_df.Ticker = sub_df.Ticker.apply(lambda x: x.split(' ')[0])
sub_df['Sector'] = 'Unknown'
sub_df['Country'] = 'Unknown'
sub_df.dropna().to_csv('./data/UCTESPO.csv', index=False)



df = pd.read_csv('./data/raw/GlobalXBattery.csv')
sub_df = df[['Ticker', 'Name', 'Weight']].dropna().copy()
sub_df['Sector'] = 'Unknown'
sub_df['Country'] = 'Unknown'
sub_df.Ticker = sub_df.Ticker.apply(lambda x: x.split(' ')[0])
sub_df.to_csv('./data/GlobalXBattery.csv', index=False)

df = pd.read_csv('./data/raw/NewEnergy.csv', skiprows=1, header=0, 
    names=['Date','Instrument Type','Ticker','ISIN','Name','Weight','Sector','Country','Spot underlying','Underlying Currency'],
    index_col=False
)
sub_df = df[['Ticker', 'Name', 'Sector', 'Weight', 'Country']].copy()
sub_df.Ticker = sub_df.Ticker.apply(lambda x: x.split(' ')[0])
sub_df.dropna().to_csv('./data/NewEnergy.csv', index=False)

df = pd.read_csv('./data/raw/ECAR.csv')
sub_df = df[['Ticker', 'Name', 'Sector', 'Weight', 'Location']].copy()
sub_df.rename(columns={'Location':'Country'}, inplace=True)
sub_df.dropna().to_csv('./data/ECAR.csv', index=False)

df = pd.read_csv('./data/raw/ICLN_holdings.csv', skiprows=9)
sub_df = df[['Ticker', 'Name', 'Sector', 'Weight (%)', 'Location']].copy()
sub_df.rename(
    columns={'Weight (%)':'Weight', 'Location':'Country'},
    inplace=True
)
sub_df.dropna().to_csv('./data/ICLN.csv', index=False)

