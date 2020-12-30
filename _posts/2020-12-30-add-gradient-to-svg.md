---
layout: post
title: "Adding a Gradient to External SVG"
date: 2020-12-29 12:00:36 +0200
---

I recently learned that it is possible add external SVG element and add styling such as gradients. I think it is so neat that I want to share it.

<head>
    <script src="https://d3js.org/d3.v4.min.js" charset="utf-8"></script>
</head>

I like to use consistent colors on my site. One of the many things I really like about using d3.js is that my plots and figures use the same colors as the rest of my site even though the colors change every time you refresh the page. It would't be possible for me to achieve this if I used static images or gif files.

I encountered the same problem when loading external `svg` files.

So this is what I want to get done: Load an SVG from a file, add it to the page, and give it styling and a custom gradient. The book below is done this way. Go ahead and refresh the page a few times to see the glorious gradient change color with the rest of the page ✨. 

<center>
    <div id='mySvg'></div>
</center>

The SVG file was downloaded from [this site](https://freesvg.org/johnny-automatic-open-book). Below I describe how I made it work.

## Adding the External SVG
I had hoped that it would be as simple as going

```html
<img src="mySvg.svg" id='plainSvg'/>
```

This will include the `svg` file. In fact, I did this below:

<center>
    <img src="../../../data/add-gradient-to-svg/mySvg.svg" width='55%' id='plainSvg'/>
</center>

The problem is that we wont be able to get to the underlying `svg` code using a `d3.js` selection. If we try it out `d3.select('#plainSvg')` we will simply get `[img#plainSvg]`. Similarly, if you use the inspector you will the the image tag without the underlying svg.

This is a problem because we need to access the svg level to apply styling. More importantly, in order to add the gradients we need to add information inside the `svg` tag, as I will describe later. We must solve this problem before we proceed.

The [best solution ](https://bl.ocks.org/mbostock/1014829) I could find is to load the `svg` file using `d3.js` and append it to the document. 

```javascript
d3.xml(filepath)
    .mimeType("image/svg+xml")
    .get(function (error, xml) {
        if (error) throw error;
        document.getElementById(selector)
            .appendChild(xml.documentElement)
    }
```

This doesn't feel like a very clean solution, but it does give us access to the underlying svg code, as the example below shows.

<center>
    <div id='mySvgPlainD3'></div>
</center>

If you open the inspector you will see that `svg` is inside the `div` and contain all the information we need. This is really neat. It means that we can now add to the `svg` or make changes. As you may have notied, the book has color. This is because new that we have access to the `svg` code we can target it with `css`. Here I've set the `path stroke` and `svg fill` to use the starting color of the gradient. This is nice, but it lacks the playfullness a gradient brings. So lets get on with adding a gradient.

## Adding the Gradient
I think gradients often make things look more interesting. I wanted to add a gradient to a svg path element, but was sad to learn that the trick I use for my footer wouldn't work: 

```css
.myLine {
    background: url(/assets/img/texture.png),
    linear-gradient(
      135deg,
      var(--dynamic-color-dark) 0%,
      var(--dynamic-color-light) 100%
    )
}
```

It turn out that the gradient needs to be defined _inside_ the `svg` element. At first this seemed like a terribly complicated solution to me. Actually it felt more like a hack than a proper solution. The details of how gradient work with `svg` are in [this blogpost](https://vanseodesign.com/web-design/svg-linear-gradients/) and in [Mozilla's MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Gradients). 

I found the solution in [this Block](https://bl.ocks.org/mbostock/6059532) by Mike Bostock:

```javascript
let svg = d3.selectAll(selector)
let gradient = svg.append("linearGradient")

gradient
    .attr("id", 'gradient')
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("spreadMethod", "pad");

gradient.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", darkColor)
    .attr("stop-opacity", 1);

gradient.append("svg:stop")
    .attr("offset", "100%")
    .attr("stop-color", lightColor)
    .attr("stop-opacity", 1);

svg.style("fill", 'url(#gradient)')
svg.selectAll('path')
    .style("stroke", 'url(#gradient)')
```

First, we grab the `svg` element. We then add a `linearGradient` section and start adding information. We add an `id` to the gradient so we can reference it later. Finally, once the gradient is defined, we can use it when setting the style by referencing the `id` we set earlier using: `svg.style("fill", 'url(#gradient)')`. 

And with that we are done! It takes more code than I would have expected, but it works. I think I will be using this quite ofen going forward.

<link rel="stylesheet" href="../../../../css/add-gradient-to-svg.css">
<script type='text/javascript'  src='../../../../js/add-gradient-to-svg/svg-gradient.js'></script>
<script type='text/javascript'  src='../../../../js/add-gradient-to-svg/add-svg.js'></script>