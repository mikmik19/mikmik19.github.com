// ------------------------------------------------
// The next figure
// ------------------------------------------------
d3.json("../../../../data/angle-vs-time.json", function(error, data) {
    drawAngleVsTime(data);
});
function drawAngleVsTime(data) {
    var margin = {top: 20, right: 20, bottom: 20, left: 30};
    var height = 200;
    var width = 450;

    // Defining the scales
    xScale = d3.scaleLinear()
                .domain([0, 100])
                .range([margin.left, width-margin.right]);

    yScale = d3.scaleLinear()
                .domain([0, 2*Math.PI])
                .range([height-margin.bottom, margin.top]);

    // Defining the axes
    xAxis = d3.axisBottom().scale(xScale);
    yAxis = d3.axisLeft().scale(yScale);

    // Drawing the canvas
    svg = d3.select("#angleVsTime")
                .append("svg")
                .attr("width", width)
                .attr("height", height);

    // Loop through the data to draw a bunch of lines
    data.oscillators.forEach(e => {
        line = d3.line()
        .x(d => xScale(d.step))
        .y(d => yScale(d.theta))

        svg.append("path")
            .datum(e.osc)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("opacity", 0.03)
            .attr("d", line);
    });
    
    
    // Draw the x axis
    svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + (height - margin.bottom) + ")")
            .call(xAxis);

    // Draw the y axis
    svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + margin.left + ",0)")
            .call(yAxis);
    console.log("Do i get here?")
}
