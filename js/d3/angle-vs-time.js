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
    var i = 0;
    data.oscillators.forEach(e => {
        line = d3.line()
        .x(d => xScale(d.step))
        .y(d => yScale(d.theta))

        svg.append("svg:path")
            .datum(e.osc)
            .attr("fill", "none")
            .attr("stroke", "green")
            .attr("stroke-width", 1)
            .attr("opacity", 0.03)
            .attr("d", line)
            .attr("class", "oscillator")
            .attr("id", `oscillator_${i}`);
        i++
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
    
    // It would be cool to add a widget that lets me scale the
    // zoom on the x-axis

    d3.select("#oscSlider").on("input", function() {
        d3.selectAll("#oscSliderCounter").html(this.value)
        d3.selectAll(".oscillator").classed("selected", false);

        d3.select(`#oscillator_${this.value}`)
            .classed("selected", true)

     });
}
