(function () {

    function onMouseOver(d, isMouseOver, classLabeler, m2ClassLabeler=null) {
        d3.selectAll('circle')
            .classed("faded", isMouseOver)
            .attr("fill", (isMouseOver == false) ? darkColorUsed : 'lightgrey')
            .attr("opacity", 0.5);

        var circleSelector;
        if (m2ClassLabeler != null) {
            circleSelector = d => 'circle.' + classLabeler(d) + '.' + m2ClassLabeler(d)
            d3.selectAll('#square-meter-legend circle.' + m2ClassLabeler(d))
                .classed("selected", isMouseOver)
                .classed("faded", false)
                .attr("fill", darkColorUsed)
                .attr("opacity", (isMouseOver == false) ? 0.5 : 1)
                .raise();
        }
        else {
            circleSelector = d => 'circle.' + classLabeler(d)
        }

        d3.selectAll(circleSelector(d))
            .classed("selected", isMouseOver)
            .classed("faded", false)
            .attr("fill", darkColorUsed)
            .attr("opacity", (isMouseOver == false) ? 0.5:1)
            .raise();

        d3.select('.addressListItem#' + classLabeler(d)).classed("selected", isMouseOver);

        
    }

    d3.csv("../../../../data/real-estate/squaremeters.csv", function (data) {
        const m2Accessor = d => parseFloat(d.m2);
        const classLabeler = d => 'm2'+d.m2;

        var margin = { top: 20, right: 20, bottom: 40, left: 70 };
        var windowWidth = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right;


        if (windowWidth > 600) {
            width = 700;
            height = 100;
        } else {
            width = windowWidth;
            height = 0.5 * windowWidth;
        }

        var xScale = d3
            .scaleLinear()
            .domain(d3.extent(data, m2Accessor))
            .range([margin.left, width - margin.right]);

        var radiusScale = d3
            .scaleSqrt()
            .domain(d3.extent(data, m2Accessor))
            .range([4, 10]);

        var svg = d3
            .select("#square-meter-legend")
            .attr(
                "style",
                `padding-bottom: ${Math.ceil(height * 100 / width)}%`
            )
            .append("svg")
            .attr("height", height)
            .attr("width", width)

        const circles = svg
            .append('g')
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(m2Accessor(d)))
            .attr("cy", height/2)
            .attr("r", d => radiusScale(m2Accessor(d)))
            .attr("fill", darkColorUsed)
            .attr("class", classLabeler);

        circles
            .on("mouseover", d => onMouseOver(d, true, classLabeler))
            .on("mouseout", d => onMouseOver(d, false, classLabeler));

        var xAxis = d3
            .axisBottom()
            .scale(xScale)
            .ticks(20);

        var xAxisEl = svg
            .append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(xAxis);

        var xAxisLabel = svg
            .append("text")
            .attr("class", "axisLabel")
            .text("m2")
            .attr("x", width / 2)
            .attr("y", height - 5)
            .style("text-anchor", "middle");
    });

    d3.csv("../../../../data/real-estate/sales.csv", function (data) {
        const m2Accessor = d => parseFloat(d.m2);
        const m2PriceAccessor = d => parseFloat(d.m2Price);
        const classLabeler = d => d.address.replace(/ /g, '');
        const m2ClassLabeler = d => 'm2' + d.m2;
    
        var parseDate = d3.timeParse('%b %e %Y');
        const salesDateAccessor = d => parseDate(d.salesDate);

        var margin = { top: 20, right: 20, bottom: 40, left: 70 };
        var windowWidth = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right;

        

        if (windowWidth > 600) {
            width = 700;
            height = 550;
        } else {
            width = windowWidth;
            height = 0.5 * windowWidth;
        }

        var xScale = d3
            .scaleTime()
            .domain(d3.extent(data, salesDateAccessor))
            .range([margin.left, width - margin.right]);

        var yScale = d3
            .scaleLinear()
            .domain(d3.extent(data, m2PriceAccessor))
            .range([height - margin.bottom, margin.top]);

        var radiusScale = d3
            .scaleSqrt()
            .domain(d3.extent(data, m2Accessor))
            .range([4, 10]);

        var xAxis = d3
            .axisBottom()
            .scale(xScale)
            .ticks(20);

        var yAxis = d3
            .axisLeft()
            .scale(yScale)
            .ticks(5);

        var svg = d3
            .select("#sales-prices")
            .attr(
                "style",
                `padding-bottom: ${Math.ceil(height * 100 / width)}%`
            )
            .append("svg")
            .attr("height", height)
            .attr("width", width)

        const circles = svg
            .append('g')
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(parseDate(d.salesDate)))
            .attr("cy", d => yScale(parseFloat(d.m2Price)))
            .attr("r", d => radiusScale(parseFloat(d.m2)))
            .attr("fill", darkColorUsed)
            .attr("opacity", 0.5)
            .attr("class", function (d) { return classLabeler(d) +' '+ m2ClassLabeler(d)});
            // TODO. I need to have seperate classes

        circles
            .on("mouseover", d => onMouseOver(d, true, classLabeler, m2ClassLabeler))
            .on("mouseout", d => onMouseOver(d, false, classLabeler, m2ClassLabeler));

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

        var xAxisLabel = svg
            .append("text")
            .attr("class", "axisLabel")
            .text("Sales Date")
            .attr("x", width / 2)
            .attr("y", height - 5)
            .style("text-anchor", "middle");

        var yAxisLabel = svg
            .append("text")
            .attr("class", "axisLabel")
            .text("m2 price in dkk")
            .attr("transform", "rotate(-90)")
            .attr("y", 15)
            .attr("x", -height / 2)
            .style("text-anchor", "middle");

        function resizeChart() {
            var windowWidth = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right;

            if (windowWidth > 600) {
                width = 600;
                height = 300;
            } else {
                width = windowWidth;
                height = 0.5 * windowWidth;
            }

            svg
                .attr("height", height)
                .attr("width", width)


            xScale.range([margin.left, width - margin.right]);
            xAxis.scale(xScale);
            xAxisEl
                .attr("transform", `translate(0, ${height - margin.bottom})`)
                .call(xAxis);

            yScale.range([height - margin.bottom, margin.top]);
            yAxis.scale(yScale);
            yAxisEl
                .attr("transform", `translate(${margin.left},0)`)
                .call(yAxis);

            xAxisLabel
                .attr("x", width / 2)
                .attr("y", height - 5)

            yAxisLabel
                .attr("y", 15)
                .attr("x", -height / 2)

            // Here I an removing the circles and redrawing them. It really 
            // Shoud be possible to simply change the data.
            d3.selectAll("circle.sale").remove();

            svg
                .append('g')
                .selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("class", "sale")
                .attr("cx", d => xScale(parseDate(d.salesDate)))
                .attr("cy", d => yScale(parseFloat(d.m2Price)))
                .attr("r", d => radiusScale(parseFloat(d.m2)))
                .attr("fill", darkColorUsed);
        }

        // redraw chart on resize
        window.addEventListener('resize', resizeChart);

    });

    d3.csv("../../../../data/real-estate/addresses.csv", function (data) {
        const classLabeler = d => d.address.replace(/ /g, '');
        var addressList = d3
            .select("#addressesContainer")
            .append("ul")
            .attr("id", "addressList")

        var addressListLi = addressList.selectAll("li")
            .data(data)
            .enter()
            .append("li")
            .attr("class", "addressListItem")
            .attr("id", classLabeler)
            .text(function (d) { return d.address });


        addressListLi
            .on("mouseover", d => onMouseOver(d, true, classLabeler))
            .on("mouseout", d => onMouseOver(d, false, classLabeler));
    });
})();
