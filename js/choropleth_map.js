
var map = d3.geomap()
    .geofile('/js/topojson/world/countries.json');

d3.select('#map')
    .call(map.draw, map);
