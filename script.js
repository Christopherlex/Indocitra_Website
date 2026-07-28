/* =============================================
   INDO CITRA JAYA SENTOSA — script.js
   ============================================= */

/* ── Translation strings ── */
const T = {
  en: {
    nav_home:'Home', nav_about:'About', nav_services:'Services',
    nav_testimonial:'Testimonial', nav_contact:'Contact',
  },
  id: {
    nav_home:'Beranda', nav_about:'Tentang Kami', nav_services:'Layanan',
    nav_testimonial:'Testimoni', nav_contact:'Kontak',
  }
};

let lang = localStorage.getItem('icjs_lang') || 'en';

function applyLang(l) {
  lang = l;
  localStorage.setItem('icjs_lang', l);

  /* Toggle button text */
  const btn = document.getElementById('langToggle');
  if (btn) btn.innerHTML = l === 'en' ? '🌐 ID' : '🌐 EN';

  /* Nav links */
  const navMap = {
    'index.html'      : l === 'en' ? T.en.nav_home        : T.id.nav_home,
    'about.html'      : l === 'en' ? T.en.nav_about       : T.id.nav_about,
    'services.html'   : l === 'en' ? T.en.nav_services     : T.id.nav_services,
    'testimonial.html': l === 'en' ? T.en.nav_testimonial  : T.id.nav_testimonial,
    'contact.html'    : l === 'en' ? T.en.nav_contact      : T.id.nav_contact,
  };
  document.querySelectorAll('.nav-links a').forEach(function(a) {
    const key = a.getAttribute('href');
    if (navMap[key]) a.textContent = navMap[key];
  });

  /* All elements with data-en / data-id — text swap */
  document.querySelectorAll('[data-en]').forEach(function(el) {
    /* Skip buttons that have child icons — only swap text nodes */
    if (el.querySelector('i, svg')) {
      /* preserve icon, only update text node */
      const icon = el.querySelector('i, svg');
      const txt  = l === 'en' ? el.dataset.en : (el.dataset.id || el.dataset.en);
      el.childNodes.forEach(function(n) {
        if (n.nodeType === 3) n.textContent = txt + ' ';
      });
    } else {
      el.textContent = l === 'en' ? el.dataset.en : (el.dataset.id || el.dataset.en);
    }
  });

  /* Placeholders */
  document.querySelectorAll('[data-en-placeholder]').forEach(function(el) {
    el.placeholder = l === 'en'
      ? el.dataset.enPlaceholder
      : (el.dataset.idPlaceholder || el.dataset.enPlaceholder);
  });

  /* Save for use by other pages */
  document.documentElement.lang = l === 'en' ? 'en' : 'id';
}

document.addEventListener('DOMContentLoaded', function() {

  /* ── Language Toggle ── */
  const langBtn = document.getElementById('langToggle');
  if (langBtn) {
    langBtn.addEventListener('click', function() {
      applyLang(lang === 'en' ? 'id' : 'en');
    });
    /* Apply saved language on page load */
    applyLang(lang);
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

  /* ── Active Nav Link ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(a) {
    if (a.getAttribute('href') === page || (page === '' && a.getAttribute('href') === 'index.html'))
      a.classList.add('active');
  });

  /* ── Scroll Reveal ── */
  if (window.IntersectionObserver) {
    const obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el) { el.classList.add('visible'); });
  }

  /* ── Stats Counter ── */
  const statsBar = document.querySelector('.stats-bar');
  if (statsBar && window.IntersectionObserver) {
    let counted = false;
    new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting && !counted) {
        counted = true;
        document.querySelectorAll('.stat-num[data-target]').forEach(function(el) {
          const target = parseInt(el.dataset.target);
          const suffix = el.dataset.suffix || '';
          const t0 = performance.now();
          (function tick(now) {
            const p = Math.min((now - t0) / 1500, 1);
            el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          })(t0);
        });
      }
    }, { threshold: 0.5 }).observe(statsBar);
  }

  /* ── Dynamic Years of Experience (auto-calculates from founding year) ── */
  const yearsEl = document.querySelector('.stat-num[data-founded]');
  if (yearsEl) {
    const years = new Date().getFullYear() - parseInt(yearsEl.dataset.founded);
    yearsEl.textContent = years + '+';
  }

  /* ── Services Tab Switcher ── */
  const tabs    = document.querySelectorAll('.svc-tab');
  const details = document.querySelectorAll('.svc-detail');

  if (tabs.length > 0) {
    function openTab(idx) {
      tabs.forEach(function(t, i) {
        t.classList.toggle('active', i === idx);
      });
      details.forEach(function(d, i) {
        d.classList.toggle('active', i === idx);
      });
    }
    tabs.forEach(function(tab, idx) {
      tab.addEventListener('click', function() { openTab(idx); });
    });
    openTab(0); /* open first by default */
  }

  /* ── Logo Bounce Scroller ── */
  const wrapper = document.getElementById('logoWrapper');
  const track   = document.getElementById('logosTrack');
  if (wrapper && track) {
    var SPEED = 70, pos = 0, dir = -1, maxShift = 0, last = null, paused = false;

    function calcMax() {
      maxShift = Math.max(0, track.scrollWidth - wrapper.clientWidth);
    }
    function frame(ts) {
      if (!last) last = ts;
      var dt = Math.min(ts - last, 100); last = ts;
      if (!paused && maxShift > 0) {
        pos += dir * SPEED * dt / 1000;
        if (pos <= -maxShift) { pos = -maxShift; dir = 1; }
        if (pos >= 0)         { pos = 0;         dir = -1; }
        track.style.transform = 'translateX(' + pos + 'px)';
      }
      requestAnimationFrame(frame);
    }
    track.addEventListener('mouseenter', function() { paused = true; });
    track.addEventListener('mouseleave', function() { paused = false; last = null; });
    window.addEventListener('load', function() { calcMax(); requestAnimationFrame(frame); });
    window.addEventListener('resize', function() { calcMax(); if (pos < -maxShift) pos = -maxShift; });
  }

  /* ── Page Transition ── */
  const pt = document.getElementById('page-transition');
  if (pt) {
    pt.classList.add('done');
    setTimeout(function() { pt.classList.remove('done'); }, 500);
    document.querySelectorAll('a[href]').forEach(function(link) {
      var href = link.getAttribute('href');
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
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

});
