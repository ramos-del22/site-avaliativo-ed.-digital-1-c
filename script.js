/* =========================
   DADOS DINÂMICOS
   ========================= */

const events = [
  { title: "Muro de Berlim", desc: "Divisão da Alemanha (1961)" },
  { title: "Crise dos Mísseis", desc: "Cuba quase gera guerra nuclear (1962)" },
  { title: "Corrida Espacial", desc: "EUA vs URSS no espaço" }
];

const images = [
  "https://via.placeholder.com/300?text=Berlim",
  "https://via.placeholder.com/300?text=Cuba",
  "https://via.placeholder.com/300?text=Espaço"
];

const leaders = [
  { name: "Stalin", info: "Líder da URSS após WWII" },
  { name: "Kennedy", info: "Presidente dos EUA na crise de Cuba" },
  { name: "Gorbachev", info: "Fim da Guerra Fria" }
];

/* =========================
   RENDERIZAÇÃO
   ========================= */

function renderEvents() {
  const container = document.getElementById("event-container");
  events.forEach(e => {
    container.innerHTML += `
      <div class="card">
        <h3>${e.title}</h3>
        <p>${e.desc}</p>
      </div>
    `;
  });
}

function renderCarousel() {
  const track = document.getElementById("carousel-track");
  images.forEach(img => {
    track.innerHTML += `<img src="${img}" alt="Imagem histórica"/>`;
  });
}

function renderAccordion() {
  const container = document.getElementById("accordion");

  leaders.forEach(l => {
    const item = document.createElement("div");
    item.classList.add("accordion-item");

    item.innerHTML = `
      <div class="accordion-header">${l.name}</div>
      <div class="accordion-content">${l.info}</div>
    `;

    item.querySelector(".accordion-header")
      .addEventListener("click", () => {
        const content = item.querySelector(".accordion-content");
        content.style.display =
          content.style.display === "block" ? "none" : "block";
      });

    container.appendChild(item);
  });
}

/* =========================
   CARROSSEL
   ========================= */
let index = 0;

function showSlide() {
  const track = document.getElementById("carousel-track");
  track.style.transform = `translateX(-${index * 300}px)`;
}

function nextSlide() {
  index = (index + 1) % images.length;
  showSlide();
}

function prevSlide() {
  index = (index - 1 + images.length) % images.length;
  showSlide();
}

/* =========================
   ACESSIBILIDADE
   ========================= */
let fontSize = 16;

function increaseFont() {
  fontSize += 2;
  document.body.style.fontSize = fontSize + "px";
}

function decreaseFont() {
  fontSize -= 2;
  document.body.style.fontSize = fontSize + "px";
}

function toggleContrast() {
  document.body.classList.toggle("high-contrast");
}

/* =========================
   SCROLL REVEAL
   ========================= */
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 50) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

/* =========================
   INIT
   ========================= */
renderEvents();
renderCarousel();
renderAccordion();
