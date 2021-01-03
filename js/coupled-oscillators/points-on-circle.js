(async function() {
  const data = await d3.json("/data/coupled-oscillators/animation_data_theta.json")

  // Set the dimensions of the canvas / graph
  var margin = { top: 20, right: 20, bottom: 20, left: 20 };
  var width = 300 - margin.left - margin.right;
  var height = 300 - margin.top - margin.bottom;

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
    .select("#pointsOnCircle")
    .append("svg")
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
      .data(data.steps[0].thetas)
      .enter()
      .append("circle")
      .attr("class", "enter")
      .attr("r", 3.5)
      .attr("fill", 'var(--secondary-color)')
      .attr("opacity", 0.3)
      .attr("cx", d => xScale(Math.cos(d.theta)))
      .attr("cy", d => yScale(Math.sin(d.theta)))
      .on("click", function() {
        d3.select(this)
          .attr("fill", 'var(--primary-color)')
          .attr("opacity", 1)
          .moveToFront();
      });

    svg
      .append("text")
      .attr("id", "stepCounter")
      .text("step 0")
      .attr("x", width / 2 - 20)
      .attr("y", height / 2);
  }
  // Then I loop over the data and update the position
  function runSimulation() {
    let i = 0;
    var numSteps = data.steps.length - 1;
    function updatePlot() {
      i++;
      svg
        .selectAll("circle")
        .data(data.steps[i].thetas)
        .transition()
        .ease(d3.easeLinear)
        .duration(1000)
        .attr("class", "enter")
        .attrTween("cx", xTween())
        .attrTween("cy", yTween());

      d3.selectAll("#stepCounter").text(`step ${i}`);

      if (i < numSteps && stopSimulation == false) {
        setTimeout(updatePlot, 1000);
      }
    }
    updatePlot();
  }
  initializeSimulation();

  // ------------------------------------------------
  // Create the buttons
  // ------------------------------------------------
  d3.select("#startSimulation").on("click", function() {
    d3.select(this).html("restart");

    if (stopSimulation == true) {
      stopSimulation = false;
      svg.selectAll("circle").remove();
      initializeSimulation();
      runSimulation();
      d3.select("#stopSimulation").html("stop");
    } else {
    }
  });

  d3.select("#stopSimulation").on("click", function() {
    stopSimulation = true;
  });

  // ------------------------------------------------
  // Defining helper functions
  // ------------------------------------------------
  function xTween(d) {
    return function(d) {
      var interpolate = d3.interpolate(d.theta, d.newTheta);
      return function(t) {
        d.newTheta = interpolate(t);
        return xScale(Math.cos(d.newTheta));
      };
    };
  }

  function yTween(d) {
    return function(d) {
      var interpolate = d3.interpolate(d.theta, d.newTheta);
      return function(t) {
        d.newTheta = interpolate(t);
        return yScale(Math.sin(d.newTheta));
      };
    };
  }
})();
