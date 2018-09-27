var origin = [250, 200]
var scale = 4
var scatter = []
var yLine = []
var xLine = []
var beta = 0
var alpha = 0
var key = function(d){ return d.id; }
const loopIndex = 0
var startAngle = Math.PI/4;

var svg = d3.select("#lorenz-system")
                .call(
                    d3.drag()
                        .on('drag', dragged)
                        .on('start', dragStart)
                        .on('end', dragEnd)
                    )
                .append('g');

var mx, my, mouseX, mouseY;

var point3d = d3._3d()
    .x(function(d){ return d.x; })
    .y(function(d){ return d.y; })
    .z(function(d){ return d.z; })
    .origin(origin)
    .rotateY( startAngle)
    .rotateX(-startAngle)
    .scale(scale);

var xScale3d = d3._3d()
    .shape('LINE_STRIP')
    .origin(origin)
    .rotateY( startAngle)
    .rotateX( -startAngle)
    .scale(scale);

var yScale3d = d3._3d()
    .shape('LINE_STRIP')
    .origin(origin)
    .rotateY( startAngle)
    .rotateX(-startAngle)
    .scale(scale);

var zScale3d = d3._3d()
    .shape('LINE_STRIP')
    .origin(origin)
    .rotateY( startAngle)
    .rotateX(-startAngle)
    .scale(scale);

var trajectory3d = d3._3d()
    .shape('LINE_STRIP')
    .origin(origin)
    .rotateY( startAngle)
    .rotateX(-startAngle)
    .scale(scale);

function processData(data){
    /* ----------- Trajectory path ----------- */
    var trajectoryLine = svg.selectAll('path.trajectory').data(data.trajectory);
    trajectoryLine
        .enter()
        .append('path')
        .attr('class', '_3d trajectory')
        .merge(trajectoryLine)
        .attr('stroke', 'green')
        .attr('stroke-width', 0.5)
        .attr('d', trajectory3d.draw);
    trajectoryLine.exit().remove();


    /* ----------- Scales ----------- */
    var xScale = svg.selectAll('path.xScale').data(data.xScale);
    xScale
        .enter()
        .append('path')
        .attr('class', '_3d xScale')
        .merge(xScale)
        .attr('stroke', 'red')
        .attr('stroke-width', .5)
        .attr('d', xScale3d.draw);
    xScale.exit().remove();
    
    var yScale = svg.selectAll('path.yScale').data(data.yScale);
    yScale
        .enter()
        .append('path')
        .attr('class', '_3d yScale')
        .merge(yScale)
        .attr('stroke', 'green')
        .attr('stroke-width', .5)
        .attr('d', yScale3d.draw);
    yScale.exit().remove();

    var zScale = svg.selectAll('path.zScale').data(data.zScale);
    zScale
        .enter()
        .append('path')
        .attr('class', '_3d zScale')
        .merge(zScale)
        .attr('stroke', 'blue')
        .attr('stroke-width', .5)
        .attr('d', zScale3d.draw);
    zScale.exit().remove();

    d3.selectAll('._3d').sort(d3._3d().sort);
}

function posPointX(d){
    return d.projected.x;
}

function posPointY(d){
    return d.projected.y;
}

function init(){
    scatter = [];
    trajectory = [];
    yLine = []; // Line indicating the view
    xLine = []
    zLine = []
    d3.csv("../../../../data/lorenz-trajectory.csv", function(error, data) {
        data.forEach(function(d, i) {
            // I Don't use all the points since this makes it laggy
            if (i<10000) {
                const x = parseFloat(d.x);
                const y = parseFloat(d.y);
                const z = parseFloat(d.z);
                scatter.push({x: x, y: y, z: z, id: 'point_'+i });
                trajectory.push([x, y, z]);
            }
        })

        d3.range(0, 10, 1).forEach(function(d){ 
            xLine.push([-d, -1, -1]); 
            yLine.push([-1, -d, -1]);
            zLine.push([-1, -1, -d]);
        });

        var data = {
            points: point3d(scatter),
            trajectory: trajectory3d([trajectory]),
            xScale: xScale3d([xLine]),
            yScale: yScale3d([yLine]),
            zScale: zScale3d([zLine])
        };
        processData(data);

        // I initialize the first point here
        var points = svg.selectAll('circle').data([data.points[loopIndex]], key);
        points
            .enter()
            .append('circle')
            .attr('class', '_3d')
            .attr('cx', posPointX)
            .attr('cy', posPointY)
            .merge(points)
            .attr('r', 2)
            .attr('stroke', 'black')
            .attr('fill', 'orange')
            .attr('cx', posPointX)
            .attr('cy', posPointY);
        points.exit().remove();

        // Making the transition that shows a point moving along the trajectory
        // I need this to have access to a global index that is not part of a 
        // function closure
        (function theLoop (loopIndex) {
            loopIndex++
            setTimeout(function() {
                svg.selectAll('circle')
                    .data([data.points[loopIndex]])
                    .transition().duration(10)
                    .attr('cx', posPointX)
                    .attr('cy', posPointY);

                if (loopIndex < data.points.length-1) {
                    theLoop(loopIndex)
                }
            }, 10);
        }
        )(loopIndex);
    });
}

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
            points: point3d.rotateY(beta + startAngle).rotateX(alpha - startAngle)(scatter),
            trajectory: trajectory3d.rotateY(beta + startAngle).rotateX(alpha - startAngle)([trajectory]),
            xScale: xScale3d.rotateY(beta + startAngle).rotateX(alpha - startAngle)([xLine]),
            yScale: yScale3d.rotateY(beta + startAngle).rotateX(alpha - startAngle)([yLine]),
            zScale: zScale3d.rotateY(beta + startAngle).rotateX(alpha - startAngle)([zLine])
    };
    processData(data, 0);
}

function dragEnd(){
    mouseX = d3.event.x - mx + mouseX;
    mouseY = d3.event.y - my + mouseY;
}

// Defining the buttons
d3.select('#reset_angle').on('click', function() {
    mx = 0;
    my = 0;
    mouseX = 0;
    moyseY = 0;
    alpha = 0;
    beta = 0;
    var data = {
        points: point3d.rotateY(startAngle).rotateX(startAngle)(scatter),
        trajectory: trajectory3d.rotateY(beta + startAngle).rotateX(alpha - startAngle)([trajectory]),
        xScale: xScale3d.rotateY(startAngle).rotateX(startAngle)([xLine]),
        yScale: yScale3d.rotateY(startAngle).rotateX(startAngle)([yLine]),
        zScale: zScale3d.rotateY(startAngle).rotateX(startAngle)([zLine])
    };
    processData(data);
})

init();