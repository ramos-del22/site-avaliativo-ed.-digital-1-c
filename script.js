// Dados Enriquecidos (Onde você edita o conteúdo)
const mesozoicContent = {
    periods: [
        {
            title: "Triássico",
            time: "252 - 201 Ma",
            image: "https://images.unsplash.com/photo-1550348253-15053724399e?auto=format&fit=crop&q=80&w=600",
            desc: "A Terra renasce após a extinção Permiana. Surgem os primeiros dinossauros pequenos e ágeis entre vastos desertos."
        },
        {
            title: "Jurássico",
            time: "201 - 145 Ma",
            image: "https://images.unsplash.com/photo-1519067736912-e2af30623a69?auto=format&fit=crop&q=80&w=600",
            desc: "O reinado dos gigantes. Clima úmido, florestas exuberantes e saurópodes colossais que pesavam como prédios."
        },
        {
            title: "Cretáceo",
            time: "145 - 66 Ma",
            image: "https://images.unsplash.com/photo-1606856094755-71f8837272a7?auto=format&fit=crop&q=80&w=600",
            desc: "O ápice da evolução. Surgem as flores e os predadores mais famosos, terminando com o impacto que mudou tudo."
        }
    ],
    predators: [
        { name: "Tiranossauro Rex", role: "Rei do Cretáceo", img: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?auto=format&fit=crop&q=80&w=1000" },
        { name: "Espinossauro", role: "Predador Aquático", img: "https://images.unsplash.com/photo-1510442650500-93217e634e4c?auto=format&fit=crop&q=80&w=1000" },
        { name: "Alossauro", role: "Terror do Jurássico", img: "https://images.unsplash.com/photo-1525877442103-5ddb2089b2bb?auto=format&fit=crop&q=80&w=1000" }
    ],
    faq: [
        { q: "Os dinossauros tinham penas?", a: "Sim! Descobertas recentes provam que muitos grupos, especialmente os carnívoros menores, possuíam plumagens para isolamento térmico ou exibição." },
        { q: "Como eles ficaram tão grandes?", a: "A combinação de ossos ocos (pneumatizados), sistemas respiratórios eficientes e abundância de vegetação permitiu o gigantismo único." },
        { q: "Ainda existem descendentes?", a: "Tecnicamente, sim. As aves modernas são descendentes diretas dos dinossauros terópodes." }
    ]
};

// Renderização e Lógica
document.addEventListener('DOMContentLoaded', () => {
    init();
});

function init() {
    renderPeriods();
    renderCarousel();
    renderFAQ();
    setupAccessibility();
    handleCarousel();
    setupScrollReveal();
}

// 1. Renderização de Conteúdo
function renderPeriods() {
    const grid = document.getElementById('periods-grid');
    grid.innerHTML = mesozoicContent.periods.map(p => `
        <article class="card">
            <img src="${p.image}" alt="${p.title}" class="card-img">
            <div class="card-content">
                <span style="color: var(--secondary); font-weight: bold; font-size: 0.8rem;">${p.time}</span>
                <h3 style="margin: 10px 0;">${p.title}</h3>
                <p style="color: var(--text-muted);">${p.desc}</p>
            </div>
        </article>
    `).join('');
}

function renderCarousel() {
    const track = document.getElementById('carousel-list');
    track.innerHTML = mesozoicContent.predators.map(p => `
        <li class="carousel-item">
            <img src="${p.img}" alt="${p.name}" class="carousel-img">
            <div class="carousel-caption container">
                <h2>${p.name}</h2>
                <p>${p.role}</p>
            </div>
        </li>
    `).join('');
}

function renderFAQ() {
    const faqContainer = document.getElementById('faq-accordion');
    faqContainer.innerHTML = mesozoicContent.faq.map((item, i) => `
        <div class="accordion-item">
            <button class="accordion-header" aria-expanded="false" aria-controls="content-${i}">
                ${item.q} <span>+</span>
            </button>
            <div id="content-${i}" class="accordion-content" style="max-height: 0; overflow: hidden; transition: 0.3s ease;">
                <p style="padding: 20px; color: var(--text-muted);">${item.a}</p>
            </div>
        </div>
    `).join('');

    // Lógica do Acordeão
    document.querySelectorAll('.accordion-header').forEach(btn => {
        btn.addEventListener('click', () => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', !expanded);
            const content = btn.nextElementSibling;
            content.style.maxHeight = expanded ? '0' : content.scrollHeight + 'px';
            btn.querySelector('span').innerText = expanded ? '+' : '-';
        });
    });
}

// 2. Acessibilidade
function setupAccessibility() {
    let baseSize = 16;
    const updateSize = (val) => {
        baseSize += val;
        document.documentElement.style.setProperty('--font-base', baseSize + 'px');
    };

    document.getElementById('font-increase').onclick = () => updateSize(2);
    document.getElementById('font-decrease').onclick = () => baseSize > 12 && updateSize(-2);
    document.getElementById('contrast-toggle').onclick = () => document.body.classList.toggle('high-contrast');
}

// 3. Carrossel
function handleCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    let current = 0;

    const move = (targetIndex) => {
        track.style.transform = `translateX(-${targetIndex * 100}%)`;
        current = targetIndex;
    };

    nextBtn.onclick = () => move((current + 1) % slides.length);
    prevBtn.onclick = () => move((current - 1 + slides.length) % slides.length);
}

// 4. Scroll Reveal
function setupScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => e.isIntersecting && e.target.classList.add('active'));
    }, { threshold: 0.15 });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}
