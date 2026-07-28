/* =============================================
   INDO CITRA JAYA SENTOSA — script.js
   ============================================= */

/* ── Language data ── */
const LANG = {
  en: {
    nav: { home:'Home', about:'About', services:'Services', testimonial:'Testimonial', contact:'Contact' },
    hero_eyebrow: 'Automation · HVAC · Machinery',
    hero_tagline: '"Built on Trust, Driven by Reliability"',
    hero_desc: 'From racking systems and industrial automation to HVAC, custom machinery, and forklift services — reliable industrial solutions for Indonesia\'s leading industries since 2014.',
    btn_services: 'Our Services', btn_contact: 'Contact Us',
    stat_years: 'Years of Experience', stat_projects: 'Projects Completed', stat_clients: 'Trusted Clients',
    intro_label: 'Who We Are', intro_title: 'Engineering Solutions Built to Last',
    intro_accent: 'PT Indo Citra Jaya Sentosa is a trusted industrial solutions provider based in Pasuruan, East Java.',
    intro_p1: 'Established in 2014 with racking systems, we expanded into automation in 2020 and custom machine manufacturing in 2024. We serve clients across manufacturing, food and beverage, power, and commercial sectors — from local businesses to international companies like Autorun Inc (Korea) and Countec Ltd.',
    intro_p2: 'Our certified engineers deliver efficient, tailor-made solutions that enhance your operational productivity. With a results-driven approach and reliable after-sales service, we build long-term partnerships based on trust, not just transactions.',
    btn_learn: 'Learn More About Us',
    hl_label: 'Our Core Services', hl_title: 'What We Deliver',
    hl_sub: 'From racking and automation to HVAC, custom machinery, repair services, and forklift — six service areas, one trusted partner.',
    trusted_label: 'Our Clients', trusted_title: 'Trusted By Industry Leaders',
    trusted_sub: 'Proud to serve these respected companies and organizations across Indonesia.',
    cta_label: 'Get In Touch', cta_title: 'Ready to Start Your Project?',
    cta_p: 'Our team is ready to assess your needs and provide a tailored engineering solution.',
    btn_cta: 'Contact Us Today', footer_desc: 'Reliable racking, automation, HVAC, and custom machinery solutions from Pasuruan, East Java — trusted by Indonesia\'s leading industries since 2014.',
    footer_links: 'Quick Links', footer_contact: 'Contact',
  },
  id: {
    nav: { home:'Beranda', about:'Tentang Kami', services:'Layanan', testimonial:'Testimoni', contact:'Kontak' },
    hero_eyebrow: 'Otomasi · HVAC · Mesin',
    hero_tagline: '"Dibangun atas Kepercayaan, Digerakkan oleh Keandalan"',
    hero_desc: 'Dari sistem racking dan otomasi industri hingga HVAC, mesin kustom, dan layanan forklift — solusi industri yang andal untuk perusahaan-perusahaan terkemuka di Indonesia sejak 2014.',
    btn_services: 'Layanan Kami', btn_contact: 'Hubungi Kami',
    stat_years: 'Tahun Pengalaman', stat_projects: 'Proyek Selesai', stat_clients: 'Klien Terpercaya',
    intro_label: 'Siapa Kami', intro_title: 'Solusi Teknik yang Dirancang untuk Bertahan',
    intro_accent: 'PT Indo Citra Jaya Sentosa adalah mitra solusi industri terpercaya yang berbasis di Pasuruan, Jawa Timur.',
    intro_p1: 'Berdiri sejak 2014 dengan fokus pada sistem racking, kami berkembang ke segmen otomasi pada 2020 dan manufaktur mesin kustom pada 2024. Kami melayani klien di sektor manufaktur, makanan dan minuman, ketenagalistrikan, serta komersial — dari usaha lokal hingga perusahaan internasional seperti Autorun Inc (Korea) dan Countec Ltd.',
    intro_p2: 'Tim insinyur bersertifikat kami menghadirkan solusi yang efisien dan terukur untuk meningkatkan produktivitas operasional Anda. Dengan pendekatan berorientasi hasil dan layanan purna jual yang andal, kami membangun kemitraan jangka panjang yang didasarkan pada kepercayaan.',
    btn_learn: 'Pelajari Lebih Lanjut',
    hl_label: 'Layanan Utama Kami', hl_title: 'Yang Kami Tawarkan',
    hl_sub: 'Dari racking dan otomasi hingga HVAC, mesin kustom, perbaikan, dan forklift — enam bidang layanan, satu mitra terpercaya.',
    trusted_label: 'Klien Kami', trusted_title: 'Dipercaya oleh Pemimpin Industri',
    trusted_sub: 'Bangga melayani perusahaan dan organisasi terkemuka di seluruh Indonesia.',
    cta_label: 'Hubungi Kami', cta_title: 'Siap Memulai Proyek Anda?',
    cta_p: 'Tim kami siap mengkaji kebutuhan Anda dan memberikan solusi teknik yang tepat sasaran.',
    btn_cta: 'Hubungi Kami Sekarang', footer_desc: 'Solusi racking, otomasi, HVAC, dan mesin kustom yang andal dari Pasuruan, Jawa Timur — dipercaya oleh industri terkemuka Indonesia sejak 2014.',
    footer_links: 'Tautan Cepat', footer_contact: 'Kontak',
  }
};

let currentLang = localStorage.getItem('lang') || 'en';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  const d = LANG[lang];
  if (!d) return;

  // Toggle button label
  const toggleBtn = document.getElementById('langToggle');
  if (toggleBtn) toggleBtn.textContent = lang === 'en' ? 'ID' : 'EN';

  // Nav links
  const navMap = { 'index.html':'home','about.html':'about','services.html':'services','testimonial.html':'testimonial','contact.html':'contact' };
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    const key  = navMap[href];
    if (key && d.nav[key]) a.textContent = d.nav[key];
  });

  // Set data-lang attributes
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = lang === 'en' ? el.dataset.en : (el.dataset.id || el.dataset.en);
  });
  document.querySelectorAll('[data-en-html]').forEach(el => {
    el.innerHTML = lang === 'en' ? el.dataset.enHtml : (el.dataset.idHtml || el.dataset.enHtml);
  });
  document.querySelectorAll('[data-en-placeholder]').forEach(el => {
    el.placeholder = lang === 'en' ? el.dataset.enPlaceholder : (el.dataset.idPlaceholder || el.dataset.enPlaceholder);
  });
}

document.addEventListener('DOMContentLoaded', function() {

  /* ── Language Toggle ── */
  const toggleBtn = document.getElementById('langToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function() {
      applyLang(currentLang === 'en' ? 'id' : 'en');
    });
    applyLang(currentLang);
  }

  /* ── Mobile Hamburger ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ── Active Nav ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(a) {
    if (a.getAttribute('href') === page || (page === '' && a.getAttribute('href') === 'index.html'))
      a.classList.add('active');
  });

  /* ── Scroll Reveal ── */
  if (window.IntersectionObserver) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function(el) { observer.observe(el); });
  }

  /* ── Stats Counter ── */
  const statsBar = document.querySelector('.stats-bar');
  if (statsBar && window.IntersectionObserver) {
    let done = false;
    new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting && !done) {
        done = true;
        document.querySelectorAll('.stat-num[data-target]').forEach(function(el) {
          const target = parseInt(el.dataset.target), suffix = el.dataset.suffix || '';
          const start = performance.now();
          (function tick(now) {
            const p = Math.min((now - start) / 1600, 1);
            el.textContent = Math.round((1 - Math.pow(1-p,3)) * target) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          })(start);
        });
      }
    }, { threshold: 0.5 }).observe(statsBar);
  }

  /* ── Dynamic Years of Experience ── */
  const yearsEl = document.querySelector('.stat-num[data-founded]');
  if (yearsEl) {
    const years = new Date().getFullYear() - parseInt(yearsEl.dataset.founded);
    yearsEl.dataset.target = years;
    yearsEl.textContent = years + '+';
  }

  /* ── Logo Bounce Scroller ── */
  const wrapper = document.getElementById('logoWrapper');
  const track   = document.getElementById('logosTrack');
  if (wrapper && track) {
    var SPEED = 75, pos = 0, dir = -1, maxShift = 0, lastTime = null, paused = false;
    function calcMax() { maxShift = Math.max(0, track.scrollWidth - wrapper.clientWidth); }
    function frame(ts) {
      if (!lastTime) lastTime = ts;
      var dt = Math.min(ts - lastTime, 100); lastTime = ts;
      if (!paused && maxShift > 0) {
        pos += dir * SPEED * dt / 1000;
        if (pos <= -maxShift) { pos = -maxShift; dir = 1; }
        if (pos >= 0) { pos = 0; dir = -1; }
        track.style.transform = 'translateX(' + pos + 'px)';
      }
      requestAnimationFrame(frame);
    }
    track.addEventListener('mouseenter', function() { paused = true; });
    track.addEventListener('mouseleave', function() { paused = false; lastTime = null; });
    window.addEventListener('load', function() { calcMax(); requestAnimationFrame(frame); });
    window.addEventListener('resize', function() { calcMax(); if (pos < -maxShift) pos = -maxShift; });
  }

  /* ── Services Accordion (Services page) ── */
  const svcItems = document.querySelectorAll('.svc-item');
  if (svcItems.length > 0) {
    function openService(item) {
      svcItems.forEach(function(i) { i.classList.remove('active'); });
      item.classList.add('active');
    }
    svcItems.forEach(function(item) {
      item.querySelector('.svc-title').addEventListener('click', function() {
        openService(item);
      });
    });
    // Open first by default
    openService(svcItems[0]);
  }

  /* ── Page Transition ── */
  const pt = document.getElementById('page-transition');
  if (pt) {
    pt.classList.add('done');
    setTimeout(function() { pt.classList.remove('done'); }, 500);
    document.querySelectorAll('a[href]').forEach(function(link) {
      const href = link.getAttribute('href');
      if (!href || href.indexOf('http') === 0 || href.indexOf('#') === 0 ||
          href.indexOf('mailto') === 0 || href.indexOf('wa.me') >= 0 ||
          link.getAttribute('target') === '_blank') return;
      link.addEventListener('click', function(e) {
        e.preventDefault();
        pt.classList.add('loading');
        setTimeout(function() {
          pt.classList.remove('loading'); pt.classList.add('done');
          setTimeout(function() { window.location.href = href; }, 180);
        }, 320);
      });
    });
  }

  /* ── Footer Year ── */
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

});
