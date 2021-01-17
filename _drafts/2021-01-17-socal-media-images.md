---
layout: post
title: "Generating Social Media Images"
date: 2020-11-28 12:00:36 +0200
---

I want to have nice looking previews when I share links to my blog on social media. I'm not the first to want this and there are good guide out there, but I couldn't find one that used Jekyll and GitHub Sites.


What we need is the following:

1. Let the platforms know what image to use by adding a meta property to each page
    > <meta property="og:image" content="https://example.com/my_image.jpg">
1. An image for each blogpost. 

This could all be done manually. 

## The Meta Tags
I set the following tags:
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description"content="...">
<meta name="twitter:image" content="...">
```

If the tags don't have any context the card generator will fail, so you need to set default values. I default to the overall site description using this condition:

```html
<meta name="twitter:title" content="{{% if page.title %}{{ page.title }}{% else %}{{ site.title }}{% endif %}}">
```

Sources:

1. [Dynamic Social Sharing Images](https://24ways.org/2018/dynamic-social-sharing-images/) by Drew McLellan
1. [Automated Social Sharing Images with Puppeteer, 11ty, and Netlify](https://dev.to/5t3ph/automated-social-sharing-images-with-puppeteer-11ty-and-netlify-22ln) by Stephanie Eckles
