(function () {
    const dataPath = '/data/ten-years-of-reading-regularly/'

    const windowWidth = Math.min(
        parseInt(d3.select('body').style('width'), 10),
        800
    );

    d3.csv(dataPath + 'books.csv', function (data) {
        const grid = d3.select("#barChart")
            .style("columns", 2)
        
        let books = grid.selectAll(".book")
            .data(data)
            .enter()
            .append("div")
                .classed("book", true)
                .classed("flow", true)  
                .style('width', '10px')
                .style('height', '5px')
                .style('padding', '1px')
            .append("p")
                .text(' ')        
    })
})();
