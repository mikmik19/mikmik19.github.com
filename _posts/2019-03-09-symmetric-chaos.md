---
layout: post
title: "Symmetric Chaos"
date: 2019-03-09 08:00:36 +0200
---
Ever since I saw [this tweet](https://twitter.com/franssoa/status/1037376353421746176) by François Pacull I've wanted to make my own images of symmetric chaotic attractors. Turns out it was a good excuse to play around with `@jit` and `datashader`.

Aparrently, Datashader.org have a guide showing how to do exactly what I want. [This](http://datashader.org/topics/strange_attractors.html) notebook walks through how to create and visualize the different attractors. Here I've simply made it easier to browse them.

# Clifford attractors
<center>
    <div>
        <img id="main_image" src="../../../../assets//img/symmetric-chaos/clifford-0.png" width="70%">
    </div>
    <img class="small_image" src="../../../../assets//img/symmetric-chaos/clifford-0.png" width="15%">
    <img class="small_image" src="../../../../assets//img/symmetric-chaos/clifford-1.png" width="15%">
    <img class="small_image" src="../../../../assets//img/symmetric-chaos/clifford-2.png" width="15%">
    <img class="small_image" src="../../../../assets//img/symmetric-chaos/clifford-3.png" width="15%">
    <img class="small_image" src="../../../../assets//img/symmetric-chaos/clifford-4.png" width="15%">
    <img class="small_image" src="../../../../assets//img/symmetric-chaos/clifford-5.png" width="15%">
    <img class="small_image" src="../../../../assets//img/symmetric-chaos/clifford-6.png" width="15%">
    <img class="small_image" src="../../../../assets//img/symmetric-chaos/clifford-7.png" width="15%">
    <img class="small_image" src="../../../../assets//img/symmetric-chaos/clifford-8.png" width="15%">
    <img class="small_image" src="../../../../assets//img/symmetric-chaos/clifford-9.png" width="15%">
    <img class="small_image" src="../../../../assets//img/symmetric-chaos/clifford-10.png" width="15%">
    <img class="small_image" src="../../../../assets//img/symmetric-chaos/clifford-11.png" width="15%">
</center>


<script src="http://d3js.org/d3.v4.min.js" charset="utf-8"></script>
<script>
d3.selectAll(".small_image").on("mouseover", function(d){ 
	console.log(d3.select(this).attr("src"))
	d3.select("#main_image").attr("src", d3.select(this).attr("src"))
})
</script>