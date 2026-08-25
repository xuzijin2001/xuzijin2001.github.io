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
