---
layout: post
title:  "Configuring jupyter notebook"
date:   2018-08-02 16:45:00 +0200
categories:
text-snippet:
---

I recently learned that Jupyter Notebook is very customizable. In this post give an outline of how I have set up the styling and extensions for my Jupyter Notebooks at work.

The goal was to improve the readability of the Notebook and quality-of-life for the Notebook user. The config files are included in [this](https://github.com/mikkelhartmann/configuring-jupyter-notebook/) GitHub repository, which also includes a notebook that demonstrates how it works.

The changes amount to editing or creating the following files:

1.  `~/.jupyter/nbconfig/notebook.json`: This file contains a list of all the Notebook Extensions I use. The extensions could also be enabled using the extension manager.
1.  `~/.jupyter/custom/custom.css`: A file that includes the CSS used to render the notebook. I use this file to set the width and alignment of the different kinds of cells.
1.  `~/.ipython/profile_default/ipython_config.py`: A file which contains the default settings for how figures are shown in the notebook. I use it to increase the quality of the figures.
1.  `~/.config/matplotlib/stylelib/my_mpl_style.mplstyle`: A file that that changes the default parameters for matplotlib.pyplot. This means that we can have a custom and consistent look across all our notebooks.

If you are using Anaconda, the paths may be different. Below I will go through each of these files.

# Notebook Extensions

I use the following extensions:

1.  **Table of content**: This allows me include a table of content in the notebook. The table of content is helpful for readers of the notebook, but it also serves as links to the individual sections, which greatly improves my ability to jump around in the notebook.
1.  **ExecuteTime**: This puts the runtime as well as a timestamp at the end of every cell that has been executed.
1.  **autoreload**: Allows me to have some module automatically reload. This is extremely handy when you want to keep some of your functions or classes outside the notebook, but still have the convenience of quick editing.

These are all enabled in `~/.jupyter/nbconfig/notebook.json`.

# Custom notebook styling

I love Jupyter Notebook, but there are some things about the default styling of the cells that don't sit right with me, e.g. the figures are left-centered and the text fields are too wide. So I was quite happy to learn that Jupyter will use the following file if it exists: `~/.jupyter/custom/custom.css`.

To see the effect of the styling, you can look at the difference between the notebook [this page](http://mikkelhartmann.dk/notebooks/configuring-jupyter-notebook.html), and compare it to the one hosted on [GitHub](https://github.com/mikkelhartmann/configuring-jupyter-notebook/blob/master/notebooks/configuring-jupyter-notebook.ipynb). I think it helps quite a bit.

# Creating high quality inline figures

Every three weeks I give a progress-report where I present the stuff I've been working on. When preparing the presentation I often save figures by drag-and-drop rather than running `fig.savefig()`. However, if you are using the matplotlib inline magic the default the format of the figure is png. It is possible to change the default setting by editing the `ipython_config.py` file. By adding

```bash
c.InlineBackend.figure_format = 'retina'
```

to the file, the resolution of the inline figures is improved greatly. This also means that the figures will have the same resolution if you save them by dragging.

# Styling Matplotlib figures

We can alter the default parameters used by matplotlib by changing the values in the `plt.rcParams` dictionary, for example:

```python
plt.rcParams['savefig.dpi'] = 200
```

Instead of including a bunch of code in the beginning of every notebook one can write a style sheets as explained [here](https://matplotlib.org/users/style_sheets.html). All the style sheets provided by matplotlib can be found [here](https://github.com/matplotlib/matplotlib/tree/master/lib/matplotlib/mpl-data/stylelib) and serve as a nice starting-point if you want to come up with your own style.

# Summary

I have shown how you customize you jupyter notebook by using three different config files and a CSS file. I hope you found it useful. For more details see the [GitHub repository](www.mikkelhartmann.dk/notebooks/configuring-jupyter-notebook.html).

# References

I have found the following references useful when developing my customization.

1.  [Gerrit Gruben - Leveling up your Jupyter notebook skills](https://www.youtube.com/watch?v=b8g-8T0amuk&t=335s)
1.  [10 things you really should know about jupyter notebooks - Jakub Czakon](https://www.youtube.com/watch?v=FwUcJFSAfQw)
1.  [Make Jupyter/IPython Notebook even more magical with cell magic extensions!](https://www.youtube.com/watch?v=zxkdO07L29Q)
1.  [Style sheets in matplotlib](https://matplotlib.org/users/style_sheets.html)
