(function() {
    function drawCalendar() {

        // Start by clearing the figure
        d3.selectAll(".svg-wrapper").remove()
        d3.select(".tooltip").remove()

        const margin = { top: 20, right: 20, bottom: 20, left: 50 };
    

        // TODO: All of the dimensions below 
        // will need to be updated base don the window width. 
        const windowWidth = Math.min(
            parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right,
            800
        );
        
        console.log(windowWidth);
        
        
        const weekCellPadding = 1;
        const weekCellSize = (windowWidth > 500) ? windowWidth / 150 : windowWidth / 80;
        const calendarWidth = 52 * (weekCellSize + weekCellPadding);
        const calendarHeight = 90 * (weekCellSize + weekCellPadding);

        const wrapperWidth = calendarWidth + margin.left + margin.right;
        const wrapperHeight = calendarHeight + margin.top + margin.bottom;

        

        const svg = d3.select(".svgContainer")
            .append("div")
            .classed("svg-wrapper", true)
            .append("svg")
            .attr("height", wrapperHeight)
            .attr("width", wrapperWidth);

        let toolTipPlacedRight = false;
        if (windowWidth > 500) {
            svg.classed("left", true)
            toolTipPlacedRight = true
        }

        function addTooltipDiv(windowWidth) {
            if (windowWidth > 500) {
                console.log("Im here")
                const tooltipDiv = d3.select(".svgContainer")
                    .append("div")
                    .classed("tooltip", true)
                    .classed(".right", true)
                    .style("opacity", 0);
                return tooltipDiv
            }
            const tooltipDiv = d3.select(".weekCalFigure")
                .append("div")
                .classed("tooltip", true)
                .style("opacity", 0);
            return tooltipDiv
        }

        var tooltipDiv = addTooltipDiv(windowWidth);

        // Everything below this point should assume that 
        // the basic dimensions of the figure is all set up.

        const defaultBG = "lightgray";
        const birthday = new Date("09/19/1989");

        //Get Calender Week
        function getWeekNumber(d) {
            d.setHours(0, 0, 0, 0);
            d.setDate(d.getDate() + 4 - (d.getDay() || 7));
            var yearStart = new Date(d.getFullYear(), 0, 1);
            var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
            return weekNo;
        }

        //Format Date for Tooltip
        function formatFromToDate(fromdate, todate) {
            var monthNames = [
                "Jan", "Feb", "Mar",
                "Apr", "May", "Jun", "Jul",
                "Aug", "Sep", "Oct",
                "Nov", "Dec"
            ];

            var fromDay = fromdate.getDate();
            var fromMonth = fromdate.getMonth();
            var fromYear = fromdate.getFullYear();
            var dateformat = fromDay + '. ' + monthNames[fromMonth] + ' ' + fromYear;

            if (fromdate.toDateString() != todate.toDateString()) {
                var toDay = todate.getDate();
                var toMonth = todate.getMonth();
                var toYear = todate.getFullYear();
                dateformat += " - " + toDay + '. ' + monthNames[toMonth] + ' ' + toYear;
            }
            return dateformat;
        }

        //Get difference to Birthyear
        function getYear(d) {
            return d.getFullYear() - birthday.getFullYear();
        }

        //Modulo
        Number.prototype.mod = function (n) {
            return ((this % n) + n) % n;
        };

        //Get difference to Birthweek
        function getWeek(d) {
            d = new Date(d);
            kwBirthday = getWeekNumber(birthday);
            kwDate = getWeekNumber(d);
            week = (kwDate - kwBirthday).mod(52) + 1;
            return week;
        }

        // Create Array with different Events
        const events = new Array();

        // Single dates go first

        events.push({
            id: 100,
            title: "I Got Married",
            description: "",
            color: "red",
            from: new Date("06/10/2017"),
            to: new Date("06/10/2017"),
        })

        events.push({
            id: 101,
            title: "I Became a Father",
            description: "",
            color: "red",
            from: new Date("07/28/2020"),
            to: new Date("07/28/2020"),
        })

        // Intervals follow

        events.push({
            id: 1,
            title: "Primary School",
            description: "",
            color: "DarkGrey",
            from: new Date("09/01/1996"),
            to: new Date("07/01/2005"),
            class: "primarySchool"
        })
        events.push({
            id: 2,
            title: "Highschool",
            description: "I majord in mathematics and physics.",
            color: "DarkGrey",
            from: new Date("09/01/2005"),
            to: new Date("07/01/2008")
        })
        events.push({
            id: 3,
            title: "Cand. Scient.",
            description: "I studied Mathematics and Physics at Roskilde University.",
            color: "DarkGrey",
            from: new Date("09/02/2008"),
            to: new Date("09/01/2013"),
        })
        events.push({
            id: 4,
            title: "Ph.D. in Experimental Physics",
            description: "I studied the structure and dynamics of mono-alcohols.",
            color: "DarkGrey",
            from: new Date("12/01/2013"),
            to: new Date("03/01/2017"),
        })

        events.push({
            id: 6,
            title: "Vital Beats",
            description: "I worked as a Data Scientist building decision support tools for clinicians",
            color: "DarkGrey",
            from: new Date("04/01/2017"),
            to: new Date("11/28/2020"),
        })
        events.push({
            id: 7,
            title: "Time of Writing",
            description: "",
            color: "DarkGrey",
            from: new Date("12/01/2020"),
            to: new Date("12/01/2020"),
            class: "blink"
        })
        events.push({
            id: 9,
            title: "Life Expectancy",
            description: "79.3 Years for men living in Denmark.",
            color: "black",
            from: new Date("19/09/2072"),
            to: new Date("11/02/2072"),
        })
        events.push({
            id: 11,
            title: "Retirement",
            description: "",
            color: "DarkGrey",
            from: new Date("08/01/2056"),
            to: new Date("09/19/2080"),
        })

        function findEventId(week, year) {
            function checkEvents(e) {
                if (getYear(e.to) == getYear(e.from)) {
                    if (getYear(e.to) == year && week >= getWeek(e.from) && week <= getWeek(e.to)) {
                        return true;
                    }
                }
                else if (year >= getYear(e.from) && year <= getYear(e.to)) {
                    if (year == getYear(e.from) && week >= getWeek(e.from) || year == getYear(e.to) && week <= getWeek(e.to) || year != getYear(e.from) && year != getYear(e.to))
                        return true;
                }
                return false;
            }
            if (events.find(checkEvents)) {
                return events.find(checkEvents);
            }
            return 0;
        }

        function setColor(color) {
            if (color != undefined) {
                return color;
            }
            return defaultBG;
        }

        // Generate Gird with rect for every 52 week x 90 years
        function generateGrid() {
            var data = new Array();
            var xpos = 10;
            var ypos = 0;
            var width = weekCellSize;
            var height = weekCellSize;
            var week = 1;
            var year = 0;
            var date = birthday;
            for (var row = 0; row < 91; row++) {
                data.push(new Array());

                for (var column = 0; column < 52; column++) {
                    data[row].push({
                        x: xpos,
                        y: ypos,
                        week: week,
                        year: year,
                        width: width,
                        height: height,
                        date: date,
                        event: findEventId(week, year),
                    })
                    xpos += (width + weekCellPadding);
                    week += 1;
                }
                xpos = 10;
                week = 0;
                ypos += (height + weekCellPadding);
                year += 1;
            }
            return data;
        }

        var gridData = generateGrid;

        var grid = d3.select("svg").append("g")
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        // Create domain and ranges for axes
        const lifeExpectancy = 90;

        var scaleY = d3.scaleLinear()
            .domain([1, lifeExpectancy])
            .range([0, calendarHeight]);
        var scaleX = d3.scaleLinear()
            .domain([1, 52])
            .range([0, calendarWidth]);

        //add x and y axes
        grid.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(scaleY)
                .ticks(20));

        //add titles to the axes
        grid.append("text")
            .attr("class", "axis-title")
            .attr("text-anchor", "middle")
            .attr("transform", "translate(-30," + (calendarHeight / 2) + ")rotate(-90)")
            .text("← Age");

        grid.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", "translate(" + (calendarWidth / 2) + ",-5)")
            .text("Week of the Year →");

        var row = grid.append("g").selectAll(".row")
            .data(gridData)
            .enter().append("g")
            .attr("class", "row");

        var column = row.selectAll(".square")
            .data(function (d) {
                return d;
            })
            .enter().append("rect")
            .attr("class", "square")
            .attr("x", function (d) { return d.x; })
            .attr("y", function (d) { return d.y; })
            .attr("width", function (d) { return d.width; })
            .attr("height", function (d) { return d.height; })
            .attr("week", function (d) { return d.week; })
            .attr("year", function (d) { return d.year; })
            .attr("date", function (d) { return d.date; })
            .attr("event", function (d) { return d.event["id"]; })
            .attr("class", d => 'event' + d.event['id'])
            .style("fill", function (d) { return setColor(d.event["color"]); })
            .on("mouseover", function (d) {
                if (d.event != 0) {
                    d3.selectAll('rect.event' + d.event['id']).classed("selected", true)

                    if (toolTipPlacedRight) {
                        let margin =0;
                        // Find the first cell with the event
                        for (const [row_index, row] of Object.entries(gridData())) {
                            for (const [col_index, cell] of Object.entries(row)) {
                                if (cell.event["from"] == d.event["from"]) {
                                    margin = cell.y;
                                    break
                                }
                            }
                        }
                        
                        tooltipDiv.style('margin-top', margin + 'px');
                    }
                    
                    tooltipDiv.transition()
                        .style("opacity", 1)
                        .duration(50)
                        .style("background-color", "white");
                    
                    tooltipDiv.html(
                        "<h2>" + d.event["title"] + "</h2>\
                    <p class='description'>" + d.event["description"] + "</p>\
                    <p class='date'>" + formatFromToDate(d.event["from"], d.event["to"]) + "</p>"
                    )
                        .style("left", (d.x) + 50 + "px")
                }
            })
            .on("mouseout", function (d) {
                if (d.event != 0) {
                    d3.selectAll('rect.event' + d.event['id']).classed("selected", false)
                    tooltipDiv.transition()
                        .duration(300)
                        .style("opacity", 0);
                }
            });
    }

    drawCalendar()
    window.addEventListener('resize', drawCalendar);
})()
