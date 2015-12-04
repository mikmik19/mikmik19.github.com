(function(){
    var svg = d3.select('#Arcade_Trail_Genre_Distribution');

    var margin = {
        left: 30,
        top: 30,
        right: 30,
        bottom: 30,
    };

    var outerWidth = parseInt(svg.attr('width'));
    var outerHeight = parseInt(svg.attr('height'));
    var innerWidth = outerWidth - margin.left - margin.right;
    var innerHeight = outerHeight - margin.top - margin.bottom;

    // The name of the columns from the CSV file that should be used
    // for the x and y coordinates respectively and the series.
    var xColumn = 'x';
    var yColumn = 'y';
    var seriesColumn = 's';

    var g = svg.append('g')
        .attr('transform', 'translate('+ margin.left +', '+ margin.top +')');

    var xAxisG = g.append('g')
        .attr('transform', 'translate(0, ' + innerHeight + ')')
        .attr('class', 'axis');

    var yAxisG = g.append('g')
        .attr('class', 'axis');

    var xScale = d3.scale.linear().range([0, innerWidth]);

    var yScale = d3.scale.linear().range([innerHeight, 0]);

    var seriesScale = d3.scale.ordinal()
        .range(['#1f77b4', '#ff7f0e', '#2ca02c']);

    var xAxis = d3.svg.axis().scale(xScale).orient('bottom');
    var yAxis = d3.svg.axis().scale(yScale).orient('left');

    function render(data) {
        // Set the domain of the scales (input ranges). d3.extend returns an array
        // with two elements representing the max and min of the given column.
        xScale.domain(d3.extent(data, function(d) { return d[xColumn]; }));
        yScale.domain(d3.extent(data, function(d) { return d[yColumn]; }));
        seriesScale.domain(data.map(function(d) { d[seriesColumn]; }));

        // Render our x and y axis
        xAxisG.call(xAxis);
        yAxisG.call(yAxis);

        // Bind the data
        var circles = g.selectAll('rect').data(data);

        // Create circle svg elements for each data entry
        circles.enter().append('rect')
            .attr('r', 5)
            .attr('class', 'dot')
            .attr('x', function(d) { return xScale(d[xColumn]); })
            .attr('y', function(d) { return yScale(d[yColumn]); })
            .attr('width', 10)
            .attr('height', function(d) { return innerHeight-yScale(d[yColumn]); })
            .attr('fill', function(d) { return seriesScale(d[seriesColumn]); });

        // ExitinnerHeight
        circles.exit().remove();
    }

    function parse(d) {
        d[xColumn] = parseFloat(d[xColumn]);
        d[yColumn] = parseFloat(d[yColumn]);
        return d;
    }

    d3.csv('/data/Arcade_Trail_Genre_Distribution.csv', parse, render);
})();
