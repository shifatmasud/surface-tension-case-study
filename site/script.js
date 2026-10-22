(()=>{const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;const vs=[...document.querySelectorAll('video.lv')];
if(!('IntersectionObserver' in window)){vs.forEach(v=>{v.preload='metadata';v.controls=true});return}
const io=new IntersectionObserver(es=>{for(const e of es){const v=e.target;if(e.isIntersecting){if(v.preload==='none'){v.preload='auto';v.load()}if(!rm)v.play().catch(()=>{v.controls=true})}else if(!v.paused)v.pause()}},{rootMargin:'200px 0px',threshold:0.15});
vs.forEach(v=>{io.observe(v);if(rm)v.controls=true})})();

(()=>{/* the portfolio's CTA, light: ink flood from the pointer point, roll, press squash; footer progress bar */
const rm=matchMedia('(prefers-reduced-motion: reduce)').matches,E=t=>1-Math.pow(2,-10*t),IO=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
document.querySelectorAll('.big-btn').forEach(b=>{const ink=b.querySelector('.ink');let r=0,from=0,to=0,t0=0,x=0,y=0,raf=0,dur=600;
const max=()=>{const w=b.offsetWidth,h=b.offsetHeight;return Math.hypot(Math.max(x,w-x),Math.max(y,h-y))+2};
const tick=n=>{const k=Math.min(1,(n-t0)/dur),e=to>from?E(k):IO(k);r=from+(to-from)*e;ink.style.visibility=r>0.5?'visible':'hidden';ink.style.clipPath=`circle(${r}px at ${x}px ${y}px)`;raf=k<1?requestAnimationFrame(tick):0};
const go=(target,d)=>{from=r;to=target;dur=rm?1:d;t0=performance.now();if(!raf)raf=requestAnimationFrame(tick)};
const at=e=>{const q=b.getBoundingClientRect();if(e&&e.clientX!==undefined&&(e.clientX||e.clientY)){x=e.clientX-q.left;y=e.clientY-q.top}else{x=q.width/2;y=q.height/2}};
const on=e=>{at(e);b.classList.add('is-on');go(max(),600)},off=e=>{at(e);b.classList.remove('is-on');go(0,500)};
b.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')on(e)});b.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse')off(e)});
b.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')on(e);b.classList.add('is-press')});
const up=e=>{b.classList.remove('is-press');if(e.pointerType&&e.pointerType!=='mouse')setTimeout(()=>off(e),220)};
b.addEventListener('pointerup',up);b.addEventListener('pointercancel',up);
b.addEventListener('focus',()=>{if(b.matches(':focus-visible'))on()});b.addEventListener('blur',()=>off())});
const f=document.querySelector('.overscroll__fill');if(f){let p=0;const u=()=>{p=0;const d=document.documentElement,m=d.scrollHeight-innerHeight;f.style.setProperty('--f',m>0?Math.min(1,scrollY/m).toFixed(3):1)};addEventListener('scroll',()=>{if(!p)p=requestAnimationFrame(u)},{passive:true});u()}
})();
