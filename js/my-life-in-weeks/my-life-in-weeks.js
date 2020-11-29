const margin = { top: 50, right: 50, bottom: 50, left: 50 };
const svg = d3.select("svg");
const width = +svg.attr("width") - margin.left - margin.right;
const height = +svg.attr("height") - margin.top - margin.bottom;
const defaultBG = "lightgray";
const birthday = new Date("07/02/1987");

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
events.push({
    id: 1,
    title: "Kindergarden",
    description: "Wyssachen",
    color: "#c94d4d",
    from: new Date("08/01/1992"),
    to: new Date("07/31/1994"),
})
events.push({
    id: 2,
    title: "Primary School",
    description: "Wyssachen",
    color: "#d8832b",
    from: new Date("08/01/1994"),
    to: new Date("07/31/2000"),
})
events.push({
    id: 3,
    title: "High School",
    description: "Huttwil",
    color: "#dab71f",
    from: new Date("08/01/2000"),
    to: new Date("07/31/2003"),
})
events.push({
    id: 4,
    title: "Apprenticeship",
    description: "Sursee",
    color: "#406244",
    from: new Date("08/01/2003"),
    to: new Date("07/01/2007"),
})
events.push({
    id: 5,
    title: "Working",
    description: "",
    color: "#242551",
    from: new Date("07/02/2007"),
    to: new Date("08/01/2013"),
})
events.push({
    id: 6,
    title: "Travelling",
    description: "",
    color: "#4F86C6",
    from: new Date("07/01/2013"),
    to: new Date("09/01/2014"),
})
events.push({
    id: 7,
    title: "Bachelor Informatik",
    description: "FHNW, Brugg",
    color: "#6C49B8",
    from: new Date("09/02/2014"),
    to: new Date("09/01/2018"),
})
events.push({
    id: 8,
    title: "Life expectancy (Men)",
    description: "81.3 Years",
    color: "black",
    from: new Date("11/02/2068"),
    to: new Date("11/02/2068"),
})
events.push({
    id: 9,
    title: "Life expectancy (Women)",
    description: "85.3 Years",
    color: "black",
    from: new Date("11/02/2072"),
    to: new Date("11/02/2072"),
})
events.push({
    id: 10,
    title: "Retirement",
    description: "...",
    color: "#7aa979",
    from: new Date("08/01/2052"),
    to: new Date("07/01/2078"),
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
    const padding = 1;
    var data = new Array();
    var xpos = 10;
    var ypos = 10;
    var width = 7;
    var height = 7;
    var click = 0;
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
                click: click,
                event: findEventId(week, year),
            })
            xpos += (width + padding);
            week += 1;
        }
        xpos = 10;
        week = 0;
        ypos += (height + padding);
        year += 1;
    }
    return data;
}

var gridData = generateGrid;

// Create div for the tooltip
var div = d3.select(".svg-wrapper").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var grid = d3.select("svg").append("g")
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// Create domain and ranges for axes
var scaleY = d3.scaleLinear()
    .domain([0, 90])
    .range([10, height + 10]);
var scaleX = d3.scaleLinear()
    .domain([1, 52])
    .range([10, width + 10]);

//add x and y axes
grid.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(scaleY));

grid.append("g")
    .attr("class", "x axis")
    .call(d3.axisTop(scaleX)
        .tickValues([1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 52]));

//add titles to the axes
grid.append("text")
    .attr("class", "axis-title")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(-30," + (height / 2) + ")rotate(-90)")
    .text("← Age");

grid.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(" + (width / 2) + ",-30)")
    .text("Week of the Year →");

var row = grid.selectAll(".row")
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
    .style("fill", function (d) { return setColor(d.event["color"]); })
    .on("mouseover", function (d) {
        if (d.event != 0) {
            div.transition()
                .duration(200)
                .style("opacity", .9)
                .style("background-color", d.event["color"]);
            div.html("<h4>" + d.event["title"] + "</h4><p><b>" + d.event["description"] + "</b></p><p>" + formatFromToDate(d.event["from"], d.event["to"]) + "</p>")
                .style("left", (d.x) + 50 + "px")
                .style("top", (d.y) + 60 + "px");
        }
    })
    .on("mouseout", function (d) {
        if (d.event != 0) {
            div.transition()
                .duration(300)
                .style("opacity", 0);
        }
    });