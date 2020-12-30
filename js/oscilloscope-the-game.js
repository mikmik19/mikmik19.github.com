(function () {
    var margin = { top: 20, right: 20, bottom: 40, left: 45 };
    var windowWidth = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right;
    let width = (windowWidth > 600) ? 600 : windowWidth
    let height = (windowWidth > 600) ? 300 : 0.5 * windowWidth

    const increase = ((Math.PI * 2) / 360);
    var time = 0

    let svg = d3
        .select("#oscilloscope")
        .append("svg")
        .attr("height", height)
        .attr("width", width)

    let darkColor = getComputedStyle(document.documentElement).getPropertyValue('--dynamic-color-dark');
    let lightColor = getComputedStyle(document.documentElement).getPropertyValue('--dynamic-color-light');

    let gradient = svg.append("linearGradient")
        .attr("id", 'gradient')
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("spreadMethod", "pad");

    gradient.append("svg:stop")
        .attr("offset", "0%")
        .attr("stop-color", darkColor)
        .attr("stop-opacity", 1);

    gradient.append("svg:stop")
        .attr("offset", "100%")
        .attr("stop-color", lightColor)
        .attr("stop-opacity", 1);

    let amplitude = 1;
    let frequency = 1;
    function drawSine() {
        time += increase;

        const data = d3.range(0, 200)
            .map(x => x * 10 / 84)
            .map((x) => {
                return { x: frequency * x, y: -amplitude * Math.cos(x - time) };
            });

        let xSelector = d => d.x
        let ySelector = d => d.y

        var xScale = d3
            .scaleLinear()
            .domain([d3.min(data, xSelector), 20])
            .range([margin.left, width - margin.right]);

        var yScale = d3
            .scaleLinear()
            .domain([-2,2])
            .range([height - margin.bottom, margin.top]);

        const line = d3
            .line()
            .x(d => xScale(d.x))
            .y(d => yScale(d.y));


        svg.selectAll('path').remove()
        let curve = svg
            .append("path")
            .datum(data)
            .attr('d', line)
            .classed('line', true);

        // now that the gradient is defines, we can set it as a stroke
        curve.style("stroke", 'url(#gradient')

        setTimeout(drawSine, 1)

    }
    
    drawSine()

    d3.select('#increaseAmp').on('click', function() {
        amplitude = (amplitude < 2) ? amplitude = amplitude  +0.1 : amplitude
    })

    d3.select('#decreaseAmp').on('click', function () {
        amplitude = (amplitude < 2) ? amplitude = amplitude - 0.1 : amplitude
    })

    d3.select('#increaseFreq').on('click', function () {
        frequency = (frequency < 2) ? frequency = frequency + 0.1 : frequency
    })

    d3.select('#decreaseFreq').on('click', function () {
        frequency = (frequency < 2) ? frequency = frequency - 0.1 : frequency
    })

})();
