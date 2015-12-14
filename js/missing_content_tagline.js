(function(){
    var svg = d3.select('#missing_content_tagline');
    
    var dataset = {
        apples: [53245, 28479]
        };

    var width = parseInt(svg.attr('width'));
    var height = parseInt(svg.attr('height'));
    var radius = Math.min(width, height) / 2;

    var color = d3.scale.category20();

    var pie = d3.layout.pie();

    var arc = d3.svg.arc()
        .innerRadius(radius - 70)
        .outerRadius(radius - 50);

    var svg = d3.select("body") .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var path = svg.selectAll("path")
        .data(pie(dataset.apples))
        .enter()
        .append("path")
        .attr("fill", function(d, i) { return color(i); })
        .attr("d", arc);
})();
/*
function(){
    var svg = d3.select('#missing_content_tagline');

    var dataset = {
        apples: [53245, 28479, 19697, 24037, 40245],
        };

    var width = 460,
        height = 300,
        radius = Math.min(width, height) / 2;

    var color = d3.scale.category20();

    var arc = d3.svg.arc()
        .innerRadius(radius - 100)
        .outerRadius(radius - 50);

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    function render(d) {
        var pie = d3.layout.pie()
            .sort(null);
        var path = svg.selectAll("path")
            .data(pie(dataset.apples))
            .enter().append("path")
            .attr("fill", function(d, i) { return color(i); })
            .attr("d", arc);
    }

    function parse(d) {
        d[tot_num_games] = parseFloat(d[tot_num_games]);
        d[missing_tagline] = parseFloat(d[missing_tagline]);
        return d;
    }

    d3.csv('/data/missing_content_tagline.csv.csv', parse, render);
})();
*/