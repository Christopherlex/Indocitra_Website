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

  /* Refresh services showcase text if it's on this page */
  if (typeof window.__svcRefreshLang === 'function') window.__svcRefreshLang();
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

  /* ══════════════════════════════════════════════
     SERVICES — GRID-TO-SPLIT-PANEL (FLIP animated)
     ══════════════════════════════════════════════ */
  const svcGrid  = document.getElementById('svcCardsGrid');
  const svcPanel = document.getElementById('svcDetailPanel');
  const svcRoot  = document.getElementById('svcInteractive');

  if (svcGrid && svcPanel && svcRoot) {

    var SVC_DATA = [
      {
        id: 'automation', icon: 'fa-microchip',
        title: { en: 'Industrial Automation', id: 'Otomasi Industri' },
        tag:   { en: 'Industrial Automation', id: 'Otomasi Industri' },
        heading: { en: 'Smarter Processes, Better Results', id: 'Proses Lebih Cerdas, Hasil Lebih Baik' },
        desc: { en: 'We design and commission complete industrial automation systems, from single PLC-controlled machines to fully integrated SCADA environments. Our engineers work with all major platforms to improve throughput, reduce errors, and cut operating costs.',
                id: 'Kami merancang dan mengoperasikan sistem otomasi industri yang lengkap, dari mesin yang dikendalikan PLC tunggal hingga lingkungan SCADA yang terintegrasi penuh. Insinyur kami bekerja dengan semua platform utama untuk meningkatkan produktivitas, mengurangi kesalahan, dan memangkas biaya operasional.' },
        features: [
          { en: 'PLC Programming (Siemens, Omron, Schneider Electric)', id: 'Pemrograman PLC (Siemens, Omron, Schneider Electric)' },
          { en: 'SCADA System Design and Implementation', id: 'Perancangan dan Implementasi Sistem SCADA' },
          { en: 'Safety Device Installation (SIL-4 Compliant)', id: 'Pemasangan Perangkat Keselamatan (Sesuai SIL-4)' },
          { en: 'Control Panel Fabrication and Wiring', id: 'Fabrikasi dan Pengkabelan Panel Kontrol' },
          { en: 'Industrial IoT and Remote Monitoring', id: 'IoT Industri dan Pemantauan Jarak Jauh' },
          { en: 'Commissioning and Acceptance Testing', id: 'Komisioning dan Pengujian Penerimaan' }
        ]
      },
      {
        id: 'hvac', icon: 'fa-wind',
        title: { en: 'HVAC Systems', id: 'Sistem HVAC' },
        tag:   { en: 'HVAC Systems', id: 'Sistem HVAC' },
        heading: { en: 'Climate Control That Works', id: 'Kendali Iklim yang Andal' },
        desc: { en: 'From load calculation and system design through to full installation and long-term maintenance, our HVAC team delivers reliable climate control for factories, warehouses, and commercial buildings. We focus on energy efficiency and systems built to last.',
                id: 'Dari kalkulasi beban dan perancangan sistem hingga pemasangan penuh dan pemeliharaan jangka panjang, tim HVAC kami menghadirkan kendali iklim yang andal untuk pabrik, gudang, dan gedung komersial. Kami fokus pada efisiensi energi dan sistem yang tahan lama.' },
        features: [
          { en: 'HVAC System Design and Load Calculation', id: 'Perancangan Sistem HVAC dan Kalkulasi Beban' },
          { en: 'Chiller Installation and Integration', id: 'Pemasangan dan Integrasi Chiller' },
          { en: 'AHU, FCU and Ducting Works', id: 'Pekerjaan AHU, FCU, dan Ducting' },
          { en: 'Chiller Overhaul and Servicing', id: 'Overhaul dan Servis Chiller' },
          { en: 'Refrigeration and Cold Storage', id: 'Refrigerasi dan Cold Storage' },
          { en: 'Preventive Maintenance Programs', id: 'Program Pemeliharaan Preventif' }
        ]
      },
      {
        id: 'machinery', icon: 'fa-gears',
        title: { en: 'Custom Machinery', id: 'Mesin Kustom' },
        tag:   { en: 'Custom Machinery', id: 'Mesin Kustom' },
        heading: { en: 'Built for Your Exact Requirements', id: 'Dibangun untuk Kebutuhan Spesifik Anda' },
        desc: { en: 'Launched in 2024, our custom machine manufacturing segment designs and builds equipment specifically for your production line. When standard machines do not fit your process, we engineer one that does, backed by full after-sales support.',
                id: 'Diluncurkan pada 2024, segmen manufaktur mesin kustom kami merancang dan membangun peralatan khusus untuk lini produksi Anda. Ketika mesin standar tidak sesuai dengan proses Anda, kami merancang yang sesuai, dengan dukungan purna jual penuh.' },
        features: [
          { en: 'Custom Machine Design and Fabrication', id: 'Desain dan Fabrikasi Mesin Kustom' },
          { en: 'Unscrambler and Conveyor Systems', id: 'Sistem Unscrambler dan Konveyor' },
          { en: 'Automated Production Line Equipment', id: 'Peralatan Lini Produksi Otomatis' },
          { en: 'Mechanical and Electrical Integration', id: 'Integrasi Mekanikal dan Elektrikal' },
          { en: 'Factory Acceptance Testing', id: 'Pengujian Penerimaan Pabrik' },
          { en: 'After-Sales Support and Spare Parts', id: 'Dukungan Purna Jual dan Suku Cadang' }
        ]
      },
      {
        id: 'repair', icon: 'fa-wrench',
        title: { en: 'Repair Industrial Parts', id: 'Perbaikan Suku Cadang' },
        tag:   { en: 'Repair Industrial Parts', id: 'Perbaikan Suku Cadang Industri' },
        heading: { en: 'Keep Your Equipment Running', id: 'Jaga Peralatan Anda Tetap Beroperasi' },
        desc: { en: 'Downtime costs money. Our technicians diagnose and repair a wide range of industrial equipment quickly and correctly. We also offer contract maintenance programs for clients who want consistent, scheduled servicing year-round.',
                id: 'Downtime menguras biaya. Teknisi kami mendiagnosis dan memperbaiki berbagai peralatan industri dengan cepat dan tepat. Kami juga menawarkan program pemeliharaan kontrak bagi klien yang menginginkan servis terjadwal dan konsisten sepanjang tahun.' },
        features: [
          { en: 'Compressor Maintenance and Repair', id: 'Pemeliharaan dan Perbaikan Kompresor' },
          { en: 'Conveyor System Servicing', id: 'Servis Sistem Konveyor' },
          { en: 'Pump, Motor and Drive Repair', id: 'Perbaikan Pompa, Motor, dan Drive' },
          { en: 'Hydraulic and Pneumatic Systems', id: 'Sistem Hidrolik dan Pneumatik' },
          { en: 'Electrical Panel Troubleshooting', id: 'Pemecahan Masalah Panel Listrik' },
          { en: 'Contract Maintenance Programs', id: 'Program Pemeliharaan Kontrak' }
        ]
      },
      {
        id: 'racking', icon: 'fa-layer-group',
        title: { en: 'Racking Systems', id: 'Sistem Racking' },
        tag:   { en: 'Racking Systems', id: 'Sistem Racking' },
        heading: { en: 'Maximise Your Storage Space', id: 'Maksimalkan Ruang Penyimpanan Anda' },
        desc: { en: 'Racking is where we started, and it remains one of our strongest capabilities. We design warehouse layouts, supply the right racking system for your load and workflow requirements, and handle the full installation from start to finish.',
                id: 'Racking adalah tempat kami memulai, dan ini tetap menjadi salah satu kemampuan terkuat kami. Kami merancang tata letak gudang, menyediakan sistem racking yang tepat untuk kebutuhan beban dan alur kerja Anda, serta menangani pemasangan penuh dari awal hingga akhir.' },
        features: [
          { en: 'Selective and Drive-In Racking', id: 'Racking Selektif dan Drive-In' },
          { en: 'Heavy-Duty Pallet Racking', id: 'Racking Palet Tugas Berat' },
          { en: 'Mezzanine and Multi-Tier Racking', id: 'Racking Mezzanine dan Multi-Tingkat' },
          { en: 'Warehouse Layout Design', id: 'Desain Tata Letak Gudang' },
          { en: 'Racking Installation and Modification', id: 'Pemasangan dan Modifikasi Racking' },
          { en: 'Safety Inspection and Load Testing', id: 'Inspeksi Keselamatan dan Uji Beban' }
        ]
      },
      {
        id: 'forklift', icon: 'fa-truck-ramp-box',
        title: { en: 'Forklift', id: 'Forklift' },
        tag:   { en: 'Forklift', id: 'Forklift' },
        heading: { en: 'Keep Your Fleet Moving', id: 'Jaga Armada Anda Bergerak' },
        desc: { en: 'We supply forklifts and provide servicing and maintenance to keep your material handling operations running without interruption. Our team handles both electric and LPG models, with scheduled maintenance contracts available for ongoing fleet management.',
                id: 'Kami menyediakan forklift dan layanan servis serta pemeliharaan untuk menjaga operasional material handling Anda berjalan tanpa gangguan. Tim kami menangani model listrik maupun LPG, dengan kontrak pemeliharaan terjadwal untuk manajemen armada berkelanjutan.' },
        features: [
          { en: 'Forklift Supply and Procurement', id: 'Penyediaan dan Pengadaan Forklift' },
          { en: 'Electric and LPG Forklift Servicing', id: 'Servis Forklift Listrik dan LPG' },
          { en: 'Periodic Maintenance Contracts', id: 'Kontrak Pemeliharaan Berkala' },
          { en: 'Spare Parts Supply', id: 'Penyediaan Suku Cadang' },
          { en: 'Safety Inspection and Certification', id: 'Inspeksi Keselamatan dan Sertifikasi' },
          { en: 'Operator Training Support', id: 'Dukungan Pelatihan Operator' }
        ]
      }
    ];

    var svcActiveId = null;

    function svcT(field) { return lang === 'id' ? field.id : field.en; }

    /* Build the 6 (or 5, when one is active) card elements */
    function svcRenderCards() {
      svcGrid.innerHTML = '';
      SVC_DATA.forEach(function(s) {
        var card = document.createElement('div');
        card.className = 'svc-card';
        card.dataset.id = s.id;
        card.innerHTML =
          '<div class="svc-card-icon"><i class="fa-solid ' + s.icon + '"></i></div>' +
          '<div class="svc-card-title">' + svcT(s.title) + '</div>' +
          '<div class="svc-card-arrow"><i class="fa-solid fa-arrow-right"></i></div>';
        card.addEventListener('click', function() { svcOpen(s.id); });
        svcGrid.appendChild(card);
      });
    }

    /* Build the detail panel's inner HTML for a given service id */
    function svcPanelHTML(s) {
      var featHtml = s.features.map(function(f) {
        return '<li><span class="check-circle"><i class="fa-solid fa-check"></i></span>' + svcT(f) + '</li>';
      }).join('');
      return (
        '<button class="svc-panel-close" id="svcPanelClose" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>' +
        '<div class="svc-panel-inner">' +
          '<div class="svc-panel-left">' +
            '<div class="svc-panel-icon"><i class="fa-solid ' + s.icon + '"></i></div>' +
            '<div class="svc-panel-tag">' + svcT(s.tag) + '</div>' +
            '<h3>' + svcT(s.heading) + '</h3>' +
            '<p>' + svcT(s.desc) + '</p>' +
            '<a href="contact.html" class="btn btn-primary" style="font-size:0.88rem;">' +
              (lang === 'id' ? 'Minta Penawaran' : 'Get a Quote') + ' <i class="fa-solid fa-arrow-right"></i>' +
            '</a>' +
          '</div>' +
          '<div class="svc-panel-right">' +
            '<h4>' + (lang === 'id' ? 'Yang Termasuk' : "What's Included") + '</h4>' +
            '<ul class="svc-panel-features">' + featHtml + '</ul>' +
          '</div>' +
        '</div>'
      );
    }

    /* Generic FLIP helper: pass a list of elements + their pre-change rects */
    function svcFlip(elements, firstRects, duration) {
      elements.forEach(function(el) {
        var first = firstRects.get(el);
        if (!first) {
          /* newly appearing element: simple fade-in */
          el.style.opacity = '0';
          el.style.transform = '';
          requestAnimationFrame(function() {
            el.style.transition = 'opacity 0.3s ease';
            el.style.opacity = '1';
          });
          return;
        }
        var last = el.getBoundingClientRect();
        var dx = first.left - last.left;
        var dy = first.top - last.top;
        var sx = first.width / last.width;
        var sy = first.height / last.height;
        el.style.transformOrigin = 'top left';
        el.style.transition = 'none';
        el.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(' + sx + ',' + sy + ')';
        /* force reflow then animate to natural position */
        el.getBoundingClientRect();
        requestAnimationFrame(function() {
          requestAnimationFrame(function() {
            el.style.transition = 'transform ' + duration + 'ms cubic-bezier(.4,0,.2,1)';
            el.style.transform = '';
          });
        });
      });
    }

    function svcCaptureVisibleRects() {
      var map = new Map();
      Array.from(svcGrid.querySelectorAll('.svc-card')).forEach(function(c) {
        var r = c.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) map.set(c, r);
      });
      return map;
    }

    function svcOpen(id) {
      var wasActive = svcActiveId !== null;
      var prevId = svcActiveId;

      var firstRects = svcCaptureVisibleRects();
      var clickedCard = svcGrid.querySelector('.svc-card[data-id="' + id + '"]');
      var clickedFirstRect = clickedCard ? clickedCard.getBoundingClientRect() : null;
      var panelFirstRect = wasActive ? svcPanel.getBoundingClientRect() : null;

      svcActiveId = id;
      var svcObj = SVC_DATA.find(function(s) { return s.id === id; });

      svcRoot.classList.add('split-active');

      /* mark hidden/selected states */
      Array.from(svcGrid.querySelectorAll('.svc-card')).forEach(function(c) {
        c.classList.toggle('is-hidden-active', c.dataset.id === id);
        c.classList.remove('is-selected');
      });

      svcPanel.innerHTML = svcPanelHTML(svcObj);
      svcPanel.style.display = 'block';
      var closeBtn = document.getElementById('svcPanelClose');
      if (closeBtn) closeBtn.addEventListener('click', svcClose);

      requestAnimationFrame(function() {
        var visibleCards = Array.from(svcGrid.querySelectorAll('.svc-card:not(.is-hidden-active)'));
        svcFlip(visibleCards, firstRects, 420);

        var panelLast = svcPanel.getBoundingClientRect();
        var origin = wasActive ? panelFirstRect : clickedFirstRect;
        if (origin) {
          var dx = origin.left - panelLast.left;
          var dy = origin.top - panelLast.top;
          var sx = origin.width / panelLast.width;
          var sy = origin.height / panelLast.height;
          svcPanel.style.transformOrigin = 'top left';
          svcPanel.style.transition = 'none';
          svcPanel.style.opacity = wasActive ? '1' : '0.5';
          svcPanel.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(' + sx + ',' + sy + ')';
          svcPanel.getBoundingClientRect();
          requestAnimationFrame(function() {
            requestAnimationFrame(function() {
              svcPanel.style.transition = 'transform 420ms cubic-bezier(.4,0,.2,1), opacity 320ms ease';
              svcPanel.style.transform = '';
              svcPanel.style.opacity = '1';
            });
          });
        }
      });
    }

    function svcClose() {
      if (svcActiveId === null) return;
      var prevActiveId = svcActiveId;
      var firstRects = svcCaptureVisibleRects();
      var panelFirstRect = svcPanel.getBoundingClientRect();

      svcActiveId = null;
      svcRoot.classList.remove('split-active');
      svcPanel.style.display = 'none';

      Array.from(svcGrid.querySelectorAll('.svc-card')).forEach(function(c) {
        c.classList.remove('is-hidden-active', 'is-selected');
      });

      requestAnimationFrame(function() {
        var allCards = Array.from(svcGrid.querySelectorAll('.svc-card'));
        /* Make the previously-active card FLIP from the panel's rect,
           mirroring the opening animation in reverse for continuity */
        var prevActiveCard = svcGrid.querySelector('.svc-card[data-id="' + prevActiveId + '"]');
        if (prevActiveCard) firstRects.set(prevActiveCard, panelFirstRect);
        svcFlip(allCards, firstRects, 420);
      });
    }

    /* Expose a re-render hook so the language toggle can refresh card + panel text */
    window.__svcRefreshLang = function() {
      /* Update card titles in place (no FLIP needed, just text swap) */
      Array.from(svcGrid.querySelectorAll('.svc-card')).forEach(function(c) {
        var s = SVC_DATA.find(function(x) { return x.id === c.dataset.id; });
        if (!s) return;
        var titleEl = c.querySelector('.svc-card-title');
        if (titleEl) titleEl.textContent = svcT(s.title);
      });
      /* Re-render open panel content, if any */
      if (svcActiveId !== null) {
        var svcObj = SVC_DATA.find(function(s) { return s.id === svcActiveId; });
        svcPanel.innerHTML = svcPanelHTML(svcObj);
        var closeBtn = document.getElementById('svcPanelClose');
        if (closeBtn) closeBtn.addEventListener('click', svcClose);
      }
    };

    svcRenderCards();
  }

  /* ── Reusable Bounce Scroller (used by logos + project story cards) ── */

  function initBounceTrack(wrapperId, trackId, speed) {
    const wrapper = document.getElementById(wrapperId);
    const track   = document.getElementById(trackId);
    if (!wrapper || !track) return;

    var SPEED = speed || 70, pos = 0, dir = -1, maxShift = 0, last = null, paused = false;

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

  initBounceTrack('logoWrapper', 'logosTrack', 70);
  initBounceTrack('pstoryWrapper', 'pstoryTrack', 55);

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
