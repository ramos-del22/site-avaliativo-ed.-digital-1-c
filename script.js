// Dados para renderização dinâmica
const mesozoicData = {
    periods: [
        { title: "Triássico", desc: "O surgimento dos primeiros dinossauros e mamíferos.", icon: "🌋" },
        { title: "Jurássico", desc: "A era dos gigantes. O ápice dos saurópodes.", icon: "🌿" },
        { title: "Cretáceo", desc: "O florescimento de plantas e a extinção final.", icon: "☄️" }
    ],
    dinosaurs: ["Tiranossauro Rex", "Triceratops", "Braquiossauro", "Velociraptor"],
    faq: [
        { q: "O que causou a extinção?", a: "A teoria mais aceita é o impacto de um asteroide na península de Yucatán." },
        { q: "Quanto tempo durou a era?", a: "Aproximadamente 180 milhões de anos." }
    ]
};

// 1. Inicialização e Renderização
document.addEventListener('DOMContentLoaded', () => {
    renderContent();
    initCarousel();
    initAccordion();
    initScrollReveal();
});

function renderContent() {
    // Renderizar Cards de Períodos
    const grid = document.getElementById('periods-grid');
    grid.innerHTML = mesozoicData.periods.map(p => `
        <article class="card">
            <h3>${p.icon} ${p.title}</h3>
            <p>${p.desc}</p>
        </article>
    `).join('');

    // Renderizar Carrossel
    const carouselTrack = document.getElementById('carousel-list');
    carouselTrack.innerHTML = mesozoicData.dinosaurs.map(dino => `
        <li class="carousel-item"><h3>${dino}</h3></li>
    `).join('');

    // Renderizar Accordion
    const faqContainer = document.getElementById('faq-accordion');
    faqContainer.innerHTML = mesozoicData.faq.map((item, index) => `
        <div class="accordion-item">
            <button class="accordion-header" aria-expanded="false" aria-controls="faq-${index}">
                ${item.q} <span>+</span>
            </button>
            <div id="faq-${index}" class="accordion-content">
                <p style="padding: 15px 0;">${item.a}</p>
            </div>
        </div>
    `).join('');
}

// 2. Acessibilidade: Fonte e Contraste
let currentFontSize = 16;
const htmlEl = document.documentElement;

document.getElementById('font-increase').addEventListener('click', () => {
    currentFontSize += 2;
    htmlEl.style.setProperty('--font-base', currentFontSize + 'px');
});

document.getElementById('font-decrease').addEventListener('click', () => {
    if(currentFontSize > 12) {
        currentFontSize -= 2;
        htmlEl.style.setProperty('--font-base', currentFontSize + 'px');
    }
});

document.getElementById('contrast-toggle').addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
});

// 3. Carrossel Funcional
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    let index = 0;

    nextBtn.addEventListener('click', () => {
        index = (index + 1) % mesozoicData.dinosaurs.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        index = (index - 1 + mesozoicData.dinosaurs.length) % mesozoicData.dinosaurs.length;
        updateCarousel();
    });

    function updateCarousel() {
        track.style.transform = `translateX(-${index * 100}%)`;
    }
}

// 4. Accordion (Expandables)
function initAccordion() {
    document.querySelectorAll('.accordion-header').forEach(button => {
        button.addEventListener('click', () => {
            const expanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', !expanded);
            const content = button.nextElementSibling;
            content.style.maxHeight = expanded ? '0' : content.scrollHeight + 'px';
        });
    });
}

// 5. Scroll Reveal com Intersection Observer
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}
