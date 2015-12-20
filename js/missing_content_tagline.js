(function(){
    var svg = d3.select('#missing_content_tagline');
    
    var dataset = {
        apples: [53245, 28479]
    };

    var margin = {
        left: 15,
        top: 15,
        right: 15,
        bottom: 15,
    };

    var outerWidth = parseInt(svg.attr('width'));
    var outerHeight = parseInt(svg.attr('height'));
    var innerWidth = outerWidth - margin.left - margin.right;
    var innerHeight = outerHeight - margin.top - margin.bottom;
    var radius = Math.min(innerWidth, innerHeight) / 2;

    var color = ['#ff9900','#ffffff']; /* d3.scale.category10(); */

    var pie = d3.layout.pie();

    var arc = d3.svg.arc()
        .innerRadius(radius - 25)
        .outerRadius(radius );

    var path = svg.selectAll("path")
        .data(pie(dataset.apples))
        .enter()
        .append("path")
        .attr("fill", function(d,i) { return color[i]; }) /* function(d, i) { return color(i); } */
        .attr("d", arc)
        .attr('transform', 'translate(' + outerWidth/2 + ',' + outerHeight/2 + ')');

    svg.append('text')
        .attr('x',outerWidth/2 + margin.right)
        .attr('y',margin.top)
        .style('anchor-text','end')
        .text('Have');

    svg.append('text')
        .attr('x',0)
        .attr('y',margin.top)
        .style('anchor-text','end')
        .text('Missing');

    /* TODO: 
        - adding numbers and legends figure 
        - load the data from the csv file 'missing_content_tagline.csv'
    */
})();
