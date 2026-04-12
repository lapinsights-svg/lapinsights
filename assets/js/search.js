document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("search-input");
  if (!input) return;

  const resultsBox = document.createElement("div");
  resultsBox.id = "search-results";
  resultsBox.style.marginTop = "1em";
  resultsBox.style.padding = "0.5em 0";
  resultsBox.style.borderTop = "1px solid #ddd";
  input.parentNode.appendChild(resultsBox);

  fetch("/search.json")
    .then(response => response.json())
    .then(data => {
      input.addEventListener("input", function () {
        const query = this.value.toLowerCase().trim();
        resultsBox.innerHTML = "";

        if (query.length < 2) return;

        const results = data.filter(page =>
          page.title && page.title.toLowerCase().includes(query) ||
          page.content && page.content.toLowerCase().includes(query)
        );

        results.slice(0, 10).forEach(page => {
          const item = document.createElement("div");
          item.style.marginBottom = "0.5em";

          item.innerHTML = `
            <a href="${page.url}" style="text-decoration:none; color:#333;">
              <strong>${page.title || "(Sans titre)"}</strong><br>
              <span style="font-size:0.9em; opacity:0.7;">
                ${page.content.substring(0, 120)}…
              </span>
            </a>
          `;

          resultsBox.appendChild(item);
        });
      });
    });
});
