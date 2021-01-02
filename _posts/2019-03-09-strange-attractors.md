---
layout: post
title: "Strange Attractors"
date: 2019-03-09 08:00:36 +0200
---
Ever since I saw [this tweet](https://twitter.com/franssoa/status/1037376353421746176) by François Pacull I've wanted to make my own images of strange attractors. I expected to spend most of the weeking without getting very far, but `Datashader` came to my rescue.

Turns out Datashader.org have a guide showing how to do exactly what I want. [This](http://datashader.org/topics/strange_attractors.html) notebook walks through how to create and visualize the different attractors. Here I have added more exmaples and made it easier to browse them.

Each button names an attractor. Clicking it will bring up 12 examples of the attractor. Hovering over the small images will bring them in focus.

<center>
    <div id="attractor-buttons" width="65%">
        <button alt="clifford" class="selectedButton">clifford</button>
        <button alt="hopalong">hopalong</button>
        <button alt="gumowski-mira">gumowski-mira</button>
        <button alt="symmetric-icon">symmetric icon</button>
        <button alt="de-jong">de jong</button>
        <button alt="fractal-dream">fractal dream</button>
        <button alt="bedhead">bedhead</button>
        <button alt="svensson">svensson</button>
    </div>
    <div>
        <img id="main_image" src="/assets/img/strange-attractors/clifford-0.png" width="70%">
    </div>
    <div id="placeholder"></div>
</center>


I think these images are very pretty. Tweaking the parameter and changing the colormaps was a lot of fun. But this project was also an excuse to play with `@jit` and `datashader`. Together, these tools can be used for a variety of projects. I've only scratched the surface of what they can do, but I can see how they might come in handy in my dayjob as well. I had not used `colorcet` before or a `.yml` file to store function parameters. All in all I would say this was an exciting and educational project.

The book [Symmetry in Chaos](https://www.goodreads.com/book/show/2715660-symmetry-in-chaos?ac=1&from_search=true) includes the Symmetric Icons shown above. It also contains a chapter on Quilts -- tilings created from symmetric icons -- and Symmetric Fractals -- anohter concept from Chaos Theory. Both topics are good candidates for weekend projects.

<link rel="stylesheet" href="/css/strange-attractors.css">
<script src="https://d3js.org/d3.v4.min.js" charset="utf-8"></script>
<script src="/js/strange-attractors/strange-attractors.js"></script>