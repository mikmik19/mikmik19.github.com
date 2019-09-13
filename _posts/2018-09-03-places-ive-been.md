---
layout: post
title: "Places I've Been"
date: 2018-09-02 17:00:36 +0200
---

<head>
    <script src="https://d3js.org/d3.v4.min.js" charset="utf-8"></script>
</head>

I've wanted to get a Scratch-It Map for a while. However, I couldn't quite decide on which kind I wanted, or where to place it in the event that I got one. Since I've been getting into D3.js I thought that making my own map would be a good exercise. While this map is not scratchable (yet?), it does serve the purpose of highlight all the places I've visited over the years. I plan to add interactivity and make the map more granular later.

<center>
    <h1 id="vizTitle">Visited <span class="been">26</span> out of <span class="notBeen">~175</span> countries</h1>
</center>

<center><div class="svg-container" id='places-ive-been'></div></center>
<script type='text/javascript'  src='../../../../js/places-ive-been/places-ive-been.js'></script>

<div id="countryListContainer"></div>

<link rel="stylesheet" href="../../../../css/places-ive-been.css">