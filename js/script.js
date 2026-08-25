/* Bilingual Early Educators Alliance — site script
   No build step, no dependencies. Safe to run on every page.

   Progressive enhancement note: this file adds a "js" class to <html>
   as its very first action. CSS only hides/animates ".reveal" sections
   inside "html.js" — so if this script fails to load or errors out
   partway through, the page still shows all of its content instead of
   leaving sections blank. */
document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", function () {
  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    var navLinkEls = links.querySelectorAll("a");
    for (var i = 0; i < navLinkEls.length; i++) {
      navLinkEls[i].addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    }
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  /* ---------- Subtle scroll reveal ---------- */
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");

  if (!prefersReducedMotion && "IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            entries[i].target.classList.add("is-visible");
            observer.unobserve(entries[i].target);
          }
        }
      },
      { threshold: 0.12 }
    );
    for (var i = 0; i < revealEls.length; i++) { observer.observe(revealEls[i]); }
  } else {
    for (var i = 0; i < revealEls.length; i++) { revealEls[i].classList.add("is-visible"); }
  }

  /* ---------- Photo gallery lightbox ---------- */
  var galleries = document.querySelectorAll(".gallery-grid");
  if (galleries.length) {
    var overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Photo viewer");
    overlay.innerHTML =
      '<button class="lightbox-btn lightbox-close" aria-label="Close photo viewer">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
      '<button class="lightbox-btn lightbox-prev" aria-label="Previous photo">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 19l-7-7 7-7"/></svg></button>' +
      '<button class="lightbox-btn lightbox-next" aria-label="Next photo">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5l7 7-7 7"/></svg></button>' +
      '<figure class="lightbox-figure"><img alt=""><figcaption class="lightbox-caption"></figcaption></figure>';
    document.body.appendChild(overlay);

    var lbImg = overlay.querySelector("img");
    var lbCaption = overlay.querySelector(".lightbox-caption");
    var currentGroup = [];
    var currentIndex = 0;
    var lastFocused = null;

    function showIndex(i) {
      if (!currentGroup.length) return;
      currentIndex = (i + currentGroup.length) % currentGroup.length;
      var el = currentGroup[currentIndex];
      lbImg.src = el.getAttribute("src");
      lbImg.alt = el.getAttribute("alt") || "";
      lbCaption.textContent = el.getAttribute("alt") || "";
    }

    function openLightbox(gridEl, clickedImg) {
      currentGroup = Array.prototype.slice.call(gridEl.querySelectorAll("img"));
      currentIndex = currentGroup.indexOf(clickedImg);
      showIndex(currentIndex);
      lastFocused = document.activeElement;
      overlay.classList.add("open");
      overlay.querySelector(".lightbox-close").focus();
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      overlay.classList.remove("open");
      document.body.style.overflow = "";
      if (lastFocused) { lastFocused.focus(); }
    }

    for (var gi = 0; gi < galleries.length; gi++) {
      var grid = galleries[gi];
      var imgs = grid.querySelectorAll("img");
      for (var ii = 0; ii < imgs.length; ii++) {
        var im = imgs[ii];
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "gallery-item";
        btn.setAttribute("aria-label", "View larger photo: " + (im.getAttribute("alt") || "photo " + (ii + 1)));
        im.parentNode.insertBefore(btn, im);
        btn.appendChild(im);
        (function (gridRef, imgRef) {
          btn.addEventListener("click", function () { openLightbox(gridRef, imgRef); });
        })(grid, im);
      }
    }

    overlay.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    overlay.querySelector(".lightbox-prev").addEventListener("click", function () { showIndex(currentIndex - 1); });
    overlay.querySelector(".lightbox-next").addEventListener("click", function () { showIndex(currentIndex + 1); });
    overlay.addEventListener("click", function (e) { if (e.target === overlay) closeLightbox(); });
    document.addEventListener("keydown", function (e) {
      if (!overlay.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showIndex(currentIndex - 1);
      if (e.key === "ArrowRight") showIndex(currentIndex + 1);
    });
  }

  /* ---------- Contact form ----------
     GitHub Pages cannot run server-side code, so this form is wired to
     submit to Formspree (a free form backend: https://formspree.io).
     Until a real Formspree endpoint is added to the form's "action"
     attribute in contact.html, submissions are intercepted here and the
     visitor sees a friendly message instead of a broken request.
     See README.md → "Connecting the contact form" for setup steps. */
  var form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      var action = form.getAttribute("action") || "";
      var statusEl = form.querySelector(".form-status");
      var isConfigured = action.indexOf("formspree.io") !== -1;

      if (!isConfigured) {
        event.preventDefault();
        if (statusEl) {
          statusEl.textContent =
            "This form isn't connected yet. See README.md for how to connect a free form service.";
          statusEl.className = "form-status error";
        }
        return;
      }

      event.preventDefault();
      if (statusEl) {
        statusEl.textContent = "Sending your message…";
        statusEl.className = "form-status";
      }

      fetch(action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            if (statusEl) {
              statusEl.textContent = "Thank you — your message has been sent.";
              statusEl.className = "form-status success";
            }
          } else {
            throw new Error("Form service returned an error.");
          }
        })
        .catch(function () {
          if (statusEl) {
            statusEl.textContent =
              "Something went wrong sending your message. Please try again or email us directly.";
            statusEl.className = "form-status error";
          }
        });
    });
  }
});
