/* ============================================
   GARH PANCHKOT ECO TOURISM II - SCRIPTS
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  // =====================================
  // PRELOADER
  // =====================================
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("loaded");
      setTimeout(() => (preloader.style.display = "none"), 600);
    }, 800);
  });

  // =====================================
  // CUSTOM CURSOR
  // =====================================
  const cursorDot = document.getElementById("cursorDot");
  const cursorRing = document.getElementById("cursorRing");
  let mouseX = 0,
    mouseY = 0;
  let ringX = 0,
    ringY = 0;

  if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + "px";
      cursorDot.style.top = mouseY + "px";
    });

    function animateCursor() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = ringX + "px";
      cursorRing.style.top = ringY + "px";
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    const hoverables = document.querySelectorAll(
      "a, button, .gallery-item, .room-card, .amenity-card, input, select",
    );
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", () =>
        document.body.classList.add("cursor-hover"),
      );
      el.addEventListener("mouseleave", () =>
        document.body.classList.remove("cursor-hover"),
      );
    });
  }

  // =====================================
  // NAVBAR
  // =====================================
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const navAnchors = document.querySelectorAll(".nav-link");

  // Scroll handler
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 80) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    lastScroll = currentScroll;

    // Back to top
    const backToTop = document.getElementById("backToTop");
    if (currentScroll > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }

    // Active nav link
    updateActiveNavLink();
  });

  // Mobile menu
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
  });

  navAnchors.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
    });
  });

  // Active nav link based on scroll
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 200;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navAnchors.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("data-section") === sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  // Back to top
  document.getElementById("backToTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // =====================================
  // HERO SLIDER
  // =====================================
  const slides = document.querySelectorAll(".hero-slide");
  const sliderDots = document.getElementById("sliderDots");
  let currentSlide = 0;
  let slideInterval;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.classList.add("slider-dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    sliderDots.appendChild(dot);
  });

  function goToSlide(index) {
    slides[currentSlide].classList.remove("active");
    document
      .querySelectorAll(".slider-dot")
      [currentSlide].classList.remove("active");
    currentSlide = index;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    slides[currentSlide].classList.add("active");
    document
      .querySelectorAll(".slider-dot")
      [currentSlide].classList.add("active");
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  document.getElementById("sliderNext").addEventListener("click", () => {
    nextSlide();
    resetSlideInterval();
  });

  document.getElementById("sliderPrev").addEventListener("click", () => {
    prevSlide();
    resetSlideInterval();
  });

  function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }

  slideInterval = setInterval(nextSlide, 5000);

  // =====================================
  // HERO PARTICLES
  // =====================================
  const particlesContainer = document.getElementById("particles");
  function createParticle() {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    const size = Math.random() * 6 + 2;
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration = Math.random() * 10 + 8 + "s";
    particle.style.animationDelay = Math.random() * 5 + "s";
    particlesContainer.appendChild(particle);

    setTimeout(() => particle.remove(), 20000);
  }

  // Create initial particles
  for (let i = 0; i < 20; i++) {
    setTimeout(createParticle, i * 300);
  }
  setInterval(createParticle, 1500);

  // =====================================
  // COUNTER ANIMATION
  // =====================================
  const counters = document.querySelectorAll(".strip-number");
  let counterStarted = false;

  function animateCounters() {
    counters.forEach((counter) => {
      const target = parseFloat(counter.getAttribute("data-count"));
      const isDecimal = target % 1 !== 0;
      const duration = 2000;
      const start = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const current = target * easedProgress;

        if (isDecimal) {
          counter.textContent = current.toFixed(1);
        } else {
          counter.textContent = Math.floor(current);
        }

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      }
      requestAnimationFrame(updateCounter);
    });
  }

  // =====================================
  // GALLERY FILTER
  // =====================================
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      galleryItems.forEach((item) => {
        const category = item.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          item.classList.remove("hidden");
          item.style.animation = "fadeUp 0.5s ease forwards";
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });

  // =====================================
  // LIGHTBOX
  // =====================================
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  let currentLightboxIndex = 0;
  let visibleGalleryItems = [];

  function updateVisibleItems() {
    visibleGalleryItems = [...galleryItems].filter(
      (item) => !item.classList.contains("hidden"),
    );
  }

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      updateVisibleItems();
      currentLightboxIndex = visibleGalleryItems.indexOf(item);
      openLightbox();
    });
  });

  function openLightbox() {
    const item = visibleGalleryItems[currentLightboxIndex];
    const img = item.querySelector("img");
    const title = item.querySelector(".gallery-item-title");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = title ? title.textContent : "";
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  document
    .getElementById("lightboxClose")
    .addEventListener("click", closeLightbox);
  document.getElementById("lightboxPrev").addEventListener("click", () => {
    currentLightboxIndex =
      (currentLightboxIndex - 1 + visibleGalleryItems.length) %
      visibleGalleryItems.length;
    openLightbox();
  });
  document.getElementById("lightboxNext").addEventListener("click", () => {
    currentLightboxIndex =
      (currentLightboxIndex + 1) % visibleGalleryItems.length;
    openLightbox();
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") {
      currentLightboxIndex =
        (currentLightboxIndex - 1 + visibleGalleryItems.length) %
        visibleGalleryItems.length;
      openLightbox();
    }
    if (e.key === "ArrowRight") {
      currentLightboxIndex =
        (currentLightboxIndex + 1) % visibleGalleryItems.length;
      openLightbox();
    }
  });

  // =====================================
  // TESTIMONIAL SLIDER
  // =====================================
  const testimonialTrack = document.getElementById("testimonialTrack");
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  let currentTestimonial = 0;

  function getTestimonialsPerView() {
    return window.innerWidth > 768 ? 2 : 1;
  }

  function updateTestimonialSlider() {
    const perView = getTestimonialsPerView();
    const maxIndex = Math.max(0, testimonialCards.length - perView);
    if (currentTestimonial > maxIndex) currentTestimonial = maxIndex;
    const cardWidth = testimonialCards[0].offsetWidth + 30; // 30 = gap
    testimonialTrack.style.transform = `translateX(-${currentTestimonial * cardWidth}px)`;
  }

  document.getElementById("testNext").addEventListener("click", () => {
    const perView = getTestimonialsPerView();
    const maxIndex = Math.max(0, testimonialCards.length - perView);
    if (currentTestimonial < maxIndex) {
      currentTestimonial++;
      updateTestimonialSlider();
    }
  });

  document.getElementById("testPrev").addEventListener("click", () => {
    if (currentTestimonial > 0) {
      currentTestimonial--;
      updateTestimonialSlider();
    }
  });

  window.addEventListener("resize", updateTestimonialSlider);

  // Auto play testimonials
  setInterval(() => {
    const perView = getTestimonialsPerView();
    const maxIndex = Math.max(0, testimonialCards.length - perView);
    currentTestimonial++;
    if (currentTestimonial > maxIndex) currentTestimonial = 0;
    updateTestimonialSlider();
  }, 6000);

  // =====================================
  // SCROLL REVEAL ANIMATIONS
  // =====================================
  const revealElements = document.querySelectorAll(
    ".reveal-left, .reveal-right, .reveal-up",
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // Counter animation on scroll
  const stripSection = document.querySelector(".experience-strip");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !counterStarted) {
          counterStarted = true;
          animateCounters();
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  if (stripSection) counterObserver.observe(stripSection);

  // =====================================
  // BOOKING FORM
  // =====================================
  const bookingForm = document.getElementById("bookingForm");
  const checkInInput = document.getElementById("checkIn");
  const checkOutInput = document.getElementById("checkOut");

  // Set minimum date to today
  const today = new Date().toISOString().split("T")[0];
  checkInInput.min = today;
  checkOutInput.min = today;

  checkInInput.addEventListener("change", () => {
    const nextDay = new Date(checkInInput.value);
    nextDay.setDate(nextDay.getDate() + 1);
    checkOutInput.min = nextDay.toISOString().split("T")[0];
    if (checkOutInput.value && checkOutInput.value <= checkInInput.value) {
      checkOutInput.value = nextDay.toISOString().split("T")[0];
    }
  });

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById("guestName").value,
      email: document.getElementById("guestEmail").value,
      phone: document.getElementById("guestPhone").value,
      roomType: document.getElementById("roomType").value,
      checkIn: checkInInput.value,
      checkOut: checkOutInput.value,
      guests: document.getElementById("guests").value,
      specialRequest: document.getElementById("specialRequest").value,
    };

    // Show success message
    const btn = bookingForm.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = "<span>✓ Booking Request Sent!</span>";
    btn.style.background = "var(--color-primary)";
    btn.style.color = "white";

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = "";
      btn.style.color = "";
      bookingForm.reset();
    }, 3000);

    // Construct WhatsApp message
    const message = `🏔️ *Booking Request - Garh Panchkot Eco Tourism II*\n\n👤 Name: ${formData.name}\n📧 Email: ${formData.email}\n📞 Phone: ${formData.phone}\n🛏️ Room: ${formData.roomType}\n📅 Check-in: ${formData.checkIn}\n📅 Check-out: ${formData.checkOut}\n👥 Guests: ${formData.guests}\n📝 Special Request: ${formData.specialRequest || "None"}`;

    console.log("Booking submitted:", formData);
  });

  // =====================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // =====================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // =====================================
  // PARALLAX EFFECT ON HERO
  // =====================================
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      const heroContent = document.querySelector(".hero-content");
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - scrolled / (window.innerHeight * 0.8);
      }
    }
  });

  // =====================================
  // IMAGE LAZY LOADING WITH FADE
  // =====================================
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach((img) => {
    img.style.opacity = "0";
    img.style.transition = "opacity 0.5s ease";
    if (img.complete) {
      img.style.opacity = "1";
    } else {
      img.addEventListener("load", () => {
        img.style.opacity = "1";
      });
    }
  });
});
