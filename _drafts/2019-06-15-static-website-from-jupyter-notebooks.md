---
layout: post
title: "Static website from Jupyter Notebooks"
date: 2019-05-14 10:00:36 +0200
---

At work we have several data science projects running in parallel. We use Jupyter Notebooks because they give us a good environment for developing ideas and they make it easy to create reproducible reports. I've been looking for a workflow that lets us easily generate a static website from a collection of notebooks, so they can be easily shared within the company. Here I describe the workflow we currently use.

# The Problem

Over time we accumulate quite a few notebooks. We keep notebooks short and to the point to make collabroation easier, but it means that we create a lot of them. In one of our projects we have more than 25 notebooks. Even with reasonable folder structure and good naming, it feels scattered. 

The whole situation makes me long for the days of thesis writing where three years of work was contained between two covers. The sense of progression I git from writing on a chapter for the thesis kept me going through the rough times. Even if an experiment or analysis failed I would just go "Eh, I guess it'll be chapter in the thesis", and finishing that chapter still gave me a feeling of completion. I want to create the same feeling of progression for our data scientist, and I don't think that writing up a notebook gets the job done. Once you have finshed an analysis it should go in "the thesis". One solution is to compile all the notebook into a report.

I am also often in a situation where one of my coworkers want a figure that I  presented during one of our weekly demos. They may not be on GitHub, so I can't simply send them a link to the notebook. And if the notebook contain sensitive information it will have been cleared before being pushed to GitHub anyway. I need a compiled report that is easily shared.

As the size of the data science project grows it can be hard to remember exactly what all the notebooks do. Therefore I want to have excellent search capabilities.  

Finally, I want a workflow that lets me convert a collection of notebook into a selfcontained report with as little overhead as possible. 

In summary, the report should have the following properties:

1. It should be able to combine a collection of notebooks into a single report to increase a sense of coherency.
1. It should be easy to share the report.
1. It should be easy to search across all notebook within a project. 
1. It should be possible to turn in build process into a git hook, so we can build it every time something is pushed to master. 

# The Solution

The solution we're currenly using revolves around three tools: `make`, `nb_convert`, and `mkdocs`.

1. Convert notebooks to Markdown using `nb_convert`.
1. Build a static website from the Markdown files using `mkdocs`
1. Use Make to orchestre everything

If you want to see temple of how this would work, then check out [this repo](https://github.com/mikkelhartmann/jupyter-notebooks-to-static-website-template). Below I'll explain what they different tools do and how they work together.

## MkDocs

[MkDocs](https://www.mkdocs.org/) is a fast and simple static site generator that's geared towards building project documentation. Documentation source files are written in Markdown, and configured with a single YAML configuration file.

We use MkDocs because it gives us a simple way of structuring the notebooks. The default search is also great.

I wont give a fulle introduction here. I will simply point out some of the details and why I like them. The YAML configuration file is called `mkdocs.yml` and should be placed in the root of the project directory. 

The Table of Contents or Navigation is written in the `nav` section of the YAML file. For a data science project it could look something like this.

```yml
    - introduction: introduction.md
    - pre-processing:
        - introduction: pre-processing/introduction.md
        - missing data: pre-processing/missing-data.md
        - feature engineering: pre-processing/feature-engineering.md
    - model building: model-building.md
    - testing: testing.md
    - experimental: 
        - introduction: experimental/introduction.md
```

I like that I have to define the TOC myself, rather than have it infer it from some pre-defined folder structure or naming convention. Here I can simply include the things that I want.

We are using the [Material theme](https://squidfunk.github.io/mkdocs-material/).

## nb_convert

Primarily, [the nbconvert tool](https://nbconvert.readthedocs.io/en/latest/) allows you to convert a Jupyter .ipynb notebook document file into another static format including HTML, LaTeX, PDF, Markdown, reStructuredText, and more. nbconvert can also add productivity to your workflow when used to execute notebooks programmatically.

For this workflow we use it to generate the Markdown file. A neat thing about `nb_convert` is that is allows you to use cumtom templates when converting the notebook. We use this to hide all input fields. 

```bash
jupyter nbconvert\
    --to markdown $<\
    --output-dir $(dir $@)\
    --TagRemovePreprocessor.remove_cell_tags='{"remove_cell"}'\
    --TagRemovePreprocessor.remove_input_tags='{"remove_input"}'\
    --template=src/to_markdown.tpl
```

## Make

Make is a tool for building a dependency graph. I think [this](https://mads-hartmann.com/2016/08/20/make.html) is a nice introduction to `Make`.

Make isn't really neccesary -- we could have a collection of bash scrips -- but I like Make. It allows us to only convert notebooks that have changed. This way we are not constantly converting 25 notebooks.

The makefile has a couple of reponsebilities. I needs to locate all the notebook files. Create a mirror structure for the markdown files in the `docs` folder, and populate the folders based on the notebooks.

The most important part of the `Makefile` is this:

```bash
notebooks := $(wildcard notebooks/*.ipynb) $(wildcard notebooks/**/*.ipynb)
md_pages := $(patsubst notebooks/%.ipynb,docs/%.md,$(notebooks))

build.env: ; conda env create -f environment.yml
build.site: $(md_pages)

docs/%.md: notebooks/%.ipynb
	jupyter nbconvert\
		--to markdown $<\
		--output-dir $(dir $@)\
		--template=src/to_markdown.tpl
```

Here `md_pages` finds all Jupyter Notebooks in the notebooks folder and replaces `.ipynb` with `.md`. This gives us a list of Markdown files.

the `build.site` taget requires all the `md_pages`. The last section is a recipe that tells `make` how to produce any `.md` file in the docs folder, given a `.ipynb` file with the same name exists in the notebooks folder. It create the file by running the `jupyter nbconvert` command.

## The workflow 

Here I wanted to be explicit about how I work with this set-up.

If I've just finished a new notebook I will:

1. Add it to the `nav` section of `mkdocs.yml`.
1. run `make build.site` to convert the notebooks with changes into Markdown files in the `docs` folder.
1. run `mkdocs serve` to launch the site on localhost. This way I can click around and see how the new notebook fits into the greater picture.

If I'm editing a notebook I will have `mkdocs serve` running in one terminal window and then run `make build.site` in another terminal window every thime I want to see my changes. `mkdocs serve` will automatically pick up on the changes to the markdown version of the notebook and rebuild the site.

# In Conclusion

I quite like this solution, but I've only just started using it. Problems or chalanges are sure to crop up over time. I still haven't set it up so it works with Git. This should just require a file in the `.githooks` folder, but it may cause some trouble -- you never know.