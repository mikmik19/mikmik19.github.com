---
layout: post
title: "Colors of Public Art"
date: 2020-12-18 12:00:36 +0200
---

Back in 2016 my brother and I participated in an event called Hack our Art. The organizers brough several datasets of cultural significanse and the participants had to do something cool with it. We decided to work on the data that included pictures of all public art in Denmark.

<head>
    <script src="https://d3js.org/d3.v4.min.js" charset="utf-8"></script>
    <!-- Load the sankey.js function -->
    <script src="https://cdn.jsdelivr.net/gh/holtzy/D3-graph-gallery@master/LIB/sankey.js"></script>
</head>

We called out project Colors of Public art. We mapped out the main color used in each image, and made a small website where you could serch through the imaged by color. It was a fun way to explore the public art, and we won a price for the project.

I was very new to programming at the time, so I didn't actually write a lot of code, but one of the things I did do was make a figures that showed how the popularity of the colors changed over time. It was a simple bar chart done in Python. Now that know D3, I want to do something fun with that data.

I'm going for a bump chart, but with a braided look -- the curves should weave in and out of each other. The transitions should be smooth. I also want the curves to look like wet or glossy paint.

The basics is to just draw a bunch of lines in different colors. This is achieved below.
<div id="publicArt">
</div>

Now, the drawing order is from top to bottom, but only accounts for the starting points. This doesn't give much of a braided feel, and it also doesn't empasise enough which colors are gaining popularity. We want the dawing order to be updated every year to achieve this.

<div id="publicArtBraid">
</div>

This defenitely looks more braided. The piece-wise nature of the plot is very aparrent now though. But the rigid nature of the lines didn't give a sense of paint flowing, so we needed to fix that that anyway. To get smoother curves I'll used a stretched exponential instead of straight lines

<div id="publicArtSmoothBraid">
</div>

Now that is more like it. There is a slight kink at the beginning and end of the curves, but that is accecptable for now.

Now we need to make the lines look more like paint. I would like to add some texture and perhaps a gradient.

<link rel="stylesheet" href="../../../../css/colors-public-art.css">
<script type='text/javascript'  src='../../../../js/colors-public-art-bump.js'></script>
<script type='text/javascript'  src='../../../../js/colors-public-art-bump-braid.js'></script>
<script type='text/javascript'  src='../../../../js/colors-public-art-bump-smooth-braid.js'></script>