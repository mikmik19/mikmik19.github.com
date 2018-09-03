//Width and height
var w = 700;
var h = 500;

//Define map projection
var projection = d3.geoMercator()
                       .translate([w/2, h/1.5])
                       .scale([w * 0.15]);

//Define path generator
var path = d3.geoPath()
                 .projection(projection);

//Define quantize scale to sort data values into buckets of color
var color = d3.scaleQuantize()
                    .range(["rgb(237,248,233)","rgb(186,228,179)","rgb(116,196,118)","rgb(49,163,84)","rgb(0,109,44)"]);


//Create SVG element
var svg = d3.select("#places-ive-been")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

// Load the places I've been
d3.csv("../../../../data/been.csv", function(data) {
    
    //Set input domain for color scale
    color.domain([0,1]);
    
    //Load in GeoJSON data
    d3.json("../../../../data/custom.geo.json", function(json) {
        
        for (var i = 0; i < data.length; i++){
            
            var dataCountry  = data[i].country;
            var dataValue = parseFloat(data[i].value);

            //Find the corresponding state inside the GeoJSON
            for (var j = 0; j < json.features.length; j++) {
                
                var jsonCountry = json.features[j].properties.name;
    
                if (dataCountry == jsonCountry) {
            
                    console.log(dataValue)
                    //Copy the data value into the JSON
                    json.features[j].properties.value = dataValue;
                    
                    //Stop looking through the JSON
                    break;
                    
                };
            };		
        };

        //Bind data and create one path per GeoJSON feature
        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", function(d) {
                   //Get data value
                   var value = d.properties.value;
                   
                   if (value) {
                       //If value exists…
                       return color(value);
                   } else {
                       //If value is undefined…
                       return "#ccc";
                   }
               });
    });
});