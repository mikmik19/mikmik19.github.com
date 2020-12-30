(function () {
    function addSvg(filepath, selector) {
        d3.xml(filepath).mimeType("image/svg+xml").get(function (error, xml) {
            if (error) throw error;
            document.getElementById(selector).appendChild(xml.documentElement)

            var margin = { top: 20, right: 20, bottom: 40, left: 45 };
            var windowWidth = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right;
            let width = (windowWidth > 450) ? 400 : windowWidth * 0.8;
            let height = width * 0.5;

            d3.selectAll('#' + selector + ' svg')
                .attr("height", height)
                .attr("width", width)
        });
    }

    let svgFile = '../../../../data/add-gradient-to-svg/mySvg.svg';
    addSvg(svgFile, "mySvgPlainD3")
})()