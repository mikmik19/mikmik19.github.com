(function(){
    var svg = d3.select('#Arcade_Trail_Game_Growth');

    var margin = {
        left: 90,
        top: 30,
        right: 30,
        bottom: 50,
    };

    var outerWidth = parseInt(svg.attr('width'));
    var outerHeight = parseInt(svg.attr('height'));
    var innerWidth = outerWidth - margin.left - margin.right;
    var innerHeight = outerHeight - margin.top - margin.bottom;

    var month = 'month';
    var num = 'num'
    var cum_num = 'cum_num';

    var g = svg.append('g')
        .attr('transform', 'translate('+ margin.left +', '+ margin.top +')');

    var xAxisG = g.append('g')
        .attr('transform', 'translate(0, ' + innerHeight + ')')
        .attr('class', 'axis');

    var yAxisG = g.append('g')
        .attr('class', 'axis');

    /** Define our scales. */
    var xScale = d3.scale.linear()
        .range([0, innerWidth]);
    var yScale = d3.scale.linear()
        .range([innerHeight, 0]);

    var xAxis = d3.svg.axis().scale(xScale).orient('bottom');
    var yAxis = d3.svg.axis().scale(yScale).orient('left');

    /* a-axis label */
    svg.append('text')
        .attr('x',outerWidth/2)
        .attr('y',outerHeight- margin.bottom/6)
        .style('anchor-text','middle')
        .text('Month of year');

    /* y-axis label */
    svg.append('text')
        .attr('transform','rotate(270)')
        .attr('x',-220)
        .attr('y',35)
        .style('anchor-text','middle')
        .text('Games in Arcade Trail');



    function render(d) {
        xScale.domain(d3.extent(d, function(d) { return d[month]; }));
        yScale.domain(d3.extent(d, function(d) { return d[cum_num]; }));

        xAxisG.call(xAxis);
        yAxisG.call(yAxis);

        /*
        var circles = g.selectAll('circle').data(data);

        circles.enter().append('circle')
            .attr('r', 5)
            .attr('class', 'dot')
            .attr('cx', function(d) { return xScale(d[month]); })
            .attr('cy', function(d) { return yScale(d[cum_num]); })
            .attr('fill', 'orange');

        circles.exit().remove();


        var line = d3.svg.line()
            .x(function(d) { return xScale(d[month]); })
            .y(function(d) { return yScale(d[cum_num]); });

        g.append('path')
            .datum(data)
            .attr('class', 'line')
            .attr('d', line)
            .attr('fill', 'orange');
        */

        var area = d3.svg.area()
            .x(function(d) { return xScale(d[month]); })
            .y0(innerHeight)
            .y1(function(d) { return yScale(d[cum_num]); });

        g.append('path')
            .datum(d)
            .attr('class','area')
            .attr('d',area)
            .attr('fill','orange');

        /* var bar = g.selectAll('rect').data(data);

        bar.enter().append('rect')
            .attr('x', function(d) { return xScale(d[month]) - 10; })
            .attr('y', function(d) {  return yScale(d[num]); } )
            .attr('width', 20)
            .attr('height', function(d) {  return innerHeight- yScale(d[num]); })
            .attr('fill', 'grey' )
            .attr('padding',2);

        bar.exit().remove(); */
    }

    function parse(d) {
        d[month] = parseFloat(d[month]);
        d[num] = parseFloat(d[num]);
        d[cum_num] = parseFloat(d[cum_num]);
        return d;
    }

    d3.csv('/data/arcade_trail_game_growth.csv', parse, render);
})();
