---
layout: post
title: "Colors of Public Art"
date: 2020-12-18 12:00:36 +0200
---

Back in 2016 my brother and I participated in an event called [Hack our Art](https://www.facebook.com/events/186114941758670/). The organizers brough several datasets of cultural significanse and the participants had to do something cool with it. We decided to work on the data that included pictures of all public art in Denmark.

<head>
    <script src="https://d3js.org/d3.v4.min.js" charset="utf-8"></script>
    <!-- Load the sankey.js function -->
    <script src="https://cdn.jsdelivr.net/gh/holtzy/D3-graph-gallery@master/LIB/sankey.js"></script>
</head>

We called our project [Colors of Public Art](https://github.com/mads-hartmann/colors-of-public-art). We mapped out the main color used in each image, and made a small website where you could serch through the imaged by color. It was a fun way to explore the public art, and we won a price for the project.

I was very new to programming at the time, so I didn't actually write a lot of code, but one of the things I did do was make a figure that showed how the popularity of the colors changed over time -- you can see it [here](https://github.com/mads-hartmann/colors-of-public-art/blob/master/static/assets/chart.png). It was a simple bar chart done in Python. Now that know D3, I want to do something fun with that data.

Ok, it turns out that the data is no longer available, so I will have to fake it. Actually, lets say I have to synthesize it, that sounds much more advanced. This project was more about an idea for an interesting chart than learning about the colors used in public art anyway.

I'm going for a bump chart, but with a braided look -- the curves should weave in and out of each other. The transitions should be smooth. I also want the curves to look like wet or glossy paint.

The basics is to just draw a bunch of lines in different colors. This is achieved below.
<div id="publicArt">
</div>

Now, the drawing order is from top to bottom, but only accounts for the starting points. This doesn't give much of a braided feel, and it also doesn't empasise enough which colors are gaining popularity. We want the dawing order to be updated every year to achieve this.

<div id="publicArtBraid">
</div>

This defenitely looks more braided. But the rigid nature of the lines goesn't give a sense of paint flowing, so we needed to fix that that. To get smoother curves I'll used a stretched exponential instead of straight lines

<div id="publicArtSmoothBraid">
</div>

Now that is more like it. There is a slight kink at the beginning and end of the curves, but that is accecptable for now.

It can be a little hard to follow the individual lines, so let's add a hover effect that raises the line being hovered. Once we are done hovering, we want to get back to the original braided structure, so we can't simply use `selection.raise()` and `selection.lower()`. What we will do instead is to select all lines of the color being hovered and raise the copy of that selection using `.clone()`. We will also give them the class `clone` so we can find and remove them on the `mouseout` event. If we simply implement this, we will have a flickering on the hover, since the clones will come into focus. This triggers the `mouseout` effect, which deletes the clones. Now that the clones are gone, the `mouseover` is triggered on the line beneath, which creates a new set of clones -- ad anfinitum. To stop this we simply disable pointer effects on the clones with css: `pointer-events: none;`.

<div id="publicArtSmoothBraidHover">
</div>

I think this effect it quite accecptable in terms usability.

Now we need to make the lines look more like paint. I would like to add some texture and perhaps a gradient. [This blogpost](https://vanseodesign.com/web-design/svg-linear-gradients/) was very hepful in describing how to do gradients. So was [Mozilla](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Gradients). In the end I went with [this example](https://bl.ocks.org/mbostock/6059532), to get it going in d3.js. For the texture I considered using [this approach](https://iros.github.io/patternfills/) to add a pattern to the stoke.

<div id="publicArtSmoothBraidHoverGradient">
</div>

The gradients certainly look more interesting. These gradients are actually a subset of the ones I used for the header and footer of this site. However, the gradient from left to right makes it hard to follow the lines whose gradient change color.

<pattern id="pattern" patternUnits="userSpaceOnUse" width="10" height="10">
<link rel="stylesheet" href="../../../../css/colors-public-art.css">
<script type='text/javascript'  src='../../../../js/colors-public-art-bump.js'></script>
<script type='text/javascript'  src='../../../../js/colors-public-art-bump-braid.js'></script>
<script type='text/javascript'  src='../../../../js/colors-public-art-bump-smooth-braid.js'></script>
<script type='text/javascript'  src='../../../../js/colors-public-art-bump-smooth-braid-hover.js'></script>
<script type='text/javascript'  src='../../../../js/colors-public-art-bump-smooth-braid-hover-gradient.js'></script>