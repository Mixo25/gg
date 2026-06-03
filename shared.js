/* ═══ CURSOR ═══════════════════════════════════════════════════ */
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
if('ontouchstart' in window){if(dot)dot.style.display='none';if(ring)ring.style.display='none';document.body.style.cursor='auto';}else{
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;if(dot){dot.style.left=mx+'px';dot.style.top=my+'px';}});
  (function animRing(){rx+=(mx-rx)*0.12;ry+=(my-ry)*0.12;if(ring){ring.style.left=rx+'px';ring.style.top=ry+'px';}requestAnimationFrame(animRing);})();
  document.querySelectorAll('a,button,.faq-question,.value-card,.stat-card,.service-card,.project-card,.team-card,.portfolio-card').forEach(el=>{el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-hover'));el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-hover'));});
}

/* ═══ SCROLL PROGRESS ══════════════════════════════════════════ */
const progress=document.getElementById('scroll-progress');
window.addEventListener('scroll',()=>{if(progress){const pct=(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight))*100;progress.style.width=pct+'%';}},{passive:true});

/* ═══ NAVBAR ═══════════════════════════════════════════════════ */
const navbar=document.getElementById('navbar');
window.addEventListener('scroll',()=>{if(navbar)navbar.classList.toggle('scrolled',window.scrollY>60);},{passive:true});

/* ═══ MOBILE MENU ══════════════════════════════════════════════ */
const burger=document.getElementById('burger');
const mobileMenu=document.getElementById('mobile-menu');
if(burger&&mobileMenu){
  burger.addEventListener('click',()=>{burger.classList.toggle('active');mobileMenu.classList.toggle('open');});
  document.querySelectorAll('.menu-link').forEach(link=>{link.addEventListener('click',()=>{burger.classList.remove('active');mobileMenu.classList.remove('open');});});
}

/* ═══ REVEAL ON SCROLL ═════════════════════════════════════════ */
const reveals=document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
const revealObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:0.1,rootMargin:'0px 0px -60px 0px'});
reveals.forEach(el=>revealObs.observe(el));

/* ═══ COUNTER ══════════════════════════════════════════════════ */
function animateCounter(el,target,duration=2000){let start=0;const step=target/(duration/16);const run=()=>{start+=step;if(start>=target){el.textContent=target;return;}el.textContent=Math.floor(start);requestAnimationFrame(run);};run();}
const counters=document.querySelectorAll('.counter');
const counterObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting&&!e.target.dataset.counted){e.target.dataset.counted=true;animateCounter(e.target,parseInt(e.target.dataset.target));}});},{threshold:0.4});
counters.forEach(c=>counterObs.observe(c));

/* ═══ FAQ ══════════════════════════════════════════════════════ */
document.querySelectorAll('.faq-question').forEach(btn=>{btn.addEventListener('click',()=>{const item=btn.parentElement;const answer=item.querySelector('.faq-answer');const isOpen=item.classList.contains('open');document.querySelectorAll('.faq-item').forEach(i=>{i.classList.remove('open');const a=i.querySelector('.faq-answer');if(a)a.style.maxHeight=null;});if(!isOpen){item.classList.add('open');if(answer)answer.style.maxHeight=answer.scrollHeight+'px';}});});

/* ═══ PORTFOLIO FILTER ═════════════════════════════════════════ */
const filterBtns=document.querySelectorAll('.filter-btn');
const portfolioItems=document.querySelectorAll('.portfolio-card');
filterBtns.forEach(btn=>{btn.addEventListener('click',()=>{filterBtns.forEach(b=>b.classList.remove('active'));btn.classList.add('active');const filter=btn.dataset.filter;portfolioItems.forEach(item=>{if(filter==='all'||item.dataset.cat===filter){item.style.display='block';setTimeout(()=>{item.style.opacity='1';item.style.transform='translateY(0)';},10);}else{item.style.opacity='0';item.style.transform='translateY(20px)';setTimeout(()=>{item.style.display='none';},300);}});});});

/* ═══ BACK TO TOP ══════════════════════════════════════════════ */
const backTop=document.getElementById('back-top');
window.addEventListener('scroll',()=>{if(backTop)backTop.classList.toggle('show',window.scrollY>500);},{passive:true});
if(backTop)backTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

/* ═══ SMOOTH ANCHORS ═══════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-80,behavior:'smooth'});}});});

/* ═══ WHATSAPP FLOAT BUTTON ════════════════════════════════════ */
(function(){
  const wa = document.createElement('a');
  wa.href = 'https://wa.me/27795175383?text=Hi%20Leanotums%20Projects%2C%20I%27d%20like%20to%20enquire%20about%20a%20project.';
  wa.target = '_blank';
  wa.rel = 'noopener';
  wa.setAttribute('aria-label','Chat on WhatsApp');
  wa.style.cssText = 'position:fixed;bottom:88px;right:32px;z-index:4999;width:52px;height:52px;border-radius:50%;background:#25D366;color:#fff;display:flex;align-items:center;justify-content:center;font-size:24px;box-shadow:0 4px 20px rgba(37,211,102,0.45);transition:transform 0.3s,box-shadow 0.3s;text-decoration:none;';
  wa.innerHTML = '<i class="fab fa-whatsapp"></i>';
  wa.addEventListener('mouseenter',()=>{wa.style.transform='scale(1.12)';wa.style.boxShadow='0 6px 28px rgba(37,211,102,0.6)';});
  wa.addEventListener('mouseleave',()=>{wa.style.transform='scale(1)';wa.style.boxShadow='0 4px 20px rgba(37,211,102,0.45)';});
  document.body.appendChild(wa);
})();

/* ═══ ACTIVE NAV LINK ══════════════════════════════════════════ */
(function(){
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if(href && (href === path || (path === '' && href === 'index.html'))) {
      a.classList.add('active');
    }
  });
})();
