(function () {
    const dataPath = '/data/designing-a-forest-garden/'
    d3.csv(dataPath+'harvest-times.csv', function(data) {

        console.log(data)
        const nameAccessor = d => d.Name;
        var parseDate = d3.timeParse('%d-%m-%Y');
        const startHarvestAccessor = d => parseDate(d.harvestStart);
        const endHarvestAccessor = d => parseDate(d.harvestEnd);

        const margin = { top: 20, right: 20, bottom: 40, left: 150 };
        var windowWidth = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right;

        if (windowWidth > 600) {
            width = 700;
            height = 400;
         } else {
            width = windowWidth;
            height = 400;
         }

        const numBars = data.length
        const barSpacing = 5;
        const barHeight = (height - margin.top - margin.bottom - numBars * barSpacing) / numBars
        console.log(barHeight)

        var xScale = d3
            .scaleTime()
            .domain([parseDate("01-01-2020"), parseDate("31-12-2020")])
            .range([margin.left, width - margin.right])
            .nice();

        var yScale = d3
            .scaleLinear()
            .domain([0, numBars])
            .range([height - margin.bottom, margin.top])
            .nice();


        var svg = d3
            .select("#harvest-calendar")
            .attr(
                "style",
                `padding-bottom: ${Math.ceil(height * 100 / width)}%`
            )
            .append("svg")
            .attr("id", "harvest-calendar")
            .attr("height", height)
            .attr("width", width)

        const barRects = svg.selectAll("bar")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", d => xScale(startHarvestAccessor(d)))
                .attr("y", function (d,i)  { console.log(i); return margin.top + yScale(i+1)})
                .attr("height", barHeight)
                .attr("width", d => xScale(endHarvestAccessor(d)) - xScale(startHarvestAccessor(d)))
                .style("fill", "red")


        var xAxis = d3
            .axisBottom()
            .scale(xScale)
            .ticks(12);

        var yAxis = d3
            .axisLeft()
            .scale(yScale)
            .ticks(numBars);

        var yAxisEl = svg
            .append("g")
            .attr("class", "axis")
            .attr("transform", `translate(${margin.left},0)`)
            .call(yAxis);

        var xAxisEl = svg
            .append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(xAxis);

    })
})()

