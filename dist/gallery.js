(() => {
  'use strict';
  const rail=document.querySelector('#photo-rail');
  const shots=[...rail.querySelectorAll('.photo-open')];
  const cards=[...rail.querySelectorAll('.photo-card')];
  const viewer=document.querySelector('#photo-viewer');
  const image=document.querySelector('#photo-full');
  const title=document.querySelector('#photo-title');
  const status=document.querySelector('#photo-status');
  const close=document.querySelector('#photo-close');
  const reduce=matchMedia('(prefers-reduced-motion:reduce)');
  let selected=0,request=0,frame=0,opener=null,entrance=null,startTouch=null;
  const motion=()=>window.IHMotion?window.IHMotion.enabled:!reduce.matches;
  function updateRail(){
    frame=0;const step=cards[0].getBoundingClientRect().width+parseFloat(getComputedStyle(rail).columnGap);const start=Math.min(cards.length-1,Math.max(0,Math.round(rail.scrollLeft/step)));const visible=Math.max(1,Math.floor((rail.clientWidth+parseFloat(getComputedStyle(rail).columnGap))/step));const end=Math.min(cards.length,start+visible);
    document.querySelector('#gallery-position').textContent=visible===1?`Фото ${start+1} из ${cards.length}`:`Фото ${start+1}–${end} из ${cards.length}`;
    document.querySelector('.gallery-prev').disabled=rail.scrollLeft<=4;
    document.querySelector('.gallery-next').disabled=rail.scrollLeft+rail.clientWidth>=rail.scrollWidth-3;
  }
  const queueRail=()=>{if(!frame)frame=requestAnimationFrame(updateRail);};
  const moveRail=direction=>rail.scrollBy({left:direction*(cards[0].getBoundingClientRect().width+parseFloat(getComputedStyle(rail).columnGap)),behavior:motion()?'smooth':'auto'});
  document.querySelector('.gallery-prev').addEventListener('click',()=>moveRail(-1));
  document.querySelector('.gallery-next').addEventListener('click',()=>moveRail(1));
  rail.addEventListener('scroll',queueRail,{passive:true});window.addEventListener('resize',queueRail,{passive:true});
  rail.addEventListener('keydown',event=>{if(event.target!==rail||!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();if(event.key==='Home'||event.key==='End')rail.scrollTo({left:event.key==='Home'?0:rail.scrollWidth,behavior:motion()?'smooth':'auto'});else moveRail(event.key==='ArrowRight'?1:-1);});
  async function show(index){
    const revision=++request;selected=(index+shots.length)%shots.length;const shot=shots[selected];
    title.textContent=shot.dataset.caption;document.querySelector('#photo-index').textContent=`${selected+1} / ${shots.length}`;const download=document.querySelector('#photo-download');download.href=shot.dataset.full;download.download=`iron-horse-${String(selected+1).padStart(2,'0')}.webp`;
    entrance?.cancel();image.hidden=true;image.src=shot.dataset.full;image.alt=shot.querySelector('img').alt;status.textContent='Загрузка фотографии…';
    try{await image.decode();if(revision!==request||!viewer.open)return;image.hidden=false;status.textContent='';if(motion())entrance=image.animate([{opacity:.35,transform:'scale(1.025)'},{opacity:1,transform:'scale(1)'}],{duration:380,easing:'cubic-bezier(.16,1,.3,1)'});}
    catch(_){if(revision===request)status.textContent='Не удалось загрузить фото. Попробуйте открыть соседний кадр или ссылку «Скачать фото».';}
  }
  shots.forEach((shot,index)=>shot.addEventListener('click',()=>{opener=shot;viewer.showModal();document.documentElement.classList.add('photo-viewing');show(index);close.focus({preventScroll:true});}));
  close.addEventListener('click',()=>viewer.close());
  viewer.addEventListener('close',()=>{++request;entrance?.cancel();image.hidden=true;document.documentElement.classList.remove('photo-viewing');opener?.focus({preventScroll:true});});
  document.querySelector('#photo-prev').addEventListener('click',()=>show(selected-1));document.querySelector('#photo-next').addEventListener('click',()=>show(selected+1));
  viewer.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();show(selected+(event.key==='ArrowRight'?1:-1));}});
  viewer.addEventListener('click',event=>{if(event.target!==viewer)return;const rect=viewer.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)viewer.close();});
  const stage=document.querySelector('.photo-viewer-stage');stage.addEventListener('touchstart',event=>{startTouch=event.touches.length===1?{x:event.touches[0].clientX,y:event.touches[0].clientY}:null;},{passive:true});stage.addEventListener('touchend',event=>{if(!startTouch||event.changedTouches.length!==1){startTouch=null;return;}const touch=event.changedTouches[0];const dx=touch.clientX-startTouch.x,dy=touch.clientY-startTouch.y;startTouch=null;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5)show(selected+(dx<0?1:-1));},{passive:true});stage.addEventListener('touchcancel',()=>{startTouch=null;},{passive:true});
  reduce.addEventListener('change',()=>{if(!motion())entrance?.cancel();});
  updateRail();
})();
