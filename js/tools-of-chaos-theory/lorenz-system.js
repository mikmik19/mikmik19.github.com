var width = 500;
var height = 400;
var origin = [250, 250];
var scale = 4;
var pointData = [];
var trajectory = [];
var beta = 0;
var alpha = 0;
const loopIndex = 0;
var startAngle = Math.PI / 4;

var svg = d3
  .select("#lorenz-system")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", `0 0 ${width} ${height}`)
  .classed("svg-content-responsive", true)
  .call(
    d3
      .drag()
      .on("drag", dragged)
      .on("start", dragStart)
      .on("end", dragEnd)
  )
  .append("g");

var mx, my, mouseX, mouseY;

var point3d = d3
  ._3d()
  .x(function(d) {
    return d.x;
  })
  .y(function(d) {
    return d.y;
  })
  .z(function(d) {
    return d.z;
  })
  .origin(origin)
  .rotateY(startAngle)
  .rotateX(-startAngle)
  .scale(scale);

var trajectory3d = d3
  ._3d()
  .shape("LINE_STRIP")
  .origin(origin)
  .rotateY(startAngle)
  .rotateX(-startAngle)
  .scale(scale);

function processData(data) {
  var trajectoryLine = svg.selectAll("path.trajectory").data(data.trajectory);
  trajectoryLine
    .enter()
    .append("path")
    .attr("class", "_3d trajectory")
    .merge(trajectoryLine)
    .attr("stroke", lightColorUsed)
    .attr("stroke-width", 0.5)
    .attr("d", trajectory3d.draw)
    .exit()
    .remove();
}

function init() {
  d3.csv("/data/tools-of-chaos-theory/lorenz-trajectory.csv", function(error, data) {
    data.forEach(function(d, i) {
      const x = parseFloat(d.x);
      const y = parseFloat(d.y);
      const z = parseFloat(d.z);
      pointData.push({ x: x, y: y, z: z, id: "point_" + i });
      trajectory.push([x, y, z]);
    });

    var data = {
      points: point3d(pointData),
      trajectory: trajectory3d([trajectory])
    };

    processData(data);

    /* This initializes the simulation and runs it */
    var points = svg.selectAll("circle").data([data.points[loopIndex]]);
    points
      .enter()
      .append("circle")
      .attr("class", "_3d")
      .attr("cx", d => d.projected.x)
      .attr("cy", d => d.projected.y)
      .merge(points)
      .attr("r", 2)
      .attr("stroke", "black")
      .attr("fill", darkColorUsed)
      .attr("cx", d => d.projected.x)
      .attr("cy", d => d.projected.y);

    points.exit().remove();

    (function theLoop(loopIndex) {
      loopIndex++;
      setTimeout(function() {
        points = svg.selectAll("circle");

        points
          .data([data.points[loopIndex]])
          .transition()
          .duration(10)
          .attr("cx", d => d.projected.x)
          .attr("cy", d => d.projected.y);

        points.exit().remove();

        if (loopIndex < data.points.length - 1) {
          theLoop(loopIndex);
        } else {
          loopIndex = 0;
          theLoop(loopIndex);
        }
      }, 10);
    })(loopIndex);
  });
}

function dragStart() {
  mx = d3.event.x;
  my = d3.event.y;
}

function dragged() {
  mouseX = mouseX || 0;
  mouseY = mouseY || 0;
  beta = ((d3.event.x - mx + mouseX) * Math.PI) / 230;
  alpha = (((d3.event.y - my + mouseY) * Math.PI) / 230) * -1;
  var data = {
    points: point3d.rotateY(beta + startAngle).rotateX(alpha - startAngle)(
      pointData
    ),
    trajectory: trajectory3d
      .rotateY(beta + startAngle)
      .rotateX(alpha - startAngle)([trajectory])
  };
  processData(data);
}

function dragEnd() {
  mouseX = d3.event.x - mx + mouseX;
  mouseY = d3.event.y - my + mouseY;
}

init();
