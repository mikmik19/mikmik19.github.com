---
layout: post
title: "10 Years of Reading Regularly"
date: 2020-12-26 12:00:36 +0200
---

I didn't really start reading untill I turned 20 but I've kept up with the habit since then. I'm the kind of person who likes to track things and am motivated by bagdes and stars, so I've build up quite a nice datasset describing my reading habits. In this blogpost I will create the visualization that I was sites like Goodreads would do for me.

<head>
    <script src="https://d3js.org/d3.v4.min.js" charset="utf-8"></script>
</head>

<div class='grid'>
    <div class='item'>
        <h1>I've read <span class="highlight">429</span> books by <span class="highlight">373</span> authors</h1>
    </div>
    <div class='item'>
        <div id='male'></div>
        <div><h1><span class='highlight'>392</span> books by men</h1></div>
        <div id='female'></div>
        <div><h1><span class='highlight'>37</span> books by women</h1></div>
    </div>
    <div class='item featured'>
        <h1 id="vizTitle">The authors were from <span class="highlight" id='authorCountry'>x</span> countries</h1>
        <div class="svg-container" id='places-ive-read'></div>
    </div>
    <div class='item'>
        <h1>Of these <span class="highlight">350</span> were fiction and <span class="highlight">79</span> were non-fiction</h1>
    </div>
    <div class='item'>
        <h1>Changes in preference of <span class='highlight'>fiction</span> over non-fiction thorugh time</h1>
        <div id='genreTimeline'></div>
    </div>
    <div class='item'>
        <div id='barChart'></div>
    </div>
</div>

## Insights

## Notes on Construction
I resued a lot of elements from previous blogposts. The map showing the origins of authors is from my blogpost on [reading books from around the world](/2020/07/22/places-ive-read.html). The braided curve showing changes in my interest in different genres is from my blogpost on [the colors of public art](/2020/12/18/colors-of-public-art.html). The barchart showing the number of books reads was repurposed from [my 2020 review](/2020/12/11/2020-in-review.html).

## Things I Learned
I try to do something new with every blogpost. This motivates me to learn new things. In this blogpost there were a lot of new things.

1. I did the structuring using `grid` layout. I always though that building a basic document structure was more work than it needed to be and grid seems to work well for me. It does take some practice though.
1. Loading external svg files. [This helped.](https://bl.ocks.org/mbostock/1014829) me figure it out. The trick is to use `d3.xml(filepath)` setting the mime type with `.mimeType("image/svg+xml")` followed by a getter `.get(function (error, xml) {})`. The rest is done inside the closure of that function. You can use plain JavaScript to get the `div` you want to add the `svg` to by using `document.getElementById(selector)` and we can then append it using `.appendChild(xml.documentElement)`. The rest is as usual.
1. The fill attribute of SVG elements can use gradients in the same way as the the stroke.

<link rel="stylesheet" href="/css/ten-years-of-reading-regularly.css">
<script type='text/javascript'  src='/js/ten-years-of-reading-regularly/author-map.js'></script>
<script type='text/javascript'  src='/js/ten-years-of-reading-regularly/author-genders.js'></script>
<script type='text/javascript'  src='/js/ten-years-of-reading-regularly/genre-timeline.js'></script>
<script type='text/javascript'  src='/js/ten-years-of-reading-regularly/books-bar.js'></script>