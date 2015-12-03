---
layout: default
title: Home
permalink: /
---

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-58194853-1', 'auto');
  ga('send', 'pageview');

</script>

<style type="text/css">
* { margin: 0; padding: 0; }
body { font: 16px Helvetica, Sans-Serif; line-height: 24px; background: url(images/noise.jpg); }
.clear { clear: both; }
.cite {float: right; font-size: 10px;}
#pic { float: right; padding: 0px 0px 30px 40px; }
h1 { margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999; }
h2 { font-size: 20px; margin: 0 0 6px 0; position: relative; }
h2 span { position: absolute; bottom: 0; right: 0; font-style: italic; font-family: Georgia, Serif; font-size: 16px; color: #999; font-weight: normal; }
p { margin: 0 0 16px 0; }
a { color: #999; text-decoration: none;}
ul { margin: 0 0 32px 17px; }

#objective p { font-family: Georgia, Serif; font-style: italic; color: #666; }
dl { padding-top: 40px; }
dt { 
    width: 130px;
    font-style: italic;
    font-weight: bold;
    font-size: 18px;
    text-align: right; 
    padding: 0 26px 0 0;
    float: left;
    height: 100px;
    border-right: 1px solid #999; 
}

dd p {
    padding-left: 180px;
}

dl .clearfix {
    padding-bottom: 20px;
}
</style>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>D3 Example</title>
        <!-- Including the font from google fonts -->
        <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300italic,300,600,400italic,600italic,700,700italic,800,800italic' rel='stylesheet' type='text/css'>
        <!-- Including the libraries -->
        <script src="/lib/d3.js" charset="utf-8"></script>
        <script src="lib/d3.min.js" charset="utf-8"></script>
        <script src="lib/c3.min.js" charset="utf-8"></script>
        <!-- Including the CSS -->
        <script src="/libs/d3/d3.js" charset="utf-8"></script>
        <link rel="stylesheet" href="/css/c3.min.css" media="screen" charset="utf-8">
        <link rel="stylesheet" href="/css/main.css" media="screen" charset="utf-8">
    </head>
    <body>
            <h1> Overview of the Arcade Trail Data Base </h1>
            <p> Here we show how the number of games in the Arcade Trail data base has grown since the scrapers started doing their work in May 2015.</p>
            <svg id='Arcade_Trail_Game_Growth' width="600" height="300"/>
            <p> Since most of the games are collected with scrapers that are focusing on newly released and announced games most of the games in the Arcade Trail data base are rather new. The older games have either been added manually or through the link-up with a users steam account </p>
            <svg id='Arcade_Trail_Genre_Distribution' width="600" height="300"/>
            <p> Not all the scraped games come with a complete data set. For example, not all games have a release date. This may be because the a game was added without a release date, but it may simply be because the release date is unknown.</p>
        <!-- We include our scripts in the bottom to make sure that the browser
             has rendered the SVG elements that we're going to modify in our
             script files.
        -->
        <script src="/js/Arcade_Trail_Game_Growth.js"></script> 
        <script src="/js/Arcade_Trail_Genre_Distribution.js"></script>
        <script src="/js/Arcade_Trail_Release_Date_Distribution.js"></script>
        <script src="/js/Arcade_Trail_Missing_Release_Date.js"></script>
        <script src="/js/User_Comparison_Release_Date_Distribution.js"></script>
        <script src="/js/User_Comparison_Genre_Distribution.js"></script>
        <script src="/js/User_Comparison_Library_Cost.js"></script>
        <script src="/js/Arcade_Trail_Missing_Genre.js"></script>
    </body>
</html>

<style type="text/css">

table.gridtable {
    font-family: verdana,arial,sans-serif;
    font-size:12px;
    border-width: 0px;
    border-collapse: collapse;
}
table.gridtable th {
    border-width: 0px;
    padding: 4px;
    border-style: solid;
}
table.gridtable td {
    padding: 8px;
}
</style>









