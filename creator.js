async function init() {
  const root = document.querySelector('#detailRoot');
  try {
    const response = await fetch('data.json');
    if (!response.ok) throw new Error('data.jsonを読み込めませんでした');
    const data = await response.json();
    const id = new URLSearchParams(location.search).get('id');
    const item = data.creators.find(x => x.id === id);
    if (!item) throw new Error('指定された出店者が見つかりません');
    document.title = `${item.name}｜${data.event.name}`;
    root.innerHTML = `<section class="detail-hero" style="--accent:${item.accent}"><div class="detail-copy"><p class="eyebrow">${item.category === 'food' ? 'FOOD' : 'CREATOR'} STORY</p><p class="detail-role">${item.role}</p><h1>${item.name}</h1><p class="name-en">${item.nameEn}</p><h2>${item.tagline}</h2></div><div class="detail-image"><img src="${item.image}" alt="${item.name}のダミー画像"></div></section>
    <section class="detail-section"><div class="detail-index">01 / STORY</div><div><p class="detail-lead">${item.summary}</p><p>${item.story}</p></div></section>
    <section class="detail-section activity"><div class="detail-index">02 / AT EVENT</div><div><h2>当日の出店内容</h2><h3>${item.activity}</h3>${item.reservation ? '<span class="reserve-badge">予約コンテンツあり</span>' : ''}<a class="button" href="#">このコンテンツを予約する</a></div></section>
    <section class="detail-section"><div class="detail-index">03 / CONNECT</div><div><h2>この出店者に<br>会いにいってみませんか？</h2><div class="detail-actions"><a class="button" href="index.html#registration">来場登録（無料）</a><a class="text-link" href="${item.socialUrl}">${item.socialLabel} ↗</a></div></div></section>`;
  } catch (error) { root.innerHTML = `<section class="detail-section"><div></div><div><h1>表示できませんでした</h1><p>${error.message}</p><a class="button" href="index.html">トップへ戻る</a></div></section>`; }
}
init();
