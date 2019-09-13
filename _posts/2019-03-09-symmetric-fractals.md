---
layout: post
title: "Symmetric Fractals"
date: 2019-03-14 08:00:36 +0200
---
As a follow up to my [post on strange attractors](http://mikkelhartmann.dk/2019/03/09/strange-attractors.html) I've decided to take a look at symmetric fractals.

Hovering over the small images will bring them in focus.

<center>
    <div>
        <img id="main_image" src="../../../../assets/img/symmetric-fractals/fractal-0.png" width="70%">
    </div>
    <div id="placeholder"></div>
</center>

The idea for these illustration is taken from te book [Symmetry in Chaos](https://www.goodreads.com/book/show/2715660-symmetry-in-chaos?ac=1&from_search=true). It includes the math behind them as well as a program written in BASIC to recreate the figures. I've created them in Python using `datashader` for the coloring and `numba` for the calculations.

Next I want to reproduce the figures from the chapter on Quilts – tilings created from symmetric icons.

<link rel="stylesheet" href="../../../../css/strange-attractors.css">
<script src="https://d3js.org/d3.v4.min.js" charset="utf-8"></script>
<script src="../../../../js/symmetric-fractals/symmetric-fractals.js"></script>