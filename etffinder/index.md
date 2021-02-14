---
layout: page
title: ETF Finder
permalink: /etffinder/
---

<div id="book-search-container">
    <div class='flexbox'>
        <button type="button" id="ICLN" value='ICLN'>iShares Global Clean Energy ETF</button>
        <button type="button" id="NewEnergy" value='NewEnergy'>Lyxor New Energy (DR) UCITS ETF</button>
        <button type="button" id="ECAR" value='ECAR_holdings'>iShares Electric Vehicles and Driving Technology</button>
    </div>
    <div class='flexbox' id='holdings'>
        <div class='headerRow'>
            <div class='tableHeader ticker'>Ticker</div>
            <div class='tableHeader name'>Name</div>
            <div class='tableHeader weight'>Weight (%)</div>
        </div>
    </div>
    <div id='book-search-results' class="flexbox"></div>
</div>

<script src="/etffinder/table.js"></script>
<link rel="stylesheet" href="/etffinder/style.css" />