(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const L = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>';
  const R = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>';
  const WA_PATH = 'M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 01-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 012.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0012.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 005.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41z';
  const waIcon = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="${WA_PATH}"/></svg>`;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- motion ---------- */
  const root = document.documentElement;

  /* opening intro + entrance: head script adds .mo/.intro; here we release it */
  const intro = $('#intro');
  const release = () => root.classList.add('go');
  if (intro && root.classList.contains('intro')) {
    let done = false;
    const finish = fast => {
      if (done) return; done = true;
      release();
      const end = () => { intro.remove(); root.classList.remove('intro'); };
      if (fast) { intro.classList.add('skip'); setTimeout(end, 380); } else end();
    };
    setTimeout(release, 2250);           // hero starts while the curtains are still parting
    setTimeout(() => finish(false), 2900);
    intro.addEventListener('click', () => finish(true));
    addEventListener('keydown', e => { if (e.key === 'Escape' || e.key === 'Enter') finish(true); });
  } else release();

  /* tag extra elements so every page gets scroll reveals without touching the markup */
  const tag = (sel, v) => $$(sel).forEach(el => { el.classList.add('rv'); if (v) el.dataset.rv = v; });
  tag('.sec-head,.band,.tscroll,.fnote,.foot-grid>div,.ccard,form.card,.tick li,.opts span,.more-types .chip');
  tag('.size,.band', 'zoom');
  tag('.frame');
  $$('.split>div:not(.frame)').forEach(el => { el.classList.add('rv'); el.dataset.rv = el === el.parentElement.firstElementChild ? 'left' : 'right'; });
  $$('.split>.frame').forEach(el => { el.dataset.rv = 'clip'; });

  /* headings: split into masked words */
  $$('.sec-head h2,.band h2,.split h2').forEach(h => {
    if (h.children.length) return;
    const words = h.textContent.trim().split(/\s+/);
    h.setAttribute('aria-label', words.join(' '));
    h.innerHTML = words.map((w, i) => `<span class="w" aria-hidden="true" style="--w:${i}"><span>${w}</span></span>`).join(' ');
  });

  /* reveal on scroll; content always shows even if the observer never fires (older iPhones) */
  let fired = false;
  const showAll = () => $$('.rv').forEach(el => el.classList.add('in'));
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
    fired = true;
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }) : null;
  const watch = rt => $$('.rv', rt).forEach(el => {
    if (el._w) return; el._w = 1;
    const sibs = [...el.parentElement.children].filter(c => c.classList.contains('rv'));
    const i = sibs.indexOf(el), grid = el.parentElement.classList.contains('pgrid');
    el.style.setProperty('--d', (grid ? i % 3 : Math.min(i, 6)) * 90 + 'ms');
    el.addEventListener('transitionend', ev => { if ((ev.target === el) && (ev.propertyName === 'opacity' || ev.propertyName === 'clip-path')) { el.classList.add('done'); el.style.setProperty('--d', '0ms'); } });
    io ? io.observe(el) : el.classList.add('in');
  });
  if (io) { root.classList.add('js'); setTimeout(() => { if (!fired) showAll(); }, 2500); addEventListener('load', () => setTimeout(() => { if (!fired) showAll(); }, 1200)); }
  watch(document);

  /* menu */
  const burger = $('.burger'), menu = $('.menu');
  burger?.addEventListener('click', () => {
    const o = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', o);
    burger.textContent = o ? 'Close' : 'Menu';
  });

  /* scroll effects: header settle, hero drift, image parallax */
  (function () {
    const hdr = $('.site-header'), car0 = $('.hero .carousel'), frames = $$('.frame img');
    let tick = false;
    const run = () => {
      tick = false;
      const y = scrollY;
      hdr?.classList.toggle('scrolled', y > 24);
      if (reduce) return;
      if (car0 && y < innerHeight * 1.2) car0.style.setProperty('--hy', (y * 0.07).toFixed(1) + 'px');
      frames.forEach(im => {
        const r = im.parentElement.getBoundingClientRect();
        if (r.bottom < -100 || r.top > innerHeight + 100) return;
        const off = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        im.style.setProperty('--py', Math.max(-1, Math.min(1, off)) * -28 + 'px');
      });
    };
    const req = () => { if (!tick) { tick = true; requestAnimationFrame(run); } };
    addEventListener('scroll', req, { passive: true }); addEventListener('resize', req); run();
  })();

  /* hero carousel */
  const car = $('#heroCar');
  if (car) {
    const picks = ['l-red', 'h-5x6', 'hd-dbl', 'l-blue', 'm-3x3'].map(id => PRODUCTS.find(p => p.id === id));
    car.innerHTML = `<div class="car-track">${picks.map((p, i) => `
      <div class="car-slide"><img src="${img(p.imgs[0])}" alt="${p.name}">
        <div class="car-cap"><div><small>${p.size} · ${p.dims[0]}</small><h3>${p.name}</h3></div><div class="pr">${inr(p.price)}</div></div></div>`).join('')}</div>
      <div class="dots">${picks.map((_, i) => `<button aria-label="Slide ${i + 1}"${i === 0 ? ' class="on"' : ''}></button>`).join('')}</div>
      <div class="car-ctrl"><button class="arrow" data-d="-1" aria-label="Previous">${L}</button><button class="arrow" data-d="1" aria-label="Next">${R}</button></div>`;
    const track = $('.car-track', car), dots = $$('.dots button', car), slides = $$('.car-slide', car);
    let i = 0, timer;
    const go = n => { i = (n + picks.length) % picks.length; track.style.transform = `translateX(-${i * 100}%)`; dots.forEach((d, k) => d.classList.toggle('on', k === i)); slides.forEach((d, k) => d.classList.toggle('on', k === i)); };
    const play = () => { clearInterval(timer); if (!reduce) timer = setInterval(() => go(i + 1), 5000); };
    $$('.arrow', car).forEach(b => b.addEventListener('click', () => { go(i + +b.dataset.d); play(); }));
    dots.forEach((d, k) => d.addEventListener('click', () => { go(k); play(); }));
    let sx = 0;
    car.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
    car.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) { go(i + (dx < 0 ? 1 : -1)); play(); } });
    go(0); play();
  }

  /* product card */
  const waMsg = p => wa(`Hi Hi-Tech Craft, I'm interested in the "${p.name}" (${inr(p.price)}). Please share details.`);
  const card = p => `
    <article class="pcard rv">
      <button class="pimg" data-id="${p.id}" aria-label="View photos of ${p.name}"><img src="${img(p.imgs[0])}" alt="${p.name}" loading="lazy">
        <span class="ptag"><span>${p.size}</span>${p.cat.includes('hitech') ? '<span>Hi-Tech</span>' : ''}${p.cat.includes('double') && !p.cat.includes('birds') ? '<span>Double</span>' : ''}${p.cat.includes('drainage') ? '<span>Drainage</span>' : ''}</span></button>
      <div class="pbody">
        <h3>${p.name}</h3>
        <div class="pdims">${p.dims.slice(0, 3).join(' · ')}</div>
        <div class="price">${inr(p.price)}</div>
        <div class="pact"><a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="${waMsg(p)}">${waIcon} Enquire</a><button class="btn btn-line btn-sm" data-id="${p.id}">Photos</button></div>
      </div>
    </article>`;

  /* modal */
  const modal = $('#modal');
  let mp = null, mi = 0;
  function openModal(id) {
    mp = PRODUCTS.find(p => p.id === id); if (!mp) return; mi = 0;
    modal.innerHTML = `<div class="modal-bg"></div>
      <div class="modal-box" role="dialog" aria-modal="true" aria-label="${mp.name}">
        <button class="mclose" aria-label="Close">✕</button>
        <div class="modal-gal"><img class="mimg" src="${img(mp.imgs[0])}" alt="${mp.name}">
          ${mp.imgs.length > 1 ? `<button class="arrow prev" aria-label="Previous photo">${L}</button><button class="arrow next" aria-label="Next photo">${R}</button>
          <div class="mthumbs">${mp.imgs.map((k, n) => `<button class="${n ? '' : 'on'}" data-n="${n}" aria-label="Photo ${n + 1}"><img src="${img(k)}" alt=""></button>`).join('')}</div>` : ''}
        </div>
        <div class="modal-info">
          <span class="eyebrow">${mp.size} size</span>
          <h3>${mp.name}</h3>
          <div class="price">${inr(mp.price)}</div>
          <p style="color:var(--muted)">${mp.note}</p>
          <div class="spec">${mp.dims.map(d => `<span>${d}</span>`).join('')}</div>
          <p style="font-size:.95rem;color:var(--muted)">Includes full cage priming and suitable roofing${mp.cat.includes('birds') ? '' : ', plus an inbuilt food door'}. 2-month instalments available.</p>
          <div class="cta-row" style="margin-top:auto"><a class="btn btn-wa" target="_blank" rel="noopener" href="${waMsg(mp)}">${waIcon} Enquire on WhatsApp</a></div>
        </div>
      </div>`;
    modal.classList.add('open'); document.body.style.overflow = 'hidden';
    $('.mclose', modal).focus();
    const show = n => { mi = (n + mp.imgs.length) % mp.imgs.length; $('.mimg', modal).src = img(mp.imgs[mi]); $$('.mthumbs button', modal).forEach((b, k) => b.classList.toggle('on', k === mi)); };
    modal.onclick = e => {
      if (e.target.closest('.mclose') || e.target.classList.contains('modal-bg')) return closeModal();
      if (e.target.closest('.prev')) show(mi - 1);
      if (e.target.closest('.next')) show(mi + 1);
      const t = e.target.closest('.mthumbs button'); if (t) show(+t.dataset.n);
    };
  }
  function closeModal() { modal.classList.remove('open'); modal.innerHTML = ''; document.body.style.overflow = ''; }
  addEventListener('keydown', e => {
    if (!modal?.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') $('.next', modal)?.click();
    if (e.key === 'ArrowLeft') $('.prev', modal)?.click();
  });
  document.addEventListener('click', e => { const b = e.target.closest('[data-id]'); if (b && !b.closest('#modal')) openModal(b.dataset.id); });

  /* popular models on home */
  const pop = $('#popular');
  if (pop) { pop.innerHTML = ['m-3x3', 'l-5b', 'h-5x6'].map(id => card(PRODUCTS.find(p => p.id === id))).join(''); watch(pop); }

  /* catalog */
  const cat = $('#catalog');
  if (cat) {
    const chips = $('#chips'), sortSel = $('#sort'), cnt = $('#count');
    let f = (location.hash || '#all').slice(1);
    if (!CATS.some(c => c[0] === f)) f = 'all';
    chips.innerHTML = CATS.map(([k, l]) => `<button class="chip${k === f ? ' on' : ''}" data-f="${k}">${l}</button>`).join('');
    const render = () => {
      const list = PRODUCTS.filter(p => f === 'all' || p.cat.includes(f));
      if (sortSel.value === 'low') list.sort((a, b) => a.price - b.price);
      if (sortSel.value === 'high') list.sort((a, b) => b.price - a.price);
      cnt.textContent = `Showing ${list.length} cage${list.length === 1 ? '' : 's'}`;
      cat.innerHTML = list.length ? list.map(card).join('') : '<p class="empty">No cages here yet. Message us and we will build one.</p>';
      watch(cat);
    };
    chips.addEventListener('click', e => {
      const b = e.target.closest('.chip'); if (!b) return;
      f = b.dataset.f; try { history.replaceState(null, '', '#' + f); } catch (_) {}
      $$('.chip', chips).forEach(c => c.classList.toggle('on', c === b)); render();
    });
    sortSel.addEventListener('change', render);
    addEventListener('hashchange', () => { const h = location.hash.slice(1); if (CATS.some(c => c[0] === h)) { f = h; $$('.chip', chips).forEach(c => c.classList.toggle('on', c.dataset.f === f)); render(); } });
    render();
  }

  /* forms -> WhatsApp */
  $$('form[data-wa]').forEach(form => form.addEventListener('submit', e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    const lines = ['Hi Hi-Tech Craft,', form.dataset.wa === 'custom' ? 'I would like a custom dog cage.' : 'I have an enquiry.', ''];
    const label = { name: 'Name', phone: 'Phone', model: 'Model', breed: 'Dog breed', size: 'Size needed', roof: 'Roof', extras: 'Extras', city: 'Location', message: 'Message' };
    Object.keys(label).forEach(k => { if (d[k]) lines.push(`${label[k]}: ${d[k]}`); });
    window.open(wa(lines.join('\n')), '_blank', 'noopener');
  }));
  const ms = $('select[name=model]');
  if (ms) ms.insertAdjacentHTML('beforeend', PRODUCTS.map(p => `<option>${p.name} (${inr(p.price)})</option>`).join(''));
  $$('[data-year]').forEach(e => e.textContent = new Date().getFullYear());

  /* scroll progress bar */
  (function(){const bar=document.getElementById('progress');if(!bar)return;
    const f=()=>{const h=document.documentElement.scrollHeight-innerHeight;bar.style.width=(h>0?scrollY/h*100:0)+'%'};
    addEventListener('scroll',f,{passive:true});addEventListener('resize',f);f();})();
})();
