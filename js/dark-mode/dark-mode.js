(async function() {
    function setBulbStatus(bulbStatus) {
        let svg = d3.selectAll('#lightbulb svg')
        if (bulbStatus == 'off') {
            svg.selectAll('#bulb').style('fill', 'none !important')
        }

        if (bulbStatus == 'on') {
            svg.selectAll('#bulb').style('fill', '#FFE47A !important')
        }
    }

    function toggleLamp() {
        if (bulbStatus == 'off') {
            setBulbStatus('on')
            bulbStatus = 'on'
        } else {
            setBulbStatus('off')
            bulbStatus = 'off'
        }
    }

    let filepath = '/data/dark-mode/lightbulb.svg';
    await d3.xml(filepath).then((xml, error) => {
        if (error) throw error;
        document.getElementById('lightbulb').appendChild(xml.documentElement)
        d3.select('#lightbulb svg')
            .attr("height", 26)
            .attr("width", 18)
            .on('click', toggleLamp)
    });

    let lightMode = localStorage.getItem("light-mode");
    if (lightMode == null) {
        lightMode = 'light';
        localStorage.setItem("light-mode", lightMode);
    }

    let bulbStatus = localStorage.getItem("bulb-status");
    if (bulbStatus == null) {
        bulbStatus = 'off';
        localStorage.setItem('bulb-status', bulbStatus);
    }

    const colorThemes = await d3.json('/data/color-themes.json')
    let colorTheme = colorThemes['dark'];
    doc = document.documentElement;

    function changeColors() {
        lightMode = (lightMode == 'dark')? 'light': 'dark'
        setColor(lightMode)
        localStorage.setItem("light-mode", lightMode)
    }

    function changeGradient() {
        var index = Math.floor(Math.random() * (colorTheme.length));
        doc.style.setProperty(`--primary-color`, colorTheme[index]['primary']);
        doc.style.setProperty(`--secondary-color`, colorTheme[index]['secondary']);
    }

    function setColor(lightMode) { 
        doc.style.setProperty(`--background-color`, `var(--background-color-${lightMode})`);
        doc.style.setProperty(`--font-color`, `var(--font-color-${lightMode})`);
        doc.style.setProperty(`--button-color`, `var(--button-color-${lightMode})`);
    }

    function toggleDarkMode (){
        changeColors()
        changeGradient()
        if (lightMode == 'dark') { setBulbStatus('on') } else { setBulbStatus('off')}   
    }

    setColor(lightMode)
    setBulbStatus(bulbStatus)
    
    document.getElementById('changeColorButton').onclick = changeColors;
    document.getElementById('changeGradientButton').onclick = changeGradient;
    document.getElementById('lightbulb').onclick = toggleLamp;
})()

