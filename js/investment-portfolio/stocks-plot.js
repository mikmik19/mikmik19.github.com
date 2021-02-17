async function request(stockName) {
    // let stocks = new Stocks('2UKNH1MJSSKVW71F');
    // let data = await stocks.timeSeries({
    //     symbol: stockName,
    //     interval: '60min',
    //     amount: 48
    // });
    // console.log(stockName)
    // console.log(JSON.stringify(data))
    let data = await d3.json(`/data/investment-portfolio/${stockName}.json`)

    let stockDiv = d3.select('#stock')

    let title = stockDiv.append('div').append('p')
        .classed('stockName', true)
        .text(stockName)
    
    let infoDiv = stockDiv.append('div')

    infoDiv.append('div').text('GA')
    infoDiv.append('div').text('Current Price')
    infoDiv.append('div').text('Earning')

    
    let svg = drawStockPrices(data, stockDiv);
    addGradient(svg);
}

for (const stock of ['AMC', 'GME']) {
    request(stock);
}


function drawStockPrices(data, stockDiv) {

    let parseDate = d3.utcParse("%Y-%m-%dT%H:%M:%S.000Z")
    let formatDate = d3.timeFormat("%b %d %H:%M")

    let margin = { top: 20, right: 20, bottom: 40, left: 45 };
    let width = 600
    let height = 250

    let svg = stockDiv
        .append("svg")
        .attr("height", height)
        .attr("width", width)

    var xScale = d3
        .scaleTime()
        .domain(d3.extent(data, d => parseDate(d.date)))
        .range([margin.left, width - margin.right]);

    var yScale = d3
        .scaleLinear()
        .domain([d3.min(data, d => d.close) * 0.9, d3.max(data, d => d.close) * 1.1])
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

    return svg
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
        .attr("stop-opacity", 0.6);

    gradient.append("svg:stop")
        .attr("offset", "90%")
        .attr("stop-color", backgroundColor)
        .attr("stop-opacity", 0);

    svg.style("fill", 'url(#gradient)')
    svg.selectAll('.gradientLine').style("stroke", 'url(#gradient)')
}