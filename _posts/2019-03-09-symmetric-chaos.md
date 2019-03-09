---
layout: post
title: "Symmetric Chaos"
date: 2019-03-09 08:00:36 +0200
---
Ever since I saw [this tweet](https://twitter.com/franssoa/status/1037376353421746176) by François Pacull I've wanted to make my own images of symmetric chaotic attractors. Turns out it was a good excuse to play around with `@jit` and `datashader`.

Aparrently, Datashader.org have a guide showing how to do exactly what I want. [This](http://datashader.org/topics/strange_attractors.html) notebook walks through how to create and visualize the different attractors. Here I've simply made it easier to browse them.

<center>
    <div id="attractor-buttons">
        <button alt="clifford">clifford</button>
        <button alt="hopalong">hopalong</button>
        <button alt="symmetric-icon">symmetric icon</button>
    </div>
    <div>
        <img id="main_image" src="../../../../assets/img/symmetric-chaos/clifford-0.png" width="70%">
    </div>
    <div id="placeholder"></div>
</center>

<link rel="stylesheet" href="../../../../css/symmetric-chaos.css">
<script src="http://d3js.org/d3.v4.min.js" charset="utf-8"></script>
<script src="../../../../js/symmetric-chaos/symmetric-chaos.js"></script>