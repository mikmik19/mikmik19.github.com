var darkColors = [
    '#7d7178',
    '#7a5d51',
    '#376947',
    '#2D5489',
    '#2F6E91',
    '#B0151E',
    '#AE3B42'

]
var lightColors = [
    '#b3e8e1',
    '#dcd1e4',
    '#77a476',
    '#84A7CF',
    '#7DAFCA',
    '#E8777F',
    '#E4989C'
]

var index  = Math.floor(Math.random() * (darkColors.length));

var darkColorUsed = darkColors[index];
var lightColorUsed = lightColors[index];

document.documentElement.style.setProperty(`--dynamic-color-dark`, darkColorUsed);
document.documentElement.style.setProperty(`--dynamic-color-light`, lightColorUsed);