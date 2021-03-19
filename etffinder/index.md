---
permalink: /etffinder/
---


<div id="book-search-container">
    <title>ETF Finder</title>
    <h1>ETF Finder</h1>
    <p class="subtitle">Navigating the ETF jungle.</p>
    Seach ETFs <input type="text">
    <div class='flexbox' id='buttons'>
        <div>
            <input type="checkbox" role="switch" value='ICLN' name="iShares Global Clean Energy" checked='true' class='stockInput'>
            iShares Global Clean Energy
        </div>
        <div>
            <input type="checkbox" role="switch" value='RBOT' name="iShares Automation & Robotics
" class='stockInput'>
            iShares Automation & Robotics
        </div>
        <div>
            <input type="checkbox" role="switch" value='NewEnergy' name="Lyxor New Energy" class='stockInput'>
            Lyxor New Energy
        </div>
        <div>
            <input type="checkbox" role="switch" value='ECAR' name="iShares Electric Vehicles and Driving Technology" class='stockInput'>
            iShares Electric Vehicles and Driving Technology
        </div>
        <div>
            <input type="checkbox" role="switch" value='GlobalXBattery' name="Global X Lithium and Battery Tech" class='stockInput'>
            Global X Lithium and Battery Tech
        </div>
        <div>
            <input type="checkbox" role="switch" value='UCTESPO' name="VanEck Vectors Video Gaming and eSports" class='stockInput'>
            VanEck Vectors Video Gaming and eSports
        </div>
        <div>
            <input type="checkbox" role="switch" value='TSWE' name="VanEck Vectors Sustainable World" class='stockInput'>
            VanEck Vectors Sustainable World
        </div>
        <div>
            <input type="checkbox" role="switch" value='TRET' name="VanEck Vectors Global Real Estate" class='stockInput'>
            VanEck Vectors Global Real Estate
        </div>
        <div>
            <input type="checkbox" role="switch" value='TGET' name="VanEck Vectors Global Equal Weight" class='stockInput'>
            VanEck Vectors Global Equal Weight
        </div>
        <div>
            <input type="checkbox" role="switch" value='TEET' name="VanEck Vectors European Equal Weight" class='stockInput'>
            VanEck Vectors European Equal Weight
        </div>
    </div>
    <h2>Number of Assets</h2>
    <div class='flexbox' id='overview'></div>
    <h2>All Assets</h2>
    Search Assets <input type="text" id="stockSearch">
    <div class='flexbox' id='holdings'></div>
</div>

 
<script src="https://cdn.jsdelivr.net/npm/danfojs@0.2.2/lib/bundle.min.js"></script>
<script src="/etffinder/table.js"></script>
<link rel="stylesheet" href="/etffinder/style.css" />