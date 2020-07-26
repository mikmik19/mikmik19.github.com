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
  .select("#places-ive-read")
  .attr(
    "style",
    `padding-bottom: ${Math.ceil(h * 100 / w)}%`
  )
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 " + w + " " + h)
  .classed("svg-content-responsive", true);

// Load the places I've been
d3.csv("../../../../data/places-ive-read/read.csv", function(data) {

  var numCountriesRead = 0;
  var numCountries;
  //Load in GeoJSON data
  d3.json("../../../../data/places-ive-read/custom.geo.json", function(json) {
    numCountries = json.features.length
    for (var i = 0; i < data.length; i++) {
      var dataCountry = data[i].country;
      var dataValue = parseFloat(data[i].value);
      var dataBook = data[i].book;

      //Find the corresponding state inside the GeoJSON
      for (var j = 0; j < json.features.length; j++) {
        var jsonCountry = json.features[j].properties.name;

        if (dataCountry == jsonCountry) {
          //Copy the data value into the JSON
          json.features[j].properties.value = dataValue;
          json.features[j].properties.book = dataBook;

          if (dataValue == 1) {
            numCountriesRead++
          }
          //Stop looking through the JSON
          break;
        }
      }
    }

    d3.select("span.been").text(numCountriesRead)
    d3.select("span.notBeen").text(numCountries)

    //Define mouseover effects
    function onMouseOver(d) {
      var thisD = d;
      d3.select(`path#${d.properties.su_a3}`).classed("selected", true)
      d3.select(`.countryListItem#${d.properties.su_a3}`).classed("selected", true)

      d3.selectAll("#bookTitleContainer h1").remove()
      d3.select("#bookTitleContainer")
        .append("h1")
        .html(function () {
          var description;
          if (thisD.properties.value == 1) {
            description = `From <span class="fancy-text">${thisD.properties.name}</span> I read <span class="fancy-text">${thisD.properties.book}</span>`
          } else if (thisD.properties.value == 0) {
            description = `From <span class="fancy-text">${thisD.properties.name}</span> I want to read <span class="fancy-text">${thisD.properties.book}</span>`
          } else {
            description = `I haven't decided what to read from <span class="fancy-text">${thisD.properties.name}</span> yet`
          }
          return description
        })
    }

    function onMouseOut(d) {
      d3.select(`path#${d.properties.su_a3}`).classed("selected", false)
      d3.select(`.countryListItem#${d.properties.su_a3}`).classed("selected", false)
      d3.selectAll("#bookTitleContainer h1").remove()
      d3.selectAll("#bookTitleContainer")
        .append("h1")
        .html('Click a <span class="fancy-text">country</span> to see the book')
    }
    //Bind data and create one path per GeoJSON feature
    svg
      .selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("id", function(d) { return d.properties.su_a3})
      .attr("d", path)
      .attr("class", d => {if (d.properties.value) {return "been"} else {return "notBeen"}})
      .classed("toRead", d => { if (d.properties.value == 0) { return true } else { false } })
      .on("mouseover", onMouseOver)
      .on("mouseout", onMouseOut);

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
          .classed("toRead", d => { if (d.properties.value == 0) { return true } else { false } })
          .classed("been", d => {if (d.properties.value) {return true} else {false}})

        countryListLi
          .on("mouseover", onMouseOver)
          .on("mouseout", onMouseOut);
  })
});
