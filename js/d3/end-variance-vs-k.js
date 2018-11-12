// ------------------------------------------------
// The next figure
// ------------------------------------------------
d3.json("../../../../data/endVarianceVsK.json", function(error, data) {
  console.log(data);
  drawAngleVsTime(data);
});
function drawAngleVsTime(data) {
  var margin = { top: 20, right: 20, bottom: 50, left: 50 };
  var height = 250;
  var width = 600;

  // Defining the scales
  xScale = d3
    .scaleLinear()
    .domain([0, 20])
    .range([margin.left, width - margin.right]);

  yScale = d3
    .scaleLinear()
    .domain([0, 2 * Math.PI])
    .range([height - margin.bottom, margin.top]);

  // Defining the axes
  xAxis = d3.axisBottom().scale(xScale);
  yAxis = d3.axisLeft().scale(yScale);

  // Drawing the canvas
  svg = d3
    .select("#angleVsTime")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Loop through the data to draw a bunch of lines
  var i = 0;
  data.oscillators.forEach(e => {
    line = d3
      .line()
      .x(d => xScale(d.step))
      .y(d => yScale(d.theta));

    svg
      .append("svg:path")
      .datum(e.osc)
      .attr("fill", "none")
      .attr("stroke", lightColorUsed)
      .attr("stroke-width", 1)
      .attr("opacity", 0.06)
      .attr("d", line)
      .attr("class", "oscillator")
      .attr("id", `oscillator_${i}`);
    i++;
  });

  // Draw the x axis
  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(xAxis);

  // Draw the y axis
  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis);

  svg
    .append("text")
    .attr("class", "axisLabel")
    .text("Time step")
    .attr("x", width / 2)
    .attr("y", height - 10)
    .style("text-anchor", "middle");

  svg
    .append("text")
    .attr("class", "axisLabel")
    .text("log C")
    .attr("transform", "rotate(-90)")
    .attr("y", 15)
    .attr("x", -height / 2)
    .style("text-anchor", "middle");
  // It would be cool to add a widget that lets me scale the
  // zoom on the x-axis

  d3.select("#oscSlider").on("input", function() {
    d3.selectAll("#oscSliderCounter").html(this.value);
    d3.selectAll(".oscillator")
      .attr("stroke", lightColorUsed)
      .attr("opacity", 0.06);

    d3.select(`#oscillator_${this.value}`)
      .attr("stroke", darkColorUsed)
      .attr("opacity", 1);
  });
}
