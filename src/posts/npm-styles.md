---
title: Customizing npmjs.com Styles
excerpt: A few simple improvements to the npmjs.com package view styles
date: "2019-12-01"
---

Like most front-end developers, I use [npmjs.com](https://npmjs.com) to find new packages or read documentation for packages I use. I've also published some npm packages of my own, giving back to the open-source community.

As I have used npmjs.com more in the past few months, a couple of the styles used on the package view page were just bugging me as they gave the page an unfinished and poorly styled look. So, with the help of the Chrome Stylus extension I was able to add a couple quick styles to get the page looking nice. The before and after of the page are shown below.

![npm package view before and after adding the custom styles](/npm-styles.png)

Here is the code I used for this simple style adjustment.

```css
blockquote > p {
  margin: 5px 0 !important;
}

table {
  border-bottom: none !important;
  margin-bottom: 16px;
}
```
