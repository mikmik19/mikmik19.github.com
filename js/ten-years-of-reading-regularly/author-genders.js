(function () {
    function addSvg(filepath, selector) {
        d3.xml(filepath).mimeType("image/svg+xml").get(function (error, xml) {
            if (error) throw error;
            document.getElementById(selector).appendChild(xml.documentElement)

            var margin = { top: 20, right: 20, bottom: 40, left: 45 };
            var windowWidth = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right;
            let width = (windowWidth > 200) ? 100 : windowWidth / 3;
            let height = width;

            let darkColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
            let lightColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');

            let svg = d3
                .select('#'+selector+' svg')
                .attr("height", height)
                .attr("width", width)

            let gradient = svg.append("linearGradient")
                .attr("id", 'gradient')
                .attr("gradientUnits", "userSpaceOnUse")
                .attr("spreadMethod", "pad");

            gradient.append("svg:stop")
                .attr("offset", "0%")
                .attr("stop-color", darkColor)
                .attr("stop-opacity", 1);

            gradient.append("svg:stop")
                .attr("offset", "100%")
                .attr("stop-color", lightColor)
                .attr("stop-opacity", 1);

            svg.style("fill", 'url(#gradient')
        });
    }
    let maleFle = '../../../../data/ten-years-of-reading-regularly/male.svg';
    let femaleFle = '../../../../data/ten-years-of-reading-regularly/female.svg';
    addSvg(maleFle, "male")
    addSvg(femaleFle, "female")
    
})();
