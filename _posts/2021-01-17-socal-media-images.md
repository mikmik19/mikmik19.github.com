---
layout: post
title: "Generating Twitter Cards"
twitterCardTitle: "Twitter Cards"
twitterCardDescription: "How to get nice twitter card previews using GitHub pages and Jekyll."
date: 2021-01-17 12:00:36 +0200
---

Usually when I scroll through twitter I'm bombarded with nice looking preview of links. They get a lot of screen real estate and they make me want to click them. So as you can imagine I was a bit surprised to see a dull grey square when I tweeted a link to my own blog. I was determined to get pretty previews of my own.

## Inspiration and Motivation
These are the kinds of previews I'm talking about:

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

They are colourful and catch the eye. They are also informative give a sense of creditability.

## How do they do it?

The previews are called [Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards) and Twitter have [a guide on how to use them.](https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started) All we need to do is add a few tags to the head section of our page and fill in the appropriate content. I set the following tags:
```html
<head>
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="...">
    <meta name="twitter:description" content="...">
    <meta name="twitter:image" content="...">
    // ...
</head>
```

The "twitter:card" can be one of the following: “summary”, “summary_large_image”, “app”, or “player”. The examples I showed in the motivation section all use "summary_large_image" so I will do the same. If the content attribute is left empty for any of the fields the card generator will fail. You can use Twitter's [Card Validator](https://cards-dev.twitter.com/validator) to check if it works before you send your tweet.

I could fill out those fields manually for each of my blogposts, but it would be nice if it was a natural extension of the static site generator I already use. 

## Creating the Template
I'm using [Jekyll](jekyllrb.com/) for static site generation. It allows you to define variables in the front matter. Any variable defined there can be references later. Jekyll uses the [Liquid](https://shopify.github.io/liquid/) templating language to process templates. The front matter for this blog looks like this:

```html
---
layout: post
title: "Generating Twitter Cards"
twitterCardTitle: "Twitter Cards"
twitterCardDescription: 
"How to get nice twitter card previews using GitHub pages and Jekyll."
date: 2021-01-17 12:00:36 +0200
---
```

The variables can be used together with Liquid to create templates. Below I've used this combination to show how the twitter card might look for four blogposts.

```html
{% raw %}<div class='preview-grid'>
{% for entry in site.posts limit:4 %}
  <div class='preview'>
    <div class='inner-grid'>
      <div class='graphic'></div>
        <div class='title'>{{ entry.title}}</div>
        <div class='footer'> {{loop.index}} Mikkel Hansen</div>
      </div>
    <div class='twitterMeta'>
      <div class='title'>{{entry.title }}</div>
      <div class='description'>{{entry.excerpt | truncate: 95}}</div>
    </div>
  </div>
{% endfor %}
</div>{% endraw %}
```

The code above produces the grid of twitter-card lookalies I show below:

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

I've used this quickly iterate on the design. 

I like the look so far. For the examples above I've used the post title for the card and the post exerpt for the description. These are fine as default values, but I should add variables to each post that allow me to use a different title and description for the twitter card. Let me tell you why.

I want to have different title on the card because the full title will be included in the lower part of the card by Twitter. Josh does this well. The title on the card says Margin Collapse and the full title is The Rules of Margin Collapse.

For the description I need something short and sweet that tells the reader why they should click on the card. My exerpt are usually more long winded and give my motivation for writing the blogpost.

I also think it needs a visual element that is unique to the post. Again Josh's get's it right -- Margin Collapse has an explosion because the margin collapsed. CSS Tricks Guide to Flexbox has an ilustation of how `flex-wrap` works. I think I will get back to this once I have everything set up. Perfect is the enemy of good after all. 

We now have workable cards. The only thing we need is the screenshots. My approach to this is top create a seperate [preview page]('previews/') that has all the cards. This allows me to see how all the cards will look without going through the twitter card validator, but it also give me a single place where I can screenshot everything.

## Automating Screenshots
I could do the screenshots manually, but this would be slow and error prone. Instead we can use [Puppeteer](https://devdocs.io/puppeteer/) to automate this. Puppeteer is a Node library which provides a high-level API to control Chromium or Chrome over the DevTools Protocol. It means that we can script interactions with webpages like the preview site I just created above. 

We will use Puppeteer to go to the site and screenshot every single card. I've included the script below. It is a relatively short script, but it took me several hours to get right. It is the first time I've used Puppeteer and I'm not so confident in my use of `async` and `await`, so perhaps a few hours isn't so bad.

```javascript
const chromium = require("chrome-aws-lambda");
const fs = require("fs");
const path = require("path");

(async () => {
    const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1000000 }); 
    await page.goto('http://127.0.0.1:4000/previews/')
    await page.waitForSelector('.preview');

    const previews = await page.$$('.preview')
    for (const preview of previews) {
        const box = await preview.boundingBox();
        const title = await preview.$eval(
            '.title', node => node.innerText.replaceAll(' ', '')
        )
        await page.screenshot({
            path: `./public/img/${title}.png`,
            type: "png",
            clip: { x: box['x'], y: box['y'], 
                    width: box['width'], height: box['height'] }
        });
    }

    await browser.close();
})();
```
[Stephanie Eckles' script](https://dev.to/5t3ph/automated-social-sharing-images-with-puppeteer-11ty-and-netlify-22ln) was very useful, but I've used a slightly different approach. She loads the HTML template directly and fills in the appropriate values. Her approach is cleaner because it means that you don't have to keep the site running on localhost when getting the screenshots. Unfortionately, I couldn't get it working. Somehow the styling didn't load. 

Another problem I encountered is that taking several screenshots of the same page [sometimes leads to blank creenshots](https://github.com/puppeteer/puppeteer/issues/2357). A workaround is to set the viewport to a very large number. This seems hacky, but it works for me. Your milage may vary.

I think I will come back to this is make it work in the future, but I've spent too much time automating this already.

The script can be run using node:

```bash
node run js/screenshots.js
```

## Sources
1. [Dynamic Social Sharing Images](https://24ways.org/2018/dynamic-social-sharing-images/) by Drew McLellan. This post gave me some much needed context about the twitter cards.
1. [Automated Social Sharing Images with Puppeteer, 11ty, and Netlify](https://dev.to/5t3ph/automated-social-sharing-images-with-puppeteer-11ty-and-netlify-22ln) by Stephanie Eckles. This has been a great help. I've used it as a boiler plate for my own approach.

<link rel="stylesheet" href="/css/social-media-preview.css">