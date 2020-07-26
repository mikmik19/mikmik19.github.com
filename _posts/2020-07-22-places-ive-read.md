---
layout: post
title: "Places I've Read"
date: 2020-07-22 17:00:36 +0200
---

Some time ago I came across the site [a year of reading the world](https://ayearofreadingtheworld.com/thelist/). The author read a book from each (or most) counties during a year. I couldn’t do that in a year but I think it is a worth while goal. To help me track this I’ve set up this site, which gives me an overview of which countries I am missing. Eventually I would like to have read a book from every country in the world.

<head>
    <script src="https://d3js.org/d3.v4.min.js" charset="utf-8"></script>
</head>


<center>
    <h1 id="vizTitle">I've read book by authors from <span class="been">x</span> out of <span class="notBeen">y</span> countries</h1>
</center>

<center>
    <div class="svg-container" id='places-ive-read'></div>
</center>


<div id="bookTitleContainer"><h1>Click a <span class="fancy-text">country</span> to see the book</h1></div>
<div id="countryListContainer"></div>

<link rel="stylesheet" href="../../../../css/places-ive-read.css">
<script type='text/javascript'  src='../../../../js/places-ive-read/places-ive-read.js'></script>