document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("search-input");
  if (!input) return;

  const resultsBox = document.createElement("div");
  resultsBox.id = "search-results";
  input.parentNode.appendChild(resultsBox);

  fetch("/search.json")
    .then(response => response.json())
    .then(data => {
      input.addEventListener("input", function () {
        const query = this.value.toLowerCase().trim();
        resultsBox.innerHTML = "";

        if (query.length < 2) return;

        // Filtrer les pages pertinentes
        const results = data.filter(page => {
          // Exclure les pages d’archives ou autres
          if (!page.title || !page.url) return false;
          if (page.title.toLowerCase() === "archives") return false;
          if (page.url.startsWith("/archives")) return false;

          const title = page.title.toLowerCase();
          const content = (page.content || "").toLowerCase();

          return title.includes(query) || content.includes(query);
        });

        // Affichage simple : uniquement le titre + mini extrait
        results.slice(0, 10).forEach(page => {
          const item = document.createElement("div");

          const content = page.content || "";
          const index = content.toLowerCase().indexOf(query);
          let snippet = "";

          if (index !== -1) {
            const start = Math.max(0, index - 30);
            const end = Math.min(content.length, index + query.length + 30);
            snippet = content.substring(start, end) + "…";
          }

          item.innerHTML = `
            <a href="${page.url}" style="text-decoration:none; color:#333;">
              <strong>${page.title}</strong>
              ${snippet ? `<br><span style="font-size:0.85em; opacity:0.7;">${snippet}</span>` : ""}
            </a>
          `;

          resultsBox.appendChild(item);
        });
      });
    });
});
