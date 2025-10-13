---
layout: page
title: Blog
permalink: /blog/
---

Here are my latest posts:

<ul>
{% for post in site.posts %}
  <li>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <small>— {{ post.date | date: "%b %d, %Y" }}</small>
  </li>
{% endfor %}
</ul>
