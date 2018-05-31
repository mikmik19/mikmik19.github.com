---
layout: post
title:  "The ROC curve and its alternatives"
date:   2018-01-14 18:01:00 +0200
categories: Blog-posts
text-snippet: At work I have been building a classifier using a data set with an extreme class balance -- in some cases as much as 2000 negative cases to each positive case. Based on the area under the receiver-operator characteristics (ROC) curve I thought my results were great, but then I looked at the precision-recall (PR) curve and realized that my classifier would be useless in the real world.
---

* This will become a table of contents (this text will be scraped).
{:toc}

At work I have been building a classifier using a data set with an extreme class balance -- in some cases as much as 2000 negative cases to each positive case. Based on the area under the receiver-operator characteristics (ROC) curve I thought my results were great, but then I looked at the precision-recall (PR) curve and realized that my classifier would be useless in the real world.

<!-- In this blog-post I will describe the two curves as well as the terminology needed for interpreting them. I will also give some advice for how to report on the results of your classifier, or how to read others results. -->

<!-- ## The terminology
Before I can describe the curve I have to take a stand on the terminology I will be using. Depending on the scientific field you have been raised in you will use different names for the same terms, which can be a bit confusing. Within the medicinal community they tend to prefer specificity and sensitivity. I often have to consult the [table of Terminology and derivations from a confusion matrix](https://en.wikipedia.org/wiki/Confusion_matrix) to make sure that I get the translations right. 

I prefer to use true-positive-rate (true positives/positives) and false-positive-rate (false positives/negatives), because they are close the mathematical definition. -->

## The receiver-operator characteristics (ROC) cuve
If we stick to this terminology the ROC curve plots the false-positive-rate against (fpr) against the true-positive-rate (tpr). the tpr, which is sometimes called recall, is defined as the number of true positives divided by the number of positives. The name recall makes sense because it is the number of true postives that your model correctly picks out of the dataset. The fpr is the number of false positives diveded by the number of negatives. It is the probability of a false alarm. Each point on the curve represents a (fpr, tpr) pair for a given threshold. 

Lets consider a scenario of predicting heart attacks where a model achieves a tpr of 0.6 and a fpr of 0.01. This model would catch 60% of the heart attacks and only raise an alarm in 1% of the cases where no alarm was needed. Sounds decent, doesn't it? What if I told you that this same model produces 1743 false alarms for every true alarm? Doesn't sound so appealing if you are the one having to react (or pay) for these false alarms.

The ROC curve is popular because it has some nice properties:
1. It has a universal baseline.
1. The area under the curve has a meaningful interpretation
1. It is insensitive to the class-imbalance. 


## The Precision-recall curve
As the name impleces the precision-recall curves plots precision against recall so each point on the curve represents a precision/recall pair for a given threshold.

Precision is defined as the number of true positives divided by the number of predicted positive (true positives + false positives). This tell you the likelyhood that an alarm is correct, given that an alarm was raised. If this number is too low your model will be percieved as crying wolf and people will eventually start ignoring it. You can have a low precision even if your fpr is very low.

Using again the scenario from before with a trp of 0.6 and a fpr of 0.01. Calculating the precision gives a value of 0.05 -- so on average you have 19 false alarms for every true alarm.

Lets say we have 50000 patient days worth of data (500 patients followed for a hundred days). During those days 2000 arrytmia happened. This means that the class imbalance is 2000/50000 or 25 to 1. If they have a recall of 0.6 this means that they had 2000x0.6=1200 true positives. With a fpr of 0.01 this leaves us with 48000x0.01=480 false positives. The precision is then 1200/(1200+480)=0.71. Not bad!

How about if the class imbalance was 100 to 1 instead of 25 to 1? The number of positives would then be 500. The number of true positives would then be 0.01*500=50. The number of false positives would be 49950x0.01=499.5. The precision is then be about 50/(50+499.5)=0.09 or 9%.    

Then keep in mind that class imbalances can be much greater than this.

<!-- However, the precision-recall curve does have some disadvantages compared to the ROC curve, as discussed in [this paper](https://nips.cc/Conferences/2015/Schedule?showEvent=5873). -->

## Changing between the two curves
It is possible to calculate the precision as long as you get at least a limited amount of information in addition to the ROC curve. If you know the total number of positives used to calculate the metrics you can get the number of false positves. With the recall you can get the number of true positives. Having the number of false and true positives allow you to calculate precision.

The root of the problem is the class imbalance -- the ROC curve was designed to abstract away class imbalance, so it does not give a good picture of how the classifier will perform in extreme cases. The PR curve presentes the results of you classifier, as they would be on the particular data set you are testing in. So it is very specific. The two curves are in a sense complementary. However, if you are only shown one (or even worse, are only given the area under the curve), you have to be careful about drawing any conclusion about the quality of the classifier. 

Im am not the first to address this problem. See eg. [this](http://www.chioka.in/differences-between-roc-auc-and-pr-auc/), [this](http://pages.cs.wisc.edu/~jdavis/davisgoadrichcamera2.pdf) and [this](https://www.kaggle.com/lct14558/imbalanced-data-why-you-should-not-use-roc-curve).



## A couple of real world examples
I have found a couple of example where I found it usefull to restate the results in terms of precision and recall. The example also illustate the work it sometimes require to hunt down the relevant values.

### [Daignosing Hypertrophic cardiomyopathy from Arterial pulsewaves recordings using a wearable biosensor ](http://circ.ahajournals.org/content/136/Suppl_1/A24031.short)

In the results section of the abstract they state:
>"Arterial pulsewave recordings were obtained from 14 patients with oHCM at rest and 81 unaffected controls. An oHCM machine learning classifier was developed based on 42 calculated metrics. After training and cross-validation (n=9 oHCM, n=48 control), the model achieved 98% accuracy. Application of this model to a validation cohort (n=5 oHCM, n=33 control) confirmed an increased probability in oHCM patients compared to unaffected controls (0.40 ± 0.13 vs. 0.18 ± 0.10; p=0.006). Analysis of the ROC curve in the pooled cohort shows an area under the curve of 0.88."

Putting this together with the statement
>"Disease prevalence is estimated at 1:500, but ~84% remain undiagnosed."

They data has a class imbalance of 14 to 81 or about 1 to 6, so the data does not reflect the estimated disease prevalence. 

To calculate the precision we need to know the recall and the false positive rate. This is not given in the abstract, but [elsewhare (on their own homepage)](http://investors.myokardia.com/phoenix.zhtml?c=254211&p=irol-newsArticle&ID=2316684) we are told that: 
>"MyoKardia’s proprietary machine learning algorithm identified individuals with oHCM with 95 percent accuracy, with a sensitivity of 0.95 and a specificity of 0.95."

So Both sensitivity (true positive rate, recall) and specificity (true negative rate) are at 0.95. 

Lets calculate the precisioin this algorithm would have using the estimated disease prevalance. Asuming a large dataset og 50000 patients, we should have about 50 positives and 49950 negatives. 

Since we have a true positive rate of 0.95 the number of true positives should be 50x0.95 = 47.5 = 48. The number of false positives should be 49950x0.05 = 2497,5 = 2480. This leaves us with a precision of 48/(48+24978) = 0.0019 or 0.19%. 

Or stated another way, the algorithm will find 95% of the cases, but there will about 500 false positives for every true positive. It is likely that the team could select another probability threshold that would leave to a more reasonable compromise between precision and recall, but since they do not state their results in theese terms, no such discussion is given.

Perhaps they do not intend to let the algorithm loose on the general population. Maybe it will only be used on a select group of people who already have some reason to believe that they may be have diagnoses, which would bring up the prevalence and improve the precision. But from the introduction where they stess that fact that 84% of cases ramain undiagnoses, it seems that they would like to catcha all of the cases in the general public.

### Detecting atrial fibrillation from the heart rate sensors in the Apple Watch
They give some insights into their work in a [blog post](https://blog.cardiogr.am/applying-artificial-intelligence-in-medicine-our-early-results-78bfe7605d32) on their early results.

>"Cardiogram trained a deep neural network on the Apple Watch’s heart rate readings and was able to obtain an AUC of 0.97, enabling us to detect atrial fibrillation with 98.04% sensitivity and 90.2% specificity."

>"One year ago, we teamed up with UCSF Cardiology to start the mRhythm study, which 6,158 Cardiogram users enrolled in."

>"In our study, we sent 200 AliveCor mobile ECG devices to Cardiogram users who suffered from atrial fibrillation. These users recorded a total of 6,338 mobile ECGs, each associated with a positive or negative atrial fibrillation label generated by AliveCor."

"In order to validate the model, we obtained gold-standard labels of atrial fibrillation from cardioversions. In a cardioversion, a patient experiencing atrial fibrillation is converted back to normal sinus rhythm, either chemically or with a shock to the heart. 51 patients at UCSF agreed to wear an Apple Watch during their cardioversion. We obtained heart rate samples before the procedure, when the patient was in atrial fibrillation, and after, when patient’s heart was restored to a normal rhythm. On this validation set, our model performed with an AUC of 0.97, beating existing methods."

### The prediction of Conoary Artery Disease from audio recordings
In a poster titled [The Sound of Atherocsclerosis: Voice Signal Characteristics are Independently Associated with Conoary Artery Disease](https://pr.blonde20.com/wp-content/uploads/2016/11/Beyond-Verbal-and-Mayo-Clinic-CAD-Poster.jpg) the Mayo Clinic report on the work 

## Conclusion
If your preferred metric in not given in the paper see if you can calculate it yourself with the available information. The needed information is not given, you are probably better off assuming that the results are bad.

<!-- ## Problems with undersampling and cross-validation 
One way to deal with the class imbalance is to under sample the negative. However, since data is typically quite scarce it is common to do 5- or 10- fold cross validation. This is fine if you do the under sampling within the fold, but unfortunately, I have seen cases where they do it the other way around. 

This means that one will end up having a test set with a class imbalance that is significantly different from the real world. This is not a problem for the ROC curve, since it should be insensitive to the class balance, but if you then give precision and recall figures, they will be misleading.

# Conclusion
Ideally one should report both the ROC and the PR. The PR curve shows how tht model performs in the specific case, for which it was trained, while the ROC curve shows how well the model performs independent of the particular class imbalance. This can be quite useful. Imagine you have trained a model to recognize cats in photos. On your site, for which the model was trained, cats may appear in one of every hundred phots. But I may want to use the model to spot cats in my own personal photo library where cats are ubiquitous.

In summary: If you are shown a nice looking ROC curve, remember to inquire about the class balance, and the details of the train/test scheme.  -->