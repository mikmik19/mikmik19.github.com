
var map = d3.geomap().choropleth()
    .geofile('/js/topojson/world/countries.json');

d3.select('#map')
    .call(map.draw, map);
/*
var map = d3.geomap.choropleth()
    .geofile('/js/topojson/world/countries.json')
    .colors(colorbrewer.YlGnBu[9])
    .column('2010')
    .format(format)
    .legend(true)
    .unitId('Country Code');
*/

/*d3.csv('/data/world_population.csv', function(error, data) {
    d3.select('#map')
        .datum(data)
        .call(map.draw, map);
}); */
