/* Motion follows input; all essential content is readable before this file runs. */
(() => {
  'use strict';
  const root = document.documentElement;
  const hero = document.querySelector('.hero');
  const story = document.querySelector('.hero-story');
  const camera = document.querySelector('.hero-camera');
  const bottom = document.querySelector('.mobile-bottom');
  const nav = document.querySelector('#mobile-nav');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');
  const system = matchMedia('(prefers-reduced-motion: reduce)');
  const small = matchMedia('(max-width: 600px)');
  const animations = new Set();
  const panels = new WeakMap();
  const ease = 'cubic-bezier(.16,1,.3,1)';
  let enabled = !system.matches;
  let frame = 0, measureFrame = 0, metrics, manualLight = null, lightAnimation, introCamera;
  const clamp = value => Math.max(0, Math.min(1, value));
  function animate(node, keyframes, options = {}) {
    if (!node || !enabled || !node.animate || document.hidden) return null;
    const animation = node.animate(keyframes, { duration: 450, easing: ease, ...options });
    animations.add(animation);
    const release = () => animations.delete(animation);
    animation.addEventListener('finish', release, { once: true });
    animation.addEventListener('cancel', release, { once: true });
    return animation;
  }
  function measure() {
    measureFrame = 0;
    const pinnedTravel = story.offsetHeight - hero.offsetHeight;
    // Natural scrolling still needs a useful distance for the photographic light pass.
    const travel = pinnedTravel > 1 ? pinnedTravel : Math.max(1, hero.offsetHeight * .75);
    const contactRanges = [...document.querySelectorAll('#care, #studios, .closing, .footer')].map(node => {
      const rect = node.getBoundingClientRect();
      return { top: rect.top + scrollY, bottom: rect.bottom + scrollY };
    });
    metrics = { top: story.getBoundingClientRect().top + scrollY, bottom: story.getBoundingClientRect().bottom + scrollY, travel, contactRanges };
    schedule();
  }
  function requestMeasure() { if (!measureFrame) measureFrame = requestAnimationFrame(measure); }
  function render() {
    frame = 0;
    if (document.hidden || !metrics) return;
    // Keep the shortcut while browsing. Form and contact sections have their own actions.
    const hasContactSection = metrics.contactRanges.some(range => range.top < scrollY + innerHeight && range.bottom > scrollY);
    const barHidden = scrollY + 100 < metrics.bottom || hasContactSection;
    bottom.classList.toggle('is-hidden', barHidden);
    bottom.inert = barHidden || document.querySelector('.menu-toggle').getAttribute('aria-expanded') === 'true';
    if (!enabled || scrollY > metrics.bottom || scrollY + innerHeight < metrics.top) return;
    const progress = clamp((scrollY - metrics.top) / metrics.travel);
    camera.style.setProperty('--camera-scale', (1 + progress * (small.matches ? .08 : .10)).toFixed(4));
    camera.style.setProperty('--camera-x', `${-progress * 1.5}%`);
    camera.style.setProperty('--camera-y', `${progress * (small.matches ? -8 : 12)}px`);
    if (manualLight === null && !lightAnimation) camera.style.setProperty('--beam-position', `${20 + progress * 65}%`);
  }
  function schedule() { if (!frame && !document.hidden) frame = requestAnimationFrame(render); }
  function panel(node) {
    panels.get(node)?.cancel();
    const animation = animate(node, [{ opacity: .6, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }]);
    if (animation) panels.set(node, animation);
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
      [...nav.querySelectorAll('a')].forEach((link, index) => animate(link, [{ opacity: .5, transform: 'translateY(16px)' }, { opacity: 1, transform: 'translateY(0)' }], { delay: index * 60 }));
    } else nav.querySelectorAll('a').forEach(link => link.getAnimations().forEach(animation => animation.cancel()));
  }
  function setEnabled(value) {
    enabled = value;
    if (!value) {
      animations.forEach(animation => animation.cancel());
      animations.clear();
      lightAnimation = null;
      introCamera = null;
    }
    manualLight = null;
    root.dataset.motion = value ? 'on' : 'off';
    requestMeasure();
  }
  function steer(event) {
    if (!enabled || event.target.closest('a,button,input,select') || (event.pointerType === 'touch' && event.buttons === 0)) return;
    lightAnimation?.cancel();
    lightAnimation = null;
    const rect = hero.getBoundingClientRect();
    manualLight = clamp((event.clientX - rect.left) / rect.width) * 100;
    camera.style.setProperty('--beam-position', `${manualLight}%`);
  }
  system.addEventListener('change', event => setEnabled(!event.matches));
  hero.addEventListener('pointermove', steer, { passive: true });
  hero.addEventListener('pointerdown', steer, { passive: true });
  ['pointerleave', 'pointerup', 'pointercancel'].forEach(name => hero.addEventListener(name, () => { manualLight = null; schedule(); }, { passive: true }));
  window.addEventListener('scroll', () => {
    manualLight = null;
    introCamera?.cancel();
    introCamera = null;
    lightAnimation?.cancel();
    lightAnimation = null;
    schedule();
  }, { passive: true });
  window.addEventListener('resize', requestMeasure, { passive: true });
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(requestMeasure);
    ['.service-explorer', '.care-form', '.faq-list', '.header'].forEach(selector => observer.observe(document.querySelector(selector)));
  }
  for (const image of document.images) image.addEventListener('load', requestMeasure, { once: true });
  document.addEventListener('visibilitychange', () => {
    root.classList.toggle('document-hidden', document.hidden);
    if (document.hidden) {
      if (frame) cancelAnimationFrame(frame);
      if (measureFrame) cancelAnimationFrame(measureFrame);
      frame = measureFrame = 0;
      animations.forEach(animation => animation.pause());
    } else { animations.forEach(animation => animation.play()); requestMeasure(); }
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('reveal-enter');
        observer.unobserve(entry.target);
      });
    }, { threshold: .15 });
    document.querySelectorAll('.section-heading h2,.section-heading>p,.approach h2,.approach-lead,.approach-points article,.faq h2,.faq-list details,.closing h2,.closing-link,.footer-intro,.footer-branch').forEach(node => observer.observe(node));
  }
  document.querySelectorAll('.care-options input').forEach(input => input.addEventListener('change', () => animate(input.closest('label'), [{ transform: 'scale(.98)' }, { transform: 'scale(1)' }], { duration: 220 })));
  document.querySelectorAll('.faq-list details').forEach(details => details.addEventListener('toggle', () => {
    if (details.open) animate(details.querySelector('p'), [{ opacity: .5, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }]);
    requestMeasure();
  }));
  root.classList.add('motion-ready');
  window.IHMotion = { get enabled() { return enabled; }, panel, menu };
  setEnabled(enabled);
  Promise.all([camera.querySelector('img').decode().catch(() => {}), document.fonts?.ready ?? Promise.resolve()]).then(() => {
    measure();
    if (scrollY > 100 || document.hidden) return;
    hero.querySelectorAll('h1,p,.hero-buttons').forEach((node, index) => animate(node, [{ opacity: .7, transform: 'translateY(16px)' }, { opacity: 1, transform: 'translateY(0)' }], { delay: index * 60, duration: 600 }));
    introCamera = animate(camera, [{ transform: 'scale(1.06)' }, { transform: 'scale(1)' }], { duration: 1200 });
    try { CSS.registerProperty({ name: '--beam-position', syntax: '<percentage>', inherits: true, initialValue: '38%' }); } catch (_) { /* Already registered or unsupported. */ }
    lightAnimation = animate(camera, [{ '--beam-position': '-15%' }, { '--beam-position': '95%' }], { duration: 2200 });
    lightAnimation?.addEventListener('finish', () => { lightAnimation = null; schedule(); }, { once: true });
  });
})();
