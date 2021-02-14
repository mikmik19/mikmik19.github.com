

(function() {

    async function fillHoldingsTable(filename = '') {
        const data = await d3.csv(`data/${filename}.csv`)
        console.log(data)

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
    d3.selectAll('button').on('click', buttonClick)
}
)()