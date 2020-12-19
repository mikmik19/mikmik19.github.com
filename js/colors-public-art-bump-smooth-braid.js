(function () {
    // set the dimensions and margins of the graph
    const windowWidth = Math.min(
        parseInt(d3.select('body').style('width'), 10),
        680
    );
    var margin = { top: 30, right: 10, bottom: 10, left: 0 },
        width = windowWidth - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#publicArtSmoothBraid")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.json("../../../../data/colors-public-art-bump-braid.json", function (data) {  
        let yScale = d3.scaleLinear()
            .domain(d3.extent([0, 5]))
            .range([height, 0])

        let xScale = d3.scaleLinear()
            .domain(d3.extent([1960, 1968]))
            .range([0, width])

        data.forEach(e => {

            function sigmoid(x) {
                return Math.exp(x)/(Math.exp(x)+1)
            }

            function interpolate(data) {
                let startLevel = data[0].y
                let stopLevel = data[1].y
                let startYear = data[0].x

                let numPoints = 25;
                let points = [];
                let sigmoidX = -numPoints/2
                for (i=0; i < numPoints; i++) {
                    points.push(
                        { 
                            'x': startYear + (i / numPoints), 
                            'y': startLevel + (stopLevel - startLevel) * sigmoid(sigmoidX)}
                    )
                    sigmoidX++
                }
                return points
            }

            interpolate(e.line)

            const line = d3
                .line()
                .x(d => xScale(d.x))
                .y(d => yScale(d.y));

            svg.append("path")
                .datum(interpolate(e.line))
                .attr("d", line)
                .classed('colorLine', true)
                .attr('stroke', e.color)
        });
    })
})()