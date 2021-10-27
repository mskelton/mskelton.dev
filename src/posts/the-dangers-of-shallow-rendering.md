---
title: The Dangers of Shallow Rendering
excerpt:
  Three reasons why you should avoid shallow rendering when writing JavaScript
  component tests
tags: Testing, React
date: "2020-03-21"
---

In my article titled "[A Tale of Two Ideas](/blog/a-tale-of-two-ideas)" I
discussed my method for discerning between opposing ideas and used the topic of
shallow rendering as an example of a topic which has very distinct and differing
opinions. Although I did not tell my opinion in the article as I didn't want to
taint the purpose of the article, I did promise to publish an article with my
opinions at a later point. And now, that time has come!

## TLDR

Rather than making you scroll all the way to the end to see my list of reasons,
they are listed succinctly in the following list. If you don't like what you
see, you won't be forced to read any more. 🙂

1. Shallow rendering creates additional failure points.
1. Shallow rendering decreases confidence.
1. Shallow rendering complicates refactoring.

## Shallow Rendering Creates Additional Failure Points

What is the purpose of shallow rendering in the first place? According to the
[Enzyme docs](https://enzymejs.github.io/enzyme/docs/api/shallow.html),

> Shallow rendering is useful to constrain yourself to testing a component as a
> unit, and to ensure that your tests aren't indirectly asserting on behavior of
> child components.

To a developer with a component driven design mindset, this sounds great since
you can build your components and tests together and have confidence that your
components work as expected. However, the fundamental flaw with this idea is
that components which work in isolation might be integrated together incorrectly
resulting in unexpected user behavior. To fix this, you are required to write
additional integration tests to verify that you have integrated your components
correctly. This not only increases the number of tests you must maintain, but it
also overcomplicates what can be very simple testing.

A simple way to reduce additional failure points when testing is to move your
tests up the component tree and test larger pieces of your application. For
example, if you have a component with two child components and each of those
three components has a separate set of tests, reduce it to a single set of tests
using the highest level component. In addition to testing the components, this
will verify that your components are properly integrated removing that
additional point of failure.

## Shallow Rendering Decreases Confidence

When developing web applications, the end result is some form of user value.
Whether that is a visual or functional improvement, every change that is made
should either directly provide user value or remove barriers to creating user
value (e.g. refactoring to enable faster iteration). Tests fit in the second
category as they provide confidence that new features or changes provide the
expected user value and do not cause regressions in existing user value.

So, if the goal of testing is to increase confidence that your code provides the
user value it is supposed to, you should write tests that provide the highest
level of confidence possible. This is where shallow rendering really breaks
down. Shallow rendering might give high confidence that a single component is
working correctly, but it gives little to no confidence that it results in the
correct user behavior.

It is also important to mention that increased confidence doesn't necessarily
result in less time spent writing tests. Before you panic, that's okay! The most
likely outcome of increased confidence is better testing coverage. Since you
won't spend as much time fixing false positives/negatives, you will have more
time to test known edge cases and perform exploratory testing to find other edge
cases.

## Shallow Rendering Complicates Refactoring

Refactoring is a necessary part of software development and often occurs many
times during the lifetime of an application. When refactoring code, you should
be able to lean heavily on your test suite to verify that your changes did not
cause regressions in your applications. However, shallow rendering complicates
this due to its tight coupling of components and tests. To understand this
better, let me give an example.

Consider a React component named `UserDetails` which displays user information
(i.e. name, email, phone number) in a list. The phone number is passed to a
separate component named `FormattedPhone`. During initial development of the
component, I added a test that verifies the `UserDetails` component renders a
`FormattedPhone` component with the correct props. Later, I decide to remove the
`FormattedPhone` component and format the phone in the `UserDetails` component.
Since I used shallow rendering, my test breaks since it was expecting to find a
`FormattedPhone` component. Not only do the tests now require changes, but they
don't give me confidence that the changes to the components maintained the
expected user behavior.

## A Better Way

If you are convinced that shallow rendering is not a good testing practice, the
next big question is what to do instead? While there are many ways to answer
this question, my current thoughts are best described with the following
recommendations:

1. Replace shallow rendering with full DOM rendering. If you use Enzyme, this
   means replacing `shallow` with `mount`.
1. Think less about props/state and more about user behavior. Rather than
   directly interacting with your components props, instead try rendering
   additional DOM elements which you can interact with which in turn affect your
   component. This is more similar to a real application where user interaction
   affects your component.
1. Never under any circumstance use APIs which allow you to directly affect
   component state (e.g. Enzyme's `setState` method). This does not accurately
   reflect user behavior. Directly modifying props is also not ideal, but it is
   less problematic than directly modifying state.
1. Try out
   [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
   which does not support shallow rendering and has an API which prevents many
   common testing patterns which test implementation detail. Although not
   required to write good tests, I have found it very helpful in increasing the
   quality of my tests and the confidence they provide.
