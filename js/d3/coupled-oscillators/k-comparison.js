(function() {
  d3.json("../../../../data/k_comparison.json", function(error, data) {
    // Initialize the figures
    var circleSvg = drawCircle(data[0].circleSimulation);
    initializeSimulation(data[0].circleSimulation, circleSvg);
    drawAngleVsTime(data[0].thetaVsTime);
    drawNormAngleVsTime(data[0].normThetaVsTime);

    d3.select("#kSlider").on("input", function() {
      var i = this.value;
      // Update the counter number
      d3.selectAll("#kSliderCounter").html(data[i].K);

      // Remove all figures
      removeFiguresAndUpdateAnimationButtons();

      // Redraw figures
      var circleSvg = drawCircle(data[i].circleSimulation);
      var angleSvg = drawAngleVsTime(data[i].thetaVsTime);
      var normThetaSvg = drawNormAngleVsTime(data[i].normThetaVsTime);

      // Update the effect of the buttons
      d3.select("#kComparisonStartSimulation").on("click", function() {
        d3.select(this).html("restart");

        if (stopSimulation == true) {
          stopSimulation = false;

          circleSvg.selectAll("circle").remove();

          initializeSimulation(data[i].circleSimulation, circleSvg);
          runSimulation(data[i].circleSimulation, circleSvg);
          runThetaSimulation(data[i].circleSimulation, angleSvg);
          runNormThetaSimulation(data[i].normThetaVsTime, normThetaSvg);
        }
      });

      d3.select("#kComparisonStopSimulation").on("click", function() {
        stopSimulation = true;
      });
    });

    // Create the buttons
    d3.select("#kComparisonStartSimulation").on("click", function() {
      d3.select(this).html("restart");

      if (stopSimulation == true) {
        stopSimulation = false;

        circleSvg.selectAll("circle").remove();

        initializeSimulation(data[0].circleSimulation, circleSvg);
        runSimulation(data[0].circleSimulation, circleSvg);
        runThetaSimulation(data[0].circleSimulation, angleSvg);
        runNormThetaSimulation(data[0].normThetaVsTime, normThetaSvg);
      }
    });

    d3.select("#kComparisonStopSimulation").on("click", function() {
      stopSimulation = true;
    });

    function removeFiguresAndUpdateAnimationButtons() {
      d3.select("#kComparisonStartSimulation").html("start");
      d3.select("#kComparisonAnimation").remove();
      d3.select("#kComparisonAngleVsTime").remove();
      d3.select("#kComparisonNormAngleVsTime").remove();
    }

    function drawCircle(data) {
      var margin = { top: 20, right: 20, bottom: 20, left: 20 };
      var width = 200 - margin.left - margin.right;
      var height = 200 - margin.top - margin.bottom;

      var circleSvg = d3
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

      initializeSimulation(data, circleSvg);
      stopSimulation = true;

      return circleSvg;
    }

    function initializeSimulation(data, circleSvg) {
      var margin = { top: 20, right: 20, bottom: 20, left: 20 };
      var width = 200 - margin.left - margin.right;
      var height = 200 - margin.top - margin.bottom;

      var xScale = d3
        .scaleLinear()
        .range([0, width])
        .domain([-1, 1]);

      var yScale = d3
        .scaleLinear()
        .range([height, 0])
        .domain([-1, 1]);

      circleSvg
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

    function runSimulation(data, circleSvg) {
      var margin = { top: 20, right: 20, bottom: 20, left: 20 };
      var width = 200 - margin.left - margin.right;
      var height = 200 - margin.top - margin.bottom;

      var xScale = d3
        .scaleLinear()
        .range([0, width])
        .domain([-1, 1]);

      var yScale = d3
        .scaleLinear()
        .range([height, 0])
        .domain([-1, 1]);

      let i = 0;
      var numSteps = data.length - 1;
      function updatePlot() {
        i++;
        stepData = data[i].thetas;
        circleSvg
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

    function drawAngleVsTime(data) {
      var margin = { top: 20, right: 20, bottom: 50, left: 50 };
      var height = 250;
      var width = 450;

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
      angleSvg = d3
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

        angleSvg
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
      angleSvg
        .append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(xAxis);

      // Draw the y axis
      angleSvg
        .append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(yAxis);

      angleSvg
        .append("text")
        .attr("class", "axisLabel")
        .text("Time step")
        .attr("x", width / 2)
        .attr("y", height - 10)
        .style("text-anchor", "middle");

      angleSvg
        .append("text")
        .attr("class", "axisLabel")
        .text("Theta")
        .attr("transform", "rotate(-90)")
        .attr("y", 15)
        .attr("x", -height / 2)
        .style("text-anchor", "middle");

      return angleSvg;
    }

    function runThetaSimulation(data, angleSvg) {
      var margin = { top: 20, right: 20, bottom: 50, left: 50 };
      var height = 250;
      var width = 450;

      // Defining the scales
      xScale = d3
        .scaleLinear()
        .domain([0, 20])
        .range([margin.left, width - margin.right]);

      yScale = d3
        .scaleLinear()
        .domain([0, 2 * Math.PI])
        .range([height - margin.bottom, margin.top]);

      angleSvg
        .selectAll("circle")
        .data(data[0].thetas)
        .enter()
        .append("circle")
        .attr("class", "enter")
        .attr("r", 1.5)
        .attr("fill", darkColorUsed)
        .attr("opacity", 0.3)
        .attr("cx", d => xScale([0]))
        .attr("cy", d => yScale(d.theta));

      let i = 0;
      var numSteps = data.length - 1;

      function updatePlotThetaPlot() {
        i++;
        angleSvg
          .selectAll("circle")
          .data(data[i].thetas)
          .transition()
          .ease(d3.easeLinear)
          .duration(1000)
          .attr("class", "enter")
          .attr("cx", d => xScale([i]))
          .attr("cy", d => yScale(d.theta));

        if (i < numSteps && stopSimulation == false) {
          setTimeout(updatePlotThetaPlot, 1000);
        }
      }
      updatePlotThetaPlot();
    }

    function drawNormAngleVsTime(data) {
      var margin = { top: 20, right: 20, bottom: 50, left: 50 };
      var height = 250;
      var width = 450;

      // Defining the scales
      xScale = d3
        .scaleLinear()
        .domain([0, 20])
        .range([margin.left, width - margin.right]);

      yScale = d3
        .scaleLinear()
        .domain(d3.extent(data.curve, d => d.var_theta))
        .range([height - margin.bottom, margin.top]);

      // Defining the axes
      xAxis = d3.axisBottom().scale(xScale);
      yAxis = d3.axisLeft().scale(yScale);

      // Drawing the canvas
      normThetaSvg = d3
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

      normThetaSvg
        .append("svg:path")
        .datum(data.curve)
        .attr("fill", "none")
        .attr("stroke", lightColorUsed)
        .attr("stroke-width", 1.5)
        .style("opacity", 0.8)
        .attr("d", line);

      // Drawing the midway point if it isn't 0
      if (data.midpoint.step != 0) {
        normThetaSvg
          .selectAll("circle")
          .data([data.midpoint])
          .enter()
          .append("circle")
          .attr("r", 5)
          .attr("cx", d => xScale(d.step))
          .attr("cy", d => yScale(d.var_theta))
          .attr("fill", darkColorUsed)
          .attr("opacity", 0.3);
      }

      // Draw the x axis
      normThetaSvg
        .append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(xAxis);

      // Draw the y axis
      normThetaSvg
        .append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(yAxis);

      normThetaSvg
        .append("text")
        .attr("class", "axisLabel")
        .text("Time step")
        .attr("x", width / 2)
        .attr("y", height - 10)
        .style("text-anchor", "middle");

      normThetaSvg
        .append("text")
        .attr("class", "axisLabel")
        .text("Normalized Var Theta")
        .attr("transform", "rotate(-90)")
        .attr("y", 15)
        .attr("x", -height / 2)
        .style("text-anchor", "middle");

      return normThetaSvg;
    }

    function runNormThetaSimulation(data, normThetaSvg) {
      var margin = { top: 20, right: 20, bottom: 50, left: 50 };
      var height = 250;
      var width = 450;

      // Defining the scales
      var xScale = d3
        .scaleLinear()
        .domain([0, 20])
        .range([margin.left, width - margin.right]);

      var yScale = d3
        .scaleLinear()
        .domain(d3.extent(data.curve, d => d.var_theta))
        .range([height - margin.bottom, margin.top]);

      normThetaSvg
        .selectAll("circle #simulationPoint")
        .data([data.curve[0]])
        .enter()
        .append("circle")
        .attr("id", "simulationPoint")
        .attr("r", 2)
        .attr("cx", d => xScale(d.step))
        .attr("cy", d => yScale(d.var_theta))
        .attr("fill", darkColorUsed)
        .attr("opacity", 0.8);

      let i = 0;
      var numSteps = data.curve.length - 1;

      function updatePlotThetaPlot() {
        i++;
        normThetaSvg
          .select("circle#simulationPoint")
          .data([data.curve[i]])
          .transition()
          .ease(d3.easeLinear)
          .duration(1000)
          .attr("class", "enter")
          .attr("cx", d => xScale(d.step))
          .attr("cy", d => yScale(d.var_theta));

        if (i < numSteps && stopSimulation == false) {
          setTimeout(updatePlotThetaPlot, 1000);
        }
      }
      updatePlotThetaPlot();
    }
  });
})();
