---
layout: post
title: "Dark Mode Toggle"
date: 2021-01-04 09:00:00 +0200
---

I often work on my blog in the evening and the bright glare of the site is becoming a bit much. So I added a dark mode -- its the lamp in the top right corner. Go ahead, click it. It was more involved than I had though and I learned some new CSS and javascript.

This is not so much a guide as it is notes from my journey. For guides I suggest looking at [Josh W. Comeau's The Quest for the Perfect Dark Mode](https://www.joshwcomeau.com/react/dark-mode/) or [Dark mode toggle by Jouni Kantola](https://jouni.kantola.se/blog/2020-02-29/dark-mode-toggle/).

## Changing Background and Text
First, let's make a button that changes the colors of the background and text. I'll do this by changing the values of the CSS variables I'm using. 

<center>
    <div id="changeColorButton">
        <button>Change Background and Text Color</button>
    </div>
</center>

Ok, so this button now changes the background color and the text. It turned out that I had _a lot_ for hardcoded color values spread out across my `css` and `scss` files. The most important ones are now covered by CSS variables, but I really should refactor the whole thing at some point.

My strategy here has been to define for the main elements such as background, button, font, etc. I then define a light and dark version for each and set the default to be light. So for the background color it looks like this: 

```css
:root {
    --background-color-light: #fdfdfd;
    --background-color-dark: #222;
    --background-color: var(--background-color-light);
}
```

This got a good deal of the way to dark mode. You may have noticed that the button above doesn't change the colors used for the links, heads, and gradients. That's because setting those are slightly more complicated.

## Changing the Gradients
Over the last few months I've been adding more and more color variations to the gradients I use on the site. A gradient is randomly selected every time the page loads. This is a problem for our dark mode since the colors don't neccesarely go well with a dark background.

Below I've selected a couple of gradient that I think goes well with the dark theme. Clicking any of the gradients will set it. If you can't decide you can click the button and your computer will randomly select one of them for you. I've included the gradients used for the light mode as well so you can see how they would look in dark mode.

<center>
    <div class='wrapper'>
        <div class='left'>
            <h1>Dark Mode</h1>
            <div id="gradients-dark"></div>    
        </div>
        <div class='right'>
            <h1>Light Mode</h1>
            <div id="gradients-light"></div>
        </div>
    </div>
    <div id="changeGradientButton">
        <button>Choose Random Dark Gradient</button>
    </div>
</center>

Perfect! We can now change the colors on the site inlucding the gradients. This is actually the first time I see these gradient next to each other. Previousely I would just reload the page a bunch of times to see how the gradients look. It's nice to be able to compare them here.

## Persisting the setting
We need to have a way of storing the user preferred setting. But how do we do that without having any backend?  [This blogpost by Jouni Kantola](https://jouni.kantola.se/blog/2020-02-29/dark-mode-toggle/) has an answer -- we can use `localStorage`. LocalStorage is a key/value datastore that's available on a user's browser. Like cookies, LocalStorage can only store string data for its keys and values. The datastore is only accessible to JavaScript within that domain and has no expiration time. This is pretty neat, it means that if the user comes back their setting will remain the same -- unless they clear their browser's cache.

## Avoiding flickering on page load
Ok, so we can store the users preference, but the CSS doesn't know anything about this. As I showed above I have CSS variables for the different colors, but the default color is set to use the light mode. We use JavaScript to access localStorage and set the apropriate CSS variables.

But if we aren't careful the page will be rendered before tha JavaScript changes take effet. This leave to a not-so-suptle flickering of the colors. 

Here I'm getting into trouble because of how I store my collection of gradients in a JSON file. This needs to be leads before we can select a color. While this is being loaded the rest of the page renders, and for an instant all the text that rely on the CSS variables default to the font color. This means that links and titles flicker from the current color to the font color and then over to the new color.

My solution here is to set the primiary color to be the background color untill the new colors has been loaded and set. This means that the text fades into the background and back out. This isn't ideal, but the transition looks smoother then when it flickers into white.

## Selecting the button and animation
I've been wanting to add more playful elements to my blog and the dark mode toggle seems like a good oppotunity to do so. The button that toggle between dark and light mode should be a nice visual element with a cute On Click animation. Janessa Garrow has a nice blogpost on how she did her [Dark Mode Toggle.](https://janessagarrow.com/blog/css-dark-mode-toggle/) This [Code Pen](https://codepen.io/jh3y/pen/VwjgdLj) by @jh3y is also very nice. I like the idea of a light bulb, but I won't go as far as to implement the tuggable string even though it is a fun element.

<center>
    <div id='lightbulb'></div>
</center>

Clicking the lamp will turn it on and off. It isn't nearly as nice as [this day/night](https://codepen.io/ste-vg/pen/oNgrYOb) toggle by @ste-vg, but it's better than the buttons above. I think I will come back to this later and play around with it some more.

Ok, so we have control over all the colors and a lamp we can turn on and off. Everything has been put together in the lamp icon at top right of the page.

## Closing thoughts
This was a lot more work than I woule have though. My plan was to spend an evening getting it done, but it ended up taking almost a week. 

There is still a bit of polishing to do but I'm very happy with the result. It has been surprisingly fun to look at my content in darkmode. I'm already a big fan of `D3.js`, but it is really amazing how easy it was for me to get everything working with darkmode. It wouldn't have been feasibily to update all those figures if I had relyed on static files. 

<link rel="stylesheet" href="/css/dark-mode.css">
<script type='text/javascript'  src='/js/dark-mode/dark-mode.js'></script>
<script type='text/javascript'  src='/js/dark-mode/add-gradients.js'></script>