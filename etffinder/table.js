

(function() {

    async function loadData(datasets) {
        let merge_df;
        await Promise.all(
            datasets.map( name => dfd.read_csv(`data/${name}.csv`))
        ).then(function (dfs) {
            // TODO: This needs to handle the case of 1 or more data frames.
            merge_df = dfd.merge({ "left": dfs[0], "right": dfs[1], "on": ["Ticker"] })
            merge_df['Weight'] = merge_df['Weight'].add(merge_df['Weight_1'], axis = 1)
            
            // Average the weight. This should take into account the fraction of the 
            // portfolio going into the ETF.
            merge_df['Weight'] = merge_df['Weight'].div(2, axis = 1)
            return merge_df
        });

        // let json = await merge_df.to_json().then(json => json)
        return merge_df
    }

    function formatDataFrameToListOfObjects(df) {
        // This function is here because we need the data to 
        // be formatted as a list of JavaScript Dictionaries.
        let data = []
        colNames = df.columns
        for (row of df.data) {
            colIdx = 0;
            let obj = {}
            for (col of row) {
                colIdx = colIdx % 5
                obj[colNames[colIdx]] = col
                colIdx++
            }
            data.push(obj)
        }
        return data
    }

    function checkData () {
        let inputs = document.getElementsByClassName('stockInput');
        let datasets = []
        for (input of inputs) {
            if (input.checked) {
                datasets.push(input.value)
            }
        }
        return datasets
    }

    async function fillHoldingsTable(filename = '') {
        let datasets = checkData()
        const rawData = await loadData(datasets)
        const data = formatDataFrameToListOfObjects(rawData)

        d3.selectAll('div.row').remove()
        
        let table = d3.select('#holdings') 
        
        table.selectAll('div.row')
            .data(data).enter()
            .append('div').classed('row', true)
            .each(function (d, i) {
                let row = d3.select(this);

                row.append('div')
                    .classed('ticker', true)
                    .text(d => d.Ticker)

                row.append('div')
                    .classed('name', true)
                    .text(d => d.Name)

                row.append('div')
                    .classed('weight', true)
                    .text(d => d.Weight)
            })

        let tableHeader = table.insert('div', ":first-child").classed('row', true)
        tableHeader.append('div').classed('tableHeader', true).classed('ticker', true).text('Ticker')
        tableHeader.append('div').classed('tableHeader', true).classed('name', true).text('Name')
        tableHeader.append('div').classed('tableHeader', true).classed('weight', true).text('Weight(%)')
    };

    fillHoldingsTable(filename='ICLN')

    function buttonClick() {
        let filename = d3.select(this).property('value')
        fillHoldingsTable(filename = filename)
    }
    d3.selectAll('input').on('click', buttonClick)
}
)()