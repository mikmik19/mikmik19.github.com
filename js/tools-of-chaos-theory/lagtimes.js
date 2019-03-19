(function() {
    d3.json("../../../../data/tools-of-chaos-theory/lagtimes.json", function(error, rawData) {
      for (var axesIdx = 0; axesIdx < rawData.lagtime.length; axesIdx++) {
        (function() {
          var windowWidth = parseInt(d3.select('body').style('width'), 10);
          if (windowWidth > 600) {
            width = 300;
            height = 200;
          } else {
            width = 0.4 * windowWidth;
            height = 0.66 * width;
          }
          
          var origin = [width/2, height/2];
          var scale = 3;
          var trajectory = [];
          var mx, my, mouseX, mouseY;
          
          // I want to have the figures in a grid.
          cell = {};
          if (axesIdx % 2 == 0) {
            cell.alignment = "left";
            cellDiv = d3
              .select("#lagtimes")
              .append("div")
              .classed("svgContainer", true);
          } else {
            cell.alignment = "right";
          }

          // Create the div that holds the title and trajectory
          var div = cellDiv.append("div").classed(cell.alignment, true);

          // Add the title to the div
          div
            .append("div")
            .append("p")
            .text(`lagtime: ${rawData.lagtime[axesIdx].value}`);

          // Create the SVG that will hold the trajectory.
          var svg = div
            .append("svg")
            .attr("class", "lagtimeSvg")
            .attr("width", width)
            .attr("height", height)
            .call(
              d3
                .drag()
                .on("drag", dragged)
                .on("start", dragStart)
                .on("end", dragEnd)
            )
            .append("g");

          // Create the trajectory
          var trajectory3d = d3
            ._3d()
            .shape("LINE_STRIP")
            .origin(origin)
            .rotateY(startAngle)
            .rotateX(-startAngle)
            .scale(scale);

          // The function is used to draw the trajectory every time 
          // the SVG is dragged or the window is resized.
          function drawTrajectory(data) {
            var trajectoryLine = svg
              .selectAll("path.trajectory")
              .data(data.trajectory);
            
            trajectoryLine
              .enter()
              .append("path")
              .attr("class", 'lagtime')
              .attr("class", "_3d trajectory")
              .merge(trajectoryLine)
              .attr("stroke", lightColorUsed)
              .attr("stroke-width", 0.1)
              .attr("d", trajectory3d.draw)
              .exit()
              .remove();
          }

          for (var i = 0; i < rawData.lagtime[axesIdx].x.length; i++) {
            d = rawData.lagtime[axesIdx];
            trajectory.push([
              parseFloat(d.x[i]),
              parseFloat(d.y[i]),
              parseFloat(d.z[i])
            ]);
          }

          var data = {
            trajectory: trajectory3d([trajectory])
          };

          drawTrajectory(data);

          function dragStart() {
            mx = d3.event.x;
            my = d3.event.y;
          }

          // Updates the data when the SVG is dragged.
          function dragged() {
            mouseX = mouseX || 0;
            mouseY = mouseY || 0;
            beta = ((d3.event.x - mx + mouseX) * Math.PI) / 230;
            alpha = (((d3.event.y - my + mouseY) * Math.PI) / 230) * -1;
            var data = {
              trajectory: trajectory3d
                .rotateY(beta + startAngle)
                .rotateX(alpha - startAngle)([trajectory])
            };
            drawTrajectory(data);
          }

          function dragEnd() {
            mouseX = d3.event.x - mx + mouseX;
            mouseY = d3.event.y - my + mouseY;
          }

          function resizeChart() {
            var windowWidth = parseInt(d3.select('body').style('width'), 10);
            if (windowWidth > 600) {
              width = 300;
              height = 200;
              scale = 3;
            } else {
              width = 0.4 * windowWidth;
              height = 0.66 * width;
              scale = 2;
            }
                        
            d3.selectAll(".lagtimeSvg")
              .attr("width", width)
              .attr("height", height);

            var origin = [width/2, height/2]

            // Im creating a new 3d trajectory using the redefined scale and origin.
            trajectory3d = d3
                ._3d()
                .shape("LINE_STRIP")
                .origin(origin)
                .rotateY(startAngle)
                .rotateX(-startAngle)
                .scale(scale);
            
            // I need to update the data so it contains the ned 3d trajectory.
            var data = {
              trajectory: trajectory3d
                .rotateY(beta + startAngle)
                .rotateX(alpha - startAngle)([trajectory])
            };
            
            // Now I can redraw the data.
            drawTrajectory(data);
          }
      
          window.addEventListener('resize', resizeChart);
        })();
      }
    });    
})();
