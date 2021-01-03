(async function() {
    const colorThemes = await d3.json('/data/color-themes.json')
    let lightMode = localStorage.getItem("light-mode");
    if (lightMode == null) {
        lightMode = 'light';
        localStorage.setItem("light-mode", lightMode);
    }

    const index = Math.floor(Math.random() * (colorThemes[lightMode].length));
    let color = colorThemes[lightMode][index]

    document.documentElement.style.setProperty(`--primary-color`, color['primary']);
    document.documentElement.style.setProperty(`--secondary-color`, color['secondary']);
})()
