(function(){
	var svg = d3.select('#top_owners');

	/* loading and parsing the d */
	d3.csv('/data/top_owners.csv', parse, render);

	function parse(d){
		d.num_games_owned = parseFloat(d.num_games_owned);
		return d;
	}

	var num_games_owned = 'num_games_owned';
	var username = 'username';

	/* drawing the canvas */
	var margin = {
		left: 110,
		top: 50,
		right: 45,
		bottom: 30,
	};

	var outerWidth = parseInt(svg.attr('width'));
	var outerHeight = parseInt(svg.attr('height'));
	var innerWidth = outerWidth - margin.left - margin.right;
	var innerHeight = outerHeight - margin.top - margin.bottom;

	var g = svg.append('g')
		.attr('transform','translate(' + margin.left + ', ' + margin.top + ')');

	var xAxisG = g.append('g')
		.attr('class','axis')
	var yAxisG = g.append('g')
		.attr('class','axis')

	var xScale = d3.scale.linear()
		.range([0,innerWidth]);
	var yScale = d3.scale.linear()
		.range([0,innerHeight]);

	var xAxis = d3.svg.axis()
		.scale(xScale)
		.ticks([4])
		.orient('top');

	var yAxis = d3.svg.axis()
		.scale(yScale)
		.ticks([0])
		.orient('left');

	/* adding the x label */
	svg.append('text')
		.attr('x',margin.left + innerWidth/2)
		.attr('y',20)
		.style('text-anchor','middle')
		.text('Games owned');

	/* rendering the d */
	function render(data){
		xScale.domain(
			d3.extent([
				-0.5,
				d3.max(data, function(d) { return d.num_games_owned +1;})
			])
		);
		yScale.domain([0.5, data.length + 0.5]);

		xAxisG.call(xAxis);
		yAxisG.call(yAxis);

		var bar = g.selectAll('rect').data(data);

		bar.enter().append('text')
        	.attr('x',-5)
        	.attr('y', function(d,i){ return yScale(i) + 28;})
        	.text(function(d){ return d.username; } )
        	.style('text-anchor','end');

      	var gs = bar.enter().append('g')
      		.attr('class','bar')
					.on('click', function (d,i) {
						var elem = d3.select(this);
						elem.classed("selected", !elem.classed("selected"));
					});

		gs.append('rect')
			.attr('x',1)
			.attr('y', function(d,i){ return yScale(i) +14; } )
			.attr('height', innerHeight/12)
            .attr('width', function(d) {
							return xScale(d.num_games_owned);
						})
            .attr('fill', 'orange' )
            .attr('padding',2);
        gs.append('text')
        	.attr('x', function(d) {return xScale(d.num_games_owned) +5;})
        	.attr('y', function(d,i) {return yScale(i) +28;})
        	.attr('class','value')
        	.text( function(d) { return d.num_games_owned ;})
	}
})();
