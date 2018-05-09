---
layout: post
title:  "Coupled oscillators"
date:   2018-05-06 12:34:36 +0200
categories: reproducing-papers
text-snippet: I decided that I wanted to start reproducing the results of some of the papers I am reading. This first one is about coupled oscillators, and it was mentioned in Steven H. Strogatz book Sync The Emerging Science of Spontaneous Order.
---

* This will become a table of contents (this text will be scraped).
{:toc}

# Background
After having read Steven H. Strogatz' book _Sync: The Emerging Science of Spontaneous Order_ my interest in spontaneous synchronization was spiked. One reason for this is the fact that I am currently analyzing electrocardiograms at work, and one of the examples in the book of the syncrhonization (or lack thereof) is the heart and the dangerouse arytmia that can come out of nowhere.

In this post I reproduce some the results reported by Steven H. Strogatz and Renato E. Mirollo in 1991. It contains a simulation of the Kuramoto model, which should exhibbit some of the same charactertistics as the pacemaker cells in the heat.

The system of differential equations to be solved is this:

$$\dot\theta_i = \omega_i + \frac{K}{N} \sum\limits_{j=1}^{N} \sin \left( \theta_j - \theta_i \right)$$

Here $$\theta_i$$ is the phase of the _ith_ oscillator, $$\omega_i$$ is its natural frequency, and $$K\geq0$$ is the coupling strength.

The statement i want to reproduce is the following:

> The system (1.1) was studied for the case of N=480 oscillators, with
coupling strength $$K=1$$. The frequencies were uniformly distributed on $$[-\gamma, \gamma]$$, where $$\gamma=0.2$$. There was no noise, i.e., $$D=0$$. The goal was to simulate the evolution of the system starting near the incoherent solution. For these parameters, equation (3.15b) predicts that the coherence $$r(t)$$ should initially grow exponentially at a rate $$\alpha \approx 0.47304$$.

Along the way I will make some additional figures and simulations to make sense of the results.


# Showing the phases moving around the circle
In the book Stogatz asks the reader to think of each spring as a runner on a track. The runners influence each others speed. If Synch arises, this would mean that the runners end up running around the track bundled up in a group. Lets visualize the simulation like this -- the phase of each oscillator will be converted to (x,y) points on a circle.

I have made the points transparrent so it the clumping up becomes more aparrent. 

<span style="display:block;text-align:center">![My helpful screenshot]({{ "../assets/img/coupled-oscillators/animation.gif"| absolute_url }})
</span>


While this animation above is interesting, it would be nice to quantize the results some more. Below I show the phase of each oscillator for each time step together with the average phase of all the oscillators. This figures illustrates how the oscillators fall into synchronization. 

<span style="display:block;text-align:center">![My helpful screenshot]({{ "../assets/img/coupled-oscillators/characterization.png"| absolute_url }})</span>

To get an idea about how _fast_ the system gets synchronized I have also plotted the variance of the phases as a function of simulation time step. It clearly shows an initial exponential drop in the variance as it levels off at some value.

The plateau value shows the level of synchronization reached by the system and the initial exponential decay shows the at with the synchronization is reached.

# How does the final coherence depend on the coupling strength K?
Above I showed how we can characterize the level of synchronization that is reached as well as the speed at which it is reached. So lets run the simulation for different values of $$K$$ and look at how this influence the synchronization level and synchronization time.

![My helpful screenshot]({{ "../assets/img/coupled-oscillators/changing_k.png"| absolute_url }})

Because the preferred frequency of each oscillator uniformly distributed between -0.2 and 0.2 the oscillators often end up in a fairly stable stable situation where the phase does not change much over time.

If you preferred to look at the points as they run around the circle, then here you go:
<span style="display:block;text-align:center">![My helpful screenshot]({{ "../assets/img/coupled-oscillators/animation_varying_k.gif"| absolute_url }})</span>



# Finding the value of K that leads to the highest synchronization
Above we saw that coupling strength influence how synchronized the oscillators end up being -- too low or too and high no synchronization will take place. In between there seem to be a sweet spot, so is there an optimal value? To check ill run simulations for values of $$K$$ between 0 and 3 in steps of 0.01. All the simulations were started with the same initial conditions, so only the coupling strengths were changed between each simulation.


<span style="display:block;text-align:center">![My helpful screenshot]({{ "../assets/img/coupled-oscillators/overview.png"| absolute_url }})</span>

So it would appear that a coupling close to $$K\approx1.95$$ leads to the lowest variance in the final phase reached by the oscillators in the simulation. The synchronization time continues to drop even after the final phase has reached its minimum, but after $$K \approx 2.3$$ the system no longer syncronizes.

# Conclusion
We have seen that a collection of coupled oscillators set up with a uniform distribution of preferred oscillation frequencies can end up all oscillating with a frequency close to each other.

We have shows how the evolution of the system can be characterized by two numbers, and look at how these numbers correlate. We have also discussed how the two numbers can be used as operational values -- answering the question how should I set the parameters of the system to reach the highest level of synchronization, or to get the shortest time to a synchronized state.