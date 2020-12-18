(function () {
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 10, bottom: 10, left: 10 },
        width = 450 - margin.left - margin.right,
        height = 480 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#publicArt").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Set the sankey diagram properties
    var sankey = d3.sankey()
        .nodeWidth(36)
        .nodePadding(290)
        .size([width, height]);

    // load the data
    d3.json("../../../../data/colors-public-art.json", function (error, graph) {

        // Constructs a new Sankey generator with the default settings.
        sankey
            .nodes(graph.nodes)
            .links(graph.links)
            .layout(1);

        // add in the links
        var link = svg.append("g")
            .selectAll(".link")
            .data(graph.links)
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("d", sankey.link())
            .style("stroke-width", function (d) { return Math.max(1, d.dy); })
            .sort(function (a, b) { return b.dy - a.dy; });

        // add in the nodes
        var node = svg.append("g")
            .selectAll(".node")
            .data(graph.nodes)
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; })

        // add the rectangles for the nodes
        node
            .append("rect")
            .attr("height", function (d) { return d.dy; })
            .attr("width", sankey.nodeWidth())
    });
})()