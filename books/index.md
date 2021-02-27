---
layout: page
title: Books I've Read
permalink: /books/
---

<div id="book-search-container">
    <form action="get" id="book-search" autocomplete="off">
        <input style="font-size:20px;" type="text" id="book-search-box" >
    </form>
    <div class='flexbox'>
        <div class='tableHeader title'>Title</div>
        <div class='tableHeader author'>Author</div>
        <div class='tableHeader stars'>Rating</div>
    </div>
    <div id='book-search-results' class="flexbox"></div>
</div>

<script src="/js/book-search.js"></script>
<link rel="stylesheet" href="/css/book-search.css" />