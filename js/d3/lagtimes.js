(function () {
    (function (){
        d3.json("../../../../data/lagtimes.json", function(error, rawData) {
            for (var axesIdx=0; axesIdx<rawData.lagtime.length; axesIdx++) {
                (function () {
                    var width = 300;
                    var height = 200;
                    var origin = [150, 100]
                    var scale = 3
                    var trajectory = [];
                    var mx, my, mouseX, mouseY;
                    
                    d3.select("#lagtimes").append('p').text(`lagtime: ${rawData.lagtime[axesIdx].value}`)

                    var svg = d3.select("#lagtimes")
                                    .append('svg')
                                    .attr('width', width)
                                    .attr('height', height)
                                    .call(
                                        d3.drag()
                                            .on('drag', dragged)
                                            .on('start', dragStart)
                                            .on('end', dragEnd)
                                        )
                                    .append('g');

                    var trajectory3d = d3._3d()
                        .shape('LINE_STRIP')
                        .origin(origin)
                        .rotateY( startAngle)
                        .rotateX(-startAngle)
                        .scale(scale);

                    function processData(data){
                        var trajectoryLine = svg.selectAll('path.trajectory').data(data.trajectory);
                        trajectoryLine
                            .enter()
                            .append('path')
                            .attr('class', '_3d trajectory')
                            .merge(trajectoryLine)
                            .attr('stroke', 'green')
                            .attr('stroke-width', 0.5)
                            .attr('d', trajectory3d.draw)
                            .exit().remove();
                    }


                    for (var i=0; i<rawData.lagtime[axesIdx].x.length; i++){
                        d = rawData.lagtime[axesIdx]
                        trajectory.push([
                            parseFloat(d.x[i]),
                            parseFloat(d.y[i]),
                            parseFloat(d.z[i])
                        ]);
                    }
                    var data = {
                        trajectory: trajectory3d([trajectory])
                    };
                    processData(data);
                    
                    function dragStart(){
                        mx = d3.event.x;
                        my = d3.event.y;
                    }
                
                    function dragged(){
                        mouseX = mouseX || 0;
                        mouseY = mouseY || 0;
                        beta   = (d3.event.x - mx + mouseX) * Math.PI / 230 ;
                        alpha  = (d3.event.y - my + mouseY) * Math.PI / 230  * (-1);
                        var data = {
                            trajectory: trajectory3d.rotateY(beta + startAngle).rotateX(alpha - startAngle)([trajectory])
                        };
                        processData(data);
                    }
                
                    function dragEnd(){
                        mouseX = d3.event.x - mx + mouseX;
                        mouseY = d3.event.y - my + mouseY;
                    }
                })()
            };
        });
    })()
})()
