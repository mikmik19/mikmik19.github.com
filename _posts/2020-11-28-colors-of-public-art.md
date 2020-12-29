---
layout: post
title: "Colors of Public Art"
date: 2020-12-18 12:00:36 +0200
---

Back in 2016 my brother and I participated in an event called [Hack our Art](https://www.facebook.com/events/186114941758670/). The organizers brought several datasets of cultural significance and the participants had to do something cool with them. We decided to work on the data that included pictures of all public art in Denmark.

<head>
    <script src="https://d3js.org/d3.v4.min.js" charset="utf-8"></script>
    <!-- Load the sankey.js function -->
    <script src="https://cdn.jsdelivr.net/gh/holtzy/D3-graph-gallery@master/LIB/sankey.js"></script>
</head>

We called our project [Colors of Public Art](https://github.com/mads-hartmann/colors-of-public-art). We mapped out the main color used in each image and made a small website where you could search through the images by color. It was a fun way to explore public art, and we won a prize for the project.

I was very new to programming at the time, so I didn't actually write a lot of code. I did do was make a figure that showed how the popularity of colors changed over time -- you can see it [here](https://github.com/mads-hartmann/colors-of-public-art/blob/master/static/assets/chart.png). It was a simple bar chart done in Python. Now that know D3, I want to do something fun with that data.

Ok, it turns out that the data is no longer available, so I will have to fake it. Actually, let us say I have to synthesize it, that sounds much more advanced. This project was more about an idea for an interesting chart than learning about the colors used in public art anyway.

I'm going for a bump chart but with a braided look -- the curves should weave in and out of each other. The transitions should be smooth. I also want the curves to look like wet or glossy paint. The final result is shown below. If you hover over one of the lines it will stand out.

<div id="publicArtSmoothBraidHoverGradientTease">
</div>

The top curve is the most popular color and the bottom the least. Time passes from left to right. You can follow along a curve to see how the popularity has changed over time.  

I'm quite happy with the result. I think the smooth braided look worked out quite well. It doesn't actually look like paint, but the gradients do make it look more interesting.

## Notes on Construction
I've documented the process of designing and building the chart because I find that documenting this as I go improves learning. I personally enjoy reading it when other people document the choices they took when designing something.

The first thing to do is to just draw a bunch of lines in different colors. This is achieved below.
<div id="publicArt">
</div>

Now, the drawing order is from top to bottom but only accounts for the starting points. This doesn't give much of a braided feel, and it also doesn't emphasize enough which colors are gaining popularity. We want the dawing order to be updated every year to achieve this.

<div id="publicArtBraid">
</div>

This definitely looks more braided. Unfortunately, the rigid nature of the lines doesn't give a sense of flowing paint. We'll need to fix that. To get smoother curves I'll use a Sigmoid function instead of straight lines. This means that instead of just passing the beginning and end point as data I will pass all the points I want the curve to follow.

<div id="publicArtSmoothBraid">
</div>

It can be a little hard to follow the individual lines, so let's add a hover effect that raises the line being hovered. Once we are done hovering, we want to get back to the original braided structure, so we can't simply use `selection.raise()` and `selection.lower()`. What we will do instead is to select all lines of the color being hovered and raise the copy of that selection using `.clone()`. We will also give them the class `clone` so we can find and remove them on the `mouseout` event. If we simply implement this, we will have a flickering on the hover, since the clones will come into focus. This triggers the `mouseout` effect, which deletes the clones. Now that the clones are gone, the `mouseover` is triggered on the line beneath, which creates a new set of clones -- ad anfinitum. To stop this we simply disable pointer effects on the clones with css: `pointer-events: none;`.

<div id="publicArtSmoothBraidHover">
</div>

I think this effect is quite acceptable in terms of usability.

Now we need to make the lines look more like paint. I would like to add some texture and perhaps a gradient. [This blogpost](https://vanseodesign.com/web-design/svg-linear-gradients/) was very helpful in describing how to do gradients. So was [Mozilla](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Gradients). In the end, I went with [this example](https://bl.ocks.org/mbostock/6059532), to get it going in d3.js.

<div id="publicArtSmoothBraidHoverGradient">
</div>

The gradients certainly look more interesting. These gradients are actually a subset of the ones I used for the header and footer of this site. However, the gradient from left to right makes it hard to follow the lines whose gradient change color. I think I will stop here though since I have other projects that I would like to work on.

<link rel="stylesheet" href="../../../../css/colors-public-art.css">
<script type='text/javascript'  src='../../../../js/colors-of-public-art/colors-public-art-bump.js'></script>
<script type='text/javascript'  src='../../../../js/colors-of-public-art/colors-public-art-bump-braid.js'></script>
<script type='text/javascript'  src='../../../../js/colors-of-public-art/colors-public-art-bump-smooth-braid.js'></script>
<script type='text/javascript'  src='../../../../js/colors-of-public-art/colors-public-art-bump-smooth-braid-hover.js'></script>
<script type='text/javascript'  src='../../../../js/colors-of-public-art/colors-public-art-bump-smooth-braid-hover-gradient.js'></script>