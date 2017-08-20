---
layout: post
title:  "My problem with the ROC curve"
date:   2017-07-22 13:34:36 +0200
categories: Blog-posts
text-snippet: At work I have been building a classifier using a data set with an extreme class balance -- in some cases as much as 2000 negative cases to each positive case. Based on the area under the receiver-operator characteristics (ROC) curve I thought my results were great, but then I looked at the precision-recall (PR) curve and realized that my classifier would be useless in the real world.
---

* This will become a table of contents (this text will be scraped).
{:toc}

At work I have been building a classifier using a data set with an extreme class balance -- in some cases as much as 2000 negative cases to each positive case. Based on the area under the receiver-operator characteristics (ROC) curve I thought my results were great, but then I looked at the precision-recall (PR) curve and realized that my classifier would be useless in the real world.

The root of the problem is the class imbalance -- the ROC curve was designed to abstract away class imbalance, so it does not give a good picture of how the classifier will perform in extreme cases. The PR curve presentes the results of you classifier, as they would be on the particular data set you are testing in. So it is very specific. So the two curves are in a sense complementary. However, if you are only shown one (or even worse, are only given the area under the curve), you have to be careful about drawing any conclusion about the quality of the classifier. 

Im am not the first to address this problem. See eg. [this](http://www.chioka.in/differences-between-roc-auc-and-pr-auc/), [this](http://pages.cs.wisc.edu/~jdavis/davisgoadrichcamera2.pdf) and [this](https://www.kaggle.com/lct14558/imbalanced-data-why-you-should-not-use-roc-curve). 

In this blog-post I will describe the two curves as well as the terminology needed for interpreting them. I will also give some advice for how to report on the results of your classifier, or how to read others results.

## The terminology
Before I can describe the curve I have to take a stand on the terminology I will be using. Depending on the scientific field you have been raised in you will use different names for the same terms, which can be a bit confusing. Within the medicinal community they tend to prefer specificity and sensitivity. I often have to consult the [table of Terminology and derivations from a confusion matrix](https://en.wikipedia.org/wiki/Confusion_matrix) to make sure that I get the translations right. 

I prefer to use true-positive-rate (true positives/positives) and false-positive-rate (false positives/negatives), because they are close the mathematical definition.

## The receiver-operator characteristics (ROC) cuve
If we stick to this terminology the ROC curve plots the false-positive-rate against (fpr) against the true-positive-rate (tpr). So each point on the curve represents fpr/tpr pair for a given threshold. 

The ROC curve is popular because it has some nice properties:
1. It has a universal baseline.
1. The area under the curve has a meaningful interpretation
1. It is insensitive to the class-imbalance. 

## The Precision-recall curve
As the name impleces the precision-recall curves plots precision against recall so each point on the curve represents a precision/recall pair for a given threshold.

However, the precision-recall curve does have some disadvantages compared to the ROC curve, as discussed in [this paper](https://nips.cc/Conferences/2015/Schedule?showEvent=5873)

## Problems with undersampling and cross-validation 
One way to deal with the class imbalance is to under sample the negative. However, since data is typically quite scarce it is common to do 5- or 10- fold cross validation. This is fine if you do the under sampling within the fold, but unfortunately, I have seen cases where they do it the other way around. 

This means that one will end up having a test set with a class imbalance that is significantly different from the real world. This is not a problem for the ROC curve, since it should be insensitive to the class balance, but if you then give precision and recall figures, they will be misleading.

# Conclusion
Ideally one should report both the ROC and the PR. The PR curve shows how tht model performs in the specific case, for which it was trained, while the ROC curve shows how well the model performs independent of the particular class imbalance. This can be quite useful. Imagine you have trained a model to recognize cats in photos. On your site, for which the model was trained, cats may appear in one of every hundred phots. But I may want to use the model to spot cats in my own personal photo library where cats are ubiquitous.

In summary: If you are shown a nice looking ROC curve, remember to inquire about the class balance, and the details of the train/test scheme. 