---
layout: post
title:  "Tools of Chaos Theory"
date:   2018-06-6 10:00:00 +0200
categories: Blog-posts
---

<head>
    <script src="http://d3js.org/d3.v4.min.js" charset="utf-8"></script>
    <script src="https://unpkg.com/d3-3d/build/d3-3d.min.js"></script>
</head>

In this post I summaries what I consider to be the main tools to come out of the field of Chaos theory. 

# The Lorenz attractor
The Lorenz system is a one of the most often cited systems that exhibit Chaos, probably because of its importance in the development of the field. Below I define the dynamical system and solve it. The solution will be the data on which I apply the tools of Chaos Theory.

$$
\begin{aligned}
 \frac{dx}{dt} &= \sigma (y-x) \\
 \frac{dy}{dt} &= x(\rho - z) - y \\
 \frac{dz}{dt} &= xy - \beta z
\end{aligned}
$$

In this example I am using the values $$\sigma=10$$, $$\rho=28$$ and $$\beta = 8/3$$. Solving this system of differential equations for some initial value will give us a trajectory in $$(x, y, z)$$ space.

<span style="display:block;text-align:center">![]({{ "../assets/img/toole-of-chaos-theory/lorenz-trajectory.png"| absolute_url }})</span>

<center><svg id='lorenz-system' width="900" height="500"/></center>
<script type='text/javascript' src='../../../../js/d3/lorenz-system.js'></script>

# Calculating the correlation dimension
When we have a trajectory like the one shown above, we would like to be able to characterize the complexity of the system.

<span style="display:block;text-align:center">![]({{ "../assets/img/toole-of-chaos-theory/correlation-dimension.png"| absolute_url }})</span>

# Reconstructing phase space
So when we have access to the euqations that govern the system, we can calculate the correlation dimesion and use that to characterise the complexity of the system. But what if we don't have access to the entire trajectory? The idea behind reconstructing a phase space is that some of the information is encapsulated in the each dimension of the dynamical system. In fact, it turns out that it is possible to get a glimpse of the strange attractor by simply plotting one of the variables against time-lagged versions of itself. This is called embedding. Below I use for different lag times to reconstruct the Lorenz attractor using just the x-dimension of the trajectory used above.

<span style="display:block;text-align:center">![]({{ "../assets/img/toole-of-chaos-theory/phase-space-reconstruction.png"| absolute_url }})</span>


# Concluding remarks
This was a brief introduction to some of the tools of Chaos Theory. If this post has mad you want more, then you can have a look at the list I created of the reference which I found particularly help when getting into this field.