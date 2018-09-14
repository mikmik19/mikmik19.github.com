function drawCircle(data) {
    // Set the dimensions of the canvas / graph
    var margin = {top: 20, right: 20, bottom: 20, left: 20};
    var width = 300 - margin.left - margin.right;
    var height = 300 - margin.top - margin.bottom;

    // Defining the scales
    var xScale = d3.scaleLinear()
            .range([0, width])
            .domain([-1, 1]);

    var yScale = d3.scaleLinear()
            .range([height, 0])
            .domain([-1, 1]);
       
    // Adds the svg canvas
    var svg = d3.select("#pointsOnCircle")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);
            
    // First I bind the data to circle elements
    svg.selectAll("circle")
        .data(data.steps[0].theta)
        .enter()
        .append("circle")
        .attr("class", "enter")
        .attr("r", 3.5)
        .attr("cx", d => xScale(Math.cos(d)) )
        .attr("cy", d => yScale(Math.sin(d)) )
        .attr("fill", "green");
    
    // Then I loop over the data and update the position
    var i = 1
    var numSteps = data.steps.length -1;
    function updatePlot() {
        console.log(i)
        i++;
        svg.selectAll("circle")
                .data(data.steps[i].theta)
                .transition()
                // It still extrapolates between start and end _point_ not angle.
                // will need to write custom tween ...
                .ease(d3.easeLinear)
                .duration(3000)
                .attr("class", "enter")
                .attr("r", 3.5)
                .attr("cx", d => xScale(Math.cos(d)) )
                .attr("cy", d => yScale(Math.sin(d)) )
                .attr("fill", "green");
        if ( i < numSteps) {
            setTimeout(updatePlot, 3000);
        }
    };
    updatePlot()
}

d3.json("../../../../data/animation_data_theta.json", function(error, data) {
    drawCircle(data)
});