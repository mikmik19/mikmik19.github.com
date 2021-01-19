---
layout: post
title: "Generating Twitter Cards"
twitterCardTitle: "Twitter Cards"
twitterCardDescription: "How to get nice twitter card previews using GitHub pages and Jekyll."
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
I would like my Twitter Cards to keep the simple look my site has. Below I show what the cards will look like for a few blogpost. I've used this to style my cards.

<div class='preview-grid'>
{% for entry in site.posts limit:4 %}
    <div class='preview'>
        <div class='inner-grid'>
            <div class='graphic'></div>
            <div class='title'>{{ entry.title}}</div>
            <div class='footer'> {{loop.index}} Mikkel Hansen</div>
        </div>
        <div class='twitterMeta'>
            <div class='title'>{{entry.title }}</div>
            <div class='description'>{{entry.excerpt | strip_html | strip_newlines | truncate: 95}}</div>
        </div>
    </div>
{% endfor %}
</div>

I like the look so far. For the examples above I've used the post title for the card and the post exerpt for the description. These are fine as default values, but I should add variables to each post that allow me to use a different title and description for the twitter card. Let me tell you why.

I want to have different title on the card because the full title will be included in the lower part of the card by Twitter. Josh does this well. The title on the card says Margin Collapse and the full title is The Rules of Margin Collapse.

For the description I need something short and sweet that tells the reader why they should click on the card. My exerpt are usually more long winded and give my motivation for writing the blogpost.

I also think it needs a visual element that is unique to the post. Again Josh's get's it right -- Margin Collapse has an explosion because the margin collapsed. CSS Tricks Guide to Flexbox has an ilustation of how `flex-wrap` works. I think I will get back to this once I have everything set up. Perfect is the enemy of good after all. 

We now have workable cards. Now we need to prepare them for screenshots. I've created a sperate [preview page]('previews/') that has all the cards. 

## Automating Screenshots
Now we need to navitage to the previews page and screenshot all the cards.

I've created a JavaScript file that takes the screenshots. I can run it using:
```bash
node run js/screenshots.js
```

Taking several screenshots of the same page [can sometimes lead to blank creenshots](https://github.com/puppeteer/puppeteer/issues/2357). A workaround is to set the viewport to a very large number. This seems hacky, but it works for me. Your milage may vary.

## Sources
1. [Dynamic Social Sharing Images](https://24ways.org/2018/dynamic-social-sharing-images/) by Drew McLellan
1. [Automated Social Sharing Images with Puppeteer, 11ty, and Netlify](https://dev.to/5t3ph/automated-social-sharing-images-with-puppeteer-11ty-and-netlify-22ln) by Stephanie Eckles

<link rel="stylesheet" href="/css/social-media-preview.css">