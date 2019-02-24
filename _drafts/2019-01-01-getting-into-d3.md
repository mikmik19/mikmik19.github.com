---
layout: post
title: "Getting Into: D3.js"
categories:
text-snippet:
---

During the second part of 2018 I had to change to work a lot with `D3.js` at work. It is a JavaScript library that I've been wanting to learn for a long time and I have made several false starts. Here I will reflect on that made it so difficult to begin with and why I was finally able to overcome the challenges.

# What makes it hard
It is often difficult to state clearly what made something hard to learn after the fact.

1. It can be hard to figure out what is specific to `D3.js` and what is just vanilla `JavaScript`, `HTML`, `CSS` or `SVG`. This makes it hard to get help from Google because googling "How to do X in D3.js" is unlikely to give good results if it is really a `CSS` issue.
1. The `enter()`, `update()`, `exit()` pattern is important. When doing transitions, you need to do `exit()`, i think. It may be related to garbage collection.
1. The fact that a `d` variables get passed around implicitly
1. Feels like everything is a function. Example, `tweening` requires three functions.

# What made it click for me

Because I was familiar with plotting in Matlab and later Matplotlib, I assumed that `D3.js` would be similar -- that is, I thought I was teaching myself have to use a charting library. Earlier this had lead me to be frustrated with my slow progress. This time around I decided to start from scratch and got a hold of 

I short I would say accepting that it is difficult and allowing myself to progress slowly helped a lot. 

I also had a better use-case this time -- I needed to use it for a project at work I was really excited about.

_Interactive Data Visualization for the Web_ by Scott Murray is an excellent book for getting started. It was exactely what I needed. It does a good job of describing the technologies surounding D3.js. _D3.js in Action, Second Edition_ by Elijah Meeks is a good book once you have the basics covered.