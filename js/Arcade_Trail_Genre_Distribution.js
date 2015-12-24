(function(){
    var svg = d3.select('#Arcade_Trail_Genre_Distribution');

    var margin = {
        left: 180,
        top: 50,
        right: 80,
        bottom: 30,
    };

    var outerWidth = parseInt(svg.attr('width'));
    var outerHeight = parseInt(svg.attr('height'));
    var innerWidth = outerWidth - margin.left - margin.right;
    var innerHeight = outerHeight - margin.top - margin.bottom;

    var id = 'id';
    var num_games = 'num_games';
    var genre = 'genre';
    var num_votes = 'num_votes';

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
        .ticks([0])
        .orient('left');

    svg.append("text")
        .attr("x",  outerWidth/2 + margin.left/2)
        .attr("y",  20)
        .style("text-anchor", "middle")
        .text("Number of games in genre");


    function render(data) {
        xScale.domain(d3.extent(data, function(d) { return d[num_games]; }));
        yScale.domain([0.5, data.length + 0.5]);

        xAxisG.call(xAxis);
        yAxisG.call(yAxis);

        var bar = g.selectAll('rect').data(data);

        bar.enter().append('text')
            .attr('x', -5)
            .attr('y', function(d,i) {return yScale(i)+ 30;})
            .text(function(d) {return d[genre]})
            .style("text-anchor", "end");

        var gs = bar.enter().append('g')
            .attr('class', 'bar')
            .on('click', function (d,i) {
              var elem = d3.select(this);
              elem.classed("selected", !elem.classed("selected"));
            });

        gs.append('rect')
            .attr('x', 2)
            .attr('y',  function(d,i) {return yScale(i)+14;} )
            .attr('height', innerHeight/37)
            .attr('width', function(d) { return xScale(d[num_games]); })
            .attr('padding',2);

        gs.append('text')
            .attr('x', function(d) { return xScale(d[num_games]) +5 ;})
            .attr('y', function(d,i) {return yScale(i)+30;})
            .attr('class', 'value')
            .text( function(d) {return d.num_games ;} );

        bar.exit().remove();



        /*bar.enter().append('rect')
            .attr('x', 2)
            .attr('y', function(d) { return yScale(d[id])-3; })
            .attr('height', innerHeight/66)
            .attr('width', function(d) { return xScale(d[num_votes]); })
            .attr('fill', 'grey' )
            .attr('padding',2); */
    }

    function parse(d) {
        d[num_games] = parseFloat(d[num_games]);
        d[id] = parseFloat(d[id]);
        d[num_votes] = parseFloat(d[num_votes]);
        return d;
    }

    d3.csv('/data/arcade_trail_genre_distribution.csv', parse, render);
})();
