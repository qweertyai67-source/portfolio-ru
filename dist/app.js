const projects = [
  { id: 'morgenshtern', category: 'sites', label: 'Сайт · концепт', title: 'MORGENSHTERN — новая глава', description: 'Кинематографичный digital-продукт для музыкального проекта: релизы, live-разделы и интерактивный storytelling.', tech: ['HTML/CSS', 'JavaScript', 'Vercel'], image: 'assets/project-morgenshtern-mshot.png', accent: 'rgba(232,72,50,.58)', url: 'https://morgenshtern-project.vercel.app/#connect', details: ['Сценарий погружения через крупную типографику', 'Разделы live, музыка, архив и связь', 'Адаптивный интерфейс с акцентом на атмосферу'] },
  { id: 'project-ai', category: 'sites', label: 'Сайт · интерактив', title: 'Project AI Number One', description: 'Веб-проект с интерактивными зонами и визуальной навигацией для презентации AI-идеи.', tech: ['HTML', 'CSS', 'JavaScript'], preview: 'preview-ai', accent: 'rgba(150,117,255,.55)', url: 'https://qweertyai67-source.github.io/projectAI-number-one./#zones', details: ['Визуальная структура по тематическим зонам', 'Интерактивный сценарий просмотра', 'Ссылка сохранена на исходный проект'] },
  { id: 'click-club', category: 'sites', label: 'Сайт · коммерческий концепт', title: 'КЛИК — Computer Club', description: 'Сайт компьютерного клуба с зонами, демо-бронированием, тарифами и выразительным неоновым визуальным языком.', tech: ['HTML/CSS', 'JavaScript', 'GitHub Pages'], image: 'assets/project-click-club.png', accent: 'rgba(55,205,255,.55)', url: 'https://qweertyai67-source.github.io/click-computer-club/#club', details: ['Каталог игровых зон и форматов', 'Интерактивный демо-сценарий бронирования', 'Контакты, цены и адаптивная структура'] },
  { id: 'finflow', category: 'saas', label: 'SaaS', title: 'FinFlow', description: 'Финансовая dashboard-платформа для малого бизнеса: цифры, которые помогают принимать решения.', tech: ['React', 'Next.js', 'PostgreSQL'], preview: 'preview-dashboard', accent: 'rgba(150,117,255,.55)', details: ['Роли и доступы для команды', 'Сводка расходов и cash flow в реальном времени', 'Система быстрых действий для бухгалтера'] },
  { id: 'storeline', category: 'ecommerce', label: 'E-commerce', title: 'Storeline', description: 'Современный интернет-магазин с каталогом, быстрым поиском и спокойным checkout-сценарием.', tech: ['Next.js', 'Stripe', 'Tailwind'], preview: 'preview-store', accent: 'rgba(224,177,111,.5)', details: ['Каталог с умными фильтрами', 'Минималистичный checkout без лишних шагов', 'Компонентная система для новых коллекций'] },
  { id: 'teamboard', category: 'web', label: 'Web App', title: 'Teamboard', description: 'Инструмент управления задачами для распределённых команд — меньше статусов, больше движения.', tech: ['React', 'Node.js', 'MongoDB'], preview: 'preview-team', accent: 'rgba(101,225,232,.46)', details: ['Канбан с drag-and-drop', 'Командные пространства и роли', 'Фокус на активной задаче и сроках'] },
  { id: 'medconnect', category: 'landing', label: 'Landing Page', title: 'MedConnect', description: 'Спокойный и доверительный лендинг платформы онлайн-консультаций.', tech: ['Next.js', 'WebSockets', 'Motion'], preview: 'preview-mobile', accent: 'rgba(222,132,186,.47)', details: ['Сценарий записи на консультацию', 'Информационная архитектура для сложной услуги', 'Мягкая motion-система без отвлечения'] }
];

const projectGrid = document.querySelector('#projects-grid');
const filterButtons = document.querySelectorAll('.filter-button');
const dialog = document.querySelector('#project-dialog');
const dialogContent = document.querySelector('#dialog-content');
const closeDialog = document.querySelector('.dialog-close');

function previewMarkup(project) {
  if (project.image) return `<div class="project-preview has-image" style="--preview-accent:${project.accent}"><img class="project-image" src="${project.image}" alt="Скриншот проекта ${project.title}" loading="lazy"><span class="preview-label">Live preview ↗</span></div>`;
  return `<div class="project-preview ${project.preview}" style="--preview-accent:${project.accent}"><div class="preview-shell"><div class="preview-top"><span>${project.title.toLowerCase()}.app</span><span>•••</span></div><div class="preview-lines"><i></i><i></i><i></i></div><div class="preview-chart"></div></div></div>`;
}

function renderProjects(filter = 'all') {
  const visible = projects.filter((project) => filter === 'all' || project.category === filter);
  projectGrid.innerHTML = visible.map((project) => `<article class="project-card reveal is-visible"><div>${previewMarkup(project)}</div><div class="project-info"><span class="project-category">${project.label}</span><h3>${project.title}</h3><p>${project.description}</p><div class="project-bottom"><div class="project-tech">${project.tech.map((item) => `<span>${item}</span>`).join('')}</div><div class="project-actions"><button class="project-open" type="button" data-project="${project.id}">Подробнее ↗</button>${project.url ? `<a class="project-external" href="${project.url}" target="_blank" rel="noreferrer">Открыть сайт ↗</a>` : ''}</div></div></div></article>`).join('');
  projectGrid.querySelectorAll('.project-open').forEach((button) => button.addEventListener('click', () => openProject(button.dataset.project)));
}

function openProject(id) {
  const project = projects.find((item) => item.id === id);
  if (!project) return;
  dialogContent.innerHTML = `<div class="dialog-inner"><p class="eyebrow">${project.label} / Кейс</p><h2 id="dialog-title">${project.title}</h2><p>${project.description}</p><ul class="dialog-list">${project.details.map((detail) => `<li>${detail}</li>`).join('')}</ul><div class="dialog-actions">${project.url ? `<a class="dialog-link" href="${project.url}" target="_blank" rel="noreferrer">Открыть сайт ↗</a>` : ''}<a class="dialog-link" href="#contact" data-close-dialog>Обсудить похожий проект ↗</a></div></div>`;
  dialog.showModal();
  dialogContent.querySelector('[data-close-dialog]').addEventListener('click', () => dialog.close());
}

filterButtons.forEach((button) => button.addEventListener('click', () => {
  filterButtons.forEach((item) => item.classList.remove('is-active'));
  button.classList.add('is-active');
  renderProjects(button.dataset.filter);
}));

closeDialog.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });

const menuButton = document.querySelector('.mobile-menu-button');
const primaryNav = document.querySelector('.primary-nav');
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') === 'true'; menuButton.setAttribute('aria-expanded', String(!open)); primaryNav.classList.toggle('is-open', !open); });
primaryNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { menuButton.setAttribute('aria-expanded', 'false'); primaryNav.classList.remove('is-open'); }));

const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') document.body.classList.add('light');
themeToggle.addEventListener('click', () => { const light = document.body.classList.toggle('light'); localStorage.setItem('portfolio-theme', light ? 'light' : 'dark'); });

const header = document.querySelector('.site-header');
const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); } }), { threshold: .1 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.primary-nav a');
const activeObserver = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`)); } }), { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
sections.forEach((section) => activeObserver.observe(section));

const form = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = [...form.querySelectorAll('input, textarea')];
  let valid = true;
  fields.forEach((field) => { const fieldValid = field.checkValidity(); field.classList.toggle('has-error', !fieldValid); valid = fieldValid && valid; });
  formStatus.className = valid ? 'is-success' : 'is-error';
  formStatus.textContent = valid ? 'Готово — это демо-режим, данные не отправлены.' : 'Проверьте, пожалуйста, заполнение полей.';
  if (valid) form.reset();
});

renderProjects();
