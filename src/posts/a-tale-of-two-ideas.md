---
title: A Tale of Two Ideas
excerpt: What to do when encountering ideas from differing perspectives
date: "2019-11-02"
---

Every day, we encounter ideas and viewpoints that affect our lives in one way or
another. Sometimes we agree with the ideas we hear, other times we disagree, and
many times we aren't immediately sure if we agree or disagree with the ideas we
encounter. The challenge we face is discerning which ideas are true and which
are false.

While ideas come from a variety of sources, by far the easiest example of
opposing ideas is politics (_don't worry, this is not a political opinion
article_). Each election cycle, candidates give speeches and participate in
debates to make their ideas known in an effort to gain supporters who will vote
for them in the upcoming election. However, the decision rests with the voters
who must decide which candidate's ideas most closely align with their own
beliefs.

## Forks in the Road

_The remainder of this post discusses an example of opposing ideas from my
career in the software development industry. As such, many readers will not find
it very useful due to its technical nature. If you are interested in a more
general example, please let me know in the comments. Thanks!_

Over the last few months, I've been interested in the topic of testing React
components and I came across the concept of shallow rendering. In a nutshell,
shallow rendering allows you to test React components without rendering their
child components. React's documentation says the following about shallow
rendering (_plus some other stuff not relevant to this article_).

> Shallow rendering lets you render a component “one level deep”, … This does
> not require a DOM.

While some believe that shallow rendering is a good technique for testing React
components, others disagree thus creating two opposing viewpoints of which
technique is best. While I do not intend on giving my own thoughts on the
subject, I would like to share my thoughts about the two ideas as a way of
demonstrating how to discern between differing viewpoints.

## Zooming Out

Once you have identified a set of opposing viewpoints, it is helpful to “zoom
out” from the specifics and look at what high-level differences exist between
the ideas. When we stay “zoomed in” we can miss important details and make poor
judgement calls due to insufficient information. Often, the high-level
differences result in a cascade of logic that eventually leads to the details
that appear to be radically different from each other even though they stem from
similar but slightly different high-level viewpoints.

For my shallow rendering investigation, I compared an article by
[Kent C. Dodds](https://kentcdodds.com) called
"[Why I Never Use Shallow Rendering](https://kentcdodds.com/blog/why-i-never-use-shallow-rendering)"
with an article by [Tim Doherty](https://twitter.com/TimCDoherty) called
"[In Defense of Shallow Rendering](https://javascript.plainenglish.io/in-defense-of-shallow-rendering-5f627f7c155d)".
While you may find other differences, I found two high-level differences between
the articles (_again, I'm saving my opinions for a different article_). The two
differences I identified were:

- Overall testing methodology (testing pyramid vs testing trophy)
- Definition of “implementation details”

### Testing Methodology

One of the biggest differences between the two opinions on shallow rendering, as
discussed in the aforementioned articles, is the overall testing methodology.
Kent developed the “testing trophy” methodology where integration tests are
favored over unit tests whereas Tim subscribes to the more traditional “testing
pyramid” where unit tests are favored over integration tests. This difference in
how testing should be approached is a big reason why they differ on the idea of
shallow rendering.

### Implementation Details

Another difference I noticed was the definition of “implementation details”.
While both Tim and Kent discuss implementation details, they use it to mean very
different things. For example, Tim mentions in his post that “the DOM is an
implementation detail” and goes on to say that child components are
implementation details when testing a parent component. Kent looks at
implementation details from the user's perspective in which case the DOM would
not be an implementation detail but instead a necessary part of the code. These
difference perspectives on implementation details further explain why the two
authors have very different thoughts on shallow rendering.

## Making the Judgement Call

So, the question you are probably asking yourself is “which approach is right?”
However, this is not always the best question to ask. While it is often the case
where one idea is right and another idea is wrong, there are instances where
both ideas are right depending on the context or use. Remember that the goal is
not always to find which idea is right and parade that idea through the streets
in a triumphal procession; sometimes simply understanding each idea thoroughly
will help you achieve the results you desire.

In most cases, there comes a time to make the judgement call and decide which
idea you believe to be true. When you do, be prepared for others to disagree
with your conclusion and be willing to accept their feedback. Hearing feedback
from others or searching for more information yourself may result in your
opinion changing on a subject, and that's okay! Making incorrect judgements,
while undesirable, should be viewed as a learning opportunity rather than a
failure.

Making a decision on a subject can be scary at times especially if the decision
could have an impact on those around you such as your family, friends, or
employer. We have all likely heard of people who made simple decisions that
resulted in a massive problem down the road and while this does happen, don't
let that stop you from making your decision and moving on. I've made many
decisions in my career that I later found were less than ideal or just flat out
wrong! The key in situations like this is simple: learn from the poor decision,
change your future decisions, and move on with your life 🙂

_If you are interested in the follow up article I wrote to this about my
personal opinions on shallow rendering, check it out using the link below!_

TODO:
