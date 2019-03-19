//Width and height
var w = 700;
var h = 500;

//Define map projection
var projection = d3
  .geoMercator()
  .translate([w / 2, h / 1.5])
  .scale([w * 0.15]);

//Define path generator
var path = d3.geoPath().projection(projection);

//Define quantize scale to sort data values into buckets of color
var minTemp = -10
var maxTemp = 40
var color = d3.scaleQuantize()
    .domain([minTemp,maxTemp])
    .range(['#4B92D0','#CF3646']);

//Create SVG element
var svg = d3
  .select("#vacation-planner")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 " + w + " " + h)
  .classed("svg-content-responsive", true);

// Load the places I've been
d3.csv("../../../../data/vacation-planner/vacation-planner-2.csv", function(data) {
  //Set input domain for color scale
  //color.domain([-50, 50]);

  //Load in GeoJSON data
  d3.json("../../../../data/places-ive-been/custom.geo.json", function(json) {
    for (var i = 0; i < data.length; i++) {
      var dataCountry = data[i].country;
      var dataValue = parseFloat(data[i].jan);

      //Find the corresponding state inside the GeoJSON
      for (var j = 0; j < json.features.length; j++) {
        var jsonCountry = json.features[j].properties.name;

        if (dataCountry == jsonCountry) {
          //Copy the data value into the JSON
          json.features[j].properties.value = dataValue;

          //Stop looking through the JSON
          break;
        }
      }
    }

    //Bind data and create one path per GeoJSON feature
    svg
      .selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("fill", function(d) {
        if (d.properties.value) {
          return color(d.properties.value);
        } else {
          return "#ccc";
        }
      })
      .on("mouseover", function() {
        d3.select(this).attr("stroke", "black");
      })
      .on("mouseout", function() {
        d3.select(this).attr("stroke", "None");
      });
  });
});
