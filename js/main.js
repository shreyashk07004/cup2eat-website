/* =====================================================================
   CUP2EAT — main.js
   Builds the content sections from js/content.js and wires up:
   navbar, mobile menu, reveal + count-up, parallax, journey scroller,
   feedback slider, FAQ accordion, enquiry form → WhatsApp, toasts.
   No libraries. You normally don't need to edit this file.
   ===================================================================== */
(function () {
  'use strict';

  var C = window.CUP2EAT;
  if (!C) { console.warn('CUP2EAT: content.js did not load'); return; }

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- helpers ---------- */
  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function isPlaceholder(v) { return typeof v === 'string' && v.indexOf('[[') === 0; }
  /* Text that may be a [[PLACEHOLDER]]: render placeholders with a visible marker */
  function txt(v) { return isPlaceholder(v) ? '<em class="ph">' + esc(v) + '</em>' : esc(v); }
  function waLink(message) {
    return 'https://wa.me/' + C.contact.phoneIntl + '?text=' + encodeURIComponent(message);
  }
  function rupees(n) { return '₹' + Number(n).toLocaleString('en-IN'); }
  function icon(name, cls) {
    return '<svg class="icon' + (cls ? ' ' + cls : '') + '" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
  }
  var RULE = '<span class="rule" aria-hidden="true"><i></i><b></b><i></i></span>';
  var CHIP_ICON = { 'Coffee': 'coffee', 'Chai': 'chai', 'Masala chai': 'chai', 'Kadak chai': 'chai',
    'Ice cream': 'cone', 'Desserts': 'cone', 'Events': 'heart' };

  /* ---------- 1. Contact bindings (phone, links, FSSAI no.) ---------- */
  $$('[data-wa]').forEach(function (a) { a.href = waLink(a.getAttribute('data-wa') || C.whatsappDefault); });
  $$('[data-tel]').forEach(function (a) { a.href = 'tel:+' + C.contact.phoneIntl; });
  $$('[data-instagram]').forEach(function (a) { a.href = C.contact.instagram; });
  $$('[data-bind]').forEach(function (el) {
    var v = C.contact[el.getAttribute('data-bind')];
    if (v !== undefined && v !== '') el.innerHTML = txt(v);
  });
  var cat = $('#catalogueLink');
  if (cat) {
    cat.innerHTML = isPlaceholder(C.contact.catalogueLink)
      ? txt(C.contact.catalogueLink)
      : '<a href="' + esc(C.contact.catalogueLink) + '" target="_blank" rel="noopener">Download the catalogue (PDF)</a>';
  }
  var foot = $('#pricingFootnote');
  if (foot) foot.textContent = C.pricingFootnote;

  /* ---------- 2. Flavour cards ---------- */
  var grid = $('#productGrid');
  if (grid) {
    grid.innerHTML = C.products.map(function (p, i) {
      var msg = "Hi CUP2EAT! I'd like to enquire about the " + p.name + '.';
      return '' +
        '<article class="product reveal" style="--i:' + i + '">' +
          '<!-- REPLACE: ' + esc(p.image) + ' with a real product photo -->' +
          '<div class="product__media"><img src="' + esc(p.image) + '" data-placeholder="true" width="480" height="480" loading="lazy" alt="' + esc(p.alt) + '"></div>' +
          '<h3>' + esc(p.name) + '</h3>' +
          '<span><span class="flavour-pill flavour-pill--' + esc(p.pill) + '">' + esc(p.pillLabel) + '</span></span>' +
          '<p>' + txt(p.description) + '</p>' +
          '<ul class="chips" aria-label="Best for"><li class="chips__label">Best for</li>' +
            p.bestFor.map(function (b) { return '<li class="chip">' + icon(CHIP_ICON[b] || 'check') + esc(b) + '</li>'; }).join('') +
          '</ul>' +
          '<a class="btn btn--emerald btn--sm" href="' + waLink(msg) + '" target="_blank" rel="noopener">' +
            icon('chat') + 'Enquire<span class="sr-only"> about ' + esc(p.name) + ' on WhatsApp</span></a>' +
        '</article>';
    }).join('');
  }

  /* ---------- 3. Pricing cards ---------- */
  var pgrid = $('#pricingGrid');
  if (pgrid) {
    pgrid.innerHTML = C.pricing.map(function (p, i) {
      var numeric = typeof p.price === 'number';
      var priceHtml, perCup = '', meta = '';
      if (numeric) {
        priceHtml = '<div class="price" data-count="' + p.price + '" aria-label="' + rupees(p.price) + '">' + rupees(p.price) + '</div>';
        if (p.cups) {
          meta = '<p class="price__meta">for ' + p.cups + ' cups</p>';
          var per = p.price / p.cups;
          var perTxt = Math.abs(per - Math.round(per)) < 0.005 ? '₹' + Math.round(per) : '≈ ₹' + per.toFixed(2);
          perCup = '<span class="price__per">Price per cup: ' + perTxt + '</span>';
        }
      } else {
        priceHtml = '<div class="price price--text">' + txt(p.price) + '</div>';
      }
      var msg = numeric
        ? "Hi CUP2EAT! I'm interested in the " + p.name + ' (' + rupees(p.price) + ' for ' + p.cups + ' cups).'
        : "Hi CUP2EAT! I'd like to order a " + p.name + '.';
      return '' +
        '<article class="pricing-card' + (p.featured ? ' pricing-card--featured' : '') + ' reveal" style="--i:' + i + '">' +
          (p.ribbon ? '<span class="ribbon">' + esc(p.ribbon) + '</span>' : '') +
          '<h3>' + esc(p.name) + '</h3>' +
          '<p class="pricing-card__tag">' + esc(p.tagline) + '</p>' +
          priceHtml + meta + perCup +
          '<ul>' + p.features.map(function (f) { return '<li>' + icon('check') + '<span>' + txt(f) + '</span></li>'; }).join('') + '</ul>' +
          '<a class="btn ' + (p.featured ? 'btn--gold' : 'btn--ghost') + '" href="' + waLink(msg) + '" target="_blank" rel="noopener">' +
            icon('chat') + esc(p.cta) + '</a>' +
        '</article>';
    }).join('');
  }

  /* ---------- 4. Journey timeline ---------- */
  var tl = $('#timeline');
  if (tl) {
    tl.innerHTML = C.journey.map(function (j) {
      return '<li class="moment"><figure>' +
        '<!-- REPLACE: ' + esc(j.image) + ' with the real event photo -->' +
        '<img src="' + esc(j.image) + '" data-placeholder="true" width="800" height="600" loading="lazy" alt="' + esc(j.alt) + '">' +
        '<figcaption><span class="moment__tag">' + esc(j.tag) + '</span>' + txt(j.caption) + '</figcaption>' +
        '</figure></li>';
    }).join('');
    var step = function () { var m = $('.moment', tl); return m ? m.getBoundingClientRect().width + 20 : 300; };
    var prev = $('#tlPrev'), next = $('#tlNext');
    var syncTl = function () {
      prev.disabled = tl.scrollLeft < 4;
      next.disabled = tl.scrollLeft + tl.clientWidth >= tl.scrollWidth - 4;
    };
    prev.addEventListener('click', function () { tl.scrollBy({ left: -step(), behavior: reduceMotion ? 'auto' : 'smooth' }); });
    next.addEventListener('click', function () { tl.scrollBy({ left: step(), behavior: reduceMotion ? 'auto' : 'smooth' }); });
    tl.addEventListener('scroll', syncTl, { passive: true });
    tl.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); next.click(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev.click(); }
    });
    window.addEventListener('resize', syncTl);
    syncTl();
  }

  /* ---------- 5. Feedback slider (arrows, dots, keyboard, swipe) ---------- */
  var track = $('#sliderTrack');
  if (track) {
    track.innerHTML = C.reviews.map(function (r, i) {
      return '<div class="review" role="group" aria-roledescription="slide" aria-label="' + (i + 1) + ' of ' + C.reviews.length + '">' +
        '<!-- REPLACE: sample review, replace with real customer feedback -->' +
        '<div class="review__card">' +
          '<span class="review__mark" aria-hidden="true">“</span>' +
          (r.sample ? '<span class="review__sample">Sample review: replace with real customer feedback</span>' : '') +
          '<blockquote>' + txt(r.quote) + '</blockquote>' +
          '<cite>' + txt(r.name) + '<span>' + txt(r.role) + '</span></cite>' +
        '</div></div>';
    }).join('');

    var slides = $$('.review', track), dotsWrap = $('#sliderDots'), idx = 0;
    dotsWrap.innerHTML = slides.map(function (_, i) {
      return '<button class="dot" type="button" aria-label="Show review ' + (i + 1) + '"></button>';
    }).join('');
    var dots = $$('.dot', dotsWrap);
    var go = function (n) {
      idx = (n + slides.length) % slides.length;
      track.style.transform = 'translateX(' + (-idx * 100) + '%)';
      dots.forEach(function (d, i) { d.setAttribute('aria-current', i === idx ? 'true' : 'false'); });
      slides.forEach(function (s, i) { s.setAttribute('aria-hidden', i === idx ? 'false' : 'true'); });
    };
    $('#slPrev').addEventListener('click', function () { go(idx - 1); });
    $('#slNext').addEventListener('click', function () { go(idx + 1); });
    dots.forEach(function (d, i) { d.addEventListener('click', function () { go(i); }); });
    var vp = $('.slider__viewport');
    vp.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(idx + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(idx - 1); }
    });
    /* swipe / drag */
    var startX = null, dx = 0, width = 1;
    vp.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      startX = e.clientX; dx = 0; width = vp.clientWidth || 1;
      track.classList.add('is-dragging');
    });
    vp.addEventListener('pointermove', function (e) {
      if (startX === null) return;
      dx = e.clientX - startX;
      track.style.transform = 'translateX(calc(' + (-idx * 100) + '% + ' + dx + 'px))';
    });
    var end = function () {
      if (startX === null) return;
      track.classList.remove('is-dragging');
      if (Math.abs(dx) > Math.min(60, width * 0.15)) go(idx + (dx < 0 ? 1 : -1)); else go(idx);
      startX = null;
    };
    vp.addEventListener('pointerup', end);
    vp.addEventListener('pointercancel', end);
    vp.addEventListener('pointerleave', end);
    go(0);
  }

  /* ---------- 6. FAQ accordion ---------- */
  var faq = $('#faqList');
  if (faq) {
    faq.innerHTML = C.faq.map(function (f, i) {
      return '<div class="faq__item reveal" style="--i:' + Math.min(i, 4) + '">' +
        '<h3><button class="faq__btn" type="button" id="faq-b' + i + '" aria-expanded="false" aria-controls="faq-p' + i + '">' +
          '<span>' + esc(f.q) + '</span><span class="medallion" aria-hidden="true">' + icon('plus') + '</span></button></h3>' +
        '<div class="faq__panel" id="faq-p' + i + '" role="region" aria-labelledby="faq-b' + i + '"><div><p>' + txt(f.a) + '</p></div></div>' +
        '</div>';
    }).join('');
    $$('.faq__btn', faq).forEach(function (b) {
      b.addEventListener('click', function () {
        var open = b.getAttribute('aria-expanded') === 'true';
        b.setAttribute('aria-expanded', open ? 'false' : 'true');
      });
    });
  }

  /* ---------- 7. Navbar: solid after 80px, back-to-top after 600px ---------- */
  var nav = $('#nav'), toTop = $('#toTop');
  var onScroll = function () {
    var y = window.scrollY;
    nav.classList.toggle('is-solid', y > 80);
    toTop.classList.toggle('is-visible', y > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    $('.brand').focus({ preventScroll: true });
  });

  /* ---------- 8. Mobile menu: click, Esc, outside tap ---------- */
  var menu = $('#menu'), openBtn = $('#menuOpen'), closeBtn = $('#menuClose');
  var setMenu = function (open) {
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('menu-open', open);
    menu.inert = !open;
    if (open) { closeBtn.focus(); } else { openBtn.focus({ preventScroll: true }); }
  };
  menu.inert = true;
  openBtn.addEventListener('click', function () { setMenu(true); });
  closeBtn.addEventListener('click', function () { setMenu(false); });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  /* outside tap: anywhere on the overlay that isn't a link/button */
  menu.addEventListener('click', function (e) {
    if (!e.target.closest('a, button, .menu__list li')) { setMenu(false); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) { setMenu(false); }
    /* keep Tab focus inside the open menu */
    if (e.key === 'Tab' && menu.classList.contains('is-open')) {
      var f = $$('a, button', menu), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024 && menu.classList.contains('is-open')) { setMenu(false); }
  });

  /* ---------- 9. Reveal on scroll + price count-up ---------- */
  function countUp(el) {
    var target = Number(el.getAttribute('data-count')), t0 = null, dur = 1200;
    var tick = function (t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
      el.textContent = rupees(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        if (!reduceMotion) $$('[data-count]', en.target).forEach(countUp);
        io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- 10. Gentle parallax on beans (desktop only, ≤20px) ---------- */
  var para = $$('[data-parallax]');
  if (!reduceMotion && para.length && window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches) {
    var ticking = false;
    var applyPara = function () {
      var vh = window.innerHeight;
      para.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var progress = ((r.top + r.height / 2) - vh / 2) / vh; // ~ -1 … 1
        var amt = Math.max(-20, Math.min(20, -progress * Number(el.getAttribute('data-parallax'))));
        el.style.transform = 'translateY(' + amt.toFixed(1) + 'px)';
      });
      ticking = false;
    };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(applyPara); } }, { passive: true });
    applyPara();
  }

  /* ---------- 11. Toast ---------- */
  var toastEl = $('#toast'), toastTimer;
  function toast(msg) {
    toastEl.innerHTML = icon('chat') + '<span>' + esc(msg) + '</span>';
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-visible'); }, 4000);
  }

  /* ---------- 12. Enquiry form → WhatsApp ---------- */
  var form = $('#enquiryForm');
  if (form) {
    var rules = {
      name: function (v) { return v.length >= 2 ? '' : 'Please enter your name.'; },
      city: function (v) { return v.length >= 2 ? '' : 'Please enter your city.'; },
      phone: function (v) {
        var d = v.replace(/[\s\-()]/g, '').replace(/^(\+?91|0)(?=\d{10}$)/, '');
        return /^[6-9]\d{9}$/.test(d) ? '' : 'Enter a valid 10-digit Indian mobile number.';
      },
      type: function (v) { return v ? '' : 'Please choose your business type.'; },
      pack: function (v) { return v ? '' : 'Please choose a pack.'; }
    };
    var validateField = function (name) {
      var el = form.elements[name], msg = rules[name](el.value.trim());
      var field = el.closest('.field');
      field.classList.toggle('has-error', !!msg);
      el.setAttribute('aria-invalid', msg ? 'true' : 'false');
      $('#e-' + name).textContent = msg;
      return !msg;
    };
    Object.keys(rules).forEach(function (n) {
      var el = form.elements[n];
      el.addEventListener('blur', function () { if (el.value) validateField(n); });
      el.addEventListener('input', function () { if (el.closest('.field').classList.contains('has-error')) validateField(n); });
      el.addEventListener('change', function () { if (el.closest('.field').classList.contains('has-error')) validateField(n); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstBad = null;
      Object.keys(rules).forEach(function (n) { if (!validateField(n) && !firstBad) firstBad = form.elements[n]; });
      if (firstBad) { firstBad.focus(); return; }

      var v = function (n) { return form.elements[n].value.trim() || '-'; };
      var flavours = $$('input[name="flavours"]:checked', form).map(function (c) { return c.value; }).join(', ') || '-';
      var message = [
        "Hi CUP2EAT! I'd like to place an enquiry.",
        'Name: ' + v('name'),
        'Business: ' + v('business'),
        'City: ' + v('city'),
        'Phone: ' + v('phone'),
        'Type: ' + v('type'),
        'Pack: ' + v('pack'),
        'Flavours: ' + flavours,
        'Notes: ' + v('notes')
      ].join('\n');

      toast("Opening WhatsApp… we'll reply shortly!");
      var url = waLink(message);
      var win = window.open(url, '_blank');
      if (win) { win.opener = null; }
      else { setTimeout(function () { window.location.href = url; }, 600); } // pop-up blocked: open in this tab
    });
  }
})();
