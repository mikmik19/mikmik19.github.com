import pandas as pd


def xls_to_csv(filename):
    with open(f'./data/raw/{filename}.xls', "r") as f:
        skipLines = f.readlines()[2:-1]
        csvString = ''
        for line in skipLines:
            csvString = csvString + line.replace('<tr>', '').replace('</tr>', '')\
            .replace(',','').replace('</td>',',').replace('<td>','').replace(',\n','')

    with open(f'./data/raw/{filename}.csv', 'w') as f:
        f.write(csvString)


def process_vaneck(filename):
    df = pd.read_csv(f'./data/raw/{filename}.csv')
    sub_df = df[['Ticker', 'Holding', '% of net assets']].dropna().copy()
    sub_df.rename(
        columns={'% of net assets':'Weight', 'Holding':'Name'},
        inplace=True
    )
    sub_df.Weight = sub_df.Weight.apply(lambda x: x.replace('%',''))
    sub_df.Ticker = sub_df.Ticker.apply(lambda x: x.split(' ')[0])
    sub_df['Sector'] = 'Unknown'
    sub_df['Country'] = 'Unknown'
    return sub_df.dropna()
    

def process_rbot():
    # iShares Automation & Robotics UCITS ETF
    df = pd.read_csv('./data/raw/RBOT_holdings.csv',  skiprows=2)
    sub_df = df[['Issuer Ticker', 'Name', 'Sector', 'Weight (%)', 'Location']].copy()
    sub_df.rename(
        columns={'Issuer Ticker':'Ticker','Weight (%)': 'Weight', 'Location':'Country'},
        inplace=True)
    sub_df.dropna().to_csv('./data/RBOT.csv', index=False)


def process_ecar():
    df = pd.read_csv('./data/raw/ECAR.csv')
    sub_df = df[['Ticker', 'Name', 'Sector', 'Weight', 'Location']].copy()
    sub_df.rename(columns={'Location':'Country'}, inplace=True)
    sub_df.dropna().to_csv('./data/ECAR.csv', index=False)


def process_icln():
    df = pd.read_csv('./data/raw/ICLN_holdings.csv', skiprows=9)
    sub_df = df[['Ticker', 'Name', 'Sector', 'Weight (%)', 'Location']].copy()
    sub_df.rename(
        columns={'Weight (%)':'Weight', 'Location':'Country'},
        inplace=True
    )
    sub_df.dropna().to_csv('./data/ICLN.csv', index=False)


def process_espo():
    # VanEck Vectors Video Gaming and eSports UCITS ETF
    xls_to_csv('UCTESPO_asof_20210223')
    df = process_vaneck('UCTESPO_asof_20210223')
    df.to_csv('./data/UCTESPO.csv', index=False)


def process_lit():
    df = pd.read_csv('./data/raw/GlobalXBattery.csv')
    sub_df = df[['Ticker', 'Name', 'Weight']].dropna().copy()
    sub_df['Sector'] = 'Unknown'
    sub_df['Country'] = 'Unknown'
    sub_df.Ticker = sub_df.Ticker.apply(lambda x: x.split(' ')[0])
    sub_df.to_csv('./data/GlobalXBattery.csv', index=False)


def process_lym9():
    # 
    df = pd.read_csv('./data/raw/NewEnergy.csv', skiprows=1, header=0, 
    names=['Date','Instrument Type','Ticker','ISIN','Name','Weight','Sector','Country','Spot underlying','Underlying Currency'],
    index_col=False
    )
    sub_df = df[['Ticker', 'Name', 'Sector', 'Weight', 'Country']].copy()
    sub_df.Ticker = sub_df.Ticker.apply(lambda x: x.split(' ')[0])
    sub_df.dropna().to_csv('./data/NewEnergy.csv', index=False)


def process_tswe():
    # VanEck Vectors Sustainable World Equal Weight UCITS ETF
    xls_to_csv('TSWE_asof_20210225')
    df = process_vaneck('TSWE_asof_20210225')
    df.to_csv('./data/TSWE.csv', index=False)


def process_tret():
    # VanEck Vectors Global Real Estate UCITS ETF
    xls_to_csv('TRET_asof_20210225')
    df = process_vaneck('TRET_asof_20210225')
    df.to_csv('./data/TRET.csv', index=False)


def process_tget():
    # VanEck Vectors Global Equal Weight UCITS ETF
    xls_to_csv('TGET_asof_20210225')
    df = process_vaneck('TGET_asof_20210225')
    df.to_csv('./data/TGET.csv', index=False)


def process_teet():
    # VanEck Vectors European Equal Weight UCITS ETF
    xls_to_csv('TEET_asof_20210225')
    df = process_vaneck('TEET_asof_20210225')
    df.to_csv('./data/TEET.csv', index=False)


process_teet()
process_tget()
process_tret()
process_tswe()
process_rbot()
process_ecar()
process_icln()
process_espo()
process_lit()
process_lym9()







