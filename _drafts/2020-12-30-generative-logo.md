---
layout: post
title: "Redesigning the Blog"
date: 2021-01-11 12:00:36 +0200
---

I like books and I would like my blog design to reflect this. My goal here is to redesign elements og the blog to look like a book.


## A new Logo
I want the logo to collect all the different colors that get randsomly selected every time a page loads. I'm thinking about a part of the page being cut out, allowing you to see the next pages. This is done repeatadly.

Using only CSS we can get quite far. The idea here is to get fancy with the `border-radius` property and some `box-shadow` to give the effect that we are looking into the background layer. 

<div style='height:80px'>
    <div class='authorimage'> </div>
</div>

I can't get the centering right here.

## Stacked Paper Effect
It should look like we are looking at the right page of a book. So to the far right we should see the outline of the pages to come.

<div class='stackedPaper'>This demonstrates how we could achieve this effect.</div>

This is workable. I still need to find a way to give a sense of the center of the book to the right. The slight curve of the page towards the spine. I don't want any of the content to be distorted, so perhaps just a slight shadow.

## Links underlined with pencil

## Gimicks
Coffee stains.

## Page Turning Effect
Browsing this blog should feel like browsing a book. The landing page is like the table of contents. Following a link should have a page turning effect. I'm trying to use [StPageFlip](https://github.com/Nodlik/StPageFlip), but it isn't quite working.

<div id="book">
    <div class="my-page" data-density="hard">
        <h1>Page Cover</h1>
        <p>Browsing this blog should feel like browsing a book. The landing page is like the table of contents. Following a link should have a page turning effect. Browsing this blog should feel like browsing a book. The landing page is like the table of contents. Following a link should have a page turning effect.</p>
    </div>
    <div class="my-page">
        Page one
    </div>
    <div class="my-page">
        Page two
    </div>
    <div class="my-page">
        Page three
    </div>
    <div class="my-page">
        Page four
    </div>
    <div class="my-page" data-density="hard">
        Last page
    </div>
</div>

<link rel="stylesheet" href="/css/generative-logo.css">
<script src="/js/page-flip.browser.js"></script>
<script type='module'>
    // import {PageFlip} from '/page-flip';
    const pageFlip = new St.PageFlip(document.getElementById('book'),
        {
            width: 200, // required parameter - base page width
            height: 400,  // required parameter - base page height
            showCover: true
        }
    );
    pageFlip.loadFromHTML(document.querySelectorAll('.my-page'));
</script>
<!-- <script type='text/javascript'  src='/js/generative-logo/generative-logo.js'></script> -->