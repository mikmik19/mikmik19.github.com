var darkColors = [
    '#376947',
    '#2D5489',
    '#2F6E91',
    '#B0151E',
    '#AE3B42',
    '#673453',
    '#491133',
    '#f7797d', // MegaTron
    '#240b36', // Witching Hour
    '#DD2476', // Bloody Mary
    '#134E5E', // Moss,
    '#5C258D', // Shroom Haze
    '#3D7EAA', // Opa
    '#516395', // Kashmir
    '#0a192f', // Navy

]
var lightColors = [
    '#77a476',
    '#84A7CF',
    '#7DAFCA',
    '#E8777F',
    '#E4989C',
    '#FF954D',
    '#fa9dd6',
    '#C6FFDD', // MegaTron
    '#c31432', // Witching Hour
    '#FF512F', // Bloody Mary,
    '#71B280', // Moss,
    '#4389A2', // Shroom Haze
    '#FFE47A', // Opa
    '#614385', // Kashmir
    '#64ffda', // Neon green
]

var index  = Math.floor(Math.random() * (darkColors.length));

var darkColorUsed = darkColors[index];
var lightColorUsed = lightColors[index];

document.documentElement.style.setProperty(`--dynamic-color-dark`, darkColorUsed);
document.documentElement.style.setProperty(`--dynamic-color-light`, lightColorUsed);