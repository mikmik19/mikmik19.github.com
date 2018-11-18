// ------------------------------------------------
// The next figure
// ------------------------------------------------
(function() {
  d3.json("../../../../data/angle-vs-time.json", function(error, data) {
    drawAngleVsTime(data);
  });
  function drawAngleVsTime(data) {
    var margin = { top: 20, right: 20, bottom: 50, left: 50 };
    var windowWidth = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right;
    if (windowWidth > 600) {
      width = 600;
      height = 350;
    } else {
      width = windowWidth;
      height = 0.5 * windowWidth;
    }
  
    // Defining the scales
    var xScale = d3
      .scaleLinear()
      .domain([0, 20])
      .range([margin.left, width - margin.right]);
  
    var yScale = d3
      .scaleLinear()
      .domain([0, 2 * Math.PI])
      .range([height - margin.bottom, margin.top]);
  
    // Defining the axes
    var xAxis = d3.axisBottom().scale(xScale).ticks(5);
    var yAxis = d3.axisLeft().scale(yScale).ticks(5);
  
    // Drawing the canvas
    var svg = d3
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
    var xAxisEl = svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis);
  
    // Draw the y axis
    var yAxisEl = svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis);
  
    var xAxisLabel = svg
      .append("text")
      .attr("class", "axisLabel")
      .text("Time step")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .style("text-anchor", "middle");
  
    var yAxisLabel = svg
      .append("text")
      .attr("class", "axisLabel")
      .text("Theta")
      .attr("transform", "rotate(-90)")
      .attr("y", 15)
      .attr("x", -height / 2)
      .style("text-anchor", "middle");
    
    // It would be cool to add a widget that lets me scale the
    // zoom on the x-axis´
    d3.select("#oscSlider").on("input", function() {
      d3.selectAll("#oscSliderCounter").html(this.value);
      d3.selectAll(".oscillator")
        .attr("stroke", lightColorUsed)
        .attr("opacity", 0.06);
  
      d3.select(`#oscillator_${this.value}`)
        .attr("stroke", darkColorUsed)
        .attr("opacity", 1);
    });
  
    function resizeChart() {
      var windowWidth = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right;
      if (windowWidth > 600) {
        width = 600;
        height = 350;
      } else {
        width = windowWidth;
        height = 0.5 * windowWidth;
      }
  
      svg
        .attr("height", height)
        .attr("width", width)
      
      xScale.range([margin.left, width - margin.right]);
      xAxis.scale(xScale).ticks(5);
      
      xAxisEl
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(xAxis);
  
      yScale.range([height - margin.bottom, margin.top]);
      yAxis.scale(yScale).ticks(5);
      
      yAxisEl
        .attr("transform", `translate(${margin.left},0)`)
        .call(yAxis);
  
      xAxisLabel
        .attr("x", width / 2)
        .attr("y", height - 5)
  
      yAxisLabel
        .attr("y", 15)
        .attr("x", -height / 2)
  
      // Remove the existing line
      d3.selectAll(".oscillator").remove();
  
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
    };
    
    // redraw chart on resize
    window.addEventListener('resize', resizeChart);
  }
})();
