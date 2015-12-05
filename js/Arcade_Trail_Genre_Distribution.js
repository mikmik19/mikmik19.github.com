(function(){
    var svg = d3.select('#Arcade_Trail_Genre_Distribution');

    var margin = {
        left: 100,
        top: 50,
        right: 30,
        bottom: 30,
    };

    var outerWidth = parseInt(svg.attr('width'));
    var outerHeight = parseInt(svg.attr('height'));
    var innerWidth = outerWidth - margin.left - margin.right;
    var innerHeight = outerHeight - margin.top - margin.bottom;

    var ID = 'ID';
    var Num_games = 'Num_Games';

    var g = svg.append('g')
        .attr('transform', 'translate('+ margin.left +', '+ margin.top +')');

    var xAxisG = g.append('g')
        .attr('class', 'axis');

    var yAxisG = g.append('g')
        .attr('class', 'axis');

    var xScale = d3.scale.linear()
        .range([0,innerWidth]);
    
    var yScale = d3.scale.linear()
        .range([0, innerHeight]);

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('top');
    
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .ticks([])
        .orient('left');
    
    svg.append("text")
        .attr("x",  outerWidth/2)
        .attr("y",  20)
        .style("text-anchor", "middle")
        .text("Number of games in genre");


    function render(data) {
        xScale.domain(d3.extent(data, function(d) { return d[Num_games]; }));
        yScale.domain([d3.min(data, function(d) { return d[ID]; })-0.5, d3.max(data, function(d) { return d[ID]; })+0.5]);

        xAxisG.call(xAxis);
        yAxisG.call(yAxis);

        var bar = g.selectAll('rect').data(data);

        bar.enter().append('rect')
            .attr('x', 2)
            .attr('y', function(d) { return yScale(d[ID]) - 9; })
            .attr('height', innerHeight/33)
            .attr('width', function(d) { return xScale(d[Num_games]); })
            .attr('fill', 'orange' )
            .attr('padding',2);

        bar.enter().append('text')             
        .attr('x', -margin.left)
        .attr('y', function(d) { return yScale(d[ID])+7 })
        .text("test");

        bar.exit().remove();
    }

    function parse(d) {
        d[Num_games] = parseFloat(d[Num_games]);
        d[ID] = parseFloat(d[ID]);
    //    d[Genre] = parseFloat(d[Genre]);
        return d;
    }

    d3.csv('/data/Genres_Summary.csv', parse, render);
})();
