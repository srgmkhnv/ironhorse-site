import { Browser, sleep } from './browser.mjs';
const previewUrl = process.env.UI_PREVIEW_URL || 'http://127.0.0.1:3000';
import {writeFileSync} from 'node:fs';
const b=await Browser.launch();const results=[];
const assert=(value,message)=>{if(!value)throw Error(message);results.push(message)};
const click=(p,selector)=>p.eval(selector=>{const node=document.querySelector(selector);node.focus({preventScroll:true});node.click()},selector);
async function wait(p,condition){for(let i=0;i<100;i++){if(await p.eval(condition))return;await sleep(30)}throw Error('Timed out waiting for UI state')}
async function key(p,key){const codes={Enter:13,Escape:27,Home:36,End:35,ArrowDown:40,ArrowUp:38,ArrowLeft:37,ArrowRight:39};const args={key,code:key,windowsVirtualKeyCode:codes[key],nativeVirtualKeyCode:codes[key]};await p.send('Input.dispatchKeyEvent',{type:'keyDown',...args});await p.send('Input.dispatchKeyEvent',{type:'keyUp',...args});}
try{
 for(const [width,height] of [[320,720],[390,844],[568,320],[768,1024],[1100,900],[1280,800],[1440,1000]]){
  const p=await b.newPage({width,height,mobile:width<600,reducedMotion:true});
  await p.goto(previewUrl,{settleMs:200});
  assert(await p.eval(()=>document.documentElement.dataset.motion==='off'),`${width}: reduced motion`);
  assert(await p.eval(()=>{const h=document.querySelector('h1');const lines=h.getBoundingClientRect().height/parseFloat(getComputedStyle(h).lineHeight);return lines<2.1}),`${width}: opening headline remains two lines`);
  assert(await p.eval(()=>document.querySelector('.brand .wordmark').getAttribute('src')==='assets/wordmark.svg'&&document.querySelector('.hero-content .button').classList.contains('wa-link')&&!document.querySelector('.hero-signature,.closing-brand')&&!getComputedStyle(document.querySelector('.hero-content'),'::before').content.includes('""')),`${width}: original brand, direct contact and photographic opening`);
  assert(await p.eval(()=>getComputedStyle(document.querySelector('.hero')).position!=='sticky'),`${width}: opening scrolls naturally`);
  const compact=width<=1100;
  assert(await p.eval(isCompact=>[...document.querySelectorAll('.service-visual')].every(photo=>photo.open===!isCompact),compact),`${width}: full service photographs have the correct initial disclosure state`);
  if(compact){
   assert(await p.eval(()=>document.querySelector('#service-film').offsetHeight<650),`${width}: service description and action stay compact`);
   await click(p,'#service-film .service-visual>summary');
   assert(await p.eval(()=>document.querySelector('#service-film .service-visual').open&&getComputedStyle(document.querySelector('#service-film .service-visual img')).objectFit==='contain'),`${width}: full photograph can be revealed without cropping`);
   await click(p,'#service-film .service-visual>summary');
  }

  for(const service of ['film','polish','ceramic','interior','tint','wash']){
   await click(p,`#tab-${service}`);
   // Clicking the initially expanded accordion closes it; reopen for the add action.
   if(await p.eval(s=>document.querySelector(`#service-${s}`).hidden,service))await click(p,`#tab-${service}`);
   assert(await p.eval(s=>!document.querySelector(`#service-${s}`).hidden,service),`${width}: ${service} opens`);
   await click(p,`[data-add-service="${service}"]`);
   await click(p,`[data-add-service="${service}"]`);
  }
  assert(await p.eval(()=>document.querySelectorAll('#care-selected [data-remove-service]').length===6&&document.querySelectorAll('[data-care-service]:checked').length===6),`${width}: six unique selected services`);
  for(const [city,phone] of [['moscow','79104989211'],['makhachkala','79674087971'],['kaspiysk','79023552950']]){
   await click(p,'#header-city');
   await click(p,`[data-header-city="${city}"]`);
   assert(await p.eval(({city,phone})=>document.querySelector('#care-city').value===city&&document.querySelector('#studio-call').href.endsWith(phone)&&[...document.querySelectorAll('.wa-link')].every(a=>new URL(a.href).pathname===`/${phone}`)&&document.querySelector('#hero-city').textContent===document.querySelector('#studio-city').textContent,{city,phone}),`${width}: ${city} synchronized`);
  }
  await p.eval(()=>{const input=document.querySelector('#car-model');input.value='Mercedes-Benz '+ 'А'.repeat(85)+' <&>';input.dispatchEvent(new Event('input',{bubbles:true}));window.__opened=null;const original=HTMLAnchorElement.prototype.click;HTMLAnchorElement.prototype.click=function(){if(this.href.startsWith('https://wa.me/')){window.__opened=this.href;return}original.call(this)};document.querySelector('#care-form').requestSubmit()});
  assert(await p.eval(()=>{const url=new URL(window.__opened),text=url.searchParams.get('text');return url.pathname==='/79023552950'&&text.includes('Mercedes-Benz')&&text.includes('<&>')&&text.includes('Филиал: Каспийск')&&(text.match(/• /g)||[]).length===6}),`${width}: encoded WhatsApp recipient and payload`);
  await click(p,'[data-remove-service="film"]');
  assert(await p.eval(()=>!document.querySelector('[data-care-service="film"]').checked&&document.querySelectorAll('#care-selected [data-remove-service]').length===5&&document.activeElement.dataset.removeService),`${width}: remove updates checkbox and preserves focus`);
  await p.eval(()=>{document.querySelectorAll('[data-care-service]:checked').forEach(input=>{input.checked=false;input.dispatchEvent(new Event('change',{bubbles:true}))});document.querySelector('#car-model').value='';document.querySelector('#car-model').dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('#care-form').requestSubmit()});
  assert(await p.eval(()=>document.querySelector('#care-selected').textContent.includes('Консультация')&&!new URL(window.__opened).searchParams.get('text').includes('Автомобиль:')),`${width}: empty enquiry works`);
  await p.eval(()=>document.querySelector('#tab-ceramic').focus());
  await key(p,'End');
  assert(await p.eval(()=>document.activeElement.id==='tab-wash'),`${width}: service keyboard End`);
  await p.eval(()=>document.querySelector('#header-city').focus());await key(p,'ArrowDown');await key(p,'Home');await key(p,'Enter');
  assert(await p.eval(()=>document.querySelector('#care-city').value==='moscow'&&document.activeElement.id==='header-city'),`${width}: city keyboard and focus return`);
  if(width<=1100){
   await click(p,'.menu-toggle');
   assert(await p.eval(()=>!document.querySelector('#mobile-nav').hidden&&document.querySelector('main').inert&&document.querySelector('footer').inert),`${width}: menu shields page`);
   await key(p,'Escape');
   assert(await p.eval(()=>document.querySelector('#mobile-nav').hidden&&!document.querySelector('main').inert&&document.activeElement.classList.contains('menu-toggle')),`${width}: menu Escape restores page`);
  }
  if(width<=600){
   await p.eval(()=>document.querySelector('#studios').scrollIntoView({behavior:'instant'}));await sleep(80);
   assert(await p.eval(()=>document.querySelector('.mobile-bottom').classList.contains('is-hidden')&&document.querySelector('.mobile-bottom').inert),`${width}: contact section is not covered by a duplicate contact bar`);
  }
  await click(p,'.faq-list summary');assert(await p.eval(()=>document.querySelector('.faq-list details').open),`${width}: FAQ opens`);
  await click(p,'.faq-list summary');assert(await p.eval(()=>!document.querySelector('.faq-list details').open),`${width}: FAQ closes`);
  // Geometry-based gallery navigation must reach both ends in every layout.
  await p.eval(()=>{document.querySelector('#gallery').scrollIntoView({behavior:'instant'})});await sleep(100);
  for(let i=0;i<12;i++)await click(p,'.gallery-next');await sleep(120);
  assert(await p.eval(()=>document.querySelector('.gallery-next').disabled&&document.querySelector('#gallery-position').textContent.includes('9')),`${width}: gallery reaches last photo`);
  for(let i=0;i<12;i++)await click(p,'.gallery-prev');await sleep(120);
  assert(await p.eval(()=>document.querySelector('.gallery-prev').disabled&&document.querySelector('#photo-rail').scrollLeft<4),`${width}: gallery returns to start`);
  if(width===390||width===1440){
   for(let i=0;i<9;i++){
    await p.eval(async index=>{const img=document.querySelector(`[data-photo="${index}"] img`);img.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});await img.decode()},i);
    assert(await p.eval(index=>{const img=document.querySelector(`[data-photo="${index}"] img`);return img.complete&&img.naturalWidth>0&&img.getBoundingClientRect().height>100},i),`${width}: gallery thumbnail ${i+1} loads at a usable size`);
    await click(p,`[data-photo="${i}"]`);await wait(p,()=>!document.querySelector('#photo-full').hidden||document.querySelector('#photo-status').textContent.includes('Не удалось'));
    assert(await p.eval(index=>document.querySelector('#photo-viewer').open&&!document.querySelector('#photo-full').hidden&&document.querySelector('#photo-full').naturalWidth>0&&document.querySelector('#photo-index').textContent===`${index+1} / 9`,i),`${width}: photo ${i+1} decodes`);
    await key(p,'Escape');
    assert(await p.eval(index=>!document.querySelector('#photo-viewer').open&&document.activeElement.dataset.photo===String(index),i),`${width}: photo ${i+1} focus return`);
   }
   await p.eval(()=>{document.querySelector('[data-photo="0"]').dataset.full='assets/missing-test-image.webp';document.querySelector('[data-photo="0"]').click()});await wait(p,()=>document.querySelector('#photo-status').textContent.includes('Не удалось'));
   assert(await p.eval(()=>document.querySelector('#photo-status').textContent.includes('Не удалось')&&document.querySelector('#photo-full').hidden),`${width}: image error state`);
   await click(p,'#photo-next');await wait(p,()=>!document.querySelector('#photo-full').hidden||document.querySelector('#photo-status').textContent.includes('Не удалось'));
   assert(await p.eval(()=>!document.querySelector('#photo-full').hidden&&document.querySelector('#photo-status').textContent===''),`${width}: image recovery`);await key(p,'Escape');
  }
  assert(await p.eval(()=>document.documentElement.scrollWidth<=innerWidth),`${width}: no overflow after interactions`);
  assert(p.consoleErrors.length===0,`${width}: no JavaScript errors`);
  await p.close();
 }
 const p=await b.newPage({width:1440,height:1000});await p.goto(previewUrl,{settleMs:200});
 await click(p,'#tab-interior');await click(p,'[data-add-service="interior"]');
 await p.eval(()=>document.querySelector('#service-interior .service-request').focus());
 await p.setViewport({width:390,height:844,mobile:true});await sleep(100);
 assert(await p.eval(()=>document.querySelector('#tab-interior').getAttribute('aria-expanded')==='true'&&document.querySelector('#service-interior').previousElementSibling.id==='tab-interior'&&document.activeElement.matches('[data-add-service="interior"]')), 'resize: active panel, selection and focus survive mobile');
 await click(p,'#service-interior .service-visual>summary');
 await p.setViewport({width:1440,height:1000});await sleep(100);
 assert(await p.eval(()=>document.activeElement.matches('#service-interior .service-request')),'resize: hidden photo toggle hands focus to the service action');
 assert(await p.eval(()=>document.querySelector('#tab-interior').getAttribute('aria-selected')==='true'&&document.querySelector('#service-interior').parentElement.className==='service-panels'&&document.querySelector('[data-care-service="interior"]').checked),'resize: desktop roles and selection restored');
 await p.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await wait(p,()=>!window.IHMotion.enabled);
 assert(await p.eval(()=>!window.IHMotion.enabled&&document.getAnimations().filter(a=>a.playState==='running').length===0),'runtime reduced motion cancels animations');
 await p.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});await wait(p,()=>window.IHMotion.enabled);
 assert(await p.eval(()=>window.IHMotion.enabled),'runtime motion re-enabled');

 await p.setViewport({width:390,height:844,mobile:true});
 await p.eval(()=>window.scrollTo({top:0,behavior:'instant'}));await sleep(100);
 await p.eval(()=>window.scrollTo({top:200,behavior:'instant'}));await sleep(100);
 assert(await p.eval(()=>{const n=parseFloat(getComputedStyle(document.querySelector('.hero-camera')).getPropertyValue('--beam-position'));return n>20&&n<85}),'mobile photographic light follows natural scrolling progressively');
 await p.setViewport({width:1440,height:1000});


 // A queued close event must not invalidate a rapidly reopened viewer.
 await p.eval(()=>{document.querySelector('[data-photo="0"]').click();document.querySelector('#photo-viewer').close();document.querySelector('[data-photo="3"]').click()});
 await wait(p,()=>!document.querySelector('#photo-full').hidden);
 assert(await p.eval(()=>document.querySelector('#photo-viewer').open&&document.querySelector('#photo-index').textContent==='4 / 9'),'rapid dialog close/reopen keeps the new photo');
 await p.eval(()=>{for(let i=0;i<15;i++)document.querySelector('#photo-next').click()});
 await wait(p,()=>!document.querySelector('#photo-full').hidden);
 assert(await p.eval(()=>document.querySelector('#photo-index').textContent==='1 / 9'&&document.querySelector('#photo-full').src.endsWith('photo-01.webp')),'rapid photo changes keep only the latest result');
 await p.setViewport({width:390,height:844,mobile:true});
 const touch=await p.eval(()=>{const r=document.querySelector('.photo-viewer-stage').getBoundingClientRect();return {start:r.left+r.width*.8,end:r.left+r.width*.2,y:r.top+r.height*.5}});
 await p.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:touch.start,y:touch.y}]});
 await p.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:touch.end,y:touch.y}]});
 await p.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 await wait(p,()=>document.querySelector('#photo-index').textContent==='2 / 9'&&!document.querySelector('#photo-full').hidden);
 assert(await p.eval(()=>document.querySelector('#photo-index').textContent==='2 / 9'),'touch swipe advances the viewer');
 await key(p,'Escape');
 await p.eval(()=>{document.querySelector('#services').scrollIntoView({behavior:'instant'})});
 await sleep(60);
 assert(await p.eval(()=>document.querySelector('#services').getBoundingClientRect().top>=document.querySelector('.header').getBoundingClientRect().bottom),'anchor heading clears the sticky header');

 await p.close();
 const nojs=await b.newPage({width:390,height:844});await nojs.send('Emulation.setScriptExecutionDisabled',{value:true});await nojs.goto(previewUrl,{settleMs:100});
 assert(await nojs.eval(()=>[...document.querySelectorAll('.service-panel')].every(n=>getComputedStyle(n).display!=='none')&&document.querySelectorAll('.footer-phone').length===3),'no JavaScript: all services and branch phones remain available');
 await nojs.close();
 console.log(`PASS ${results.length} browser assertions`);if (process.env.UI_TEST_REPORT) writeFileSync(process.env.UI_TEST_REPORT, JSON.stringify({passed:results.length,checks:results},null,2));
}catch(error){console.error(error);if (process.env.UI_TEST_REPORT) writeFileSync(process.env.UI_TEST_REPORT, JSON.stringify({passed:results.length,last:results.at(-1),error:String(error)},null,2));process.exitCode=1}
finally{await b.close()}
