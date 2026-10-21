'use strict';
const branches = {
  "moscow": {
    "name": "Москва",
    "address": [
      "Олимпийский проспект,",
      "16, строение 5"
    ],
    "phone": "79104989211",
    "display": "+7 (910) 498-92-11",
    "map": "https://yandex.ru/maps/org/iron_horse/122347266740/"
  },
  "makhachkala": {
    "name": "Махачкала",
    "address": [
      "Улица Абубакарова,",
      "65А"
    ],
    "phone": "79674087971",
    "display": "+7 (967) 408-79-71",
    "map": "https://yandex.ru/maps/?text=Iron%20Horse%20Махачкала%20Абубакарова%2065А"
  },
  "kaspiysk": {
    "name": "Каспийск",
    "address": [
      "Улица Гагарина,",
      "94А"
    ],
    "phone": "79023552950",
    "display": "+7 (902) 355-29-50",
    "map": "https://yandex.ru/maps/?text=Iron%20Horse%20Каспийск%20Гагарина%2094А"
  }
};
const services = {
  "film": {
    "description": "Прозрачная защитная плёнка помогает уберечь лакокрасочное покрытие от дорожного песка, мелких сколов и повседневных воздействий.",
    "tags": [
      "Кузов целиком",
      "Зоны риска",
      "Отдельные элементы"
    ],
    "visual": "Кузов / Защита",
    "image": "photos/photo-03.webp",
    "alt": "Фиолетовый BMW",
    "formValue": "Защитить кузов плёнкой",
    "name": "Антигравийная плёнка"
  },
  "polish": {
    "description": "Полировка помогает скорректировать мелкие дефекты лакокрасочного покрытия и вернуть поверхности выразительный блеск. Подход подбирается по состоянию кузова.",
    "tags": [
      "Оценка состояния ЛКП",
      "Коррекция дефектов",
      "Финишный блеск"
    ],
    "visual": "Кузов / Восстановление",
    "image": "photos/photo-01.webp",
    "alt": "Деталь фары и лакокрасочного покрытия BMW",
    "formValue": "Отполировать кузов",
    "name": "Полировка кузова"
  },
  "ceramic": {
    "description": "Защитное покрытие придаёт поверхности гидрофобные свойства и облегчает повседневный уход. Состав и подготовка зависят от состояния автомобиля.",
    "tags": [
      "Керамика",
      "Подготовка поверхности",
      "Гидрофобный эффект"
    ],
    "visual": "Кузов / Покрытия",
    "image": "photos/photo-03.webp",
    "alt": "Фиолетовый кузов BMW",
    "formValue": "Нанести защитное покрытие",
    "name": "Защитные покрытия"
  },
  "interior": {
    "description": "Деликатная очистка обивки, ковров, пластика и других поверхностей салона. Специалист подберёт подход к материалам и характеру загрязнений.",
    "tags": [
      "Обивка и ковры",
      "Пластик и кожа",
      "Деликатная очистка"
    ],
    "visual": "Салон / Уход",
    "image": "photos/photo-08.webp",
    "alt": "Mercedes-Benz",
    "formValue": "Провести химчистку салона",
    "name": "Химчистка салона"
  },
  "tint": {
    "description": "Тонирование помогает изменить светопропускание стёкол и внешний вид автомобиля. Тип плёнки, зоны нанесения и допустимые параметры обсудите со специалистом.",
    "tags": [
      "Подбор плёнки",
      "Комфорт в салоне",
      "Аккуратное нанесение"
    ],
    "visual": "Стёкла / Тонирование",
    "image": "photos/photo-05.webp",
    "alt": "Красный BMW",
    "formValue": "Затонировать стёкла",
    "name": "Тонирование стёкол"
  },
  "wash": {
    "description": "Детальная очистка кузова с вниманием к сложным зонам, дискам и отдельным элементам. Подходящий состав процедуры уточняется с мастером.",
    "tags": [
      "Кузов и диски",
      "Сложные зоны",
      "Регулярный уход"
    ],
    "visual": "Автомобиль / Очистка",
    "image": "photos/photo-06.webp",
    "alt": "Чёрный Dodge",
    "formValue": "Сделать детейлинг-мойку",
    "name": "Детейлинг-мойка"
  }
};

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const compactServices = matchMedia('(max-width: 1100px)');
const mobile = matchMedia('(max-width: 600px)');
const state = { city: 'moscow', service: 'film', expanded: true, selected: new Set(), car: '' };
const serviceButtons = $$('.service-tab');
const servicePanels = $$('.service-panel');
const tabs = $('.service-tabs');
const panels = $('.service-panels');
const branchAddress = branch => branch.address.join(' ');
const motionEnabled = () => window.IHMotion ? window.IHMotion.enabled : !reducedMotion.matches;
const whatsappUrl = (city, message) => `https://wa.me/${branches[city].phone}?text=${encodeURIComponent(message)}`;
function enquiryMessage() {
  return [
    'Здравствуйте, Iron Horse!',
    `Филиал: ${branches[state.city].name}.`,
    state.car ? `Автомобиль: ${state.car}.` : '',
    state.selected.size
      ? `Интересуют услуги:\n${Object.keys(services).filter(key => state.selected.has(key)).map(key => `• ${services[key].formValue}`).join('\n')}`
      : 'Хочу подобрать уход за автомобилем.',
    'Подскажите, пожалуйста, стоимость и удобное время для консультации.'
  ].filter(Boolean).join('\n\n');
}
function refreshLinks() {
  const message = `Здравствуйте, Iron Horse! Хочу обсудить уход за автомобилем в филиале ${branches[state.city].name}. Подскажите, пожалуйста, доступные услуги и время для консультации.`;
  $$('.wa-link').forEach(link => { link.href = whatsappUrl(state.city, message); });
}
function animatePanel(node) { window.IHMotion?.panel(node); }
function updateCare() {
  const selected = Object.keys(services).filter(key => state.selected.has(key));
  const list = $('#care-selected');
  const focusedKey = document.activeElement?.dataset.removeService;
  list.replaceChildren();
  if (!selected.length) {
    const item = document.createElement('li');
    item.className = 'care-empty';
    item.textContent = 'Консультация по подбору ухода';
    list.append(item);
  }
  selected.forEach(key => {
    const item = document.createElement('li');
    const label = document.createElement('span');
    label.textContent = services[key].name;
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.dataset.removeService = key;
    remove.setAttribute('aria-label', `Убрать: ${services[key].name}`);
    remove.innerHTML = '<svg aria-hidden="true"><use href="#close"/></svg>';
    item.append(label, remove);
    list.append(item);
  });
  $$('[data-care-service]').forEach(input => { input.checked = state.selected.has(input.dataset.careService); });
  $('#care-car').textContent = state.car || 'Обсудим со специалистом';
  $('#care-branch').textContent = `${branches[state.city].name} · ${branchAddress(branches[state.city])}`;
  $('#care-count').textContent = selected.length ? `В плане услуг: ${selected.length}` : 'Начнём с консультации';
  $('#care-summary').textContent = selected.length ? `Выбрано услуг: ${selected.length}. ${selected.map(key => services[key].name).join(', ')}` : 'Консультация по подбору ухода';
  $$('.service-request').forEach(link => {
    const added = state.selected.has(link.dataset.addService);
    link.firstChild.textContent = added ? 'Добавлено в план ' : 'Добавить к подбору ';
    link.dataset.added = String(added);
    link.querySelector('use').setAttribute('href', added ? '#check' : '#plus');
  });
  // Removing a focused button must leave focus on a useful, visible control.
  if (focusedKey) {
    const next = list.querySelector('[data-remove-service]');
    (next || $(`[data-care-service="${focusedKey}"]`)).focus({ preventScroll: true });
  }
}
function setCity(city, animate = true) {
  if (!branches[city]) return;
  state.city = city;
  const branch = branches[city];
  $('#header-city-name').textContent = branch.name;
  $('#header-city').setAttribute('aria-label', `Выберите город. Текущий город: ${branch.name}`);
  $$('[data-header-city], [data-care-city-choice]').forEach(option => {
    const active = (option.dataset.headerCity || option.dataset.careCityChoice) === city;
    option.setAttribute('aria-selected', String(active));
    option.tabIndex = active ? 0 : -1;
  });
  $('#hero-city').textContent = branch.name;
  $('#mobile-city').textContent = branch.name;
  $('#care-city').value = city;
  $('#care-city-name').textContent = branch.name;
  $('#studio-city').textContent = branch.name;
  $('#studio-address').textContent = branchAddress(branch);
  $('#studio-phone').textContent = branch.display;
  $('#studio-phone').href = `tel:+${branch.phone}`;
  $('#studio-call').href = `tel:+${branch.phone}`;
  $('#studio-map').href = branch.map;
  $$('.studio-tabs [role="tab"]').forEach(tab => {
    const active = tab.dataset.city === city;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  $('#studio-panel').setAttribute('aria-labelledby', `city-${city}`);
  refreshLinks();
  updateCare();
  if (animate) animatePanel($('#studio-panel'));
}
function paintServices() {
  serviceButtons.forEach(button => {
    const active = button.dataset.service === state.service;
    const panel = $(`#service-${button.dataset.service}`);
    button.querySelector('use').setAttribute('href', compactServices.matches ? '#chevron' : '#next');
    if (compactServices.matches) {
      button.removeAttribute('role');
      button.removeAttribute('aria-selected');
      button.setAttribute('aria-expanded', String(active && state.expanded));
      button.tabIndex = 0;
      panel.setAttribute('role', 'region');
      panel.removeAttribute('tabindex');
      panel.setAttribute('aria-labelledby', button.id);
    } else {
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-selected', String(active));
      button.removeAttribute('aria-expanded');
      button.tabIndex = active ? 0 : -1;
      panel.setAttribute('role', 'tabpanel');
      panel.tabIndex = 0;
      panel.setAttribute('aria-labelledby', button.id);
    }
    panel.hidden = !active || (compactServices.matches && !state.expanded);
  });
}
function setService(key, toggle = false) {
  if (!services[key]) return;
  state.expanded = compactServices.matches && toggle && state.service === key ? !state.expanded : true;
  state.service = key;
  paintServices();
  const panel = $(`#service-${key}`);
  if (!panel.hidden) animatePanel(panel.querySelector('.service-details'));
}
function layoutServices() {
  const focused = document.activeElement;
  const activePanel = focused?.closest('.service-panel');
  if (activePanel) { state.service = activePanel.id.slice('service-'.length); state.expanded = true; }
  if (compactServices.matches) {
    tabs.removeAttribute('role');
    tabs.removeAttribute('aria-orientation');
    serviceButtons.forEach(button => button.after($(`#service-${button.dataset.service}`)));
  } else {
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-orientation', 'vertical');
    servicePanels.forEach(panel => panels.append(panel));
    state.expanded = true;
  }
  // Native photo disclosures are optional on compact layouts and always open on desktop.
  servicePanels.forEach(panel => { panel.querySelector('.service-visual').open = !compactServices.matches; });
  paintServices();
  const focusTarget = !compactServices.matches && focused?.matches('.service-visual>summary')
    ? activePanel.querySelector('.service-request') : focused;
  if (focusTarget && focusTarget !== document.body) focusTarget.focus({ preventScroll: true });
}
serviceButtons.forEach(button => button.addEventListener('click', () => setService(button.dataset.service, true)));
tabs.addEventListener('keydown', event => {
  const index = serviceButtons.indexOf(document.activeElement);
  if (index < 0 || !['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? serviceButtons.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + serviceButtons.length) % serviceButtons.length;
  if (!compactServices.matches) setService(serviceButtons[next].dataset.service);
  serviceButtons[next].focus();
});
compactServices.addEventListener('change', layoutServices);
layoutServices();
$$('[data-add-service]').forEach(link => link.addEventListener('click', () => {
  const key = link.dataset.addService;
  state.selected.add(key);
  updateCare();
  $(`[data-care-service="${key}"]`).focus({ preventScroll: true });
}));
$$('[data-care-service]').forEach(input => input.addEventListener('change', () => {
  if (input.checked) state.selected.add(input.dataset.careService);
  else state.selected.delete(input.dataset.careService);
  updateCare();
}));
$('#care-selected').addEventListener('click', event => {
  const button = event.target.closest('[data-remove-service]');
  if (!button) return;
  state.selected.delete(button.dataset.removeService);
  updateCare();
});
$('#car-model').addEventListener('input', event => { state.car = event.target.value.trim(); updateCare(); });
$('#care-city').addEventListener('change', event => setCity(event.target.value));
$('#care-form').addEventListener('submit', event => {
  event.preventDefault();
  const link = document.createElement('a');
  link.href = whatsappUrl(state.city, enquiryMessage());
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.append(link);
  link.click();
  link.remove();
});

const cityPickers = $$('.city-picker').map(root => ({
  root,
  trigger: root.querySelector('.city-trigger'),
  dialog: root.querySelector('.city-popover'),
  list: root.querySelector('.city-options'),
  options: [...root.querySelectorAll('[role="option"]')]
}));
let activeCityPicker = null;
function positionCity(picker) {
  picker.dialog.removeAttribute('style');
  if (mobile.matches) return;
  const bounds = picker.trigger.getBoundingClientRect();
  const gap = 10;
  const edge = 16;
  const width = picker.dialog.offsetWidth;
  const below = innerHeight - bounds.bottom - gap - edge;
  const above = bounds.top - gap - edge;
  const height = picker.dialog.scrollHeight + 2;
  const opensAbove = below < height && above > below;
  const available = Math.max(80, opensAbove ? above : below);
  Object.assign(picker.dialog.style, {
    position: 'fixed',
    left: `${Math.max(edge, Math.min(bounds.right - width, innerWidth - width - edge))}px`,
    right: 'auto',
    top: `${opensAbove ? bounds.top - gap - Math.min(height, available) : bounds.bottom + gap}px`,
    bottom: 'auto',
    maxHeight: `${available}px`
  });
}
function closeCity(returnFocus = false) {
  const picker = activeCityPicker;
  if (!picker) return;
  activeCityPicker = null;
  picker.list.hidden = true;
  picker.trigger.setAttribute('aria-expanded', 'false');
  picker.dialog.close();
  document.documentElement.classList.remove('city-selecting');
  if (returnFocus) picker.trigger.focus({ preventScroll: true });
}
function openCity(picker) {
  closeCity();
  if (!$('#mobile-nav').hidden) closeMenu();
  activeCityPicker = picker;
  picker.list.hidden = false;
  picker.trigger.setAttribute('aria-expanded', 'true');
  picker.dialog.removeAttribute('style');
  if (mobile.matches) {
    picker.dialog.showModal();
    document.documentElement.classList.add('city-selecting');
  } else picker.dialog.show();
  positionCity(picker);
  picker.list.querySelector('[aria-selected="true"]').focus({ preventScroll: true });
}
cityPickers.forEach(picker => {
  picker.trigger.addEventListener('click', () => activeCityPicker === picker ? closeCity() : openCity(picker));
  picker.trigger.addEventListener('keydown', event => {
    if (['ArrowDown', 'ArrowUp'].includes(event.key)) { event.preventDefault(); openCity(picker); }
  });
  picker.options.forEach(option => option.addEventListener('click', () => {
    setCity(option.dataset.headerCity || option.dataset.careCityChoice);
    closeCity(true);
  }));
  picker.list.addEventListener('keydown', event => {
    const index = picker.options.indexOf(document.activeElement);
    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? picker.options.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + picker.options.length) % picker.options.length;
      picker.options[next].focus();
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      picker.options[index]?.click();
    } else if (event.key === 'Tab') closeCity(true);
  });
  picker.dialog.querySelector('[data-close-city]').addEventListener('click', () => closeCity(true));
  picker.dialog.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); closeCity(true); }
  });
  picker.dialog.addEventListener('cancel', event => { event.preventDefault(); closeCity(true); });
  picker.dialog.addEventListener('click', event => {
    if (event.target !== picker.dialog) return;
    const bounds = picker.dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeCity(true);
  });
  picker.dialog.addEventListener('close', () => {
    // An earlier queued close event must not close a newly reopened picker.
    if (picker.dialog.open || activeCityPicker !== picker) return;
    closeCity();
  });
});
document.addEventListener('pointerdown', event => {
  if (activeCityPicker && !activeCityPicker.root.contains(event.target)) closeCity();
});
document.addEventListener('focusin', event => {
  if (activeCityPicker && !activeCityPicker.root.contains(event.target)) closeCity();
});
mobile.addEventListener('change', () => closeCity(true));
window.addEventListener('resize', () => { if (activeCityPicker) positionCity(activeCityPicker); }, { passive: true });
window.addEventListener('scroll', () => {
  if (activeCityPicker && !mobile.matches) positionCity(activeCityPicker);
}, { passive: true });
// Progressive enhancement: preserve the named native control for form state and no-script use.
$('#care-city').hidden = true;
$('.care-city-picker').hidden = false;
$('#care-city-label').htmlFor = 'care-city-trigger';
const studioTabs = $$('.studio-tabs [role="tab"]');
studioTabs.forEach(tab => tab.addEventListener('click', () => setCity(tab.dataset.city)));
$('.studio-tabs').addEventListener('keydown', event => {
  const index = studioTabs.indexOf(document.activeElement);
  if (index < 0 || !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? studioTabs.length - 1 : (index + (['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1) + studioTabs.length) % studioTabs.length;
  setCity(studioTabs[next].dataset.city);
  studioTabs[next].focus();
});
const menuButton = $('.menu-toggle');
function setMenu(open) {
  if (open) closeCity();
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  if (window.IHMotion) window.IHMotion.menu(open);
  else $('#mobile-nav').hidden = !open;
}
function closeMenu() { setMenu(false); }
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
$$('#mobile-nav a').forEach(link => link.addEventListener('click', closeMenu));
$('.skip').addEventListener('click', closeMenu);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !$('#mobile-nav').hidden) { closeMenu(); menuButton.focus(); }
});
document.addEventListener('click', event => {
  if (!$('#mobile-nav').hidden && !event.target.closest('#mobile-nav, .menu-toggle')) closeMenu();
});
function updateViewport() {
  $('.studio-tabs').setAttribute('aria-orientation', mobile.matches ? 'horizontal' : 'vertical');
  document.documentElement.style.setProperty('--header-height', `${$('.header').offsetHeight}px`);
  if (!compactServices.matches && menuButton.getAttribute('aria-expanded') === 'true') closeMenu();
}
window.addEventListener('resize', updateViewport, { passive: true });
updateViewport();
$('#year').textContent = new Date().getFullYear();
document.documentElement.classList.add('ui-ready');
setCity(state.city, false);
