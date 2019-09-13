---
layout: post
title: "Beating ❤️ animation"
date: 2019-01-02 17:00:36 +0200
categories: D3
---

<script src="../../../../js/three.js"></script>

<head>
    <script src="https://d3js.org/d3.v4.min.js" charset="utf-8"></script>
</head>

I wanted to try to animate a 3D object. I've also wanted to play around with 
Three.js.

The object I want to create is a beating heart. The inspiration comes from [@iquilezles](https://twitter.com/iquilezles) who made a youtube video called [Making a Heart with Mathematics](https://www.youtube.com/watch?v=aNR4n0i2ZlM).

The first thing I needed to do was so make sure that I could recreate the shape with the formulas provided in the video. The formulas are:

$$
\begin{aligned}
z &= z\left( 2 - \frac{y}{15} \right) \\
y &= 4 + 1.2y + \vert x \vert \sqrt{\frac{20-\vert x \vert}{15}} \\
x^2 &+ y^2  + z^2 = 15^2
\end{aligned}
$$

Witht that I was able to generate the `svg` below using Python. The details can be found in [this notebook](www.mikkelhartmann.dk/notebooks/3d-heart-shape).

<center>
    <img src="../../../../assets/img/beating-heart-animation/3d_heart.svg">
</center>

Now, I could use the code to generate a `.gif` file with the animation. However, this project was really an excuse to get experience with `Three.js`. I've been playing around with `D3.js`, but I wanted to try out a technology built on WebGL.

<center>
    <div id='beating-heart'></div>
</center>





<script type='text/javascript' src='../../../../js/beating-heart-animation/heart.js'></script>
