let siteData;
const $ = (s) => document.querySelector(s);

async function loadData() {
  const response = await fetch('data.json');
  if (!response.ok) throw new Error('data.jsonの読み込みに失敗しました');
  return response.json();
}

function renderEvent(event) {
  $('#heroLead').textContent = event.lead;
  $('#heroDate').textContent = event.date;
  $('#heroTime').textContent = event.time;
  $('#eventDescription').textContent = event.description;
  $('#eventName').textContent = event.name;
  $('#infoDate').textContent = event.date;
  $('#infoTime').textContent = event.time;
  $('#venue').textContent = event.venue;
  $('#address').textContent = event.address;
  $('#price').textContent = event.price;
  document.title = event.name;
}

function creatorCard(item) {
  const badge = item.reservation ? '<span class="reserve-badge">予約コンテンツあり</span>' : '';
  return `<article class="creator-card reveal" data-category="${item.category}">
    <a class="creator-image" href="creator.html?id=${encodeURIComponent(item.id)}" style="--accent:${item.accent}">
      <img src="${item.image}" alt="${item.name}のダミー画像"><span>VIEW STORY ↗</span>
    </a>
    <div class="creator-meta"><p>${item.role}</p>${badge}</div>
    <h3>${item.name}</h3><p class="name-en">${item.nameEn}</p><p>${item.tagline}</p>
    <a class="card-link" href="creator.html?id=${encodeURIComponent(item.id)}">詳しく見る <span>→</span></a>
  </article>`;
}

function renderCreators(filter = 'all') {
  const list = filter === 'all' ? siteData.creators : siteData.creators.filter(x => x.category === filter);
  $('#creatorGrid').innerHTML = list.map(creatorCard).join('');
  observeReveal();
}

function bindFilters() {
  document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(x => x.classList.remove('active'));
    button.classList.add('active');
    renderCreators(button.dataset.filter);
  }));
}

function observeReveal() {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: .12 });
  document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => observer.observe(el));
}

loadData().then(data => { siteData = data; renderEvent(data.event); renderCreators(); bindFilters(); observeReveal(); }).catch(err => {
  $('#creatorGrid').innerHTML = `<p class="error">${err.message}。ローカルサーバー経由で開いてください。</p>`;
});
