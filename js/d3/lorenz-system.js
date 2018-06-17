var origin = [50, 50]
var j = 1
var scale = 10
var scatter = []
var yLine = []
var xGrid = []
var beta = 0
var alpha = 0
var key = function(d){ return d.id; }
var startAngle = Math.PI/4;

var svg = d3.select("#lorenz-system").call(d3.drag().on('drag', dragged).on('start', dragStart).on('end', dragEnd)).append('g');
var mx, my, mouseX, mouseY;

var grid3d = d3._3d()
    .shape('GRID', 20)
    .origin(origin)
    .rotateY( startAngle)
    .rotateX(-startAngle)
    .scale(scale);

var point3d = d3._3d()
    .x(function(d){ return d.x; })
    .y(function(d){ return d.y; })
    .z(function(d){ return d.z; })
    .origin(origin)
    .rotateY( startAngle)
    .rotateX(-startAngle)
    .scale(scale);

var yScale3d = d3._3d()
    .shape('LINE_STRIP')
    .origin(origin)
    .rotateY( startAngle)
    .rotateX(-startAngle)
    .scale(scale);

function processData(data){
    /* ----------- GRID ----------- */
    var xGrid = svg.selectAll('path.grid').data(data[0], key);

    xGrid
        .enter()
        .append('path')
        .attr('class', '_3d grid')
        .merge(xGrid)
        .attr('stroke', 'grey')
        .attr('stroke-width', 0.3)
        .attr('fill', function(d){ return d.ccw ? 'white' : '#717171'; })
        .attr('fill-opacity', 0.9)
        .attr('d', grid3d.draw);

    xGrid.exit().remove();

    /* ----------- POINTS ----------- */
    var points = svg.selectAll('circle').data(data[1], key);

    points
        .enter()
        .append('circle')
        .attr('class', '_3d')
        .attr('opacity', 0)
        .attr('cx', posPointX)
        .attr('cy', posPointY)
        .merge(points)
        .attr('r', 2)
        .attr('stroke', 'black')
        .attr('fill', 'green')
        .attr('opacity', 1)
        .attr('cx', posPointX)
        .attr('cy', posPointY);

    points.exit().remove();

    /* ----------- y-Scale ----------- */
    var yScale = svg.selectAll('path.yScale').data(data[2]);

    yScale
        .enter()
        .append('path')
        .attr('class', '_3d yScale')
        .merge(yScale)
        .attr('stroke', 'black')
        .attr('stroke-width', .5)
        .attr('d', yScale3d.draw);

    yScale.exit().remove();

    d3.selectAll('._3d').sort(d3._3d().sort);
}

function posPointX(d){
    return d.projected.x;
}

function posPointY(d){
    return d.projected.y;
}

function init(){
    xGrid = [], scatter = [], yLine = [];
    d3.csv("../../../../data/lorenz-trajectory.csv", function(error, data) {
        data.forEach(function(d, i) {
            const x = parseFloat(d.x);
            const y = parseFloat(d.y);
            const z = parseFloat(d.z);
            // xGrid.push([x, y, z]);
            scatter.push({x: x, y: y, z: z, id: 'point_'+i });    
        })
        d3.range(1, 11, 1).forEach(function(d){ yLine.push([-j, -d, -j]); });

        var data = [
            grid3d(xGrid),
            point3d(scatter),
            yScale3d([yLine])
        ];

        processData(data);
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
    var data = [
            grid3d.rotateY(beta + startAngle).rotateX(alpha - startAngle)(xGrid),
        point3d.rotateY(beta + startAngle).rotateX(alpha - startAngle)(scatter),
        yScale3d.rotateY(beta + startAngle).rotateX(alpha - startAngle)([yLine]),
    ];
    processData(data, 0);
}

function dragEnd(){
    mouseX = d3.event.x - mx + mouseX;
    mouseY = d3.event.y - my + mouseY;
}

init();