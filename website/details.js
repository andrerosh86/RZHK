const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
let modalTrigger = null;
let activeService = -1;
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const projectImage = (p, thumbnail = false) => `<img class="work-image" src="media/${escapeHTML(p.image)}-${thumbnail ? '640' : '1280'}.webp" srcset="media/${escapeHTML(p.image)}-640.webp 640w, media/${escapeHTML(p.image)}-1280.webp 1280w" sizes="${thumbnail ? '(max-width:600px) 90vw, 360px' : '(max-width:600px) 94vw, 650px'}" width="1536" height="1024" alt="${escapeHTML(p.alt)}" decoding="async" ${thumbnail ? 'loading="lazy"' : ''}>`;
function showModal() {
  if (!modal.classList.contains('open')) modalTrigger = document.activeElement;
  modal.inert = false;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.getElementById('stage').inert = true;
  document.querySelector('.modal').scrollTop = 0;
  document.getElementById('modalClose').focus({preventScroll:true});
  window.dispatchEvent(new Event('motionstatechange'));
}
function renderModal(markup) {
  modalContent.innerHTML = `<div class="detail-transition">${markup}</div>`;
  showModal();
}
function openModal(i) {
  activeService = i;
  const s = SERVICES[i], p = s.project;
  renderModal(`<header class="modal-header"><div class="eyebrow">SERVICE ${s.num} / 05</div><h2 id="mTitle">${escapeHTML(s.title).replace('\n',' ')}</h2></header>
    <div class="detail-grid"><figure>${projectImage(p)}<figcaption class="work-caption"><span class="work-label">${escapeHTML(p.type)}</span><h3>${escapeHTML(p.title)}</h3><p>${escapeHTML(p.description)}</p>${p.concept ? '<p class="concept-note">AI-generated concept · Illustrative example, not a client project.</p>' : ''}</figcaption></figure>
    <div class="detail-copy"><h3>THE APPROACH</h3><p>${escapeHTML(s.body)}</p><div class="tags">${s.tags.map(t=>`<span>${escapeHTML(t)}</span>`).join('')}</div><div class="rule"></div><h3>WHAT YOU RECEIVE</h3><p>${escapeHTML(s.deliverables)}</p><h3>FROM IDEA TO DELIVERY</h3><p class="process">${escapeHTML(s.process)}</p></div></div>
    <nav class="service-switcher" aria-label="Browse services"><button type="button" data-action="overview">← All services</button><button type="button" data-action="next">Next service <span aria-hidden="true">↗</span></button></nav>`);
}
function exploreServices() {
  activeService = -1;
  renderModal(`<header class="modal-header"><div class="eyebrow">EXPERTISE / 01—05</div><h2 id="mTitle">A considered approach.<br>A distinctive result.</h2><p style="margin-top:18px">Explore the services and the visual possibilities behind each one.</p></header><div class="overview-grid">${SERVICES.map((s,i)=>`<button class="overview-card" type="button" data-service="${i}">${projectImage(s.project,true)}<span class="eyebrow">${s.num} / 05</span><h3>${escapeHTML(s.title).replace('\n',' ')}</h3><p>${escapeHTML(s.short)}</p><span class="work-label">${s.project.concept ? 'AI concept preview · ' : ''}Explore service ↗</span></button>`).join('')}</div>`);
}
function closeModal() {
  if (!modal.classList.contains('open')) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  modal.inert = true;
  document.getElementById('stage').inert = false;
  modalTrigger?.focus({preventScroll:true});
  window.dispatchEvent(new Event('motionstatechange'));
}
modal.addEventListener('click', e => {
  if (e.target === modal || e.target.closest('#modalClose')) return closeModal();
  const service = e.target.closest('[data-service]');
  if (service) return openModal(Number(service.dataset.service));
  const action = e.target.closest('[data-action]')?.dataset.action;
  if (action === 'overview') exploreServices();
  if (action === 'next') openModal((activeService + 1) % SERVICES.length);
});
modal.addEventListener('keydown', e => {
  if (e.key === 'Escape') return closeModal();
  if (e.key !== 'Tab') return;
  const items = [...modal.querySelectorAll('button,a[href]')].filter(el=>el.getClientRects().length);
  const first = items[0], last = items.at(-1);
  if (e.shiftKey && document.activeElement === first) {e.preventDefault();last.focus();}
  else if (!e.shiftKey && document.activeElement === last) {e.preventDefault();first.focus();}
});
document.getElementById('aboutBtn').addEventListener('click', () => renderModal(`<header class="modal-header"><div class="eyebrow">INDEPENDENT VISUAL PRACTICE</div><h2 id="mTitle">Artistic instinct.<br>Technical precision.</h2></header><div class="about-copy"><p>I create cinematic visuals for architecture, automotive design and brands. My work brings together art direction and technical execution, with a focus on light, materials and composition.</p><p style="margin-top:18px">From a single image to a connected series, the aim is the same: a clear idea, a coherent visual language and an image that stays with you.</p><div class="tags"><span>ART DIRECTION</span><span>CG IMAGERY</span><span>MOTION</span></div></div>`));
for (const id of ['exploreBtn','servicesBtn','mobSvcBtn']) document.getElementById(id).addEventListener('click',exploreServices);
document.getElementById('services-strip').innerHTML = SERVICES.map((s,i)=>`<button class="svc" type="button" data-idx="${i}"><div class="num">${s.num} / 05</div><div class="title">${escapeHTML(s.title).replace('\n','<br>')}</div><div class="desc">${escapeHTML(s.short)}</div><div class="more">EXPLORE <span aria-hidden="true">↗</span></div></button>`).join('');
document.getElementById('services-strip').addEventListener('click',e=>{const b=e.target.closest('.svc');if(b)openModal(Number(b.dataset.idx));});
