/* ============================================================
   NIETO CARPENTRY — Main JS
   Zero dependencies. Vanilla ES6.
   Hero slideshow, parallax, staggered reveals.
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Header scroll state ---------- */
  var header = document.querySelector('.site-header');
  var lastScroll = 0;

  function onScroll() {
    var y = window.scrollY;
    if (y > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = y;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector('.menu-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('active');
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = header.offsetHeight + 16;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- Hero Slideshow ---------- */
  var slides = document.querySelectorAll('.hero-slide');
  var dots = document.querySelectorAll('.hero-dot');
  var currentSlide = 0;
  var slideInterval = 6000;
  var slideTimer;

  function goToSlide(index) {
    slides.forEach(function (slide) {
      slide.classList.remove('active');
      slide.style.animation = 'none';
    });
    dots.forEach(function (dot) {
      dot.classList.remove('active');
    });

    currentSlide = index;
    slides[currentSlide].classList.add('active');
    // Restart Ken Burns animation
    slides[currentSlide].offsetHeight; // force reflow
    slides[currentSlide].style.animation = '';
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    var next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  }

  if (slides.length > 1) {
    slideTimer = setInterval(nextSlide, slideInterval);

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        clearInterval(slideTimer);
        goToSlide(parseInt(this.dataset.slide, 10));
        slideTimer = setInterval(nextSlide, slideInterval);
      });
    });
  }

  /* ---------- Gallery Lightbox ---------- */
  var lightbox = document.querySelector('.lightbox');
  var lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  var lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

  if (lightbox && lightboxImg) {
    document.querySelectorAll('.gallery-item').forEach(function (item) {
      item.addEventListener('click', function () {
        var img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
          if (lightboxClose) lightboxClose.focus();
        }
      });

      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          item.click();
        }
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  /* ---------- Intersection Observer for staggered fade-in ---------- */
  var reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && reveals.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Parallax on scroll ---------- */
  var heroOverlay = document.querySelector('.hero-overlay');
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    var ticking = false;

    function updateParallax() {
      var scrollY = window.scrollY;
      var windowHeight = window.innerHeight;

      // Hero parallax — darken overlay as you scroll down
      if (heroOverlay && scrollY < windowHeight) {
        var progress = scrollY / windowHeight;
        heroOverlay.style.opacity = 1 + (progress * 0.3);
      }

      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

})();
