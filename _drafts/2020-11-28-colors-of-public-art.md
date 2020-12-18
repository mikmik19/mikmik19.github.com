---
layout: post
title: "Colors of Public Art"
date: 2020-12-18 12:00:36 +0200
---

A few years ago my brother and I participated in an event called Hack Your Heritage. The organizers brough several datasets of cultural significanse and the participants had to do something cool with it. We decided to work on the data that included pictures of all public art in Denmark.

<head>
    <script src="https://d3js.org/d3.v4.min.js" charset="utf-8"></script>
    <!-- Load the sankey.js function -->
    <script src="https://cdn.jsdelivr.net/gh/holtzy/D3-graph-gallery@master/LIB/sankey.js"></script>
</head>

We called out project Colors of Public art. We mapped out the main color used in each image, and made a small website where you could serch through the imaged by color. It was a fun way to explore the public art, and we won a price for the project.

I was very new to programming at the time, so I didn't actually write a lot of code, but one of the things I did do was make a figures that showed how the popularity of the colors changed over time. It was a simple bar chart done in Python. Now that know D3, I want to do something fun with that data.

<div id="publicArt">
</div>


<link rel="stylesheet" href="../../../../css/colors-public-art.css">
<script type='text/javascript'  src='../../../../js/colors-public-art-bump.js'></script>