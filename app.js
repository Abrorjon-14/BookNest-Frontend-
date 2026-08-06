const API = 'https://booknest-backend-ap67.onrender.com/api';
const MEDIA = 'https://booknest-backend-ap67.onrender.com';
const app = document.getElementById('app');
const authBtn = document.getElementById('authBtn');
const globalSearch = document.getElementById('globalSearch');

const icons = {
  book:'<svg viewBox="0 0 24 24"><path d="M5 5.5c2.8-.8 5-.3 7 1.5 2-1.8 4.2-2.3 7-1.5V19c-2.8-.8-5-.3-7 1.5-2-1.8-4.2-2.3-7-1.5V5.5Z"/><path d="M12 7v13.5"/></svg>',
  users:'<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  grid:'<svg viewBox="0 0 24 24"><rect x="4" y="4" width="6" height="6" rx="2"/><rect x="14" y="4" width="6" height="6" rx="2"/><rect x="4" y="14" width="6" height="6" rx="2"/><rect x="14" y="14" width="6" height="6" rx="2"/></svg>',
  star:'<svg viewBox="0 0 24 24"><path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5-4.7-4.6 6.5-.9L12 3Z"/></svg>',
  doc:'<svg viewBox="0 0 24 24"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z"/><path d="M14 3v6h6"/></svg>',
  heart:'<svg viewBox="0 0 24 24"><path d="M20 7.5c0 6-8 11-8 11s-8-5-8-11A4.5 4.5 0 0 1 12 5a4.5 4.5 0 0 1 8 2.5Z"/></svg>'
};

function token() { return localStorage.getItem('access'); }
function headers(json = true) {
  const h = {};
  if (json) h['Content-Type'] = 'application/json';
  if (token()) h['Authorization'] = `Bearer ${token()}`;
  return h;
}
async function api(path, options = {}) {
  const res = await fetch(API + path, { ...options, headers: { ...headers(options.json !== false), ...(options.headers || {}) } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw data;
  return data;
}
function imgUrl(url) { return url ? (url.startsWith('http') ? url : MEDIA + url) : ''; }
function message(text, type = 'success') { return `<div class="${type}">${text}</div>`; }
function setActive(page){ document.querySelectorAll('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.page === page)); }
function loginIcon(){return '<span class="ico"><svg viewBox="0 0 24 24"><path d="M15 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4"/><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/></svg></span>';}
function logoutIcon(){return '<span class="ico"><svg viewBox="0 0 24 24"><path d="M9 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/></svg></span>';}
function setAuthButton() { authBtn.innerHTML = token() ? `${logoutIcon()}Chiqish` : `${loginIcon()}Kirish`; authBtn.dataset.page = token() ? 'logout' : 'login'; }

const pages = {
  home() {
    setActive('home');
    app.innerHTML = `
      <section class="hero">
        <div class="hero-content">
          <div class="eyebrow">Xush kelibsiz</div>
          <h2>Yangi bilimlar sari</h2>
          <p>Sevimli kitoblaringizni o‘qing, o‘rganing va rivojlaning.</p>
          <div class="hero-actions">
            <button class="primary" onclick="pages.books()">${icons.book} Kitoblarni ko‘rish</button>
            <button class="secondary" onclick="pages.register()">${icons.doc} Ro‘yxatdan o‘tish</button>
          </div>
        </div>
        <div class="hero-visual"><div class="book-stack"><i></i><i></i><i></i><i></i></div><div class="plant"></div></div>
      </section>

      <section class="dashboard-grid">
        <div class="card">
<div class="section-head">
   <h2>Kichik odat — katta natija</h2>
</div>

<div class="motivation-grid">

   <div class="motivation-card">
      <div class="motivation-icon">📖</div>

      <h3>15 sahifa har kuni</h3>

      <p>1 oyda: 450 sahifa</p>

      <b>1 yilda: 5 475 sahifa</b>
   </div>

   <div class="motivation-card">
      <div class="motivation-icon">💡</div>

      <h3>15 ta yangilik har kuni</h3>

      <p>1 oyda: 450 ta yangilik</p>

      <b>1 yilda: 5 475 ta yangilik</b>
   </div>

</div>
        </div>
        <div class="card greeting-card">

        <div class="greeting-top">
            <div class="greeting-icon" id="greetingIcon">☀️</div>

            <div class="greeting-text">
            <h2 id="greetingText">Xayirli kun!</h2>
            </div>
        </div>

        <div class="date-time-box">

            <div class="date-box">
            <div class="date-icon">📅</div>

            <div>
                <h3 id="currentDate">26 May 2026</h3>
                <p id="currentDay">Dushanba</p>
            </div>
            </div>

            <div class="time-box">
            <div class="date-icon">🕒</div>

            <div>
                <h3 id="currentTime">14:37:25</h3>
                <p>Hozirgi vaqt</p>
            </div>
            </div>

        </div>

</div>
      </section>`;
  },
  async books(q = '') {
    setActive('books');
    app.innerHTML = '<div class="card">Kitoblar yuklanmoqda...</div>';
    try{
      const [books, genres] = await Promise.all([api(`/books/?q=${encodeURIComponent(q)}`), api('/genres/')]);
      app.innerHTML = `
        <div class="section-head"><div><h2>Barcha kitoblar</h2></div></div>
        <div class="filters">
          <input id="q" placeholder="Kitob yoki muallif qidirish..." value="${q}">
          <select id="genre"><option value="">Barcha janrlar</option>${genres.map(g => `<option value="${g.value}">${g.label}</option>`).join('')}</select>
          <button class="primary" onclick="filterBooks()">Qidirish</button>
        </div>
        <div id="booksGrid" class="grid"></div>`;
      renderBooks(books);
    } catch(e){
  console.log(e);

  app.innerHTML = `
    <div class="card error">
      <h2>Xatolik</h2>
      <p>${JSON.stringify(e)}</p>
    </div>
  `;
}
  },
  async detail(id) {
    setActive('books');
    app.innerHTML = '<div class="card">Kitob ma’lumotlari yuklanmoqda...</div>';
    const data = await api(`/books/${id}/`);
    const b = data.book;
    app.innerHTML = `
      <section class="card">
        <div class="row">
          <div class="book-cover" style="width:220px;height:310px;flex-shrink:0">${b.cover_image ? `<img src="${imgUrl(b.cover_image)}">` : 'Book'}</div>
          <div style="flex:1;min-width:260px">
            <h2>${b.title}</h2>
            <p><b>Muallif:</b> ${b.author}</p><p><b>Janr:</b> ${b.genre_display}</p><p><b>Rating:</b> ★ ${b.avg_rating}</p>
            <p>${b.description || 'Tavsif yo‘q.'}</p>
            <div class="row">${b.pdf_file ? `<a class="btn primary" target="_blank" href="${imgUrl(b.pdf_file)}">PDF ochish</a>` : ''}<button class="secondary" onclick="toggleWishlist(${b.id})">Sevimliga saqlash</button></div>
          </div>
        </div>
      </section>
      <section class="card"><h3>Progress saqlash</h3><div class="row"><input id="page" type="number" min="1" placeholder="Hozirgi sahifa"><button class="primary" onclick="saveProgress(${b.id})">Saqlash</button></div><div id="progressMsg"></div></section>
      <section class="card"><h3>Sharh yozish</h3><select id="rating"><option value="5">5 ★</option><option value="4">4 ★</option><option value="3">3 ★</option><option value="2">2 ★</option><option value="1">1 ★</option></select><br><br><textarea id="comment" rows="4" placeholder="Fikringiz..."></textarea><br><br><button class="primary" onclick="addReview(${b.id})">Sharh yuborish</button></section>
      <section class="card"><h3>Sharhlar</h3><div id="reviews">${renderReviews(data.reviews)}</div></section>`;
  },
  login() {
    setActive('login');
    app.innerHTML = `<section class="form-card"><h2>Kirish</h2><div id="loginMsg"></div><label>Username</label><input id="username"><label>Password</label><input id="password" type="password"><br><br><button class="primary" onclick="login()">Kirish</button> <button class="secondary" onclick="pages.register()">Ro‘yxatdan o‘tish</button></section>`;
  },
  register() {
    setActive('register');
    app.innerHTML = `<section class="form-card"><h2>Ro‘yxatdan o‘tish</h2><div id="regMsg"></div><label>Username</label><input id="rusername"><label>Email</label><input id="remail"><label>Password</label><input id="rpassword" type="password"><label>Password qayta</label><input id="rpassword2" type="password"><br><br><button class="primary" onclick="register()">Account yaratish</button></section>`;
  },
  async reading() {
    setActive('reading');
    if (!token()) return pages.login();
    const data = await api('/reading/');
    app.innerHTML = `<div class="section-head"><div><h2>Mening o‘qishim</h2></div></div><section class="card"><h3>Streak: ${data.streak.current_streak} kun</h3></section><h3>Progress</h3><div class="grid">${data.progress.map(p => bookCard(p.book, `Sahifa: ${p.current_page}, ${p.percent_complete}%<div class='progress-line'><span style='width:${p.percent_complete}%'></span></div>`)).join('') || '<div class="card">Hali progress yo‘q.</div>'}</div><h3 style="margin-top:28px">Wishlist</h3><div class="grid">${data.wishlist.map(w => bookCard(w.book, 'Wishlist')).join('') || '<div class="card">Wishlist bo‘sh.</div>'}</div>`;
  },
  async profile() {
    setActive('profile');
    if (!token()) return pages.login();
    const s = await api('/profile/stats/');
    app.innerHTML = `<div class="section-head"><div><h2>${s.user.username} profili</h2><p>${s.user.email || 'Email kiritilmagan'}</p></div></div><section class="stats-grid"><div class="stat"><div class="stat-icon">${icons.book}</div><div><h3>${s.books_started}</h3><p>Boshlangan kitoblar</p></div></div><div class="stat"><div class="stat-icon">${icons.star}</div><div><h3>${s.books_finished}</h3><p>Tugatilgan kitoblar</p></div></div><div class="stat"><div class="stat-icon">${icons.heart}</div><div><h3>${s.wishlist_count}</h3><p>Wishlist</p></div></div><div class="stat"><div class="stat-icon">${icons.doc}</div><div><h3>${s.reviews_count}</h3><p>Sharhlar</p></div></div><div class="stat"><div class="stat-icon">${icons.doc}</div><div><h3>${s.total_pages_read}</h3><p>O‘qilgan sahifalar</p></div></div><div class="stat"><div class="stat-icon">${icons.star}</div><div><h3>${s.current_streak}</h3><p>Hozirgi streak</p></div></div></section>`;
  },
  logout() { localStorage.clear(); setAuthButton(); pages.home(); }
};

function bookCard(b, extra = '') {
  return `<div class="book-card"><div class="book-cover">${b.cover_image ? `<img src="${imgUrl(b.cover_image)}">` : 'Book'}</div><h3>${b.title}</h3><p class="meta">${b.author} • ${b.genre_display || b.genre}</p><p>${extra}</p><button class="primary" onclick="pages.detail(${b.id})">Batafsil</button></div>`;
}
function renderBooks(books) { document.getElementById('booksGrid').innerHTML = books.map(b => bookCard(b)).join('') || '<div class="card">Kitob topilmadi.</div>'; }
async function filterBooks() { const q = document.getElementById('q').value; const genre = document.getElementById('genre').value; renderBooks(await api(`/books/?q=${encodeURIComponent(q)}&genre=${encodeURIComponent(genre)}`)); }
function renderReviews(reviews) { return reviews.map(r => `<div class="review"><b>${r.username}</b> — ${r.rating} ★<p>${r.comment}</p><button class="secondary" onclick="likeReview(${r.id})">Like ${r.like_count}</button></div>`).join('') || '<p>Hali sharh yo‘q.</p>'; }
async function login() { try { const d = await api('/auth/login/', { method:'POST', body: JSON.stringify({ username: username.value, password: password.value }) }); localStorage.setItem('access', d.access); localStorage.setItem('refresh', d.refresh); setAuthButton(); pages.home(); } catch(e) { loginMsg.innerHTML = message('Login yoki parol xato.', 'error'); } }
async function register() { try { await api('/auth/register/', { method:'POST', body: JSON.stringify({ username:rusername.value, email:remail.value, password:rpassword.value, password2:rpassword2.value }) }); regMsg.innerHTML = message('Account yaratildi. Endi login qiling.'); } catch(e) { regMsg.innerHTML = message(JSON.stringify(e), 'error'); } }
async function saveProgress(id) { try { const d = await api(`/reading/progress/${id}/`, { method:'POST', body: JSON.stringify({ current_page: page.value }) }); progressMsg.innerHTML = message(`Saqlandi: ${d.current_page}-sahifa, ${d.percent_complete}%`); } catch(e) { progressMsg.innerHTML = message('Avval login qiling.', 'error'); } }
async function toggleWishlist(id) { try { const d = await api(`/reading/wishlist/${id}/toggle/`, { method:'POST', body: '{}' }); alert(d.message); } catch(e) { alert('Avval login qiling.'); } }
async function addReview(id) { try { await api(`/reviews/book/${id}/add/`, { method:'POST', body: JSON.stringify({ rating: rating.value, comment: comment.value }) }); pages.detail(id); } catch(e) { alert('Sharh yuborilmadi. Avval login qiling yoki avval yozilgan sharh bor.'); } }
async function likeReview(id) { try { await api(`/reviews/${id}/like/`, { method:'POST', body: '{}' }); alert('Like yangilandi'); } catch(e) { alert('Avval login qiling.'); } }

document.querySelectorAll('[data-page]').forEach(btn => btn.addEventListener('click', () => pages[btn.dataset.page]()));
globalSearch.addEventListener('keydown', e => { if (e.key === 'Enter') pages.books(globalSearch.value); });
setAuthButton();
pages.home();
function updateGreetingDateTime() {
  const now = new Date();
  const hour = now.getHours();

  let greeting = "";
  let icon = "";

  if (hour >= 5 && hour < 11) {
    greeting = "Xayirli tong!";
    icon = "🌅";
  } else if (hour >= 11 && hour < 17) {
    greeting = "Xayirli kun!";
    icon = "☀️";
  } else if (hour >= 17 && hour < 21) {
    greeting = "Xayirli kech!";
    icon = "🌙";
  } else {
    greeting = "Xayirli tun!";
    icon = "🌌";
  }

  const greetingText = document.getElementById("greetingText");
  const greetingIcon = document.getElementById("greetingIcon");

  if (greetingText) greetingText.textContent = greeting;
  if (greetingIcon) greetingIcon.textContent = icon;

  const days = [
    "Yakshanba",
    "Dushanba",
    "Seshanba",
    "Chorshanba",
    "Payshanba",
    "Juma",
    "Shanba"
  ];

  const months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr"
  ];

  const currentDate = document.getElementById("currentDate");
  const currentDay = document.getElementById("currentDay");
  const currentTime = document.getElementById("currentTime");

  if (currentDate) {
    currentDate.textContent =
      now.getDate() + " " + months[now.getMonth()] + " " + now.getFullYear();
  }

  if (currentDay) {
    currentDay.textContent = days[now.getDay()];
  }

  if (currentTime) {
    currentTime.textContent = now.toLocaleTimeString("uz-UZ");
  }
}

setInterval(updateGreetingDateTime, 1000);
updateGreetingDateTime();

(function () {
  const toggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (toggle) toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
  const saved = localStorage.getItem('theme') || 'light';
  applyTheme(saved);
  if (toggle) toggle.addEventListener('click', () => {
    applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
})();

(function () {
  const btn = document.getElementById('hamburgerBtn');
  const overlay = document.getElementById('sidebarOverlay');
  const sidebar = document.getElementById('sidebar');
  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (btn) btn.addEventListener('click', openSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 1120) closeSidebar();
    });
  });
})();