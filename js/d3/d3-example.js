// Set the dimensions of the canvas / graph
var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 300 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// Set the ranges
var x = d3.scale.linear().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Scale the range of the data
x.domain([-1, 1]);
y.domain([-1, 1]);

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



function drawCircle(d) {

    var t = d3.transition()
      .duration(550)
      .ease("sin");

    var circles = svg.selectAll("circle")
        .data(d)

    circles
        .exit()
        .attr("class", "exit")
        .remove();

    circles
        .attr("class", "update")
        .transition(t)
            .attr("cx", function(d) { return x(d.x); })
            .attr("cy", function(d) { return y(d.y); })

    circles.enter()
        .append("circle")
        .attr("class", "enter")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.x); })
        .attr("cy", function(d) { return y(d.y); })
        .attr("fill", "green")
        .style("opacity", 0.15)
        .on('mouseover', function(d){
            d3.select(this)
                .attr("fill", "red")
                .attr("opacity", 1)
        })
        .on('mouseout', function(d){
            d3.select(this)
                .attr('fill', 'green')
                .attr('opacity', 0.15)
        })
}

function point(angle) {
    return {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
}

// Get the data
d3.csv("../../../../data/animation_data_theta.csv", function(error, data) {
    const keys = Object.keys(data[0]);
    const processed = data.map(row => keys.map(key => point(row[key])))
    var row_cnt = 0;
    var tick = function () {
        drawCircle(processed[row_cnt])
        // debugger;
        console.log(row_cnt)
        row_cnt++
        if (row_cnt < 100) {
            setTimeout(tick, 500)
        }
    }
    setTimeout(tick, 500)
});