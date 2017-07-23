---
layout: post
title:  "My problem with the ROC curve"
date:   2017-07-22 13:34:36 +0200
categories: Blog-posts
text-snippet: At work I have been build a classifier for data where the class balance in extremely skewed -- in some cases as much as 2000 negative for each positive case. Based on the ROC AUC I thought my results were great, but then I looked at the precision-recall curve.
---
Im am not the first to address this problem. See eg. [here](https://www.kaggle.com/lct14558/imbalanced-data-why-you-should-not-use-roc-curve)

However, the precision-recall curve does have some disadvantages compared to the ROC curve, as discussed in [this paper](https://nips.cc/Conferences/2015/Schedule?showEvent=5873)

One way to deal with the class imbalance is to under sample the negative. However, since data is typically quite scarce it is common to do 5- or 10- fold cross validation. This means that one will end up having a test set with a class imbalance that is significantly different from the real world. This is not a problem for the ROC curve, since it should be insensitive to the class balance, but if you then give precision and recall figures, they will be meaningless.

Ideally one should report both the ROC and the PR. The PR curve shows how tht model performs in the specific case, for which it was trained, while the ROC curve shows how well the model performs independent of the particular class imbalance. This can be quite useful. Imagine you have trained a model to recognize cats in photos. On your site, for which the model was trained, cats may appear in one of every hundred phots. But I may want to use the model to spot cats in my own personal photo library where cats are ubiquitous.

In summary: If you are shown a nice looking ROC curve, remember to inquire about the class balance, and the details of the train/test scheme. 