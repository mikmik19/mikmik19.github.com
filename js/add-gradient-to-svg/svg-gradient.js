(function () {
    function addSvg(filepath, selector) {
        d3.xml(filepath).then((xml, error) => {
            if (error) throw error;
            document.getElementById(selector).appendChild(xml.documentElement)

            var margin = { top: 20, right: 20, bottom: 40, left: 45 };
            var windowWidth = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right;
            let width = (windowWidth > 450) ? 400 : windowWidth * 0.8;
            let height = width*0.5;

            let darkColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
            let lightColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');

            let svg = d3
                .selectAll('#'+selector+' svg')
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

            svg.style("fill", 'url(#gradient)')
            svg.selectAll('path').style("stroke", 'url(#gradient)')
        });
    }
    let mySvgPath = '/data/add-gradient-to-svg/mySvg.svg';
    addSvg(mySvgPath, "mySvg")
    
})();
