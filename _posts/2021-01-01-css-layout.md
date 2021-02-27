---
layout: post
title: "Layout with CSS"
date: 2021-01-09 09:00:00 +0200
---

I got into CSS through D3.js which means that I have a pretty spotty understanding of the most basic things in CSS. One of the things I consistently struggle with is layout -- placing things on the page in the position and order I want. In this blogpost I'll build a bunch of different layout to increase my understanding.

The inspiration for this came from [Kevin Powell's](https://www.youtube.com/channel/UCJZv4d5rbIKd4QHMPkcABCw) videoes [Flexbox design patterns you can use in your projects](https://youtu.be/vQAvjof1oe4) and [Masonry layout with CSS only!](https://www.youtube.com/watch?v=KrPz_wmBsAE) His video are very useful so check them out.

In addition to having control over what goes where, I want my site ot be responsive without having to define a ton of media queries or calculate widths and heights with JavaScript.

## Side by Side using `Flexbox`
This works and is responsive.

<div class='columnLayout'>
    <div>Column</div>
    <div>Column with a lot of text so you can see the size change</div>
</div>

## Grid Pattern using `Flexbox`
What if we want an n by m matrix style layout?

<div class='gridLayout'>
    <div>Column</div>
    <div>Column</div>
    <div>Column with a lot of text so you can see the size change</div>
    <div>Column</div>
    <div>Column</div>
</div>

If it is important to keep the number of columns fixed we use percentages in `flex-basis`, otherwise we can use widths in absolute units. In any case the number of columns will change if the screen width become too small for all of the cells to keep their content. In that case you will end up with a bunch of whitespace to the left because the cells aren't allowed to grow. 

<div class='gridLayout' id='grow'>
    <div>Column</div>
    <div>Column</div>
    <div>Column with a lot of text so you can see the size change</div>
    <div>Column</div>
    <div>Column</div>
</div>

With `flex-grow: 1` we get rid of the whitespace, but the cells in the bottom row may now have a different width than the rest of the cells. So if having equal cell width is important avoid using grow.

## Masonery Pattern using `Grid`
Sometimes you want there to be structure without everything falling into a neat grid. This kind of layout can be called a masonery pattern.

<div class="cssGrid">
    <div>Item</div>
    <div>Item</div>
    <div class="featured">Item Featured</div>
    <div>Item</div>
    <div>Item</div>
    <div>Item</div>
    <div>Item with a lot of text so you can see the size change</div>
</div>

One of the neat things about this approach is that it lets you get a `gap` property.

## Nested Structures
Some of the approaches described above can be used together to form nested structures. Below I've used the flexbox grid layout twice. Here I've set a minimum width of 300px on all the children of the outer grid. This means that the righthand column will go below the left column rather than squeeze everything together.
<div class='gridLayout' id='nestedColumn'>
    <div>Left Column</div>
    <div>
        <div class='gridLayout' id='nestedGrid'>
            <div>Item</div>
            <div>Item</div>
            <div>Item with a lot of text so you can see the size change</div>
            <div>Item</div>
            <div>Item</div>
        </div>
    </div>
</div>

I've used this my [Local Real Estate Prices](/2020/07/19/local-real-estate-prices.html) post.

<link rel="stylesheet" href="/css/css-layout.css">
<!-- <script type='text/javascript'  src='/js/dark-mode/dark-mode.js'></script> -->
<!-- <script type='text/javascript'  src='/js/dark-mode/add-gradients.js'></script> -->