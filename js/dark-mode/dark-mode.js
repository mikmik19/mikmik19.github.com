(function() {

    function setBulbStatus(bulbStatus) {
        let svg = d3.selectAll('#lightbulb svg')
        if (bulbStatus == 'off') {
            svg.selectAll('#bulb').style('fill', 'none')
            svg.selectAll('#bulb').style('stroke', 'black')
            svg.selectAll('.cap').style('stroke', 'black')
        }

        if (bulbStatus == 'on') {
            svg.selectAll('#bulb').style('fill', '#FFE47A')
            svg.selectAll('#bulb').style('stroke', 'white')
            svg.selectAll('.cap').style('stroke', 'white')
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
        localStorage.setItem("bulb-status", bulbStatus)
    }
    
    let filepath = '../../../../data/dark-mode/lightbulb.svg';
    d3.xml(filepath).mimeType("image/svg+xml").get(function (error, xml) {
        if (error) throw error;
        document.getElementById('lightbulb').appendChild(xml.documentElement)
        let svg = d3.selectAll('#lightbulb svg')
            .attr("height", 26)
            .attr("width", 18)
        
        svg.on('click', toggleLamp)
    });

    let darkColors = [
        '#FFE47A', // Opa, yellow
        '#c31432', // Witching Hour, red
        '#49bba9', // Neon green
        '#9f74e8', // Purple
    ]
    let lightColors = [
        '#3a403f', // Greyish
    ]
    
    doc = document.documentElement;

    function changeColors() {
        lightMode = (lightMode == 'dark')? 'light': 'dark'
        setColor(lightMode)
        localStorage.setItem("light-mode", lightMode)
    }

    function changeGradient() {
        var index = Math.floor(Math.random() * (darkColors.length));
        doc.style.setProperty(`--primary-color`, darkColors[index]);
        doc.style.setProperty(`--secondary-color`, lightColors[0]);
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

    setColor(lightMode)
    setBulbStatus(bulbStatus)
    
    document.getElementById('changeColorButton').onclick = changeColors;
    document.getElementById('changeGradientButton').onclick = changeGradient;
    document.getElementById('toggleDarkModeButton').onclick = toggleDarkMode;
    document.getElementById('lightbulb').onclick = toggleLamp;
    
    for (i = 0; i < darkColors.length; i++) {
        let darkColor = darkColors[i];
        let lightColor = lightColors[0];
        
        let gradients = document.getElementById('gradients')
        let div = document.createElement("div");
        
        div.style.height = '7rem'
        div.style.margin = '0.5rem'
        div.style.background = `url(/assets/img/texture.png), linear-gradient(135deg, ${darkColor} 0%, ${lightColor} 95%)`;
        div.onclick = function () {
            doc.style.setProperty(`--primary-color`, darkColor);
            doc.style.setProperty(`--secondary-color`, lightColor);
        }

        gradients.appendChild(div);
    }
})()

