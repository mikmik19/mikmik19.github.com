(function () {
    // set the dimensions and margins of the graph
    const windowWidth = Math.min(
        parseInt(d3.select('p').style('width'), 10)/2,
        340
    );
    const margin = { top: 10, right: 0, bottom: 10, left: 0 }
    const width = windowWidth - margin.left - margin.right
    const height = 50 - margin.top - margin.bottom;

    let darkColor = getComputedStyle(document.documentElement).getPropertyValue('--dynamic-color-dark');
    let lightColor = getComputedStyle(document.documentElement).getPropertyValue('--dynamic-color-light');

    // append the svg object to the body of the page
    var svg = d3.select("#genreTimeline")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.json("../../../../data/ten-years-of-reading-regularly/genre-timeline.json", function (data) {
        let yScale = d3.scaleLinear()
            .domain(d3.extent([0, 1]))
            .range([height, 0])

        let xScale = d3.scaleLinear()
            .domain(d3.extent([2010, 2020]))
            .range([0, width])

        data.forEach(e => {

            function sigmoid(x) {
                return Math.exp(x) / (Math.exp(x) + 1)
            }

            function interpolate(data) {
                let startLevel = data[0].y
                let stopLevel = data[1].y
                let startYear = data[0].x

                let numPoints = 25;
                let points = [];
                let sigmoidXStart = 9
                let sigmoidX = -sigmoidXStart
                for (i = 0; i < numPoints + 2; i++) {
                    points.push(
                        {
                            'x': startYear + (i / numPoints),
                            'y': startLevel + (stopLevel - startLevel) * sigmoid(sigmoidX)
                        }
                    )
                    sigmoidX = sigmoidX + ((2 * sigmoidXStart) / numPoints)
                }
                return points
            }

            const line = d3
                .line()
                .x(d => xScale(d.x))
                .y(d => yScale(d.y));

            let lines = svg.append("path")
                .datum(interpolate(e.line))
                .attr("d", line)
                .classed('colorLine', true)
                .classed('colorGrad' + e.category, true)
                .on('mouseover', function () {
                    let clones = d3.selectAll('.colorGrad' + e.category).clone();
                    clones.classed('clone', true).raise()
                })
                .on('mouseout', function () {
                    d3.selectAll('.clone').remove();
                })

            let gradient = svg.append("linearGradient")
                .attr("id", 'gradient-' + e.category)
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

            lines.style("stroke", 'url(#gradient-' + e.category)
        });

        d3.selectAll('.colorGradnon-fiction').style('stroke', 'lightgrey')
    })
})()