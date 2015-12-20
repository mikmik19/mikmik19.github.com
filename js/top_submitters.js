(function(){
	var svg = d3.select('#top_submitters');

	/* loading and parsing the d */
	d3.csv('/data/top_submitters.csv', parse, render);

	function parse(data){
		data[num_submits] = parseFloat(data[num_submits]);
		data[id] = parseFloat(data[id]);
		return data;
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
		.text('Submissions');

	/* rendering the d */
	function render(data){
		xScale.domain(
			d3.extent(data, function(data) { return data[num_submits]; })
			);
		yScale.domain([
			d3.min(data, function(data) { return data[id] -0.5; } ),
			d3.max(data, function(data) { return data[id] +0.5; } )
			]);

		xAxisG.call(xAxis);
		yAxisG.call(yAxis);

		var bar = g.selectAll('rect').data(data);

		bar.enter().append('rect')
			.attr('x',1)
			.attr('y', function(data){ return yScale(data[id]) -8; } )
			.attr('height', innerHeight/11)
            .attr('width', function(data) { return xScale(data[num_submits]); })
            .attr('fill', 'orange' )
            .attr('padding',2);

        bar.enter().append('text')
        	.attr('x',-5)
        	.attr('y', function(data){ return yScale(data[id]) +6;})
        	.text(function(data){ return data[username]; } )
        	.style('text-anchor','end');    
	}
})();