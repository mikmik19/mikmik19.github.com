var darkColors = [
    '#376947',
    '#2D5489',
    '#2F6E91',
    '#B0151E',
    '#AE3B42',
    '#673453',
    '#491133'

]
var lightColors = [
    '#77a476',
    '#84A7CF',
    '#7DAFCA',
    '#E8777F',
    '#E4989C',
    '#FF954D',
    '#fa9dd6'
]

var index  = Math.floor(Math.random() * (darkColors.length));

var darkColorUsed = darkColors[index];
var lightColorUsed = lightColors[index];

document.documentElement.style.setProperty(`--dynamic-color-dark`, darkColorUsed);
document.documentElement.style.setProperty(`--dynamic-color-light`, lightColorUsed);