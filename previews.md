---
layout: page
title:
permalink: /previews/
---
<div class='preview-grid'>
{% for entry in site.posts %}
    <div class='preview'>
        <div class='inner-grid'>
            <div class='spacer'></div>
            <div class='title'>{{ entry.title}}</div>
            <div class='footer'> {{loop.index}} Mikkel Hansen</div>
        </div>
    </div>
{% endfor %}
</div>

<link rel="stylesheet" href="/css/previews.css">