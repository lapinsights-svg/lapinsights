---
layout: default
title: "Créations"
---

<section class="rubrique-header">
  <h2 class="rubrique-titre">CRÉATIONS</h2>
  <p class="rubrique-soustitre">
    Poèmes, fragments, éclats — les passages intimes du territoire.
  </p>
</section>

<section class="liste-articles">
  {% assign sorted = site.creations | sort: 'date' | reverse %}
  {% for item in sorted %}
    <article class="article-ligne">
      <div class="article-date">
        {{ item.date | date: "%d/%m/%Y" }}
      </div>
      <div class="article-titre">
        <a href="{{ item.url | relative_url }}">{{ item.title }}</a>
      </div>
    </article>
  {% endfor %}
</section>
