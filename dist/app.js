'use strict';
const branches = {
  moscow: { name: 'Москва', address: ['Олимпийский проспект,', '16, строение 5'], phone: '79104989211', display: '+7 (910) 498-92-11', map: 'https://yandex.ru/maps/org/iron_horse/122347266740/' },
  makhachkala: { name: 'Махачкала', address: ['Улица Абубакарова,', '65А'], phone: '79674087971', display: '+7 (967) 408-79-71', map: 'https://yandex.ru/maps/?text=Iron%20Horse%20Махачкала%20Абубакарова%2065А' },
  kaspiysk: { name: 'Каспийск', address: ['Улица Гагарина,', '94А'], phone: '79023552950', display: '+7 (902) 355-29-50', map: 'https://yandex.ru/maps/?text=Iron%20Horse%20Каспийск%20Гагарина%2094А' }
};
const services = {
  film: { title: ['Сохранить характер.', 'Защитить оригинал.'], description: 'Прозрачная защитная плёнка помогает уберечь лакокрасочное покрытие от дорожного песка, мелких сколов и повседневных воздействий.', tags: ['Кузов целиком', 'Зоны риска', 'Отдельные элементы'], visual: 'Кузов / Защита', image: 'photos/photo-03.webp', alt: 'Фиолетовый BMW', formValue: 'Защитить кузов плёнкой' },
  polish: { title: ['Глубина цвета.', 'Чистота отражения.'], description: 'Полировка помогает скорректировать мелкие дефекты лакокрасочного покрытия и вернуть поверхности выразительный блеск. Подход подбирается по состоянию кузова.', tags: ['Оценка состояния ЛКП', 'Коррекция дефектов', 'Финишный блеск'], visual: 'Кузов / Восстановление', image: 'photos/photo-01.webp', alt: 'Деталь фары и лакокрасочного покрытия BMW', formValue: 'Отполировать кузов' },
  ceramic: { title: ['Меньше лишнего.', 'Больше блеска.'], description: 'Защитное покрытие придаёт поверхности гидрофобные свойства и облегчает повседневный уход. Состав и подготовка зависят от состояния автомобиля.', tags: ['Керамика', 'Подготовка поверхности', 'Гидрофобный эффект'], visual: 'Кузов / Покрытия', image: 'photos/photo-03.webp', alt: 'Фиолетовый кузов BMW', formValue: 'Нанести защитное покрытие' },
  interior: { title: ['Свежесть внутри.', 'Комфорт в пути.'], description: 'Деликатная очистка обивки, ковров, пластика и других поверхностей салона. Специалист подберёт подход к материалам и характеру загрязнений.', tags: ['Обивка и ковры', 'Пластик и кожа', 'Деликатная очистка'], visual: 'Салон / Уход', image: 'photos/photo-08.webp', alt: 'Mercedes-Benz', formValue: 'Провести химчистку салона' },
  tint: { title: ['Мягче свет.', 'Выразительнее образ.'], description: 'Тонирование помогает изменить светопропускание стёкол и внешний вид автомобиля. Тип плёнки, зоны нанесения и допустимые параметры обсудите со специалистом.', tags: ['Подбор плёнки', 'Комфорт в салоне', 'Аккуратное нанесение'], visual: 'Стёкла / Тонирование', image: 'photos/photo-05.webp', alt: 'Красный BMW', formValue: 'Затонировать стёкла' },
  wash: { title: ['Чистота —', 'тоже искусство.'], description: 'Детальная очистка кузова с вниманием к сложным зонам, дискам и отдельным элементам. Подходящий состав процедуры уточняется с мастером.', tags: ['Кузов и диски', 'Сложные зоны', 'Регулярный уход'], visual: 'Автомобиль / Очистка', image: 'photos/photo-06.webp', alt: 'Чёрный Dodge', formValue: 'Сделать детейлинг-мойку' }
};
let currentCity = 'moscow';
let currentService = 'film';
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function whatsappUrl(city, message) { return `https://wa.me/${branches[city].phone}?text=${encodeURIComponent(message)}`; }
function genericMessage() { return `Здравствуйте, Iron Horse! Хочу обсудить уход за автомобилем в филиале ${branches[currentCity].name}. Подскажите, пожалуйста, доступные услуги и время для консультации.`; }
function setMultiline(node, lines) { node.replaceChildren(); lines.forEach((line, i) => { if (i) node.append(document.createElement('br')); node.append(document.createTextNode(line)); }); }
function refreshLinks() { $$('.wa-link').forEach(link => { link.href = whatsappUrl(currentCity, genericMessage()); }); }
function animatePanel(node) { if (window.IHMotion) { window.IHMotion.panel(node); return; } if (reducedMotion.matches) return; node.classList.remove('panel-change'); void node.offsetWidth; node.classList.add('panel-change'); }
function setCity(city, animate = true) {
  if (!branches[city]) return;
  currentCity = city;
  const branch = branches[city];
  $('#header-city-name').textContent = branch.name;
  $('#header-city').setAttribute('aria-label', `Выберите город. Текущий город: ${branch.name}`);
  $$('[data-header-city]').forEach(option => { const active = option.dataset.headerCity === city; option.setAttribute('aria-selected', String(active)); option.tabIndex = active ? 0 : -1; });
  $('#care-city').value = city;
  $('#mobile-city').textContent = branch.name;
  $('#studio-city').textContent = branch.name;
  setMultiline($('#studio-address'), branch.address);
  $('#studio-phone').textContent = branch.display;
  $('#studio-phone').href = `tel:+${branch.phone}`;
  $('#studio-map').href = branch.map;
  $$('.studio-tabs [role="tab"]').forEach(tab => { const active = tab.dataset.city === city; tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1; });
  $('#studio-panel').setAttribute('aria-labelledby', `city-${city}`);
  refreshLinks();
  if (animate) animatePanel($('#studio-panel'));
}
function setService(key, moveFocus = false) {
  const service = services[key]; if (!service) return;
  currentService = key;
  $$('.service-tab').forEach(tab => { const active = tab.dataset.service === key; tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1; });
  $('#service-panel').setAttribute('aria-labelledby', `tab-${key}`);
  setMultiline($('#service-title'), service.title);
  $('#service-description').textContent = service.description;
  $('#service-tags').replaceChildren(...service.tags.map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
  const picture = $('#service-image'); window.IHMotion?.picture(picture); picture.src = `assets/${service.image}`; picture.alt = service.alt;
  $('#service-visual-label').textContent = service.visual;
  $('.service-request').firstChild.textContent = 'Добавить к подбору ';
  animatePanel($('.service-details'));
  if (serviceQuery.matches) { const tab = $(`#tab-${key}`); const list = $('.service-tabs'); list.scrollTo({ left: Math.max(0, tab.offsetLeft - list.offsetLeft - 12), behavior: window.IHMotion?.enabled ? 'smooth' : 'auto' }); }
  if (moveFocus) $(`#tab-${key}`).focus();
}
function wireTabs(containerSelector, itemSelector, valueKey, callback) {
  const tabs = $$(itemSelector);
  $(containerSelector).addEventListener('keydown', event => {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const current = tabs.indexOf(document.activeElement); if (current < 0) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (current + (['ArrowDown','ArrowRight'].includes(event.key) ? 1 : -1) + tabs.length) % tabs.length;
    callback(tabs[next].dataset[valueKey]); tabs[next].focus();
  });
  tabs.forEach(tab => tab.addEventListener('click', () => callback(tab.dataset[valueKey])));
}
wireTabs('.service-tabs', '.service-tab', 'service', setService);
wireTabs('.studio-tabs', '.studio-tabs [role="tab"]', 'city', setCity);
const cityTrigger = $('#header-city');
const cityOptions = $('#city-options');
function closeCity(returnFocus = false) { cityOptions.hidden = true; cityTrigger.setAttribute('aria-expanded', 'false'); if (returnFocus) cityTrigger.focus({preventScroll:true}); }
function openCity() { if (!$('#mobile-nav').hidden) closeMenu(); cityOptions.hidden = false; cityTrigger.setAttribute('aria-expanded', 'true'); cityOptions.querySelector('[aria-selected="true"]').focus(); }
cityTrigger.addEventListener('click', () => cityOptions.hidden ? openCity() : closeCity());
cityTrigger.addEventListener('keydown', event => { if (['ArrowDown','ArrowUp'].includes(event.key)) { event.preventDefault(); openCity(); } });
$$('[data-header-city]').forEach(option => option.addEventListener('click', () => { setCity(option.dataset.headerCity); closeCity(true); }));
cityOptions.addEventListener('keydown', event => {
  const options = $$('[data-header-city]'); const index = options.indexOf(document.activeElement);
  if (['ArrowDown','ArrowUp','Home','End'].includes(event.key)) { event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? options.length-1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length; options[next].focus(); }
  else if (event.key === 'Tab') { closeCity(true); }
  else if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); closeCity(true); }
});
document.addEventListener('pointerdown', event => { if (!event.target.closest('.city-picker')) closeCity(); });
document.addEventListener('focusin', event => { if (!event.target.closest('.city-picker')) closeCity(); });
$('#care-city').addEventListener('change', event => setCity(event.target.value));
function updateCareSummary() {
  const selected = $$('#care-form input[name="service"]:checked');
  $('#care-summary').textContent = selected.length ? 'Ваш запрос готов к обсуждению' : 'Начнём с консультации';
  $('#care-count').textContent = selected.length ? `Выбрано услуг: ${selected.length}` : 'Услуги не выбраны';
}
$$('#care-form input[name="service"]').forEach(input => input.addEventListener('change', updateCareSummary));
$('.service-request').addEventListener('click', () => {
  const target = $$('#care-form input[name="service"]').find(input => input.value === services[currentService].formValue);
  target.checked = true; updateCareSummary();
  window.setTimeout(() => { target.focus({ preventScroll: true }); }, reducedMotion.matches ? 0 : 600);
});
$('#care-form').addEventListener('submit', event => {
  event.preventDefault();
  const selected = $$('#care-form input[name="service"]:checked').map(input => input.value);
  const car = $('#car-model').value.trim();
  const message = [ 'Здравствуйте, Iron Horse!', `Филиал: ${branches[currentCity].name}.`, car ? `Автомобиль: ${car}.` : '', selected.length ? `Интересуют услуги:\n${selected.map(value => `• ${value}`).join('\n')}` : 'Хочу подобрать уход за автомобилем.', 'Подскажите, пожалуйста, стоимость и удобное время для консультации.' ].filter(Boolean).join('\n\n');
  const link = document.createElement('a'); link.href = whatsappUrl(currentCity, message); link.target = '_blank'; link.rel = 'noopener noreferrer'; document.body.append(link); link.click(); link.remove();
});
const menuButton = $('.menu-toggle');
function setMenu(open) { if (open) closeCity(); menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню'); if(window.IHMotion) window.IHMotion.menu(open); else $('#mobile-nav').hidden = !open; }
function closeMenu() { setMenu(false); }
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
$$('#mobile-nav a').forEach(link => link.addEventListener('click', closeMenu));
$('.skip').addEventListener('click', closeMenu);
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !$('#mobile-nav').hidden) { closeMenu(); menuButton.focus(); } });
document.addEventListener('click', event => { if (!$('#mobile-nav').hidden && !event.target.closest('#mobile-nav, .menu-toggle')) closeMenu(); });
const mobileQuery = window.matchMedia('(max-width: 600px)');
const serviceQuery = window.matchMedia('(max-width: 1100px)');
function updateOrientation() { $('.service-tabs').setAttribute('aria-orientation', serviceQuery.matches ? 'horizontal' : 'vertical'); $('.studio-tabs').setAttribute('aria-orientation', mobileQuery.matches ? 'horizontal' : 'vertical'); if (window.innerWidth > 1100) closeMenu(); }
window.addEventListener('resize', updateOrientation, { passive: true });
updateOrientation();
$('#year').textContent = new Date().getFullYear();
setCity('moscow', false);
