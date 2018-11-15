(function() {
  d3.json("../../../../data/k_comparison.json", function(error, data) {
    // Initialize the figures
    drawCircle(data[0].circleSimulation);
    drawAngleVsTime(data[0].thetaVsTime);
    drawNormAngleVsTime(data[0].normThetaVsTime);

    d3.select("#kSlider").on("input", function() {
      var i = this.value;
      // Update the counter number
      d3.selectAll("#kSliderCounter").html(data[i].K);
      // Remove all figures
      removeFiguresAndUpdateAnimationButtons();
      // Redraw figures
      drawCircle(data[i].circleSimulation);
      drawAngleVsTime(data[i].thetaVsTime);
      drawNormAngleVsTime(data[i].normThetaVsTime);
    });
  });

  function removeFiguresAndUpdateAnimationButtons() {
    d3.select("#kComparisonStartSimulation").html("start");
    d3.select("#kComparisonAnimation").remove();
    d3.select("#kComparisonAngleVsTime").remove();
    d3.select("#kComparisonNormAngleVsTime").remove();
  }

  function drawAngleVsTime(data) {
    var margin = { top: 20, right: 20, bottom: 50, left: 50 };
    var windowWidth = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right;
    if (windowWidth > 400) {
      width = 400;
      height = 250;
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
      .select("#kComparison")
      .append("svg")
      .attr("id", "kComparisonAngleVsTime")
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
        .attr("class", "oscillatorK")
        .attr("id", `oscillatorK_${i}`);
      i++;
    });

    var xAxisEl = svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis);

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
      
    function resizeChart() {
      var windowWidth = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right;
      if (windowWidth > 400) {
        width = 400;
        height = 250;
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
      d3.selectAll(".oscillatorK").remove();
  
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
          .attr("class", "oscillatorK")
          .attr("id", `oscillatorK_${i}`);
        i++;
      });
    };
    
    // redraw chart on resize
    window.addEventListener('resize', resizeChart);
  }

  function drawCircle(data) {
    // Set the dimensions of the canvas / graph
    var margin = { top: 20, right: 20, bottom: 20, left: 20 };
    var width = 200 - margin.left - margin.right;
    var height = 200 - margin.top - margin.bottom;

    // Defining the scales
    var xScale = d3
      .scaleLinear()
      .range([0, width])
      .domain([-1, 1]);

    var yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([-1, 1]);

    // Adds the svg canvas
    var svg = d3
      .select("#kComparison")
      .append("div")
      .append("svg")
      .attr("id", "kComparisonAnimation")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    d3.selection.prototype.moveToFront = function() {
      return this.each(function() {
        this.parentNode.appendChild(this);
      });
    };

    // First I bind the data to circle elements
    function initializeSimulation() {
      svg
        .selectAll("circle")
        .data(data[0].thetas)
        .enter()
        .append("circle")
        .attr("class", "enter")
        .attr("r", 2)
        .attr("fill", lightColorUsed)
        .attr("opacity", 0.3)
        .attr("cx", d => xScale(Math.cos(d.theta)))
        .attr("cy", d => yScale(Math.sin(d.theta)))
        .on("click", function() {
          d3.select(this)
            .attr("fill", darkColorUsed)
            .attr("opacity", 1)
            .moveToFront();
        });
    }

    // Then I loop over the data and update the position
    function runSimulation() {
      let i = 0;
      var numSteps = data.length - 1;
      function updatePlot() {
        i++;
        stepData = data[i].thetas;
        svg
          .selectAll("circle")
          .data(stepData)
          .transition()
          .ease(d3.easeLinear)
          .duration(1000)
          .attr("class", "enter")
          .attr("cx", d => xScale(Math.cos(d.theta))) // These work, but interpolate (x,y) not angle
          .attr("cy", d => yScale(Math.sin(d.theta)));
        // .attrTween("cx", xTween) // These should interpolate angle, but don't wotk
        // .attrTween("cy", yTween) //
        if (i < numSteps && stopSimulation == false) {
          setTimeout(updatePlot, 1000);
        }
      }
      updatePlot();
    }
    initializeSimulation();
    stopSimulation = true;

    // ------------------------------------------------
    // Create the buttons
    // ------------------------------------------------
    d3.select("#kComparisonStartSimulation").on("click", function() {
      d3.select(this).html("restart");

      if (stopSimulation == true) {
        stopSimulation = false;
        svg.selectAll("circle").remove();
        initializeSimulation();
        runSimulation();
      }
    });

    d3.select("#kComparisonStopSimulation").on("click", function() {
      stopSimulation = true;
    });
  }

  function yTitleBasedOnHeight(height) {
    var yLabel;
    if (height >= 350) {
      yLabel = "Normalized Var(Theta)"
    }
    else {
      yLabel = "Norm. Var(Theta)"
    }
    return yLabel
  }

  function drawNormAngleVsTime(data) {
    var margin = { top: 20, right: 20, bottom: 50, left: 50 };
    var windowWidth = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right;
    if (windowWidth > 400) {
      width = 400;
      height = 250;
    } else {
      width = windowWidth;
      height = 0.5 * windowWidth;
    }
    var yTitle = yTitleBasedOnHeight(height)
    // Defining the scales
    var xScale = d3
      .scaleLinear()
      .domain([0, 20])
      .range([margin.left, width - margin.right]);

    var yScale = d3
      .scaleLinear()
      .domain(d3.extent(data.curve, d => d.var_theta))
      .range([height - margin.bottom, margin.top]);

    // Defining the axes
    var xAxis = d3.axisBottom().scale(xScale).ticks(5);
    var yAxis = d3.axisLeft().scale(yScale).ticks(5);

    // Drawing the canvas
    var svg = d3
      .select("#kComparison")
      .append("svg")
      .attr("id", "kComparisonNormAngleVsTime")
      .attr("width", width)
      .attr("height", height);

    // Drawing the line
    line = d3
      .line()
      .x(d => xScale(d.step))
      .y(d => yScale(d.var_theta));

    svg
      .append("svg:path")
      .datum(data.curve)
      .attr("fill", "none")
      .attr("stroke", lightColorUsed)
      .attr("stroke-width", 1)
      .attr("opacity", 1)
      .attr("d", line)
      .attr("id", "varNormThetaVsTimeLineK");

    // Drawing the midway point
    svg
      .selectAll("circle")
      .data([data.midpoint])
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("cx", d => xScale(d.step))
      .attr("cy", d => yScale(d.var_theta))
      .attr("fill", darkColorUsed)
      .attr("opacity", 0.3)
      .attr("id", "varNormThetaVsTimeCircleK");

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
      .text(yTitle)
      .attr("transform", "rotate(-90)")
      .attr("y", 15)
      .attr("x", -height / 2)
      .style("text-anchor", "middle");
    
    function resizeChart() {
      var windowWidth = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right;
      if (windowWidth > 400) {
        width = 400;
        height = 250;
      } else {
        width = windowWidth;
        height = 0.5 * windowWidth;
      }
      var yTitle = yTitleBasedOnHeight(height)

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
        .text(yTitle)

      // Remove the existing line
      d3.select("#varNormThetaVsTimeLineK").remove();
      d3.select("#varNormThetaVsTimeCircleK").remove();

      line = d3
        .line()
        .x(d => xScale(d.step))
        .y(d => yScale(d.var_theta));

      svg
        .append("svg:path")
        .datum(data.curve)
        .attr("fill", "none")
        .attr("stroke", lightColorUsed)
        .attr("stroke-width", 1)
        .attr("opacity", 1)
        .attr("d", line)
        .attr("id", "varNormThetaVsTimeLineK");

      // Drawing the midway point
      svg
        .selectAll("circle")
        .data([data.midpoint])
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("cx", d => xScale(d.step))
        .attr("cy", d => yScale(d.var_theta))
        .attr("fill", darkColorUsed)
        .attr("opacity", 0.3)
        .attr("id", "varNormThetaVsTimeCircleK");
    };
    
    // redraw chart on resize
    window.addEventListener('resize', resizeChart);
  }
})();
