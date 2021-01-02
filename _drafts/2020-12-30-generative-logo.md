---
layout: post
title: "Dark Mode Toggle"
date: 2021-01-01 09:00:00 +0200
---

I often work on my blog in the evening and the bright glare of the site is becoming a bit much. So I'm adding a dark mode. This will be a nice oppotunity to learn some more CSS and JS.

<head>
    <script src="https://d3js.org/d3.v4.min.js" charset="utf-8"></script>
</head>

I've been wanting to add more playful elements to my blog and the dark mode toggle seems like a good oppotunity to do so. First, let's make a button that changes the colors of the background and text. I'll do this by changing the values of the CSS variables I'm using. 

<center>
    <div id="changeColorButton">
        <button>Change Background and Text Color</button>
    </div>
</center>

Ok, so this button now changes the background color and the text. But the colors used for the gradients, titles and linkes are actually set using javascript upon loading the page. I have CSS variables for those colors too, but the color combination were chosen to fit well with the white background. We need to alter the gradients to use darker colors while still remaining interesting to look at.

Below I've selected a couple of gradient that I think goes well with the dark theme. I've decided to keep the end color grey and only change the start color. Clicking any of the gradients will set it. If you can't decide you can click the button and your computer will randomly select one of them for you.

<center>
    <div id="gradients">
    </div>
    <div id="changeGradientButton">
        <button>Choose Random Gradient</button>
    </div>
</center>

Perfect! Except if you refresh the page it will go back to light mode and choose a new random gradient. We need a way to persist the darkmode setting. [This blogpost by Jouni Kantola](https://jouni.kantola.se/blog/2020-02-29/dark-mode-toggle/) has an answer for this -- we can use `localStorage`.

Finally, I wanted to add a playful element to the site. The button that toggle between dark and light mode should be a nice visual element with a cute On Click animation. Janessa Garrow has a nice blogpost on how she did her [Dark Mode Toggle.](https://janessagarrow.com/blog/css-dark-mode-toggle/) This [Code Pen](https://codepen.io/jh3y/pen/VwjgdLj) by @jh3y is also very nice. I like the idea of a light bulb, but I won't go as far as to implement the tuggable string even though it is a fun element.

<center>
    <div id='lightbulb'></div>
</center>

Clicking the lamp will turn it on and off. It isn't nearly as nice as [this day/night](https://codepen.io/ste-vg/pen/oNgrYOb) toggle by @ste-vg, but it's better than the buttons above. 

Ok, so we have control over all the colors and a lamp we can turn on and off. Let's put it all together in a single button:

<center>
    <div id="toggleDarkModeButton">
        <button>Toggle Dark Mode</button>
    </div>
</center>

Now I will be off to see how my many `D3.js` charts and figures look in dark mode. I suspect I will have to change the color of many axes.

<link rel="stylesheet" href="/css/dark-mode.css">
<script type='text/javascript'  src='/js/dark-mode/dark-mode.js'></script>
<!-- <script type='text/javascript'  src='/js/dark-mode/draw-lightbulb.js'></script> -->