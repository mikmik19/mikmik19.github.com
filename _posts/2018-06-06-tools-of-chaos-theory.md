---
layout: post
title: "Tools of Chaos Theory"
date: 2018-06-6 10:00:00 +0200
categories: Blog-posts
---

In this post I summaries what I consider to be the main tools to come out of the field of Chaos theory.

<head>
    <script src="http://d3js.org/d3.v4.min.js" charset="utf-8"></script>
    <script src="https://unpkg.com/d3-3d/build/d3-3d.min.js"></script>
    <style type="text/css">
        path {
            fill: none;
        }
    </style>
</head>

# The Lorenz attractor

The Lorenz system is a one of the most often cited systems that exhibit Chaos, probably because of its importance in the development of the field. Below I define the dynamical system and solve it. The solution will be the data on which I apply the tools of Chaos Theory.

$$
\begin{aligned}
\frac{dx}{dt} &= \sigma (y-x) \\
\frac{dy}{dt} &= x(\rho - z) - y \\
\frac{dz}{dt} &= xy - \beta z
\end{aligned}
$$

In this example I am using the values $$\sigma=10$$, $$\rho=28$$ and $$\beta = 8/3$$. Solving this system of differential equations for some initial value will give us a trajectory in $$(x, y, z)$$ space. Below I show what the trajectory looks like. You can drag it around to see it from different angles.

<center>
    <div class="svg-container" id='lorenz-system'></div>
</center>

It looks pretty neat. Now we will use this trajectory do demonstrate some of the chaos theory concepts that I find useful.

# Calculating the correlation dimension

When we have a trajectory like the one shown above, we would like to be able to characterize the complexity of the system.

The concept of correlation dimension is useful for this purpose. Here I use the definition of correlation dimension from p. 412 Nonlinear Dynamics and Chaos by Steven H. Strogatz.

<center>
    <div class="svg-container" id='ln_c_ln_epsilon'></div>
</center>

By taking the slope of this plot we should get the correlation dimension, and indeed, if we fit a straight line to the curve, we get a value of 2.087, which is close the the 2.05 one expects for the Lorenz Attractor.

# Reconstructing phase space

So when we have access to the equations that govern the system, we can calculate the correlation dimension and use that to characterize the complexity of the system. But what if we don't have access to the entire trajectory?

The idea behind reconstructing a phase space is that some of the information is encapsulated in the each dimension of the dynamical system. In fact, it turns out that it is possible to get a glimpse of the strange attractor by simply plotting one of the variables against _time-lagged_ versions of itself. They call this _embedding_. Below I use only the x-dimension of the trajectory to do a three embedding dimensional embedding for different lag-times.

<center>
    <div id='lagtimes'></div>
</center>

We can see that we end up with trajectories that look somewhat like the real think, also some of the details are lost. But we are only using one of the three dimensions, so that fact that we get anything reasonable back is pretty cool.

Okay, so maybe the 3d trajectories don't look exactly like the real deal, but how about the correlation dimension, does that get close?

# Concluding remarks

This was a brief introduction to some of the tools of Chaos Theory. We can use the trajectories to calculate the correlation dimension, which tells you something about the complexity of the system. And if you don't have access to the entire trajectory of the system, you can still reconstruct the

If this post has mad you want more, then you can have a look at the list I created of the reference which I found particularly help when getting into this field.

<script type='text/javascript' src='../../../../js/d3/lorenz-system.js'></script>
<script type='text/javascript' src='../../../../js/d3/ln-c-ln-epsilon.js'></script>
<script type='text/javascript' src='../../../../js/d3/lagtimes.js'></script>
