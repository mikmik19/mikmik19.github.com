(async function() {
    const colorThemes = await d3.json('/data/color-themes.json')
    const lightModes = ['dark', 'light'];
    
    for (j = 0; j < 2; j++) {
        let lightMode = lightModes[j];
        let colorTheme = colorThemes[lightMode];
        for (i = 0; i < colorTheme.length; i++) {
            let primaryColor = colorTheme[i]['primary']
            let secondaryColor = colorTheme[i]['secondary']

            let gradients = document.getElementById(`gradients-${lightMode}`)
            let div = document.createElement("div");

            div.style.height = '7rem'
            div.style.margin = '0.5rem'
            div.style.background = `url(/assets/img/texture.png), linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 95%)`;
            div.onclick = function () {
                doc.style.setProperty(`--primary-color`, primaryColor);
                doc.style.setProperty(`--secondary-color`, secondaryColor);
            }

            gradients.appendChild(div);
        }
    }
    

})()
