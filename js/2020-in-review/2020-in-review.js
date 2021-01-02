(function () {
    const dataPath = '/data/2020-in-review/'

    const windowWidth = Math.min(
        parseInt(d3.select('body').style('width'), 10),
        800
    );

    let numColumns = (windowWidth > 650) ? 4 : 2;

    d3.csv(dataPath + 'books.csv', function (data) {
        const grid = d3.select(".grid")
            .style("columns", numColumns)
        
        let books = grid.selectAll(".book")
            .data(data)
            .enter()
            .append("div")
                .classed("book", true)
                .classed("flow", true)
                .classed("flip-card-inner", true)
        
        let front = books.append("div")
                .classed("flip-card-front", true)
        
                
        front.append("h2")
                .classed("title", true)
                .text(d => d.title)
        
        front.append("p")
                .text(d => d.subtitle)

        
        books.on("mouseover", function() {
            let front = d3.select(this).select(".flip-card-front");
            let back = d3.select(this).select(".flip-card-back");

            let width = front.node().getBoundingClientRect().width
            let height = front.node().getBoundingClientRect().height
            
            front.style("display","none")
            back.style("display", "block")
                    .style("width", width+"px")
                    .style("height", height+"px")
        })

        books.on("mouseout", function () {
            d3.select(this).select(".flip-card-front").style("display", "block")
            d3.select(this).select(".flip-card-back").style("display", "none")
        })
        
        let back = books.append("div")
                .classed("flip-card-back", true)
        
        back.append("p")
            .text(d => '★'.repeat(d.stars))

        
        
    })
})();
