(function() {
  d3.csv("../../../../data/ln_c_ln_epsilon.csv", function(data) {
    var margin = { top: 20, right: 20, bottom: 40, left: 45 };
    var height = 300;
    var width = 600;

    var xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, d => parseFloat(Math.log(d.epsilon))))
      .range([margin.left, width - margin.right]);

    var yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, d => parseFloat(Math.log(d.C))))
      .range([height - margin.bottom, margin.top]);

    var xAxis = d3
      .axisBottom()
      .scale(xScale)
      .ticks(5);
    var yAxis = d3
      .axisLeft()
      .scale(yScale)
      .ticks(5);

    var svg = d3
      .select("#ln_c_ln_epsilon")
      .attr(
        "style",
        `padding-bottom: ${Math.ceil(height * 100 / width)}%`
      )
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("ViewBox", `0 0 ${width} ${height}`)
      .classed("svg-content-responsive", true)

    svg
      .append('g')      
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(Math.log(d.epsilon)))
      .attr("cy", d => yScale(Math.log(d.C)))
      .attr("r", 2)
      .attr("fill", darkColorUsed);

    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis);

    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis);

    svg
      .append("text")
      .attr("class", "axisLabel")
      .text("log Epsilon")
      .attr("x", width / 2)
      .attr("y", height - 5)
      .style("text-anchor", "middle");

    svg
      .append("text")
      .attr("class", "axisLabel")
      .text("log C")
      .attr("transform", "rotate(-90)")
      .attr("y", 15)
      .attr("x", -height / 2)
      .style("text-anchor", "middle");
  });
})();
