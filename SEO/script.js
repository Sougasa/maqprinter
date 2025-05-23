// script.js

// Tema claro/escuro
const toggleTheme = document.getElementById("toggleTheme");
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  lucide.createIcons(); // atualiza ícones
});

// Sidebar toggle
const toggleSidebar = document.getElementById("toggleSidebar");
const sidebar = document.getElementById("sidebar");
const content = document.querySelector(".content");

toggleSidebar.addEventListener("click", () => {
  sidebar.classList.toggle("closed");
  content.classList.toggle("expanded");

  if (window.innerWidth <= 768) {
    sidebar.classList.toggle("open");
  }
});

// Descrições dos serviços
const descriptions = {
  plotter: "Plotter HP: Equipamento para impressão de grandes formatos com alta precisão.",
  epson: "Epson L3250: Impressora jato de tinta multifuncional, ideal para uso doméstico e pequenos escritórios.",
  termica: "Impressora Térmica: Usada para impressão de recibos, etiquetas e outros documentos térmicos.",
  lexmark: "Lexmark: Marca conhecida por impressoras corporativas e soluções robustas.",
  brother: "Brother: Marca com impressoras para escritórios e multifuncionais eficientes.",
  conserto: "Conserto: Serviços de manutenção e reparo para diversos modelos de impressoras.",
  laser: "Impressora Laser: Impressoras rápidas e econômicas para grandes volumes de impressão."
};

function showDescription(key) {
  if (descriptions[key]) {
    content.innerHTML = `
      <h2>${key.charAt(0).toUpperCase() + key.slice(1)}</h2>
      <p>${descriptions[key]}</p>
    `;
  }
}

// Evento clique nos links do menu
document.querySelectorAll(".sidebar a").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    const key = link.getAttribute("data-key");
    showDescription(key);

    if (window.innerWidth <= 768) {
      sidebar.classList.remove("open");
    }
  });
});

// Redirecionamento ao clicar no botão de seta
document.getElementById('menuRedirectButton').addEventListener('click', () => {
  window.location.href = '/maqprinter/4.2/index.html'; // Caminho do outro HTML
});