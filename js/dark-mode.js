(function() {
    function setBulbStatus(bulbStatus) {
        let svg = d3.selectAll('#darkModeToggle svg')
        if (bulbStatus == 'off') {
            svg.selectAll('#bulb').style('fill', 'none')
            svg.selectAll('#bulb').style('stroke', 'white')
            svg.selectAll('.cap').style('stroke', 'white')
        }

        if (bulbStatus == 'on') {
            svg.selectAll('#bulb').style('fill', '#FFE47A')
            svg.selectAll('#bulb').style('stroke', 'black')
            svg.selectAll('.cap').style('stroke', 'black')
        }
    }
    
    let filepath = '/data/dark-mode/lightbulb.svg';
    d3.xml(filepath).mimeType("image/svg+xml").get(function (error, xml) {
        if (error) throw error;
        document.getElementById('darkModeToggle').appendChild(xml.documentElement)
        d3.selectAll('#darkModeToggle svg')
            .attr("height", 20)
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
        if (lightMode == 'dark') { setBulbStatus('off') } else { setBulbStatus('on')}   
    }

    let lightMode = localStorage.getItem("light-mode");
    if (lightMode == null) {
        lightMode = 'light';
        localStorage.setItem("light-mode", lightMode);
    }

    let bulbStatus = localStorage.getItem("bulb-status");
    if (bulbStatus == null) {
        bulbStatus = 'on';
        localStorage.setItem('bulb-status', bulbStatus);
    }

    setColor(lightMode)
    setBulbStatus(bulbStatus)
    
    document.getElementById('darkModeToggle').onclick = toggleDarkMode;
})()

