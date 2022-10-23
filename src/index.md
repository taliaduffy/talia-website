---
layout: base
---

{% for post in collections.posts | reverse %}
<h2>
  <a href="{{post.url}}">{{post.data.title}}</a>
</h2>
<h6>
  {{post.data.date.toLocaleString('en-US', {timeZone: "UTC", month: "long", day: "numeric", year: "numeric"})}}
  /
  {{post.data.author}}
</h6>

{% if post.data.page.excerpt %}
{{ post.data.page.excerpt | safe }}

<div class="continue-reading">
  <a href="{{post.url}}">Continue Reading &gt;&gt;</a>
</div>

{% else %}
{{ post.templateContent | safe }}
{% endif %}


<hr style="border-style: dashed; color: #ccc200; border-width: 2px;">
{% endfor %}



<!--
https://taliaduffy.wordpress.com/2022/05/05/theres-a-viral-disease-spreading-in-the-music-industry/
-->
