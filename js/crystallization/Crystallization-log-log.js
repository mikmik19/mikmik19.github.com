(function(){
    var svg = d3.select('#Crystallization-log-log');

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

    var frequency = 'frequency';
    var dielectric_loss = 'dielectric_loss';

    var g = svg.append('g')
        .attr('transform', 'translate('+ margin.left +', '+ margin.top +')');

    var xAxisG = g.append('g')
        .attr('transform', 'translate(0, ' + innerHeight + ')')
        .attr('class', 'axis');

    var yAxisG = g.append('g')
        .attr('class', 'axis');

    /** Define our scales. */
    var xScale = d3.scale.log()
        .range([0, innerWidth]);
    var yScale = d3.scale.log()
        .range([innerHeight, 0]);

    var xAxis = d3.svg.axis().scale(xScale).orient('bottom');
    var yAxis = d3.svg.axis().scale(yScale).orient('left');

    /* a-axis label */
    svg.append('text')
        .attr('x',outerWidth/2)
        .attr('y',outerHeight- margin.bottom/6)
        .style('anchor-text','middle')
        .text('Frequency');

    /* y-axis label */
    svg.append('text')
        .attr('transform','rotate(270)')
        .attr('x',-220)
        .attr('y',35)
        .style('anchor-text','middle')
        .text('Dielectric loss');

    function render(d) {
        xScale.domain(d3.extent(d, function(d) { return d[frequency]; }));
        yScale.domain(d3.extent(d, function(d) { return d[dielectric_loss]; }));

        xAxisG.call(xAxis);
        yAxisG.call(yAxis);

        var circles = g.selectAll('circle').data(d);

        circles.enter().append('circle')
            .attr('r', 5)
            .attr('class', 'dot')
            .attr('cx', function(d) { return xScale(d[frequency]); })
            .attr('cy', function(d) { return yScale(d[dielectric_loss]); });

        circles.exit().remove();
    }

    function parse(d) {
        d[frequency] = parseFloat(d[frequency]);
        d[dielectric_loss] = parseFloat(d[dielectric_loss]);
        return d;
    }

    d3.csv('/data/crystallization/crystallization.csv', parse, render);
})();
