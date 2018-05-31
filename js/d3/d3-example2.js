var tau = 2 * Math.PI;

var arc = d3.arc()
    .innerRadius(50)
    .outerRadius(150)
    .startAngle(0);

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var background = g.append("path")
    .datum({endAngle: tau})
    .style("fill", "#ddd")
    .attr("d", arc);

var foreground = g.append("path")
    .datum({endAngle: 0.127 * tau})
    .style("fill", "orange")
    .attr("d", arc);

d3.interval(function() {
  foreground.transition()
      .duration(750)
      .attrTween("d", arcTween(Math.random() * tau));
}, 1500);

function arcTween(newAngle) {
  return function(d) {
    var interpolate = d3.interpolate(d.endAngle, newAngle);
    return function(t) {
      d.endAngle = interpolate(t);
      return arc(d);
    };
  };
}