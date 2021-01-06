(async function() {
    function setBulbStatus(bulbStatus) {
        if (bulbStatus == 'off') {
            doc.style.setProperty(`--bulb-fill`, 'none');
            doc.style.setProperty(`--bulb-stroke`, 'white');
            doc.style.setProperty(`--cap-stroke`, 'white');
        }

        if (bulbStatus == 'on') {
            doc.style.setProperty(`--bulb-fill`, '#FFE47A');
            doc.style.setProperty(`--bulb-stroke`, 'black');
            doc.style.setProperty(`--cap-stroke`, 'black');
        }

        localStorage.setItem("bulb-status", bulbStatus)
    }
    
    

    let lightMode = localStorage.getItem("light-mode");
    if (lightMode == null) {
        lightMode = 'light';
        localStorage.setItem("light-mode", lightMode);
    }

    setColor(lightMode)

    let filepath = '/data/lightbulb.svg';
    await d3.xml(filepath).then((xml, error) => {
        if (error) throw error;
        document.getElementById('darkModeToggle').appendChild(xml.documentElement)
        
    });
    d3.selectAll('#darkModeToggle svg').attr("height", 20)

    let bulbStatus = localStorage.getItem("bulb-status");
    if (bulbStatus == null) {
        bulbStatus = (lightMode == 'light') ? 'on' : 'off';
        localStorage.setItem('bulb-status', bulbStatus);
    }

    async function changeGradient() {
        const colorThemes = await d3.json('/data/color-themes.json')
        doc = document.documentElement;
        let colorTheme = colorThemes[lightMode];
        var index = Math.floor(Math.random() * (colorTheme.length));
        doc.style.setProperty(`--primary-color`, colorTheme[index]['primary']);
        doc.style.setProperty(`--secondary-color`, colorTheme[index]['secondary']);
    }

    function setColor(lightMode) {
        doc = document.documentElement;
        doc.style.setProperty(`--background-color`, `var(--background-color-${lightMode})`);
        doc.style.setProperty(`--font-color`, `var(--font-color-${lightMode})`);
        doc.style.setProperty(`--button-color`, `var(--button-color-${lightMode})`);
    }

    function changeColors() {
        lightMode = (lightMode == 'dark') ? 'light' : 'dark'
        setColor(lightMode)
        localStorage.setItem("light-mode", lightMode)
    }

    function toggleDarkMode() {
        changeColors()
        changeGradient()
        if (lightMode == 'dark') { setBulbStatus('off') } else { setBulbStatus('on') }
    }

    setBulbStatus(bulbStatus)
    document.getElementById('darkModeToggle').onclick = toggleDarkMode;
})()

