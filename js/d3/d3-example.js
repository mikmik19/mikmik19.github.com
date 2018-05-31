// Set the dimensions of the canvas / graph
var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 300 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// Set the ranges
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// Scale the range of the data
x.domain([-1, 1]);
y.domain([-1, 1]);

// Define the axes
var xAxis = d3.axisBottom().scale(x).ticks(5);
var yAxis = d3.axisLeft().scale(y).ticks(5);
    
// Adds the svg canvas
var svg = d3.select("#d3-example")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");




function drawCircle(d) {

    var t = d3.transition(d)
      .duration(550)
      // see http://andyshora.com/tweening-shapes-paths-d3-js.html on tweening
      // and https://stackoverflow.com/questions/38841523/ for example
      // The idea is to use tween and a custom extrapolator to get the 
      // intermediate x and y values
      
      // I should probably use http://bl.ocks.org/mbostock/5100636
      .attrTween("cx", function(x, y) {
        var startAngle = Math.atan2(y, x);
        var endAngle;
        var interpolate = d3.interpolate(d.endAngle, newAngle);
        return function(t) {
            d.endAngle = interpolate(t);
            return arc(d);
        };
    });
    //   .ease("sin");

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
        console.log(row_cnt)
        row_cnt++
        if (row_cnt < 100) {
            setTimeout(tick, 1500)
        }
    }
    setTimeout(tick, 1500)
});