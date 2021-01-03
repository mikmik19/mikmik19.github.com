(async function() {
  //Width and height
  var w = 400;
  var h = 200;

  //Define map projection
  var projection = d3
    .geoMercator()
    .translate([w / 2, h / 1.5])
    .scale([w * 0.1]);

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

  const data = await d3.csv("/data/ten-years-of-reading-regularly/read.csv")
  const json = await d3.json("/data/ten-years-of-reading-regularly/custom.geo.json")
  
  var numCountriesRead = 0;
  var numCountriesToRead = 0;
  var numCountries;

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
        else {
          numCountriesToRead++
        }
        //Stop looking through the JSON
        break;
      }
    }
  }

  d3.select("span#authorCountry").text(numCountriesRead)

  //Define mouseover effects
  function onMouseOver(d) {
    var thisD = d;
    d3.select(`path#${d.properties.su_a3}`).classed("selected", true)
  }

  function onMouseOut(d) {
    d3.select(`path#${d.properties.su_a3}`).classed("selected", false)
  }
  //Bind data and create one path per GeoJSON feature
  svg
    .selectAll("path")
    .data(json.features)
    .enter()
    .append("path")
    .attr("id", function (d) { return d.properties.su_a3 })
    .attr("d", path)
    .attr("class", d => { if (d.properties.value) { return "read" } else { return "notRead" } })
    .on("mouseover", onMouseOver)
    .on("mouseout", onMouseOut);
})()
