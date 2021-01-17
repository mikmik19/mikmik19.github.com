---
layout: post
title: "Generating Twitter Cards"
date: 2021-01-17 12:00:36 +0200
---

I want to have nice looking previews when I share links to my blog on social media. I'm not the first to want this and there are good guide out there, but I couldn't find one that used Jekyll and GitHub Sites.

## Inspiration and Motivation
Usually when I scroll through twitter I'm bombarded with nice looking links to useful guides. Below is a few examples of what I'm talking about.

<div class='preview-grid'>
    <div class='screenshot'>
        <a href='https://css-tricks.com/snippets/css/a-guide-to-flexbox/'><img src="/data/social-media-preview/cssTricksFlexbox.JPG" alt="The Twitter Card for CSS Tricks's guide to Flexbox."></a>
    </div>
    <div class='screenshot'>
        <a href='https://www.joshwcomeau.com/css/rules-of-margin-collapse/'><img src="/data/social-media-preview/joshWMarginCollapse.JPG" alt="Josh W. Comeau's guide to Margin Collapse"></a>
    </div>
    <div class='screenshot'>
        <a href='https://www.smashingmagazine.com/2020/05/equivalent-experiences-part1/'><img src="/data/social-media-preview/smashingMagazine.JPG" alt="Smashing Magazine's guide to Equivalent Experiences"></a>
    </div>
    <div class='screenshot'>
        <a href='https://dev.to/5t3ph/automated-social-sharing-images-with-puppeteer-11ty-and-netlify-22ln'><img src="/data/social-media-preview/StephanieEAutomatedSocial.PNG" alt="Automated Social Sharing Images with Puppeteer, 11ty, and Netlify by Stephanie Eckles"></a>
    </div>
</div>

They get a lot of screen real estate and they make me want to click them. So as you can imagine I was a bit surprised to see a dull grey square when I was tweeting links to my own blog.

## How do they do it?

They are called [Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards) and Twitter have [a guide on how to use them.](https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started) What we need is the following:

1. Let Twitter know what image to use by adding the relevant meta tags to the HEAD section of the page.
1. An image for each blogpost. 

This could all be done manually. 


## The Meta Tags
I set the following tags:
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="...">
```

The "twitter:card" can be one of the following: “summary”, “summary_large_image”, “app”, or “player”. The examples I showed in the motivation section all use "summary_large_image" so I will do the same.

If the tags don't have any context the card generator will fail, so you need to set default values. I default to the overall site description using this condition:

```html
<meta name="twitter:title" content=`{% if page.title %}{{ page.title }}{% else %}{{ site.title }}{% endif %}`>
```

## Creating the Template
I would like my Twitter Cards to keep the simple look my site has. Below I show what the cards will look like for each blogpost I've written. This helps me find edge cases in the design.

I like the look so far, but I think it needs a visual element that is unique to the post. For example Josh's Margin Collapse has an explosion because the margin collapsed. CSS Tricks Guide to Flexbox has an ilustation of how `flex-wrap` works. I would need to design these, but first I need to figure out where I can even put them.

<div class='preview-grid'>
{%- for entry in site.posts %}
    <div class='preview'>
        <div class='inner-grid'>
            <div class='graphic'></div>
            <div class='title'>{{ entry.title}}</div>
            <div class='footer'> {{loop.index}} Mikkel Hansen</div>
        </div>
    </div>
{%- endfor %}
</div>

## Sources
1. [Dynamic Social Sharing Images](https://24ways.org/2018/dynamic-social-sharing-images/) by Drew McLellan
1. [Automated Social Sharing Images with Puppeteer, 11ty, and Netlify](https://dev.to/5t3ph/automated-social-sharing-images-with-puppeteer-11ty-and-netlify-22ln) by Stephanie Eckles

<link rel="stylesheet" href="/css/social-media-preview.css">