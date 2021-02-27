(function() {

    async function loadData(datasets) {
        let return_value;
        await Promise.all(
            datasets.map( name => dfd.read_csv(`data/${name}.csv`))
        ).then(function (dfs) {
            if (dfs.length == 1) {
                return_value = dfs[0]
            } else {
                return_value = dfs[0]
                for (df_idx = 1; df_idx < dfs.length; df_idx++) {
                    return_value = dfd.merge({ 
                        "left": return_value, 
                        "right": dfs[df_idx], 
                        "on": ["Ticker"],
                        "how": "outer"
                    })

                    // After the outer mege we have to fill the NaN values of both Name and 
                    // Weight. These will be tranfered over from Name_1 and Weight_1
                    let nRows = return_value.shape[0];
                    let df_before = return_value.copy()
                    for (row_idx = 0; row_idx < nRows; row_idx++) {
                        let row = df_before.iloc({ rows: [row_idx] })

                        if (typeof row.Name.values[0] != "string") {
                            row.Name = row.Name_1
                            row.Weight = row.Weight_1
                            row.Sector = row.Sector_1
                            row.Country = row.Country_1

                            // I have to set weight 1 to 0 otherwise it will be
                            // counted twice later.
                            row.Weight_1 = [0]

                            return_value = dfd.concat({ df_list: [row, return_value], axis:0})
                        }

                        if (typeof row.Name_1.values[0] != "string") {
                            row.Name_1 = row.Name
                            row.Weight_1 = [0]
                            row.Sector_1 = row.Sector
                            row.Country_1 = row.Country
                            return_value = dfd.concat({ df_list: [row, return_value], axis: 0 })
                        }
                    }
                    
                    return_value = return_value.dropna({ axis: 0, inplace:false })

                    
                    return_value['Weight'] = return_value['Weight'].add(return_value['Weight_1'], axis = 0)
                    return_value.sort_values({ by: "Weight", ascending: false, inplace: true })
                    return_value.drop({ 
                        columns: ["Weight_1", "Name_1", "Sector_1", "Country_1"], 
                        axis: 1, 
                        inplace: true
                     });
                }

                // Average the weight. This should take into account the fraction of the 
                // portfolio going into the ETF.

                return_value['Weight'] = return_value['Weight'].div(dfs.length, axis = 0)
                return return_value
            }
        });
        return return_value
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
        d3.selectAll('div.row').remove()

        let datasets = checkData()

        if (datasets.length == 0) {
            
            return null
        }

        const rawData = await loadData(datasets)
        const data = formatDataFrameToListOfObjects(rawData)
        
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
                    .text(d => d.Weight.toFixed(2))
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