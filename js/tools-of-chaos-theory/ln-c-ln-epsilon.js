(function() {
    d3.csv("/data/tools-of-chaos-theory/ln_c_ln_epsilon.csv", function(data) {
      var margin = { top: 20, right: 20, bottom: 40, left: 45 };
      var windowWidth = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right;
      
      if (windowWidth > 600) {
        width = 600;
        height = 300;
      } else {
        width = windowWidth;
        height = 0.5 * windowWidth;
      }
  
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
        .attr("height", height)
        .attr("width", width)
  
      svg
        .append('g')      
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "ln-c-ln-epsilon")
        .attr("cx", d => xScale(Math.log(d.epsilon)))
        .attr("cy", d => yScale(Math.log(d.C)))
        .attr("r", 2)
        .attr("fill", darkColorUsed);
  
      var yAxisEl = svg
        .append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(yAxis);
  
      var xAxisEl = svg
        .append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(xAxis);
  
      var xAxisLabel =svg
        .append("text")
        .attr("class", "axisLabel")
        .text("log Epsilon")
        .attr("x", width / 2)
        .attr("y", height - 5)
        .style("text-anchor", "middle");
  
      var yAxisLabel = svg
        .append("text")
        .attr("class", "axisLabel")
        .text("log C")
        .attr("transform", "rotate(-90)")
        .attr("y", 15)
        .attr("x", -height / 2)
        .style("text-anchor", "middle");

      function resizeChart() {
        var windowWidth = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right;

        if (windowWidth > 600) {
          width = 600;
          height = 300;
        } else {
          width = windowWidth;
          height = 0.5 * windowWidth;
        }
        
        svg
          .attr("height", height)
          .attr("width", width)
  
        
        xScale.range([margin.left, width - margin.right]);
        xAxis.scale(xScale);
        xAxisEl
          .attr("transform", `translate(0, ${height - margin.bottom})`)
          .call(xAxis);

        yScale.range([height - margin.bottom, margin.top]);
        yAxis.scale(yScale);
        yAxisEl
          .attr("transform", `translate(${margin.left},0)`)
          .call(yAxis);

        xAxisLabel
          .attr("x", width / 2)
          .attr("y", height - 5)

         yAxisLabel
          .attr("y", 15)
          .attr("x", -height / 2)
        
        // Here I an removing the circles and redrawing them. It really 
        // Shoud be possible to simply change the data.
        d3.selectAll("circle.ln-c-ln-epsilon").remove();
        
        svg
          .append('g')      
          .selectAll("circle")
          .data(data)
          .enter()
          .append("circle")
          .attr("class", "ln-c-ln-epsilon")
          .attr("cx", d => xScale(Math.log(d.epsilon)))
          .attr("cy", d => yScale(Math.log(d.C)))
          .attr("r", 2)
          .attr("fill", darkColorUsed);
      }
    
      // redraw chart on resize
      window.addEventListener('resize', resizeChart);

    });
})();
