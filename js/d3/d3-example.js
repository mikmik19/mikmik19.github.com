// Set the dimensions of the canvas / graph
var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 300 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// Set the ranges
var x = d3.scale.linear().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);
    
// Adds the svg canvas
var svg = d3.select("#d3-example")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("../../../data/animation_data_theta.csv", function(error, data) {
    data.forEach(function(d) {
        d.x = Math.cos(d.osc0);
        d.y = Math.sin(d.osc0);
    });

    // Scale the range of the data
    x.domain([-1, 1]);
    y.domain([-1, 1]);

    // Add the scatterplot
    svg.selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.x); })
        .attr("cy", function(d) { return y(d.y); })
        .style("opacity", 0.15)
        
    // Adding mouseover effects 
    .on('mouseover', function(){
        d3.select(this)
            .attr({ fill: 'red' })
            .style('opacity', 1)
    })
    .on('mouseout', function(){
        d3.select(this)
            .attr({fill: 'black'})
            .style('opacity', 0.15)
    })
});

svg.transition()
    .attr('d', svg)
    .attr('fill', 'green')
    .duration(2000)