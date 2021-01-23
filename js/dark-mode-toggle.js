(async function() {
    let darkModeInput = document.getElementById('dark-mode')
    let lightMode = localStorage.getItem("light-mode");
    if (lightMode == null) {
        lightMode = 'light';
        localStorage.setItem("light-mode", lightMode);
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
    }

    function setToggleStatus(lightMode) {
        darkModeInput.checked = (lightMode == 'dark')
    }   

    setToggleStatus(lightMode)
    document.getElementsByClassName('darkModeToggle')[0].onclick = toggleDarkMode;
})()

