// Helpers
const $ = (q,ctx=document)=>ctx.querySelector(q);
const $$ = (q,ctx=document)=>[...ctx.querySelectorAll(q)];

// Año dinámico
const y = $('#y'); if (y) y.textContent = new Date().getFullYear();

// Toggle menú móvil
const btn = $('#menuBtn'), menu = $('#menu');
btn?.addEventListener('click', ()=>{
  menu.classList.toggle('show');
  btn.setAttribute('aria-expanded', menu.classList.contains('show') ? 'true' : 'false');
});

// Activa enlace de navegación según ruta
(function markActive(){
  const path = location.pathname.split('/').pop() || 'index.html';
  $$('.menu a').forEach(a=>{
    const href = a.getAttribute('href');
    if(!href) return;
    // Normaliza anclas
    const cleanHref = href.includes('#') ? href.split('#')[0] : href;
    if(cleanHref === '' && path==='index.html') a.classList.add('active');
    if(cleanHref === path) a.classList.add('active');
    if(cleanHref.endsWith('/') && path==='index.html') a.classList.add('active');
  });
})();

// Micro-animaciones barras
const inView = (el)=>{ const r = el.getBoundingClientRect(); return r.top < innerHeight*0.9 && r.bottom > 0; };
function animateBars(){ $$('.bar-fill').forEach(b=>{ if(!b.dataset.done && inView(b)){ b.dataset.done=1; b.animate([{width:'0%'},{width:b.style.width}],{duration:900,fill:'forwards',easing:'ease-out'}); } }); }
addEventListener('scroll', animateBars, {passive:true});
addEventListener('load', animateBars);

// Envío simulado de formularios
function submitLead(form, statusId='leadStatus'){
  const status = document.getElementById(statusId);
  if(status){ status.textContent = 'Enviando…'; }
  setTimeout(()=>{
    if(status){ status.style.color = 'var(--brand)'; status.textContent = '¡Gracias! Te contactaremos muy pronto.'; }
    form.reset();
  }, 700);
}
window.submitLead = submitLead;
