(function() {

    const range = (start, end, step = 1) => {
        let output = [];
        if (typeof end === 'undefined') {
            end = start;
            start = 0;
        }
        for (let i = start; i < end; i += step) {
            output.push(i);
        }
        return output;
    };

    let years = range(0, 100)
    let weeks = range(0, 52)

    d3.select('#weeks')
        .selectAll('div')
        .data(years)
            .enter()
            .append('div')
            .classed('year', true)
        .selectAll('div')
            .data(weeks)
            .enter()
            .append('div')
            .classed('week', true)
})()
