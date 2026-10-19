/* The same inspection sequence is driven by scroll, touch, pointer and keyboard. */
(() => {
  'use strict';
  const root = document.documentElement;
  const hero = document.querySelector('.hero');
  const story = document.querySelector('.hero-story');
  const camera = document.querySelector('.hero-camera');
  const content = document.querySelector('.hero-content');
  const light = document.querySelector('#paint-light-control');
  const toggle = document.querySelector('.motion-toggle');
  const bottom = document.querySelector('.mobile-bottom');
  const nav = document.querySelector('#mobile-nav');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');
  const system = matchMedia('(prefers-reduced-motion: reduce)');
  const small = matchMedia('(max-width: 600px)');
  const clamp = (v, min=0, max=1) => Math.max(min, Math.min(max, v));
  const ease = 'cubic-bezier(.16,1,.3,1)';
  const animations = new Set();
  const panelAnimations = new WeakMap();
  const disclosures = new Map();
  let enabled = !system.matches;
  let explicitChoice = false;
  let frame = 0;
  let measureFrame = 0;
  let metrics;
  let manualLight = null;
  let lightAnimation;
  let navAnimation;
  let menuGeneration = 0;
  let introStarted = false;
  let introCamera = null;
  let headingObserver;
  let pictureGhost = null;

  function animate(node, frames, options={}) {
    if (!enabled || !node.animate) return null;
    const animation = node.animate(frames, {duration:550, easing:ease, ...options});
    animations.add(animation);
    const release = () => animations.delete(animation);
    animation.addEventListener('finish', release, {once:true});
    animation.addEventListener('cancel', release, {once:true});
    return animation;
  }
  function documentTop(node) { return node.getBoundingClientRect().top + scrollY; }
  function measure() {
    measureFrame = 0;
    const band = document.querySelector('.brand-strip');
    const photo = document.querySelector('.service-visual');
    const craft = document.querySelector('.approach-photo');
    metrics = { storyTop:documentTop(story), travel:Math.max(1, story.offsetHeight-hero.offsetHeight || hero.offsetHeight*.9), storyBottom:documentTop(story)+story.offsetHeight, bandTop:documentTop(band), photoTop:documentTop(photo), craftTop:documentTop(craft), craftHeight:craft.offsetHeight, pageHeight:Math.max(1,root.scrollHeight-innerHeight) };
    schedule();
  }
  function requestMeasure() { if (!measureFrame) measureFrame = requestAnimationFrame(measure); }
  function render() {
    frame = 0;
    if (!metrics || document.hidden) return;
    const y=scrollY, vh=innerHeight;
    root.style.setProperty('--page-progress', clamp(y/metrics.pageHeight).toFixed(4));
    const barHidden=y + 100 < metrics.storyBottom;
    bottom.classList.toggle('at-start',barHidden);
    bottom.inert=barHidden || document.querySelector('.menu-toggle').getAttribute('aria-expanded')==='true';
    if (!enabled) return;
    const p=clamp((y-metrics.storyTop)/metrics.travel);
    const heroVisible=y < metrics.storyBottom && y+vh>metrics.storyTop;
    if (heroVisible) {
      root.style.setProperty('--hero-progress',p.toFixed(4));
      camera.style.setProperty('--camera-scale',(1+p*(small.matches ? .16 : .12)).toFixed(4));
      camera.style.setProperty('--camera-x',`${-p*(small.matches?3:2)}%`);
      camera.style.setProperty('--camera-y',`${p*(small.matches?-12:20)}px`);
      content.style.setProperty('--heading-y',`${-p*(small.matches?34:64)}px`);
      content.style.setProperty('--heading-opacity',(1-p*.45).toFixed(3));
      if (manualLight===null && !lightAnimation) {
        const beam=20+p*65;
        camera.style.setProperty('--beam-position',`${beam}%`);
        light.value=String(Math.round(beam));
      }
    }
    const bandP=clamp((y+vh-metrics.bandTop)/(vh+180));
    root.style.setProperty('--brand-x',`${-bandP*(small.matches?205:115)}px`);
    const photoP=clamp((y+vh-metrics.photoTop)/(vh*.65));
    document.querySelector('.service-visual').style.setProperty('--photo-inset',`${(1-photoP)*24}%`);
    const craftP=clamp((y+vh-metrics.craftTop)/(vh+metrics.craftHeight));
    document.querySelector('.approach-photo').style.setProperty('--craft-y',`${(craftP-.5)*-38}px`);
  }
  function schedule() { if (!frame && !document.hidden) frame=requestAnimationFrame(render); }
  function panel(node) {
    panelAnimations.get(node)?.cancel();
    const animation=animate(node,[{opacity:.3,transform:'translate3d(0,22px,0)',filter:'blur(3px)'},{opacity:1,transform:'translate3d(0,0,0)',filter:'blur(0px)'}],{duration:500});
    if(animation) panelAnimations.set(node,animation);
    requestMeasure();
  }
  function picture(image) {
    if (pictureGhost) { pictureGhost.getAnimations().forEach(a=>a.cancel());pictureGhost.remove();pictureGhost=null; }
    if (!enabled) return;
    const ghost=image.cloneNode();ghost.removeAttribute('id');ghost.alt='';ghost.setAttribute('aria-hidden','true');ghost.className='service-image-out';image.after(ghost);pictureGhost=ghost;
    const exit=animate(ghost,[{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(1.06)'}],{duration:500});
    animate(image,[{transform:'scale(1.065)',filter:'brightness(.65)'},{transform:'scale(1)',filter:'brightness(1)'}],{duration:700});
    if(exit) exit.addEventListener('finish',()=>{ghost.remove();if(pictureGhost===ghost)pictureGhost=null;},{once:true});
  }
  function menu(open) {
    const generation=++menuGeneration;
    navAnimation?.cancel();
    root.classList.toggle('menu-open',open);
    main.inert=open;footer.inert=open;
    bottom.inert=open || bottom.classList.contains('at-start');
    if(open) {
      nav.hidden=false;
      navAnimation=animate(nav,[{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0% 0)'}],{duration:550});
      [...nav.querySelectorAll('a')].forEach((a,i)=>animate(a,[{transform:'translate3d(0,32px,0)',opacity:.1},{transform:'translate3d(0,0,0)',opacity:1}],{delay:Math.min(i*55,165),duration:550}));
    } else {
      nav.querySelectorAll('a').forEach(a=>a.getAnimations().forEach(animation=>animation.cancel()));
      navAnimation=animate(nav,[{clipPath:'inset(0 0 0% 0)'},{clipPath:'inset(0 0 100% 0)'}],{duration:230});
      if(navAnimation&&!nav.hidden)navAnimation.addEventListener('finish',()=>{if(generation===menuGeneration)nav.hidden=true;},{once:true});
      else nav.hidden=true;
    }
  }
  function settleDisclosures() {
    for(const [details,state] of disclosures) { state.animation?.cancel();details.open=state.expanded;state.wrapper.style.height=''; }
  }
  function setEnabled(value, user=false) {
    enabled=value; if(user)explicitChoice=true;
    if(!value) { animations.forEach(a=>a.cancel());animations.clear();lightAnimation=null;settleDisclosures();pictureGhost?.remove();pictureGhost=null;nav.hidden=document.querySelector('.menu-toggle').getAttribute('aria-expanded')!=='true'; }
    root.dataset.motion=value?'on':'off';
    toggle.setAttribute('aria-pressed',String(!value));
    toggle.setAttribute('aria-label',value?'Остановить анимацию':'Включить анимацию');
    toggle.querySelector('span').textContent=value?'Движение':'Без движения';
    toggle.querySelector('use').setAttribute('href',value?'#pause':'#play');
    manualLight=null;
    if(!value) { content.style.removeProperty('--heading-y');content.style.removeProperty('--heading-opacity'); }
    requestMeasure();
  }
  function steer(value) {
    if(!enabled)return;
    lightAnimation?.cancel();lightAnimation=null;
    manualLight=clamp(Number(value),0,100);
    camera.style.setProperty('--beam-position',`${manualLight}%`);
    light.value=String(Math.round(manualLight));
  }
  toggle.addEventListener('click',()=>setEnabled(!enabled,true));
  system.addEventListener('change',event=>{if(!explicitChoice)setEnabled(!event.matches);});
  light.addEventListener('input',()=>steer(light.value));
  hero.addEventListener('pointermove',event=>{
    if(!enabled||event.target.closest('a,button,input,select'))return;
    if(event.pointerType==='touch'&&event.buttons===0)return;
    const rect=hero.getBoundingClientRect();steer((event.clientX-rect.left)/rect.width*100);
  },{passive:true});
  hero.addEventListener('pointerdown',event=>{
    if(event.pointerType!=='touch'||event.target.closest('a,button,input,select'))return;
    const rect=hero.getBoundingClientRect();steer((event.clientX-rect.left)/rect.width*100);
  },{passive:true});
  hero.addEventListener('pointerleave',()=>{manualLight=null;schedule();});
  hero.addEventListener('pointerup',event=>{if(event.pointerType==='touch'){manualLight=null;schedule();}},{passive:true});
  hero.addEventListener('pointercancel',()=>{manualLight=null;schedule();},{passive:true});
  window.addEventListener('scroll',()=>{manualLight=null;introCamera?.cancel();introCamera=null;if(lightAnimation){lightAnimation.cancel();lightAnimation=null;}schedule();},{passive:true});
  window.addEventListener('resize',requestMeasure,{passive:true});
  if('ResizeObserver'in window) {const sizes=new ResizeObserver(requestMeasure);sizes.observe(document.querySelector('.faq-list'));sizes.observe(document.querySelector('.service-panel'));}
  document.addEventListener('visibilitychange',()=>{if(document.hidden){if(frame)cancelAnimationFrame(frame);frame=0;animations.forEach(a=>a.pause());}else{animations.forEach(a=>a.play());requestMeasure();}});
  for(const image of document.images)image.addEventListener('load',requestMeasure,{once:true});
  document.fonts?.ready.then(requestMeasure);

  const headlineTargets=document.querySelectorAll('.section-heading h2,.care h2,.approach h2,.faq h2,.closing h2');
  headlineTargets.forEach(heading=>{
    const lines=heading.innerHTML.split(/<br\s*\/?\s*>/i);
    if(lines.length<2)return;
    heading.replaceChildren(...lines.map(text=>{const line=document.createElement('span');line.className='heading-line';const inner=document.createElement('span');inner.textContent=text;line.append(inner);return line;}));
  });
  if('IntersectionObserver'in window){
    headingObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;[...entry.target.querySelectorAll('.heading-line>span')].forEach((line,i)=>animate(line,[{transform:'translate3d(0,80%,0) rotateX(18deg)',opacity:.2},{transform:'translate3d(0,0,0) rotateX(0deg)',opacity:1}],{delay:i*75,duration:750}));headingObserver.unobserve(entry.target);});},{threshold:.35});
    headlineTargets.forEach(node=>headingObserver.observe(node));
  }
  document.querySelectorAll('.care-options input').forEach(input=>input.addEventListener('change',()=>{
    animate(input.closest('label'),[{transform:'scale(.94)'},{transform:'scale(1)'}],{duration:350});
    const count=document.querySelector('#care-count');panel(count);
  }));
  document.querySelectorAll('.faq-list details').forEach(details=>{
    const summary=details.querySelector('summary');
    const wrapper=document.createElement('div');wrapper.className='faq-answer';
    [...details.children].filter(node=>node!==summary).forEach(node=>wrapper.append(node));details.append(wrapper);
    const state={expanded:details.open,animation:null,wrapper};disclosures.set(details,state);
    summary.addEventListener('click',event=>{
      event.preventDefault();state.expanded=!state.expanded;
      const start=wrapper.getBoundingClientRect().height;
      state.animation?.cancel();details.open=true;
      const end=state.expanded?wrapper.scrollHeight:0;
      summary.setAttribute('aria-expanded',String(state.expanded));
      if(!enabled){details.open=state.expanded;wrapper.style.height='';requestMeasure();return;}
      state.animation=animate(wrapper,[{height:`${start}px`,opacity:state.expanded ? .3 : 1},{height:`${end}px`,opacity:state.expanded?1:0}],{duration:360});
      if(state.animation)state.animation.addEventListener('finish',()=>{details.open=state.expanded;wrapper.style.height='';requestMeasure();},{once:true});
    });
  });
  function entrance() {
    if(introStarted||!enabled||document.hidden||scrollY>100)return;
    introStarted=true;
    hero.querySelectorAll('h1,p,.hero-buttons').forEach((node,i)=>animate(node,[{transform:'translate3d(0,24px,0)',opacity:.35,filter:'blur(5px)'},{transform:'translate3d(0,0,0)',opacity:1,filter:'blur(0px)'}],{delay:i*90,duration:900}));
    introCamera=animate(camera,[{transform:'scale(1.12)'},{transform:'scale(1)'}],{duration:1500});
    if(CSS.supports('background-color','red')) {
      // Registered custom property interpolates a real photographic mask, not just a decorative line.
      try{CSS.registerProperty({name:'--beam-position',syntax:'<percentage>',inherits:true,initialValue:'38%'});}catch(_){/* Already registered in this document. */}
    }
    lightAnimation=animate(camera,[{'--beam-position':'-15%'},{'--beam-position':'95%'}],{duration:2400,easing:'cubic-bezier(.4,0,.2,1)'});
    if(lightAnimation)lightAnimation.addEventListener('finish',()=>{lightAnimation=null;schedule();},{once:true});
  }
  root.classList.add('motion-ready');
  window.IHMotion={get enabled(){return enabled;},panel,picture,menu};
  setEnabled(enabled);
  const heroImage=camera.querySelector('img');
  Promise.all([heroImage.decode().catch(()=>{}),document.fonts?.ready??Promise.resolve()]).then(()=>{measure();entrance();});
  measure();
})();
