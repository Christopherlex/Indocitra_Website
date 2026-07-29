/* =============================================
   INDO CITRA JAYA SENTOSA — content-data.js
   Powers the News and Catalog pages.

   HOW IT WORKS
   ------------
   1. Set NEWS_CSV_URL / CATALOG_CSV_URL below to your
      published Google Sheet CSV links (see the guide).
   2. Until those are set, polished sample content is
      shown automatically so the pages never look empty.
   3. Once a URL is set and loads successfully, real
      content from the sheet replaces the sample content.
   ============================================= */

/* ─────────────────────────────────────────────
   CONFIG — paste your Google Sheet "publish to
   web" CSV links here once ready.
───────────────────────────────────────────── */
var CONTENT_CONFIG = {
  newsCsvUrl:    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTBYw1MD-mSFZvOHntRdJZS_xJ8BVxQdVW5GiZnRWi9IBc-vHJcT1FyQa2NYR-jf5Qsilz0dV9tMBl_/pub?gid=0&single=true&output=csv',
  catalogCsvUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQsriBx1jrcrym5rvJxgXYZqPYKkUKVC_XyrmnsEMqXTUDCCY9p8Hqn4pbyTK7cltV6SCrgbjC3ZIog/pub?gid=0&single=true&output=csv',
  newsImageBase:    'images/news/',
  catalogImageBase: 'images/catalog/'
};

/* Inline SVG placeholder shown if an image is missing/broken,
   so cards never show an ugly broken-image icon. */
var PLACEHOLDER_IMG = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260">' +
  '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
  '<stop offset="0%" stop-color="%230a458b"/><stop offset="100%" stop-color="%231e5a9e"/>' +
  '</linearGradient></defs>' +
  '<rect width="400" height="260" fill="url(%23g)"/>' +
  '<text x="200" y="140" font-family="Arial" font-size="20" fill="rgba(255,255,255,0.55)" text-anchor="middle">Indo Citra Jaya Sentosa</text>' +
  '</svg>'
);

/* ─────────────────────────────────────────────
   SAMPLE / FALLBACK CONTENT
   Shown until a real Google Sheet is connected.
───────────────────────────────────────────── */
var SAMPLE_NEWS = [
  {
    title: { en: 'Completed: Chiller Overhaul for PT Tirta Sukses Perkasa', id: 'Selesai: Overhaul Chiller untuk PT Tirta Sukses Perkasa' },
    date: '2026-06-15',
    excerpt: { en: 'Our team successfully completed a full overhaul of 3 chiller units, restoring cooling capacity and improving energy efficiency for the client\'s production facility.', id: 'Tim kami berhasil menyelesaikan overhaul penuh terhadap 3 unit chiller, memulihkan kapasitas pendinginan dan meningkatkan efisiensi energi bagi fasilitas produksi klien.' },
    caption: { en: 'Our HVAC team recently completed a comprehensive overhaul project for PT Tirta Sukses Perkasa, covering three industrial chiller units critical to their production process.\n\nThe project included full mechanical inspection, refrigerant system servicing, compressor evaluation, and control system calibration. Following the overhaul, the client reported a noticeable improvement in cooling consistency and a reduction in energy consumption.\n\nThis project reflects our ongoing commitment to helping clients maximize the lifespan and efficiency of their critical industrial equipment.', id: 'Tim HVAC kami baru saja menyelesaikan proyek overhaul menyeluruh untuk PT Tirta Sukses Perkasa, mencakup tiga unit chiller industri yang penting bagi proses produksi mereka.\n\nProyek ini meliputi inspeksi mekanis penuh, servis sistem refrigeran, evaluasi kompresor, dan kalibrasi sistem kontrol. Setelah overhaul selesai, klien melaporkan peningkatan signifikan dalam konsistensi pendinginan serta penurunan konsumsi energi.\n\nProyek ini mencerminkan komitmen berkelanjutan kami untuk membantu klien memaksimalkan umur pakai dan efisiensi peralatan industri penting mereka.' },
    content: ''
  },
  {
    title: { en: 'Understanding SIL-4 Safety Systems in Industrial Automation', id: 'Memahami Sistem Keselamatan SIL-4 dalam Otomasi Industri' },
    date: '2026-05-20',
    excerpt: { en: 'A closer look at SIL-4 compliant safety installations and why they matter for high-risk industrial environments.', id: 'Tinjauan lebih dekat mengenai instalasi keselamatan yang sesuai SIL-4 dan mengapa penting bagi lingkungan industri berisiko tinggi.' },
    caption: { en: 'Safety Integrity Level 4 (SIL-4) represents the highest tier of functional safety classification for industrial control systems. Facilities handling high-risk processes rely on SIL-4 rated components, such as safety light curtains and non-contact sensors, to protect workers from serious injury.\n\nOur automation team has completed several SIL-4 compliant safety installations for clients including Autorun Inc (Korea), covering conveyor systems and packaging lines. Each installation is tested rigorously before handover to ensure full compliance with international safety standards.\n\nIf your facility handles high-risk machinery, a proper safety audit is the first step toward SIL-4 compliance.', id: 'Safety Integrity Level 4 (SIL-4) merupakan tingkat klasifikasi keselamatan fungsional tertinggi untuk sistem kontrol industri. Fasilitas yang menangani proses berisiko tinggi mengandalkan komponen bersertifikat SIL-4, seperti safety light curtain dan sensor non-kontak, untuk melindungi pekerja dari cedera serius.\n\nTim otomasi kami telah menyelesaikan beberapa instalasi keselamatan yang sesuai SIL-4 untuk klien termasuk Autorun Inc (Korea), mencakup sistem konveyor dan lini pengemasan. Setiap instalasi diuji secara ketat sebelum serah terima untuk memastikan kepatuhan penuh terhadap standar keselamatan internasional.\n\nJika fasilitas Anda menangani mesin berisiko tinggi, audit keselamatan yang tepat adalah langkah pertama menuju kepatuhan SIL-4.' },
    content: ''
  },
  {
    title: { en: 'A Decade of Industrial Solutions: Reflecting on 2014–2026', id: 'Satu Dekade Solusi Industri: Refleksi 2014–2026' },
    date: '2026-04-10',
    excerpt: { en: 'From racking systems in 2014 to a full-service industrial solutions provider today — a look back at our journey.', id: 'Dari sistem racking pada 2014 hingga menjadi penyedia solusi industri lengkap hari ini — melihat kembali perjalanan kami.' },
    caption: { en: 'PT Indo Citra Jaya Sentosa was founded in 2014 with a simple focus: reliable racking systems for warehouses across East Java. Over the past decade, that focus has grown into a full-service industrial solutions provider.\n\nIn 2020, we expanded into industrial automation. In 2024, we launched a dedicated custom machine manufacturing segment. Today, we serve over 50 clients across manufacturing, food and beverage, and energy sectors, with international partnerships extending to Korea.\n\nNone of this would be possible without the trust our clients have placed in us. As we look ahead, we remain committed to the same principle that got us here: built on trust, driven by reliability.', id: 'PT Indo Citra Jaya Sentosa didirikan pada 2014 dengan fokus sederhana: sistem racking yang andal untuk gudang-gudang di Jawa Timur. Selama satu dekade terakhir, fokus tersebut berkembang menjadi penyedia solusi industri yang lengkap.\n\nPada 2020, kami memperluas ke segmen otomasi industri. Pada 2024, kami meluncurkan segmen manufaktur mesin kustom khusus. Hari ini, kami melayani lebih dari 50 klien di sektor manufaktur, makanan dan minuman, serta energi, dengan kemitraan internasional yang meluas hingga Korea.\n\nSemua ini tidak akan mungkin terjadi tanpa kepercayaan yang klien kami berikan. Ke depannya, kami tetap berkomitmen pada prinsip yang sama yang membawa kami sampai di sini: dibangun atas kepercayaan, digerakkan oleh keandalan.' },
    content: ''
  }
];

var SAMPLE_CATALOG = [
  {
    name: { en: 'Heavy-Duty Pallet Racking System', id: 'Sistem Racking Palet Tugas Berat' },
    category: { en: 'Racking', id: 'Racking' },
    image: '',
    stock: 'In Stock',
    shortDesc: { en: 'Industrial-grade selective pallet racking for high-density warehouse storage.', id: 'Racking palet selektif kelas industri untuk penyimpanan gudang dengan kepadatan tinggi.' },
    fullDesc: { en: 'Our heavy-duty pallet racking systems are engineered for demanding warehouse environments, supporting loads up to several tonnes per level. Configurations are fully customizable to your warehouse dimensions and workflow.', id: 'Sistem racking palet tugas berat kami dirancang untuk lingkungan gudang yang menuntut, mendukung beban hingga beberapa ton per tingkat. Konfigurasi dapat disesuaikan sepenuhnya dengan dimensi gudang dan alur kerja Anda.' },
    specs: [
      { en: 'Load capacity: up to 3,000 kg per level', id: 'Kapasitas beban: hingga 3.000 kg per tingkat' },
      { en: 'Customizable height and bay width', id: 'Tinggi dan lebar bay dapat disesuaikan' },
      { en: 'Powder-coated steel construction', id: 'Konstruksi baja dengan lapisan bubuk' },
      { en: 'Includes safety inspection certificate', id: 'Termasuk sertifikat inspeksi keselamatan' }
    ]
  },
  {
    name: { en: 'Industrial PLC Control Panel', id: 'Panel Kontrol PLC Industri' },
    category: { en: 'Automation', id: 'Otomasi' },
    image: '',
    stock: 'Made to Order',
    shortDesc: { en: 'Custom-built control panels for automation and process control applications.', id: 'Panel kontrol yang dibangun khusus untuk aplikasi otomasi dan kendali proses.' },
    fullDesc: { en: 'We design and fabricate PLC control panels tailored to your specific automation requirements, compatible with Siemens, Omron, and Schneider Electric platforms. Every panel is factory tested before delivery.', id: 'Kami merancang dan memfabrikasi panel kontrol PLC yang disesuaikan dengan kebutuhan otomasi spesifik Anda, kompatibel dengan platform Siemens, Omron, dan Schneider Electric. Setiap panel diuji di pabrik sebelum pengiriman.' },
    specs: [
      { en: 'Compatible with major PLC brands', id: 'Kompatibel dengan merek PLC utama' },
      { en: 'IP54-rated enclosure standard', id: 'Enklosur standar dengan rating IP54' },
      { en: 'Custom HMI integration available', id: 'Integrasi HMI kustom tersedia' },
      { en: 'Factory Acceptance Testing included', id: 'Termasuk Factory Acceptance Testing' }
    ]
  },
  {
    name: { en: 'Electric Forklift (3-Ton Capacity)', id: 'Forklift Listrik (Kapasitas 3 Ton)' },
    category: { en: 'Forklift', id: 'Forklift' },
    image: '',
    stock: 'In Stock',
    shortDesc: { en: 'Reliable electric forklift for indoor and outdoor material handling.', id: 'Forklift listrik yang andal untuk material handling dalam dan luar ruangan.' },
    fullDesc: { en: 'A dependable 3-tonne capacity electric forklift, ideal for warehouse and light industrial use. Includes standard warranty and access to our servicing and maintenance programs.', id: 'Forklift listrik dengan kapasitas 3 ton yang dapat diandalkan, ideal untuk penggunaan gudang dan industri ringan. Termasuk garansi standar dan akses ke program servis dan pemeliharaan kami.' },
    specs: [
      { en: 'Load capacity: 3,000 kg', id: 'Kapasitas beban: 3.000 kg' },
      { en: 'Electric — zero emissions indoors', id: 'Listrik — nol emisi di dalam ruangan' },
      { en: 'Includes operator training session', id: 'Termasuk sesi pelatihan operator' },
      { en: 'Maintenance contract available', id: 'Kontrak pemeliharaan tersedia' }
    ]
  },
  {
    name: { en: 'Industrial Chiller Unit', id: 'Unit Chiller Industri' },
    category: { en: 'HVAC', id: 'HVAC' },
    image: '',
    stock: 'Limited Stock',
    shortDesc: { en: 'High-capacity chiller units for industrial cooling applications.', id: 'Unit chiller berkapasitas tinggi untuk aplikasi pendinginan industri.' },
    fullDesc: { en: 'Our industrial chiller units are suited for manufacturing plants requiring consistent, high-capacity cooling. Installation, integration, and ongoing maintenance services are available.', id: 'Unit chiller industri kami cocok untuk pabrik manufaktur yang membutuhkan pendinginan konsisten berkapasitas tinggi. Layanan pemasangan, integrasi, dan pemeliharaan berkelanjutan tersedia.' },
    specs: [
      { en: 'Multiple capacity options available', id: 'Tersedia beberapa pilihan kapasitas' },
      { en: 'Energy-efficient compressor technology', id: 'Teknologi kompresor hemat energi' },
      { en: 'Full installation and integration service', id: 'Layanan pemasangan dan integrasi penuh' },
      { en: 'Preventive maintenance plans available', id: 'Tersedia paket pemeliharaan preventif' }
    ]
  }
];

/* ─────────────────────────────────────────────
   CSV PARSER (handles quoted fields with commas/newlines)
───────────────────────────────────────────── */
function parseCSV(text) {
  var rows = [];
  var row = [];
  var field = '';
  var inQuotes = false;

  for (var i = 0; i < text.length; i++) {
    var c = text[i];
    var next = text[i + 1];

    if (inQuotes) {
      if (c === '"' && next === '"') { field += '"'; i++; }
      else if (c === '"') { inQuotes = false; }
      else { field += c; }
    } else {
      if (c === '"') { inQuotes = true; }
      else if (c === ',') { row.push(field); field = ''; }
      else if (c === '\r') { /* skip */ }
      else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
      else { field += c; }
    }
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }

  if (rows.length < 2) return [];
  var headers = rows[0].map(function(h) { return h.trim(); });
  return rows.slice(1).filter(function(r) { return r.some(function(v){return v && v.trim();}); }).map(function(r) {
    var obj = {};
    headers.forEach(function(h, idx) { obj[h] = (r[idx] || '').trim(); });
    return obj;
  });
}

/* Normalizes a header name for forgiving lookups:
   "Short Desc", "ShortDesc", "short_desc" all match the same field. */
function normKey(s) {
  return String(s).replace(/[^a-z0-9]/gi, '').toLowerCase();
}

/* Looks up a value from a CSV row object, trying each candidate name
   (in order) with normalized matching, so header naming doesn't need
   to be exact. Returns '' if none of the candidates are found. */
function getField(rowObj, candidates) {
  var normMap = {};
  Object.keys(rowObj).forEach(function(k) { normMap[normKey(k)] = rowObj[k]; });
  for (var i = 0; i < candidates.length; i++) {
    var val = normMap[normKey(candidates[i])];
    if (val !== undefined && val !== '') return val;
  }
  return '';
}

/* Convert raw CSV rows into the same shape as SAMPLE_NEWS/SAMPLE_CATALOG.
   Expected sheet columns (English text works for both languages if you
   don't need separate ID translations — EN/ID columns are optional). */
function csvRowsToNews(rows) {
  return rows.map(function(r) {
    return {
      title: { en: getField(r,['Title_EN','Title']), id: getField(r,['Title_ID','Title']) },
      date: getField(r,['Date']),
      excerpt: { en: getField(r,['Excerpt_EN','Excerpt']), id: getField(r,['Excerpt_ID','Excerpt']) },
      caption: { en: getField(r,['Caption_EN','Caption']), id: getField(r,['Caption_ID','Caption']) },
      content: getField(r,['Content'])
    };
  });
}
function csvRowsToCatalog(rows) {
  return rows.map(function(r) {
    var specsRaw = getField(r,['Specs_EN','Specs']);
    var specsList = specsRaw.split('|').map(function(s){return s.trim();}).filter(Boolean);
    var specsRawId = getField(r,['Specs_ID']) || specsRaw;
    var specsListId = specsRawId.split('|').map(function(s){return s.trim();}).filter(Boolean);
    var specs = specsList.map(function(s, idx) {
      return { en: s, id: specsListId[idx] || s };
    });
    return {
      name: { en: getField(r,['Name_EN','Name']), id: getField(r,['Name_ID','Name']) },
      category: { en: getField(r,['Category_EN','Category']), id: getField(r,['Category_ID','Category']) },
      image: getField(r,['Image']),
      shortDesc: { en: getField(r,['ShortDesc_EN','ShortDesc','Short Desc']), id: getField(r,['ShortDesc_ID','Short Desc']) },
      fullDesc: { en: getField(r,['FullDesc_EN','FullDesc','Full Desc']), id: getField(r,['FullDesc_ID','Full Desc']) },
      stock: getField(r,['Stock']),
      specs: specs
    };
  });
}

function resolveImage(path, base) {
  if (!path) return PLACEHOLDER_IMG;
  if (path.indexOf('http') === 0) return path;
  return base + path;
}
function pickLang(field) {
  var l = (typeof lang !== 'undefined') ? lang : 'en';
  return (l === 'id' ? field.id : field.en) || field.en || '';
}
function youtubeEmbed(url) {
  if (!url) return '';
  var id = extractYouTubeId(url);
  if (!id) return '';
  return 'https://www.youtube.com/embed/' + id;
}
function extractYouTubeId(url) {
  if (!url) return '';
  var m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return m ? m[1] : '';
}
/* Detects whether the Content field is a YouTube link or an image link,
   so the sheet only needs ONE column for either media type. */
function detectMedia(url) {
  if (!url) return { type: 'none' };
  var ytId = extractYouTubeId(url);
  if (ytId) return { type: 'video', id: ytId, embedUrl: 'https://www.youtube.com/embed/' + ytId };
  return { type: 'image', url: url };
}
/* A thumbnail image for card previews — uses the YouTube thumbnail
   automatically if Content is a video, or the image itself otherwise. */
function mediaThumbnail(url) {
  var media = detectMedia(url);
  if (media.type === 'video') return 'https://img.youtube.com/vi/' + media.id + '/hqdefault.jpg';
  if (media.type === 'image') return media.url;
  return PLACEHOLDER_IMG;
}
function fmtDate(dateStr) {
  if (!dateStr) return '';
  var d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  var opts = { year: 'numeric', month: 'long', day: 'numeric' };
  var l = (typeof lang !== 'undefined') ? lang : 'en';
  return d.toLocaleDateString(l === 'id' ? 'id-ID' : 'en-US', opts);
}

/* Builds a colored stock badge from free-text stock values.
   Detects "out of stock" style wording (EN/ID) and colors red;
   anything else defaults to a positive/neutral badge. */
function stockBadge(stockText) {
  if (!stockText) return '';
  var t = stockText.toLowerCase();
  var cls = 'stock-neutral';
  var icon = 'fa-circle-info';
  if (t.indexOf('out') >= 0 || t.indexOf('habis') >= 0 || t === '0') {
    cls = 'stock-out'; icon = 'fa-circle-xmark';
  } else if (t.indexOf('in stock') >= 0 || t.indexOf('tersedia') >= 0 || t.indexOf('ready') >= 0) {
    cls = 'stock-in'; icon = 'fa-circle-check';
  }
  return '<span class="stock-badge ' + cls + '"><i class="fa-solid ' + icon + '"></i>' + stockText + '</span>';
}

/* ─────────────────────────────────────────────
   NEWS PAGE
───────────────────────────────────────────── */
var newsData = null;

function renderNewsGrid() {
  var grid = document.getElementById('newsGrid');
  if (!grid || !newsData) return;

  grid.className = 'news-timeline';
  if (newsData.length === 0) {
    grid.innerHTML = '<div class="content-empty-state"><i class="fa-regular fa-newspaper"></i>' +
      (pickLang({en:'No news posts yet. Check back soon.', id:'Belum ada berita. Silakan cek kembali nanti.'})) + '</div>';
    return;
  }

  grid.innerHTML = newsData.map(function(item, idx) {
    var media = detectMedia(item.content);
    var thumb = mediaThumbnail(item.content);
    var isVideo = media.type === 'video';
    var typeLabel = isVideo
      ? '<span class="news-card-type"><i class="fa-solid fa-play" style="font-size:0.6rem;"></i> Video</span>'
      : '';
    return (
      '<div class="news-item" data-idx="' + idx + '">' +
        '<div class="news-item-dot"></div>' +
        '<div class="news-card">' +
          '<div class="news-card-thumb">' +
            (isVideo ? '<span class="news-card-video-badge">Video</span>' : '') +
            '<img class="news-card-img" src="' + thumb + '" ' +
              'onerror="this.onerror=null;this.src=\'' + PLACEHOLDER_IMG + '\';" alt="' + pickLang(item.title) + '"/>' +
            (isVideo ? '<div class="news-card-play"><i class="fa-solid fa-play"></i></div>' : '') +
          '</div>' +
          '<div class="news-card-body">' +
            '<div class="news-card-meta">' +
              '<span class="news-card-date">' + fmtDate(item.date) + '</span>' +
              typeLabel +
            '</div>' +
            '<div class="news-card-title">' + pickLang(item.title) + '</div>' +
            '<div class="news-card-excerpt">' + pickLang(item.excerpt) + '</div>' +
            '<span class="news-card-more">' +
              (isVideo ? pickLang({en:'Watch Video',id:'Tonton Video'}) : pickLang({en:'Read More',id:'Baca Selengkapnya'})) +
              ' <i class="fa-solid fa-arrow-right"></i>' +
            '</span>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }).join('');

  grid.className = 'news-timeline';
  grid.querySelectorAll('.news-item').forEach(function(item) {
    item.addEventListener('click', function() {
      openNewsModal(newsData[parseInt(item.dataset.idx)]);
    });
  });
}

function openNewsModal(item) {
  var backdrop = document.getElementById('detailModalBackdrop');
  var modal = document.getElementById('detailModal');
  if (!backdrop || !modal) return;

  var media = detectMedia(item.content);
  var paragraphs = pickLang(item.caption).split('\n').filter(Boolean).map(function(p) {
    return '<p>' + p + '</p>';
  }).join('');

  var mediaHtml = '';
  if (media.type === 'video') {
    mediaHtml = '<iframe class="detail-modal-video" src="' + media.embedUrl + '" allowfullscreen></iframe>';
  } else if (media.type === 'image') {
    mediaHtml = '<img class="detail-modal-img" src="' + media.url + '" ' +
      'onerror="this.onerror=null;this.src=\'' + PLACEHOLDER_IMG + '\';" alt="' + pickLang(item.title) + '"/>';
  } else {
    mediaHtml = '<img class="detail-modal-img" src="' + PLACEHOLDER_IMG + '" alt="' + pickLang(item.title) + '"/>';
  }

  modal.innerHTML =
    '<button class="detail-modal-close" id="detailModalClose"><i class="fa-solid fa-xmark"></i></button>' +
    mediaHtml +
    '<div class="detail-modal-body">' +
      '<div class="detail-modal-meta">' +
        '<span class="detail-modal-date">' + fmtDate(item.date) + '</span>' +
      '</div>' +
      '<h3>' + pickLang(item.title) + '</h3>' +
      '<div class="detail-modal-content">' + paragraphs + '</div>' +
    '</div>';

  backdrop.classList.add('open');
  document.getElementById('detailModalClose').addEventListener('click', closeDetailModal);
}

/* ─────────────────────────────────────────────
   CATALOG PAGE
───────────────────────────────────────────── */
var catalogData = null;
var catalogActiveFilter = 'all';

function renderCatalogFilters() {
  var wrap = document.getElementById('catalogFilters');
  if (!wrap || !catalogData) return;

  var cats = [];
  catalogData.forEach(function(item) {
    var c = pickLang(item.category);
    if (c && cats.indexOf(c) === -1) cats.push(c);
  });

  var allLabel = pickLang({en:'All Products', id:'Semua Produk'});
  var html = '<button class="catalog-filter-btn' + (catalogActiveFilter==='all'?' active':'') + '" data-cat="all">' + allLabel + '</button>';
  cats.forEach(function(c) {
    html += '<button class="catalog-filter-btn' + (catalogActiveFilter===c?' active':'') + '" data-cat="' + c + '">' + c + '</button>';
  });
  wrap.innerHTML = html;

  wrap.querySelectorAll('.catalog-filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      catalogActiveFilter = btn.dataset.cat;
      renderCatalogFilters();
      renderCatalogGrid();
    });
  });
}

function renderCatalogGrid() {
  var grid = document.getElementById('catalogGrid');
  if (!grid || !catalogData) return;

  var filtered = catalogData.filter(function(item) {
    return catalogActiveFilter === 'all' || pickLang(item.category) === catalogActiveFilter;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="content-empty-state"><i class="fa-solid fa-box-open"></i>' +
      pickLang({en:'No products in this category yet.', id:'Belum ada produk di kategori ini.'}) + '</div>';
    return;
  }

  grid.innerHTML = filtered.map(function(item) {
    var realIdx = catalogData.indexOf(item);
    return (
      '<div class="catalog-card" data-idx="' + realIdx + '">' +
        '<img class="catalog-card-img" src="' + resolveImage(item.image, CONTENT_CONFIG.catalogImageBase) + '" ' +
          'onerror="this.onerror=null;this.src=\'' + PLACEHOLDER_IMG + '\';" alt="' + pickLang(item.name) + '"/>' +
        '<div class="catalog-card-body">' +
          '<div class="catalog-card-cat">' + pickLang(item.category) + stockBadge(item.stock) + '</div>' +
          '<div class="catalog-card-title">' + pickLang(item.name) + '</div>' +
          '<div class="catalog-card-desc">' + pickLang(item.shortDesc) + '</div>' +
          '<span class="catalog-card-cta">' + pickLang({en:'View Details',id:'Lihat Detail'}) + ' <i class="fa-solid fa-arrow-right"></i></span>' +
        '</div>' +
      '</div>'
    );
  }).join('');

  grid.querySelectorAll('.catalog-card').forEach(function(card) {
    card.addEventListener('click', function() {
      openCatalogModal(catalogData[parseInt(card.dataset.idx)]);
    });
  });
}

function openCatalogModal(item) {
  var backdrop = document.getElementById('detailModalBackdrop');
  var modal = document.getElementById('detailModal');
  if (!backdrop || !modal) return;

  var specsHtml = (item.specs || []).map(function(s) {
    return '<li><i class="fa-solid fa-circle-check"></i>' + pickLang(s) + '</li>';
  }).join('');

  var waMsg = encodeURIComponent(
    (pickLang({en:'Hi, I am interested in: ', id:'Halo, saya tertarik dengan: '})) + pickLang(item.name)
  );

  modal.innerHTML =
    '<button class="detail-modal-close" id="detailModalClose"><i class="fa-solid fa-xmark"></i></button>' +
    '<img class="detail-modal-img" src="' + resolveImage(item.image, CONTENT_CONFIG.catalogImageBase) + '" ' +
      'onerror="this.onerror=null;this.src=\'' + PLACEHOLDER_IMG + '\';" alt="' + pickLang(item.name) + '"/>' +
    '<div class="detail-modal-body">' +
      '<div class="detail-modal-meta"><span class="detail-modal-tag">' + pickLang(item.category) + '</span>' + stockBadge(item.stock) + '</div>' +
      '<h3>' + pickLang(item.name) + '</h3>' +
      '<div class="detail-modal-content"><p>' + pickLang(item.fullDesc) + '</p></div>' +
      (specsHtml ? '<ul class="detail-modal-specs">' + specsHtml + '</ul>' : '') +
      '<a href="https://wa.me/6281235464274?text=' + waMsg + '" target="_blank" rel="noopener" class="btn btn-primary" style="width:100%;justify-content:center;">' +
        '<i class="fa-brands fa-whatsapp"></i> ' + pickLang({en:'Contact Us to Inquire', id:'Hubungi Kami untuk Bertanya'}) +
      '</a>' +
    '</div>';

  backdrop.classList.add('open');
  document.getElementById('detailModalClose').addEventListener('click', closeDetailModal);
}

function closeDetailModal() {
  var backdrop = document.getElementById('detailModalBackdrop');
  if (backdrop) backdrop.classList.remove('open');
}

/* ─────────────────────────────────────────────
   LOAD DATA (real sheet if configured, else sample)
───────────────────────────────────────────── */
function loadNews() {
  if (!CONTENT_CONFIG.newsCsvUrl) {
    newsData = SAMPLE_NEWS;
    renderNewsGrid();
    return;
  }
  fetch(CONTENT_CONFIG.newsCsvUrl)
    .then(function(res) { return res.text(); })
    .then(function(text) {
      var rows = parseCSV(text);
      newsData = rows.length ? csvRowsToNews(rows) : SAMPLE_NEWS;
      renderNewsGrid();
    })
    .catch(function() {
      newsData = SAMPLE_NEWS;
      renderNewsGrid();
    });
}

function loadCatalog() {
  if (!CONTENT_CONFIG.catalogCsvUrl) {
    catalogData = SAMPLE_CATALOG;
    renderCatalogFilters();
    renderCatalogGrid();
    return;
  }
  fetch(CONTENT_CONFIG.catalogCsvUrl)
    .then(function(res) { return res.text(); })
    .then(function(text) {
      var rows = parseCSV(text);
      catalogData = rows.length ? csvRowsToCatalog(rows) : SAMPLE_CATALOG;
      renderCatalogFilters();
      renderCatalogGrid();
    })
    .catch(function() {
      catalogData = SAMPLE_CATALOG;
      renderCatalogFilters();
      renderCatalogGrid();
    });
}

/* ─────────────────────────────────────────────
   INIT
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('newsGrid')) loadNews();
  if (document.getElementById('catalogGrid')) loadCatalog();

  var backdrop = document.getElementById('detailModalBackdrop');
  if (backdrop) {
    backdrop.addEventListener('click', function(e) {
      if (e.target === backdrop) closeDetailModal();
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeDetailModal();
    });
  }

  /* Re-render on language toggle */
  window.__contentRefreshLang = function() {
    if (newsData) renderNewsGrid();
    if (catalogData) { renderCatalogFilters(); renderCatalogGrid(); }
  };
});
