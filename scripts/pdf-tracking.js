document.addEventListener("DOMContentLoaded", function () {

  // 1) Transformer les anciens boutons openPDF(...)
  const buttons = document.querySelectorAll("button[onclick^='openPDF']");
  buttons.forEach(button => {
    const onclick = button.getAttribute("onclick");
    const match = onclick.match(/openPDF\(['"](.+?)['"]\)/);
    if (!match) return;

    const pdfPath = match[1];

    const link = document.createElement("a");
    link.href = pdfPath;
    link.target = "_blank";
    link.textContent = "Explorer le terrier";
    link.className = "pdf-button";

    button.replaceWith(link);
  });

  // 2) Modifier aussi les <a class="pdf-button"> déjà présents dans le HTML
  const links = document.querySelectorAll("a.pdf-button");
  links.forEach(link => {
    link.textContent = "Explorer le terrier";
  });

});
