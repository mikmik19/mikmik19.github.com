---
layout: post
title:  "Notes on Data Science Infrastructure"
categories: 
text-snippet: 
---

At work we are thinking about what infrastructure our data science team will need as it grows over the coming months and years. I have very little experience collaboration on data science projects so naturally I turned to the internet for advice. Below I've included a list on the most noteworthy sources that I have come across in my research.

[Going Full Stack with Data Science: Using Technical Readiness Level Scale](https://www.youtube.com/watch?v=huqpXMNFD54)

The talk is actually about building full-stack teams. The presenter agues that there is no such thing as a full stack engineer or data scientist, so we have to have the right team.

The talk introduces the concept of Technical Readiness Level (TRL), which seems useful. TRL is a 9 step scale that reaches from "algorithm development" to "System proven in operational environment". By being explicit about which TRL we are aiming for, we can pull in the correct people. We should keep it in mind when thinking about the kind of work our architecture should enable.

[Unit Testing Data with Marbles](https://www.youtube.com/watch?v=enlNiRSt9nk)

How can we extend the Software methodology of Unit testing to data? The goal is: 
1. to make our assumptions about data explicit.
1. to get in th habit of validation our assumptions.
1. to give us confidence that our assumptions are being met.

Writing it down everything is important. But writing down assumptions and checking them does not scale. The presenter wants a "set it and forget it" framework, that automatically lives up to the three criteria listed above.

The answer is unit testing. They use `unittest` rather than `PyTest`, but keep it mind this is for data testing, not Python module testing. The speaker has a list of argument for why `unittest` is a good framework to use for this.

This approach introduces some challenges, like _"Our assumptions aren't always a clear-cut pass fail"_. The presenter walks through them. One main point is that context is expensive to recover: Why is this test here, why does it fail, and what should I do about it? The presenter wants to give the context via the unit tests, and the company she works for has build [Marbles](https://marbles.readthedocs.io/en/stable/) (free and open source) to solve this. It is a python `unittest` extension that gives you rich, human-readable failure messages. Marbles treats failures messages as documentation -- this will lead you to write clearer, more explicit tests, and test more things like data.

[Data Science Workflow](https://www.youtube.com/watch?v=veiLCvcLIg8)

The talk seems to be good for general data science practice, but does not help me design our data science infrastructure.

As a side note, he agues that we need better workflow tools for statistical model. He often experiences that we have like 18 different models with name like "simple model", "more advances model" ect. and that is hard to remember and work with. He would also like a good module for simulating data based on a model or statistical theory.

[PyData Tel Aviv Meetup: Using JupyterHub to 10,000x data access ](https://www.youtube.com/watch?v=QN8T9zdnyLc)

I watched this video because we have been considering using JupyterHub. However, It seems that most of their gains are from switching from a mess to Jupyter Notebook. They end up also using JupyterHub, but it seems that this is mainly to make it easy for the rest of the firm to view the Notebook, not to collaborate on it.

For easy data access they have created a python module called `waze.data`. This is available on JupyterHub, and it greatly improves data access. It is basically a wrapper that takes care of data access. This is a cool idea and I might use it in the future.

It seems that their main gains are from the combination of Jupyter Notebooks and the python module for data access.

[End to End Machine learning pipelines for Python driven organizations](https://www.youtube.com/watch?v=DGeVRD63xZw)

The presenter works for [Pachyderm](https://www.pachyderm.io/), and the talk is very much a demo of what the tool can do. But he does motivate the features of the application well, and those motivations are worth listening to.

He makes a list of things that is necessary for Machine learning to reach its full potential at a company. They are:
1. **Data needs to have the same production practices as code.** By this he means e.g. version control of data, models and analysis. How easily can we roll back to a different model or data set?
1. **Developers needs to be empowered not restricted.** They need to be able to work with data with confidence, without fearing that they will mess everything up if they misstep.
1. **Organization wide confidence.** By this he seems to mean  that the outputs of the model should be interpretable and explainable.

He makes list of obstacles that prevent effective data science. They are:
1. **Data sets diverge.** Data teams can't reproduce results because they can't track every version of data and code throughout the system (See section Unit Testing Data).
1. **Tool restraints.** The tooling available is restricted because of the infrastructure. E.g. the analysis needs to be written in Java because the rest of the system is built with Java.

These obstacles are solved by Pachyderm in the following way:
1. **Version control for data.** Pachyderm allows you to manage data with the same production practices as code. It allows you to instantly reconstruct any past output/decision.
1. **Containerized data pipelines.** The data pipelines are self-contained. 

We are not interested in using this, but we can be inspired by what they do.

# Conclusion
My main take-away from this research is that there are a lot of good ideas floating around, but that best practices hasn't stabilized yet. We are probaly best off mixing pragmatism and common sense. Forcing myself to be explicit about our needs I would say:

1. We should take care to version our data so the results of our experiments are reproducible.
1. We should have an easy way of getting data from PROD, so we can test our machine learning products on realistic data.
1. We should be able to quickly build prototypes that extend our own local-hosts.