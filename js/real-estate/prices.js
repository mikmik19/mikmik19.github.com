(function () {

    const dataPath = '../../../../data/real-estate'

    function onMouseOver(d, isMouseOver, classLabeler, m2ClassLabeler=null) {
        d3.selectAll('circle')
            .classed("faded", isMouseOver)
            .attr("fill", (isMouseOver == false) ? darkColorUsed : 'lightgrey')
            .attr("opacity", 0.5);

        var circleSelector;
        if (m2ClassLabeler != null) {
            circleSelector = d => 'circle.' + classLabeler(d).replace(' ', '.') + '.' + m2ClassLabeler(d)
            d3.selectAll('#square-meter-legend circle.' + m2ClassLabeler(d))
                .classed("selected", isMouseOver)
                .classed("faded", false)
                .attr("fill", darkColorUsed)
                .attr("opacity", (isMouseOver == false) ? 0.5 : 1)
                .raise();
        }
        else {
            circleSelector = d => 'circle.' + classLabeler(d).replace(' ','.')
        }

        d3.selectAll(circleSelector(d))
            .classed("selected", isMouseOver)
            .classed("faded", false)
            .attr("fill", darkColorUsed)
            .attr("opacity", (isMouseOver == false) ? 0.5:1)
            .raise();

        // Selecting the address list element
        d3.select('li.' + classLabeler(d).replace(' ','.'))
            .classed("selected", isMouseOver);

        
    }


    function xTickIntervalCalculator(width) {
        return Math.round(width / 50)
    }
    
    // Create the legend describing the circle
    // radius.
    d3.csv(dataPath+"/squaremeters.csv", function (data) {

        function plotLegend() {
            const m2Accessor = d => parseFloat(d.m2);
            const classLabeler = d => 'm2' + d.m2;

            var margin = { top: 20, right: 20, bottom: 40, left: 50 };
            var windowWidth = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right;


            if (windowWidth > 600) {
                width = 700;
                height = 100;
                rmin = 4;
                rmax = 10;
            } else {
                width = windowWidth;
                height = 100;
                rmin = 2;
                rmax = 4;
            }

            var xScale = d3
                .scaleLinear()
                .domain(d3.extent(data, m2Accessor))
                .range([margin.left, width - margin.right])
                .nice();

            var radiusScale = d3
                .scaleSqrt()
                .domain(d3.extent(data, m2Accessor))
                .range([rmin, rmax]);

            d3.selectAll("#legend").remove()
            var svg = d3
                .select("#square-meter-legend")
                .attr(
                    "style",
                    `padding-bottom: ${Math.ceil(height * 100 / width)}%`
                )
                .append("svg")
                .attr("id", 'legend')
                .attr("height", height)
                .attr("width", width)

            const circles = svg
                .append('g')
                .selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", d => xScale(m2Accessor(d)))
                .attr("cy", height / 2)
                .attr("r", d => radiusScale(m2Accessor(d)))
                .attr("fill", darkColorUsed)
                .attr("class", classLabeler);

            circles
                .on("mouseover", d => onMouseOver(d, true, classLabeler))
                .on("mouseout", d => onMouseOver(d, false, classLabeler));

            var xAxis = d3
                .axisBottom()
                .scale(xScale)
                .ticks(xTickIntervalCalculator(width));

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
        }
        plotLegend()
        window.addEventListener('resize', plotLegend);
        
    });

    // Plot the circles indication sales.
    d3.csv(dataPath+"/sales.csv", function (data) {

        function plotSalesScatter() {
            const m2Accessor = d => parseFloat(d.m2);
            const m2PriceAccessor = d => parseFloat(d.m2Price);
            const classLabeler = d => d.streetName.replace(' ', '').replace('.','') + ' num' + d.streetNumber.replace(/ /g, '');
            const m2ClassLabeler = d => 'm2' + d.m2;

            var parseDate = d3.timeParse('%d-%m-%Y');
            const salesDateAccessor = d => parseDate(d.salesDate);

            var margin = { top: 20, right: 20, bottom: 40, left: 70 };
            var windowWidth = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right;

            if (windowWidth > 600) {
                width = 700;
                height = 600;
                rmin = 4;
                rmax = 10;
            } else {
                width = windowWidth;
                height = 0.8*windowWidth;
                rmin = 2;
                rmax = 4;
            }

            var xScale = d3
                .scaleTime()
                .domain(d3.extent(data, salesDateAccessor))
                .range([margin.left, width - margin.right])
                .nice();

            var yScale = d3
                .scaleLinear()
                .domain(d3.extent(data, m2PriceAccessor))
                .range([height - margin.bottom, margin.top])
                .nice();

            var radiusScale = d3
                .scaleSqrt()
                .domain(d3.extent(data, m2Accessor))
                .range([rmin, rmax]);

            var xAxis = d3
                .axisBottom()
                .scale(xScale)
                .ticks(xTickIntervalCalculator(width));

            var yAxis = d3
                .axisLeft()
                .scale(yScale)
                .ticks(5);

            d3.select("#scatterPlot").remove();
            var svg = d3
                .select("#sales-prices")
                .attr(
                    "style",
                    `padding-bottom: ${Math.ceil(height * 100 / width)}%`
                )
                .append("svg")
                    .attr("id", "scatterPlot")
                .attr("height", height)
                .attr("width", width)

            
            d3.selectAll("circle.sale").remove();
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
                .attr("class", function (d) { return classLabeler(d) + ' ' + m2ClassLabeler(d) });


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
        }

        plotSalesScatter()
        window.addEventListener('resize', plotSalesScatter);
    });

    // Create the list of addresses
    d3.json(dataPath+"/addresses.json", function (data) {
        var addressContainer = d3.select("#addressesContainer")
            .attr("height", 900)
            .append("div")
            .classed('flex-container', true)

        // Create a list for each street name
        data.streets.forEach(streetObject => {
            var classyStreetName = streetObject.street.replace(' ', '').replace('.','')
            console.log(classyStreetName)
            var classLabeler = d => classyStreetName + ' ' + 'num' + d.replace(' ', '');

            var streetName = addressContainer
                .append("h3")
                .text(streetObject.street);

            var street = addressContainer
                .append("div")
                .attr("id", streetObject.street)
                
            var addressListUl = street.append("li")


            var addressListLi = addressListUl.selectAll("li." + classyStreetName)
                    .data(streetObject.numbers)
                .enter()
                    .append("li")
                    .attr("class", classLabeler)
                    .classed("addressListItem", true)
                    .classed('flex-item', true)
                    .append("div")
                    .text(function (d) { return classyStreetName +' '+ d });

            streetName
                .on("mouseover", d => onMouseOver(d, true, d => classyStreetName))
                .on("mouseout", d => onMouseOver(d, false, d => classyStreetName));

            addressListLi
                .on("mouseover", d => onMouseOver(d, true, classLabeler))
                .on("mouseout", d => onMouseOver(d, false, classLabeler));
        });
        
    });
})();
