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
            <div class='title'>{% if entry.twitterCardTitle %}{{ entry.twitterCardTitle}}{% else %}{{ entry.title}}{% endif %}</div>
            <div class='footer'> Mikkel Hansen</div>
        </div>
    </div>
{% endfor %}
</div>

<link rel="stylesheet" href="/css/previews.css">