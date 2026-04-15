/* ----------------------------------------------------
   SALLE DES ÉCHOS — CONSTELLATION + SONS + RECHERCHE
---------------------------------------------------- */

// 1. Récupération des contenus depuis Jekyll (5 collections)
const echos = [
  {% assign echos = site.actualites 
    | concat: site.creations 
    | concat: site.idees 
    | concat: site.spiritualite
    | concat: site.passe %}

  {% for item in echos %}
    {
      title: "{{ item.title | escape }}",
      url: "{{ item.url | relative_url }}",
      slug: "{{ item.slug }}",
      excerpt: "{{ item.excerpt | strip_newlines | escape }}",
      sound: "/sons/{{ item.slug }}.mp3"
    },
  {% endfor %}
];

// 2. Conteneur de la constellation
const constellation = document.getElementById("constellation-echos");

// 3. Génération des points lumineux
echos.forEach((echo, index) => {
  const point = document.createElement("div");
  point.classList.add("point-echo");

  // Position aléatoire dans la salle
  point.style.top = Math.random() * 90 + "%";
  point.style.left = Math.random() * 90 + "%";

  // Identifiant interne
  point.dataset.slug = echo.slug;

  // Clic → aller vers l’article
  point.addEventListener("click", () => {
    window.location.href = echo.url;
  });

  // Survol → jouer le son
  point.addEventListener("mouseenter", () => {
    jouerSon(echo.slug);
  });

  constellation.appendChild(point);
});

// 4. Fonction pour jouer un son
function jouerSon(slug) {
  const audio = document.getElementById("son-" + slug);
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
}

// 5. Recherche : activer les points correspondants
function filtrerEchos(terme) {
  const points = document.querySelectorAll(".point-echo");

  points.forEach(point => {
    const slug = point.dataset.slug;
    const echo = echos.find(e => e.slug === slug);

    if (!terme) {
      point.classList.remove("son-actif");
      return;
    }

    const match =
      echo.title.toLowerCase().includes(terme.toLowerCase()) ||
      echo.excerpt.toLowerCase().includes(terme.toLowerCase());

    if (match) {
      point.classList.add("son-actif");
      jouerSon(echo.slug);
    } else {
      point.classList.remove("son-actif");
    }
  });
}

// 6. Connexion aux champs de recherche
const champResonance = document.querySelector(".champ-resonance");
const champAppel = document.querySelector(".champ-appel");

champResonance.addEventListener("input", e => {
  filtrerEchos(e.target.value);
});

champAppel.addEventListener("input", e => {
  filtrerEchos(e.target.value);
});
