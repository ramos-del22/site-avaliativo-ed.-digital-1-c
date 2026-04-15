/* =========================
   DADOS
   ========================= */
const events = [
  { title: "Muro de Berlim", year: 1961, type: "politico" },
  { title: "Crise dos Mísseis", year: 1962, type: "militar" },
  { title: "Corrida Espacial", year: 1969, type: "tecnologico" }
];

const images = [
  "https://upload.wikimedia.org/wikipedia/commons/d/d9/Berlinermauer.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cuban_Missile_Crisis.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/9/97/Apollo_11_launch.jpg"
];

const leaders = [
  { name: "Stalin", info: "URSS" },
  { name: "Kennedy", info: "EUA" },
  { name: "Gorbachev", info: "Fim da Guerra Fria" }
];

/* =========================
   RENDER EVENTOS
   ========================= */
function renderEvents(filter = "all") {
  const container = document.getElementById("event-container");
  container.innerHTML = "";

  events
    .filter(e => filter === "all" || e.type === filter)
    .forEach(e => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${e.title}</h3>
        <p>${e.year}</p>
        <small>${e.type}</small>
      `;

      container.appendChild(card);
    });
}

/* =========================
   FILTRO
   ========================= */
function filterEvents() {
  const value = document.getElementById("filter").value;
  renderEvents(value);
}

/* =========================
   TIMELINE
   ========================= */
function renderTimeline() {
  const container = document.getElementById("timeline-container");

  events.forEach(e => {
    const item = document.createElement("div");
    item.className = "timeline-item";

    item.innerHTML = `
      <strong>${e.year}</strong>
      <p>${e.title}</p>
    `;

    container.appendChild(item);
  });
}

/* =========================
   CARROSSEL
   ========================= */
let index = 0;

function renderCarousel() {
  const track = document.getElementById("carousel-track");

  images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    track.appendChild(img);
  });
}

function nextSlide() {
  index = (index + 1) % images.length;
  updateSlide();
}

function prevSlide() {
  index = (index - 1 + images.length) % images.length;
  updateSlide();
}

function updateSlide() {
  const track = document.getElementById("carousel-track");
  track.style.transform = `translateX(-${index * 300}px)`;
}

/* =========================
   ACORDEÃO
   ========================= */
function renderAccordion() {
  const container = document.getElementById("accordion");

  leaders.forEach(l => {
    const item = document.createElement("div");

    item.innerHTML = `
      <div class="accordion-header">${l.name}</div>
      <div class="accordion-content">${l.info}</div>
    `;

    item.querySelector(".accordion-header")
      .addEventListener("click", () => {

        document.querySelectorAll(".accordion-content")
          .forEach(c => c.style.display = "none");

        item.querySelector(".accordion-content").style.display = "block";
      });

    container.appendChild(item);
  });
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
   INIT
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  renderEvents();
  renderTimeline();
  renderCarousel();
  renderAccordion();
});
