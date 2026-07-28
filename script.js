/* =============================================
   INDO CITRA JAYA SENTOSA — script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {

  /* ────────────────────────────────────────────
     1. MOBILE HAMBURGER MENU
  ──────────────────────────────────────────── */
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('navLinks');

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

  /* ────────────────────────────────────────────
     2. ACTIVE NAV LINK
  ──────────────────────────────────────────── */
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(a) {
    var href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ────────────────────────────────────────────
     3. SCROLL REVEAL
  ──────────────────────────────────────────── */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0 && window.IntersectionObserver) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function(el) { observer.observe(el); });
  }

  /* ────────────────────────────────────────────
     4. STATS COUNTER ANIMATION
  ──────────────────────────────────────────── */
  var statsSection = document.querySelector('.stats-bar');
  if (statsSection && window.IntersectionObserver) {
    var statsAnimated = false;
    var statsObs = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting && !statsAnimated) {
        statsAnimated = true;
        document.querySelectorAll('.stat-num[data-target]').forEach(function(el) {
          var target   = parseInt(el.dataset.target);
          var suffix   = el.dataset.suffix || '';
          var duration = 1600;
          var startT   = performance.now();
          function tick(now) {
            var progress = Math.min((now - startT) / duration, 1);
            var eased    = 1 - Math.pow(1 - progress, 3);
            el.innerHTML = Math.round(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
      }
    }, { threshold: 0.5 });
    statsObs.observe(statsSection);
  }

  /* ────────────────────────────────────────────
     5. LOGO BOUNCE SCROLLER
     requestAnimationFrame ping-pong bounce.
     - Track moves LEFT (negative translateX) until
       its right edge aligns with wrapper right edge.
     - Then reverses and moves RIGHT back to 0.
     - Loops continuously, pauses on hover.
  ──────────────────────────────────────────── */
  var wrapper = document.getElementById('logoWrapper');
  var track   = document.getElementById('logosTrack');

  if (wrapper && track) {
    var SPEED    = 75;    // pixels per second
    var pos      = 0;     // current translateX (px), always <= 0
    var dir      = -1;    // -1 = moving left, +1 = moving right
    var maxShift = 0;
    var lastTime = null;
    var paused   = false;

    function calcMax() {
      var overflow = track.scrollWidth - wrapper.clientWidth;
      maxShift = overflow > 0 ? overflow : 0;
    }

    function bounceFrame(timestamp) {
      if (!lastTime) lastTime = timestamp;
      var elapsed = timestamp - lastTime;
      lastTime = timestamp;

      // Cap elapsed to 100ms to avoid huge jumps after tab switch
      if (elapsed > 100) elapsed = 100;

      if (!paused && maxShift > 0) {
        pos += dir * (SPEED * elapsed / 1000);

        if (pos <= -maxShift) {
          pos = -maxShift;
          dir = 1;
        }
        if (pos >= 0) {
          pos = 0;
          dir = -1;
        }

        track.style.transform = 'translateX(' + pos + 'px)';
      }

      requestAnimationFrame(bounceFrame);
    }

    track.addEventListener('mouseenter', function() {
      paused = true;
    });
    track.addEventListener('mouseleave', function() {
      paused = false;
      lastTime = null;
    });

    // Wait for images to load so scrollWidth is accurate
    window.addEventListener('load', function() {
      calcMax();
      requestAnimationFrame(bounceFrame);
    });

    window.addEventListener('resize', function() {
      calcMax();
      if (pos < -maxShift) pos = -maxShift;
    });
  }

  /* ────────────────────────────────────────────
     6. PAGE TRANSITION
     A slim gradient bar sweeps across the top +
     a very subtle white veil on every navigation.
     Body fades in on each page load via CSS.
  ──────────────────────────────────────────── */
  var pt = document.getElementById('page-transition');

  if (pt) {
    // On page arrival: flash the completed bar briefly then reset
    pt.classList.add('done');
    setTimeout(function() { pt.classList.remove('done'); }, 500);

    // Intercept internal nav clicks
    document.querySelectorAll('a[href]').forEach(function(link) {
      var href = link.getAttribute('href');
      if (!href) return;
      // Skip external, anchor, mailto, tel, wa.me links
      if (href.indexOf('http') === 0 || href.indexOf('#') === 0 ||
          href.indexOf('mailto') === 0 || href.indexOf('tel') === 0 ||
          href.indexOf('wa.me') >= 0) return;
      // Skip links with target="_blank"
      if (link.getAttribute('target') === '_blank') return;

      link.addEventListener('click', function(e) {
        e.preventDefault();
        var dest = href;
        pt.classList.add('loading');
        setTimeout(function() {
          pt.classList.remove('loading');
          pt.classList.add('done');
          setTimeout(function() {
            window.location.href = dest;
          }, 180);
        }, 320);
      });
    });
  }

  /* Footer year */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
