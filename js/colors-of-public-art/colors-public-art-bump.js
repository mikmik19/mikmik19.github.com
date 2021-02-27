(async function () {
    // set the dimensions and margins of the graph
    const windowWidth = Math.min(
        parseInt(d3.select('p').style('width'), 10),
        680
    );
    const margin = { top: 30, right: 10, bottom: 10, left: 0 }
    const width = windowWidth - margin.left - margin.right
    const height = 200 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#publicArt")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    const data = await d3.csv("/data/colors-public-art-bump.csv")
    // Extract the list of dimensions we want to keep in the plot. Here I keep all except the column called Species
    dimensions = d3.keys(data[0]).filter(function (d) { return d != "Species" })

    // For each dimension, I build a linear scale. I store all in a y object
    var y = {}
    for (i in dimensions) {
        let name = dimensions[i]
        y[name] = d3.scaleLinear()
            .domain(d3.extent([0, 4]))
            .range([height, 0])
    }

    // Build the X scale -> it find the best position for each Y axis
    x = d3.scaleLinear()
        .range([0, width])
        .domain(d3.extent([1960, 1968]))

    // The path function take a row of the
    // return x and y coordinates of the line to draw for this raw.
    function path(d) {
        return d3.line()(dimensions.map(function (p) { return [x(p), y[p](d[p])]; }));
    }

    svg
        .selectAll("myPath")
        .data(data)
        .enter().append("path")
        .attr("d", path)
        .classed('colorLine', true)
        .style('stroke', d => d.color) 
})()