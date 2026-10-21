/* Event-driven motion. Content and native disclosures work before this file runs. */
(() => {
  'use strict';
  const root = document.documentElement;
  const hero = document.querySelector('.hero');
  const story = document.querySelector('.hero-story');
  const camera = document.querySelector('.hero-camera');
  const light = camera.querySelector('.paint-light');
  const bottom = document.querySelector('.mobile-bottom');
  const nav = document.querySelector('#mobile-nav');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');
  const system = matchMedia('(prefers-reduced-motion: reduce)');
  const small = matchMedia('(max-width: 600px)');
  const hover = matchMedia('(hover: hover) and (pointer: fine)');
  const animations = new Set();
  const effects = new WeakMap();
  const sizes = new Map();
  const serviceGhosts = new Set();
  const ease = 'cubic-bezier(.2,.65,.3,1)';
  let enabled = !system.matches;
  let frame = 0, measureFrame = 0, metrics, manualLight = null, lastFrame = 0;
  let cameraProgress = 0, beam = 20;
  const clamp = value => Math.max(0, Math.min(1, value));

  function animate(node, keyframes, options = {}) {
    if (!node || !enabled || !node.animate || document.hidden) return null;
    const { channel = 'transform', ...timing } = options;
    const channels = effects.get(node) || new Map();
    channels.get(channel)?.cancel();
    // Apply the first frame throughout a delay, rather than flashing from the base style.
    const animation = node.animate(keyframes, { duration: 420, easing: ease, fill: 'backwards', ...timing });
    channels.set(channel, animation);
    effects.set(node, channels);
    animations.add(animation);
    const release = () => {
      animations.delete(animation);
      if (channels.get(channel) === animation) channels.delete(channel);
    };
    animation.addEventListener('finish', release, { once: true });
    animation.addEventListener('cancel', release, { once: true });
    return animation;
  }
  function measure() {
    measureFrame = 0;
    const pinnedTravel = story.offsetHeight - hero.offsetHeight;
    const travel = pinnedTravel > 1 ? pinnedTravel : Math.max(1, hero.offsetHeight * .75);
    const contactRanges = [...document.querySelectorAll('#care, #studios, .closing, .footer')].map(node => {
      const rect = node.getBoundingClientRect();
      return { top: rect.top + scrollY, bottom: rect.bottom + scrollY };
    });
    metrics = { top: story.getBoundingClientRect().top + scrollY, bottom: story.getBoundingClientRect().bottom + scrollY, width: hero.clientWidth, travel, contactRanges };
    schedule();
  }
  function requestMeasure() { if (!measureFrame) measureFrame = requestAnimationFrame(measure); }
  function render(time) {
    frame = 0;
    if (document.hidden || !metrics) return;
    const hasContactSection = metrics.contactRanges.some(range => range.top < scrollY + innerHeight && range.bottom > scrollY);
    const barHidden = scrollY + 100 < metrics.bottom || hasContactSection;
    if (bottom.classList.contains('is-hidden') !== barHidden) bottom.classList.toggle('is-hidden', barHidden);
    const inert = barHidden || document.querySelector('.menu-toggle').getAttribute('aria-expanded') === 'true';
    if (bottom.inert !== inert) bottom.inert = inert;
    if (!enabled || scrollY > metrics.bottom || scrollY + innerHeight < metrics.top) { lastFrame = 0; return; }
    const progress = clamp((scrollY - metrics.top) / metrics.travel);
    const targetBeam = manualLight ?? (20 + progress * 65);
    const elapsed = lastFrame ? Math.min(50, time - lastFrame) : 1000 / 60;
    const amount = 1 - Math.exp(-elapsed / 150);
    lastFrame = time;
    cameraProgress += (progress - cameraProgress) * amount;
    beam += (targetBeam - beam) * amount;
    const moving = Math.abs(progress - cameraProgress) > .0001 || Math.abs(targetBeam - beam) > .02;
    if (!moving) { cameraProgress = progress; beam = targetBeam; lastFrame = 0; }
    camera.style.setProperty('--camera-scale', (1 + cameraProgress * (small.matches ? .04 : .06)).toFixed(5));
    camera.style.setProperty('--camera-x', `${-cameraProgress * .75}%`);
    camera.style.setProperty('--camera-y', `${cameraProgress * (small.matches ? -4 : 6)}px`);
    camera.style.setProperty('--beam-position', `${beam.toFixed(3)}%`);
    // Move a composited light layer; never repaint a full-size photographic mask per frame.
    light.style.transform = `translate3d(${(beam / 100 * metrics.width * 1.4).toFixed(2)}px,0,0)`;
    if (moving) schedule();
  }
  function schedule() { if (!frame && !document.hidden) frame = requestAnimationFrame(render); }
  function panel(node) {
    animate(node, [{ opacity: .8, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 320 });
    requestMeasure();
  }

  // Every interrupted size transition settles its semantic state and removes its clipping.
  function finishSize(node) { sizes.get(node)?.finish(); }
  function resize(node, keyframes, complete = () => {}, targetOpen) {
    node.classList.add('motion-sizing');
    const animation = animate(node, keyframes, { duration: 420, channel: 'size', fill: 'both' });
    let finished = false;
    const record = { targetOpen, finish() {
      if (finished) return;
      finished = true;
      sizes.delete(node);
      animation?.cancel();
      node.classList.remove('motion-sizing');
      complete();
      requestMeasure();
    } };
    sizes.set(node, record);
    if (animation) {
      animation.addEventListener('finish', record.finish, { once: true });
      animation.addEventListener('cancel', record.finish, { once: true });
    } else record.finish();
  }
  function box(node) {
    const style = getComputedStyle(node);
    return {
      height: `${node.hidden ? 0 : node.getBoundingClientRect().height}px`,
      paddingTop: node.hidden ? '0px' : style.paddingTop,
      paddingBottom: node.hidden ? '0px' : style.paddingBottom,
      marginBottom: node.hidden ? '0px' : style.marginBottom,
      opacity: node.hidden ? 0 : style.opacity
    };
  }
  function finishServices() {
    [...sizes.keys()].filter(node => node.matches('.service-panel,.service-visual')).forEach(finishSize);
    serviceGhosts.forEach(ghost => { ghost.getAnimations().forEach(animation => animation.cancel()); ghost.remove(); });
    serviceGhosts.clear();
  }
  function services(update, compact) {
    const nodes = [...document.querySelectorAll('.service-panel')];
    const before = new Map(nodes.map(node => [node, box(node)]));
    const previous = nodes.find(node => !node.hidden && !node.inert);
    const photo = previous?.querySelector('.service-visual img');
    finishServices();
    update();
    const next = nodes.find(node => !node.hidden);
    if (!enabled || document.hidden) { requestMeasure(); return; }
    if (compact) {
      const after = new Map(nodes.map(node => [node, box(node)]));
      nodes.forEach(node => {
        const from = before.get(node), to = after.get(node);
        if (from.height === to.height) return;
        const open = !node.hidden;
        node.hidden = false;
        node.inert = !open;
        if (!open) node.setAttribute('aria-hidden', 'true');
        resize(node, [from, to], () => {
          node.hidden = !open;
          node.inert = false;
          node.removeAttribute('aria-hidden');
        }, open);
      });
    } else if (next && previous !== next) {
      animate(next.querySelector('.service-details'), [
        { opacity: .7, transform: 'translateX(12px)' },
        { opacity: 1, transform: 'translateX(0)' }
      ], { duration: 360 });
      const image = next.querySelector('.service-visual img');
      animate(image, [{ opacity: .6, transform: 'scale(1.015)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 420 });
      if (photo?.complete && photo.naturalWidth && photo.src !== image.src) {
        const ghost = photo.cloneNode();
        ghost.removeAttribute('id');
        ghost.alt = '';
        ghost.setAttribute('aria-hidden', 'true');
        ghost.className = 'service-photo-outgoing';
        image.parentElement.append(ghost);
        serviceGhosts.add(ghost);
        const fade = animate(ghost, [{ opacity: 1 }, { opacity: 0 }], { duration: 300 });
        const remove = () => { ghost.remove(); serviceGhosts.delete(ghost); };
        if (fade) { fade.addEventListener('finish', remove, {once:true}); fade.addEventListener('cancel', remove, {once:true}); }
        else remove();
      }
    }
    requestMeasure();
  }
  function disclosure(details) {
    const open = !(sizes.get(details)?.targetOpen ?? details.open);
    const height = details.getBoundingClientRect().height;
    finishSize(details);
    details.open = true;
    const full = details.getBoundingClientRect().height;
    const summary = details.querySelector('summary');
    const style = getComputedStyle(details);
    const closed = summary.getBoundingClientRect().height + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    details.dataset.motionOpen = String(open);
    summary.setAttribute('aria-expanded', String(open));
    resize(details, [{height:`${height}px`}, {height:`${open ? full : closed}px`}], () => {
      details.open = open;
      delete details.dataset.motionOpen;
      summary.removeAttribute('aria-expanded');
    }, open);
    if (open) {
      const content = details.querySelector('p,img');
      animate(content, [{opacity:.8,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}], {duration:320});
    }
  }
  function care(list, update) {
    const positions = new Map([...list.children].map(node => [node.dataset.serviceKey || 'empty', node.getBoundingClientRect().top]));
    const height = list.getBoundingClientRect().height;
    update();
    const nodes = [...list.children];
    if (nodes.map(node => node.dataset.serviceKey || 'empty').join('|') === [...positions.keys()].join('|')) return;
    finishSize(list);
    nodes.forEach(node => {
      node.getAnimations().forEach(animation => animation.cancel());
      const previous = positions.get(node.dataset.serviceKey || 'empty');
      const offset = previous === undefined ? 12 : previous - node.getBoundingClientRect().top;
      animate(node, [
        {opacity:previous === undefined ? .15 : 1,transform:`translateY(${offset}px)`},
        {opacity:1,transform:'translateY(0)'}
      ], {duration:360});
    });
    const end = list.getBoundingClientRect().height;
    if (Math.abs(height - end) > 1) resize(list, [{height:`${height}px`},{height:`${end}px`}]);
    requestMeasure();
  }
  function menu(open) {
    nav.getAnimations().forEach(animation => animation.cancel());
    root.classList.toggle('menu-open', open);
    main.inert = open;
    footer.inert = open;
    bottom.inert = open || bottom.classList.contains('is-hidden');
    nav.hidden = !open;
    if (open) {
      animate(nav, [{opacity:.4,transform:'translateY(-12px)'},{opacity:1,transform:'translateY(0)'}], {duration:300});
      [...nav.querySelectorAll('a')].forEach((link, index) => animate(link, [{ opacity: .2, transform: 'translateY(24px)' }, { opacity: 1, transform: 'translateY(0)' }], { delay: 50 + index * 55, duration:420 }));
    } else nav.querySelectorAll('a').forEach(link => link.getAnimations().forEach(animation => animation.cancel()));
  }
  function settle() {
    [...sizes.values()].forEach(record => record.finish());
    animations.forEach(animation => animation.cancel());
    animations.clear();
    lastFrame = 0;
  }
  function setEnabled(value) {
    enabled = value;
    if (!value) settle();
    manualLight = null;
    if (metrics) {
      cameraProgress = clamp((scrollY - metrics.top) / metrics.travel);
      beam = 20 + cameraProgress * 65;
    }
    root.dataset.motion = value ? 'on' : 'off';
    requestMeasure();
  }
  function steer(event) {
    // Touch gestures scroll the page; they must not steer the light at the same time.
    if (!enabled || !hover.matches || event.pointerType === 'touch' || event.target.closest('a,button,input,select')) return;
    const rect = hero.getBoundingClientRect();
    manualLight = 20 + clamp((event.clientX - rect.left) / rect.width) * 65;
    schedule();
  }
  system.addEventListener('change', event => setEnabled(!event.matches));
  hero.addEventListener('pointermove', steer, { passive: true });
  ['pointerleave', 'pointercancel'].forEach(name => hero.addEventListener(name, () => { manualLight = null; schedule(); }, { passive: true }));
  window.addEventListener('scroll', () => {
    manualLight = null;
    schedule();
  }, { passive: true });
  window.addEventListener('resize', () => { [...sizes.values()].forEach(record => record.finish()); requestMeasure(); }, { passive: true });
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(requestMeasure);
    ['.service-explorer', '.care-form', '.faq-list', '.header'].forEach(selector => observer.observe(document.querySelector(selector)));
  }
  for (const image of document.images) image.addEventListener('load', requestMeasure, { once: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (frame) cancelAnimationFrame(frame);
      if (measureFrame) cancelAnimationFrame(measureFrame);
      frame = measureFrame = 0;
      settle();
    } else requestMeasure();
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const node = entry.target;
        node.classList.add('motion-revealed');
        animate(node, [
          {opacity:.9,transform:'translateY(8px)'},
          {opacity:1,transform:'translateY(0)'}
        ], {duration:420});
        observer.unobserve(node);
      });
    }, { threshold:0, rootMargin:'0px 0px 48px 0px' });
    document.querySelectorAll('.section-heading h2,.section-heading>p,.photo-card,.care-form legend,.form-fields,.care-review,.approach-photo,.approach h2,.approach-lead,.approach-points article,.studio-panel,.faq h2,.closing h2,.closing-link,.footer-intro,.footer-nav,.footer-branch,.footer-signature').forEach(node => observer.observe(node));
  }
  document.querySelectorAll('.care-options input').forEach(input => input.addEventListener('change', () => {
    const label = input.closest('label');
    animate(label, [{transform:'scale(.985)'},{transform:'scale(1)'}], {duration:220});
    if (input.checked) animate(label.querySelector('svg'), [{opacity:.6,transform:'scale(.8)'},{opacity:1,transform:'scale(1)'}], {duration:260});
  }));
  document.querySelectorAll('.faq-list details,.service-visual').forEach(details => {
    details.querySelector('summary').addEventListener('click', event => {
      if (!enabled || document.hidden) return;
      event.preventDefault();
      disclosure(details);
    });
    details.addEventListener('toggle', requestMeasure);
  });
  root.classList.add('motion-ready');
  window.IHMotion = { get enabled() { return enabled; }, animate, panel, menu, services, finishServices, care };
  setEnabled(enabled);
  Promise.all([camera.querySelector('img').decode().catch(() => {}), document.fonts?.ready ?? Promise.resolve()]).then(() => {
    measure();
  });
})();
