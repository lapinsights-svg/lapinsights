---
layout: default
title: Territoires d’idées
description: Explorer les architectures conceptuelles, les systèmes et les pensées qui structurent le monde.
rubrique: true
---

<section class="rubrique-header section-header">
  <h2>{{ page.title }}</h2>
  <p>{{ page.description }}</p>

  <div class="share-rubrique">
    <a href="#"
       onclick="shareArticle('{{ page.title }}', '{{ page.url | absolute_url }}'); return false;">
       partager cette rubrique
    </a>
  </div>
</section>

<div class="liste-pdf">
  {% assign pdfs = site.idees | sort: "date" | reverse %}
  {% for pdf in pdfs %}
    <div class="pdf-item">
      <span class="tag-date">{{ pdf.date | date: "%d/%m/%Y" }}</span>
      <h3 class="pdf-titre">
        <a href="#" onclick="openPDF('{{ pdf.pdf }}'); return false;">
          {{ pdf.title }}
        </a>
      </h3>
    </div>
  {% endfor %}
</div>
