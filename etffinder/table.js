(function() {

    async function loadData(datasets) {
        let return_value;
        await Promise.all(
            datasets.map( name => dfd.read_csv(`data/${name}.csv`))
        ).then(function (dfs) {
            if (dfs.length == 1) {
                return_value = dfs[0]
            } else {
                function ReplaceName(row) {
                    console.log(row)
                    if (row.Name == NaN) {
                        return row.Name_1
                    }
                    return row.Name
                }

                return_value = dfs[0]
                for (idx = 1; idx < dfs.length; idx++) {
                    return_value = dfd.merge({ 
                        "left": return_value, 
                        "right": dfs[idx], 
                        "on": ["Ticker"],
                        "how": "outer"
                    })

                    // After the outer mege we have to fill the NaN values of both Name and 
                    // Weight. These will be tranfered over from Name_1 and Weight_1
                    let nRows = return_value.shape[0];
                    for (idx = 0; idx < nRows; idx++) {
                        let row = return_value.iloc({ rows: [idx] })

                        if (isNaN(row.Name.values[0])) {
                            row.Name = row.Name_1
                            row.Weight = row.Weight_1
                            return_value = dfd.concat({ df_list: [return_value, row], axis:0})
                        }

                        if (isNaN(row.Name_1.values[0])) {
                            row.Name_1 = row.Name
                            row.Weight_1 = row.Weight
                            return_value = dfd.concat({ df_list: [return_value, row], axis: 0 })
                        }
                    }
                    
                    return_value.dropna({ axis: 0, inplace:true })

                    return_value['Weight'] = return_value['Weight'].add(return_value['Weight_1'], axis = 0)
                    
                    return_value.drop({ 
                        columns: ["Weight_1", "Name_1"], 
                        axis: 1, 
                        inplace: true
                     });
                }
                
                
                // return_value.fillna({
                //     columns: ['Name'],
                //     values: ['Filled'], 
                //     inplace: "True" 
                // })
                // return_value.query({
                //     column: "Name",
                //     is: "==",
                //     to: "Filled"
                // }).print()

                

                // Average the weight. This should take into account the fraction of the 
                // portfolio going into the ETF.
                return_value['Weight'] = return_value['Weight'].div(dfs.length, axis = 1)
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