/* =========================
   DADOS
   ========================= */
const events = [
  { title: "Muro de Berlim", desc: "Divisão da Alemanha (1961)" },
  { title: "Crise dos Mísseis", desc: "Cuba quase gera guerra nuclear (1962)" },
  { title: "Corrida Espacial", desc: "Disputa tecnológica entre EUA e URSS" }
];

const images = [
  "https://upload.wikimedia.org/wikipedia/commons/d/d9/Berlinermauer.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cuban_Missile_Crisis.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/9/97/Apollo_11_launch.jpg"
];

const leaders = [
  { name: "Stalin", info: "Líder da URSS após a Segunda Guerra Mundial." },
  { name: "Kennedy", info: "Presidente dos EUA durante a crise de Cuba." },
  { name: "Gorbachev", info: "Responsável por reformas que levaram ao fim da Guerra Fria." }
];

/* =========================
   RENDERIZAÇÃO
   ========================= */
function renderEvents() {
  const container = document.getElementById("event-container");
  if (!container) return;

  container.innerHTML = "";

  events.forEach(e => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${e.title}</h3>
      <p>${e.desc}</p>
    `;

    container.appendChild(card);
  });
}

function renderCarousel() {
  const track = document.getElementById("carousel-track");
  if (!track) return;

  track.innerHTML = "";

  images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Imagem histórica";
    track.appendChild(img);
  });
}

function renderAccordion() {
  const container = document.getElementById("accordion");
  if (!container) return;

  leaders.forEach(l => {
    const item = document.createElement("div");
    item.classList.add("accordion-item");

    item.innerHTML = `
      <div class="accordion-header">${l.name}</div>
      <div class="accordion-content">${l.info}</div>
    `;

    item.querySelector(".accordion-header")
      .addEventListener("click", () => {

        document.querySelectorAll(".accordion-content")
          .forEach(c => c.style.display = "none");

        const content = item.querySelector(".accordion-content");
        content.style.display = "block";
      });

    container.appendChild(item);
  });
}

/* =========================
   CARROSSEL
   ========================= */
let index = 0;

function updateCarousel() {
  const track = document.getElementById("carousel-track");
  track.style.transform = `translateX(-${index * 300}px)`;
}

function nextSlide() {
  index = (index + 1) % images.length;
  updateCarousel();
}

function prevSlide() {
  index = (index - 1 + images.length) % images.length;
  updateCarousel();
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
  fontSize = Math.max(12, fontSize - 2);
  document.body.style.fontSize = fontSize + "px";
}

function toggleContrast() {
  document.body.classList.toggle("high-contrast");
}

/* =========================
   SCROLL REVEAL
   ========================= */
function revealOnScroll() {
  const elements = document.querySelectorAll(".reveal");

  elements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 50) {
      el.classList.add("active");
    }
  });
}

/* =========================
   INIT (CORRIGIDO)
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  renderEvents();
  renderCarousel();
  renderAccordion();
  revealOnScroll();
});

window.addEventListener("scroll", revealOnScroll);
