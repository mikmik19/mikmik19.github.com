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
                .domain([-1,1]);

// Define the axes
var xAxis = d3.axisBottom().scale(xScale).ticks(5);
var yAxis = d3.axisLeft().scale(yScale).ticks(5);
    
// Adds the svg canvas
var svg = d3.select("#points-on-circle")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

function drawCircle(d) {
    // First I bind the data to circle elements
    var circles = svg.selectAll("circle")
        .data(d)

    // Then I remove existing data
    circles
        .exit()
        .attr("class", "exit")
        .remove();

    // I update the position of each point
    circles
        .attr("class", "update")
        .transition()
            .duration(250)
            .attr("cx", function(d) { return xScale(d.x); })
            .attr("cy", function(d) { return yScale(d.y); });

    // I enter each circle and set the attributes.
    circles.enter()
        .append("circle")
        .attr("class", "enter")
        .attr("r", 3.5)
        .attr("cx", function(d) { return xScale(d.x); })
        .attr("cy", function(d) { return yScale(d.y); })
        .attr("fill", "green")
        .style("opacity", 0.15);
}

// Takes and angle and return an object with a 
// x and y attribute. 
function point(angle) {
    return {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
}

// Loading the data, transforming each angle to a (x,y) point, and 
// draws the circles. A timer is used to add a small break between each transition 
d3.csv("../../../../data/animation_data_theta.csv", function(error, data) {
    const tick_delay = 250;
    const keys = Object.keys(data[0]);
    const processed = data.map(row => keys.map(key => point(row[key])))

    // Im initiating a counter here because I want to terminate 
    // the process early
    var row_cnt = 0;
    var tick = function () {
        drawCircle(processed[row_cnt])
        console.log(row_cnt)
        row_cnt++
        
        // Terminating the process
        if (row_cnt < 25) {
            setTimeout(tick, tick_delay)
        }
    }
    setTimeout(tick, tick_delay)
});