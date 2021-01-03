---
layout: post
title: "Oscilloscope The Game"
date: 2020-12-25 12:00:36 +0200
---

One of the things I wanted to achieve this year was to build a game. I tried to build one using Unity, but I overextended and couldn't finish. I decided to build something much simpler, simplty to get something done.

<center>
<div id='oscilloscope'></div>
    <div>
        <button id="increaseAmp">Increase Amplitude</button>
        <button id="decreaseAmp">Decrease Amplitude</button>
    </div>
    <div>
        <button id="increaseFreq">Increase Frequency</button>
        <button id="decreaseFreq">Decrease Frequency</button>
    </div>
</center>

There was a couple of things I wanted to learn by building this thing.

I wanted to animate a curve by having data enter and leave the d3 selection. I am often in a situation where I have a set of equations and want to see how they evolve over time. So far my appraoch has been to do the simulation in Python and handle the rest in D3 with `tweening`. This has the drawback that I often need to load quite large files.

I also wanted to have the curve react to input from this user. 

<link rel="stylesheet" href="/css/oscilloscope-the-game.css">
<script type='text/javascript'  src='/js/oscilloscope-the-game.js'></script>