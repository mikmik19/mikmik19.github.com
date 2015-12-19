(function(){
	var svg = d3.select('#top_submitters');

	/* loading and parsing the data */
	d3.csv('/data/top_submitters.csv', parse, render);

	function parse(d){
		d[num_submits] = parseFloat(d[num_submits]);
		d[id] = parseFloat(d[id]);
		return d;
	}
	
	var num_submits = 'num_submits';
	var id = 'id';
	var username = 'username';

	/* drawing the canvas */
	var margin = {
		left: 110,
		top: 50,
		right: 30,
		bottom: 30,
	};

	var outerWidth = parseInt(svg.attr('width'));
	var outerHeight = parseInt(svg.attr('height'));
	var innerWidth = outerWidth - margin.left - margin.right;
	var innerHeight = outerHeight - margin.top - margin.bottom;

	var graph = svg.append('graph')
		.attr('transform','translate(' + margin.left + ', ' + margin.top + ')');

	var xAxisG = graph.append('graph')
		.attr('class','axis')
	var yAxisG = graph.append('graph')
		.attr('class','axis')

	var xScale = d3.scale.linear()
		.range([0,innerWidth]);
	var yScale = d3.scale.linear()
		.range([0,innerHeight]);

	var xAxis = d3.svg.axis()
		.scale(xScale)
		.ticks([2])
		.orient('top');				

	var yAxis = d3.svg.axis()
		.scale(yScale)
		.ticks([0])
		.orient('left');

	/* rendering the data */
	function render(d){
		xScale.domain(
			d3.extent(data, function(d) { return d[num_submits]; })
			);
		yScale.domain([
			d3.min(data, function(d) { return d[id]; } ),
			d3.max(data, function(d) { return d[id]; } )
			]);

		xAxisG.call(xAxis);
		yAxisG.call(yAxis);

		var bar = graph.selectAll('rect').data(data);

		bar.enter().append('rect')
			.attr('x',1)
			.attr('y', function(d){ return yScale(d[id]); } )
			.attr('height', innerHeight/11)
            .attr('width', function(d) { return xScale(d[num_submits]); })
            .attr('fill', 'orange' )
            .attr('padding',2);
	}
})();