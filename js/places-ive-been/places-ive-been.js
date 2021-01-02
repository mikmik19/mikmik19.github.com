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

//Create SVG element
var svg = d3
  .select("#places-ive-been")
  .attr(
    "style",
    `padding-bottom: ${Math.ceil(h * 100 / w)}%`
  )
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 " + w + " " + h)
  .classed("svg-content-responsive", true);

// Load the places I've been
d3.csv("/data/places-ive-been/been.csv", function(data) {
  var numCountriesBeen = 0;
  var numCountries;
  //Load in GeoJSON data
  d3.json("/data/places-ive-been/custom.geo.json", function(json) {
    numCountries = json.features.length
    for (var i = 0; i < data.length; i++) {
      var dataCountry = data[i].country;
      var dataValue = parseFloat(data[i].value);

      //Find the corresponding state inside the GeoJSON
      for (var j = 0; j < json.features.length; j++) {
        var jsonCountry = json.features[j].properties.name;

        if (dataCountry == jsonCountry) {
          //Copy the data value into the JSON
          json.features[j].properties.value = dataValue;

          if (dataValue == 1) {
            numCountriesBeen++
          }
          //Stop looking through the JSON
          break;
        }
      }
    }

    d3.select("span.been").text(numCountriesBeen)
    d3.select("span.notBeen").text(numCountries)

    //Bind data and create one path per GeoJSON feature
    svg
      .selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("id", function(d) { return d.properties.su_a3})
      .attr("d", path)
      .attr("class", d => {if (d.properties.value) {return "been"} else {return "notBeen"}})
      .on("mouseover", function(d) {
        d3.select(this).classed("selected", true);
        d3.select(`.countryListItem#${d.properties.su_a3}`).classed("selected", true)
      })
      .on("mouseout", function(d) {
        d3.select(this).classed("selected", false)
        d3.select(`.countryListItem#${d.properties.su_a3}`).classed("selected", false)
      });

      //Create a list of all the countried
      var countryList = d3
          .select("#countryListContainer")
          .append("ul")
          .attr("id",  "countryList")

      var countryListLi = countryList.selectAll("li")
          .data(json.features)
          .enter()
          .append("li")
          .attr("class", "countryListItem")
          .attr("id", function(d) { return d.properties.su_a3})
          .text(function(d) { return d.properties.name})
          .classed("been", d => {if (d.properties.value) {return true} else {false}})

        countryListLi
          .on("mouseover", function(d) {
            d3.select(`path#${d.properties.su_a3}`).classed("selected", true)
            d3.select(`.countryListItem#${d.properties.su_a3}`).classed("selected", true)
          })
          .on("mouseout", function(d) {
            d3.select(`path#${d.properties.su_a3}`).classed("selected", false)
            d3.select(`.countryListItem#${d.properties.su_a3}`).classed("selected", false)
          });
  });
});
