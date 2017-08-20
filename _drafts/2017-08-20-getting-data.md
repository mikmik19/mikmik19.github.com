---
layout: post
title:  "End-to-end machine learning prototype: Getting data"
date:   2017-07-20 12:34:36 +0200
categories: posts
text-snippet: Links that I have found useful or informative for work or personal machine learning projects.
---

This blog post is part of a series on developing an end-to-end prototype of a machine learning product. In the end the product will take a description of a video game as input and output suggestions for which tags to use when describing the game.

* This will become a table of contents (this text will be scraped).
{:toc}

# Introduction
In this blog post I will describe how I built a web scraper that downloads the game description and tags for each game on the steam web page. I will be using the python module [Beautiful Soup][beautiful-soup] for this. The final result will be a `.csv` file with all the game descriptions as well as matrix containing tags for each game.

By the end of this blog post we will have data of the following form for every single game on Steam:
> **Game description:** ''Front Defense'' immerses you into the WW2 battlefield, When you shoot, throw grenades, Vive will track your location accurately. Destroy enemy with rocket tube and guns. Fully equipped troops with advanced weapons are waiting for you in the game. Make the best of your weapons to gain the victory.'

> **Game tags:** `Action`, `Violent`, `VR`, `World War II`.

# An example of the data
First we import the relevant modules

```python
import csv                    # For saving the files.
from bs4 import BeautifulSoup # For the web scraper.
import requests               # To handle web requests.
import numpy as np            # The tags will be saved as a matrix.
import time                   # For setting a sleep timer during the scaping.
import xml.etree.ElementTree  # # For parsing an xml file.
```

As a first example we will see how Beautiful Soup handles a specific page.

```python
def make_requestion(game_id):
    page = requests.get("http://store.steampowered.com/app/" + game_id)
    soup = BeautifulSoup(page.content, 'html.parser', allow_redirects=False )
    return soup
```

## Getting the game description
Using the inspect tool in e.g. Google Chrome we can see that the HTML tags that contain the game description has its `name` attribute set to `Description`. Beautiful Soup allow us to extract the text of that tag using a CSS selector.

```python
def get_desctiption(soup):
    desc_tag = soup.select('[name="Description"]')
    if len(desc_tag) > 0:
        desc = str(desc_tag[0])[15:-22]
        return desc
    else:
        return None
```

The function returns the entire element, so we have to cut off the beginning and end of the string. Calling the `desc = get_desctiption(soup)` returns:

> “Front Defense” immerses you into the WW2 battlefield, When you shoot, throw grenades, Vive will track your location accurately. Destroy enemy with rocket tube and guns. Fully equipped troops with advanced weapons are waiting for you in the game. Make the best of your weapons to gain the victory.'

So now we have the game description as a string which we can easily save to a csv file.

## Getting the game tags

Since we are building a classifier to predict the tags, we need to save those as well. Once again we inspect the site to look for the CSS selector. In this case each tag has been given the class "app_tag".

```python
def get_tags(soup):
    tags_element = soup.select('body div [class="app_tag"]')
    tags = [tag.get_text().strip() for tag in tags_element]
    return tags
```

Calling `get_tags(soup)`returns:

> [Action, Violent, VR, World War II]

So we are able to get what we want: The game descriptions and tags. Now we need a convenient way to loop through all the games. We saw earlier that the URLs of the steam web page is structured around the game IDs like so: http://store.steampowered.com/app/game_ID. This makes it easy for us to loop through all the games if we have a complete list of the game IDs.

# Putting it together and scraping Steam
## Getting a list of all relevant game ids
If we did not have a complete list of all the game IDs on steam we would need to simply loop through positive integers starting from 0 -- this is doable but it would be slow. We also would not know when to stop the looping. Luckily I have such a list.

Below I parse an xml file and create a list containing all the game IDs on Steam.
```python
e = xml.etree.ElementTree.parse('../data/api_steampowered.xml')
root = e.getroot()[0]
game_ids = []
for idx in range(len(root)):
    game_id = root[idx][0].text
    game_ids.append(game_id)
```

Now all we have to to is loop over each item of the list and get the game description and tags.

## Looping over all games
Now we will put everything together in a single loop. We will create three lists: 
1. The first contains the game descriptions. 
1. The second list contains a list of tags for each game. 
1. The third list contains a single copy of each tag we encounter during the scraping. This last is necessary as we need to know how many tags there are when we create the matrix representation of the tags for each game.

The final loop looks like this:
```python
game_descriptions = []
game_tags = []
complete_tag_list = []
for game_id in game_ids:
    soup = make_requestion(game_id)
    description = get_desctiption(soup)
    if description is not None: # We are only interested in games with descriptions
        game_descriptions.append(description)
        tags_list = []
        tags = get_tags(soup)
        for item in tags:
            tag = item.get_text().strip()
            tags_list.append(tag)
            if tag not in complete_tag_list:
                complete_tag_list.append(tag)
        game_tags.append(tags_list)
```

# Saving the data
We save the three lists described above to csv files so we can load them easily later.

```python
with open('data/steam_game_descriptions.txt', 'w') as fp:
    writer = csv.writer(fp)
    writer.writerow(game_descriptions)
    
with open('data/steam_game_tags.txt', 'w') as fp:
    writer = csv.writer(fp)
    for genres in game_genres:
        writer.writerow(genres)
    
with open('data/steam_complete_tag_list.txt', 'w') as fp:
    writer = csv.writer(fp)
    writer.writerow(complete_genre_list)
```
In principle we are done now! However, there is one last thing we can do to make our lives easier when we move on to training the machine learning models.

## Doing one-hot encoding of the genres
Rather than having a list of all the tags for each game we would like a matrix where each row represents a game and each column a unique tag. Each element of the matrix will be be 0 or 1 depending on whether or not the game has the tag. This representation of the tags is much more convenient to work with. This is why we needed the complete list of the tags, so we know how many columns the matrix should have.

First we create a dictionary that maps game tags to column numbers in the tag matrix:
```python
tag_to_idx_dict = {}
for idx, tag in enumerate(complete_tags_list):
    tag_to_idx_dict[tag] = idx
```

We then create a matrix filled with zeros, so all we need to do is put in 1's in the relevant elements of the matrix. We do this by looping over each item in the game tags list. The item is itself a list, so we loop through that as well:

```python
tag_matrix = np.zeros( (len(game_descriptions), len(complete_tags_list)) )
for idx, tag_list in enumerate(game_tags):
    for tag in tag_list:
        tag_idx = tag_to_idx_dict[tag]
        tag_matrix[idx, tag_idx] = 1
```

Finally we save the tag matrix:
```python
np.save('data/steam_tag_metrix', tag_matrix)
```

Now we have everything we need to train and test our tag classifier.

[beautiful-soup]: https://www.crummy.com/software/BeautifulSoup/
