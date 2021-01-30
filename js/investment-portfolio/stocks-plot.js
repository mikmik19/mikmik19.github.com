async function request(stockName) {
    let stocks = new Stocks('2UKNH1MJSSKVW71F');
    // let data = await stocks.timeSeries({
    //     symbol: stockName,
    //     interval: '60min',
    //     amount: 10
    // });
    // console.log(stockName)
    // console.log(JSON.stringify(data))
    let data = await d3.json(`/data/investment-portfolio/${stockName}.json`)

    let parseDate = d3.utcParse("%Y-%m-%dT%H:%M:%S.000Z")
    let formatDate = d3.timeFormat("%b %d %H:%M")

    let stockDiv = d3.select('#stock')

    let title = stockDiv.append('p')
        .classed('stockName', true)
        .text(stockName)

    let margin = { top: 20, right: 20, bottom: 40, left: 45 };
    let width = 600
    let height = 250
    let svg = stockDiv
        .append("svg")
        .attr("height", height)
        .attr("width", width)

    var xScale = d3
        .scaleTime()
        .domain([parseDate('2021-01-30T00:00:00.000Z'), parseDate('2021-01-29T15:00:00.000Z')])
        .range([margin.left, width - margin.right]);

    var yScale = d3
        .scaleLinear()
        .domain([d3.min(data, d => d.close)*0.9, d3.max(data, d => d.close)*1.1])
        .range([height - margin.bottom, margin.top]);

    var xAxis = d3
        .axisBottom()
        .scale(xScale)
        .ticks(5);

    var yAxis = d3
        .axisLeft()
        .scale(yScale)
        .ticks(5);

    var yAxisEl = svg
        .append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(yAxis);

    var xAxisEl = svg
        .append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(xAxis);

    let area = d3.area()
        .x(d => xScale(parseDate(d.date)))
        .y0(d => yScale(d3.min(data, d => d.close)))
        .y1(d => yScale(d.close))

    let gradientLine = svg.append("path")
        .data([data])
        .attr("class", "gradientLine")
        .attr("d", area);

    let line = d3.line()
        .x(d => xScale(parseDate(d.date)))
        .y(d => yScale(d.close))
    
    let fullLine = svg
        .append('g')
        .append("path")
        .data([data])
        .attr("d", line)
        .classed('line', true);
    
    svg
        .append('g')
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr("cx", d => xScale(parseDate(d.date)))
        .attr("cy", d => yScale(d.close))
        .attr("r", 2)
        .attr("fill", 'var(--primary-color)');


    addGradient(svg)
}

let myStocks = ['AMC', 'GME']

for (const stock of myStocks) {
    request(stock);
}

function addGradient(svg) {
    let backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--background-color');
    let gradient = svg.append("linearGradient")
        .attr("id", 'gradient')
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("spreadMethod", "pad")
        .attr('x1', '0%')
        .attr('x2', '0%')
        .attr('y1', '0%')
        .attr('y2', '100%');

    gradient.append("svg:stop")
        .attr("offset", "0%")
        .attr("stop-color", '#34a853')
        .attr("stop-opacity", 0.38);

    gradient.append("svg:stop")
        .attr("offset", "70%")
        .attr("stop-color", backgroundColor)
        .attr("stop-opacity", 0);

    svg.style("fill", 'url(#gradient)')
    svg.selectAll('.gradientLine').style("stroke", 'url(#gradient)')
}