

(function() {

    async function fillHoldingsTable(filename = '') {
        const data = await d3.csv(`data/${filename}.csv`)
        console.log(data)

        d3.selectAll('div.row').remove()

        d3.select('#holdings')
            .selectAll('div.row')
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
    };

    fillHoldingsTable(filename='ICLN')

    function buttonClick() {
        let filename = d3.select(this).property('value')
        fillHoldingsTable(filename = filename)
    }
    d3.selectAll('button').on('click', buttonClick)
    // d3.select('#NewEnergy').on('click', fillHoldingsTable('NewEnergy'))
    // d3.select('#ECAR').on('click', fillHoldingsTable('ECAR_holdings'))
}
)()