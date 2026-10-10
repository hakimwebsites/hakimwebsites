/* =====================================================================
   Hakim Digital Studio — shared behaviour
   Mobile menu, WhatsApp/email links, prices, footer year, reveal, contact form.
   ===================================================================== */
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};
  document.documentElement.classList.add("js");

  /* ---------- WhatsApp helpers ---------- */
  function numberIsValid() {
    return /^[1-9]\d{7,14}$/.test(String(CFG.whatsappNumber || ""));
  }

  // Build a wa.me link. The message is URL-encoded so spaces, commas, "&" etc. are safe.
  function waLink(message) {
    var text = message || CFG.defaultWhatsAppMessage || "";
    return "https://wa.me/" + CFG.whatsappNumber + "?text=" + encodeURIComponent(text);
  }

  var warned = false;
  function initWhatsApp() {
    var links = document.querySelectorAll("[data-wa]");
    links.forEach(function (a) {
      if (numberIsValid()) {
        a.setAttribute("href", waLink(a.getAttribute("data-wa-message")));
      } else {
        a.setAttribute("href", "index.html#contact");
        a.removeAttribute("target");
        if (!warned) {
          console.warn("[Hakim Digital Studio] whatsappNumber in js/config.js is not set. Use digits only, e.g. 971558311047.");
          warned = true;
        }
      }
    });
  }

  function initEmail() {
    if (!CFG.email) { return; }
    document.querySelectorAll("[data-email-link]").forEach(function (a) {
      var subject = a.getAttribute("data-email-subject") || "Website enquiry";
      a.setAttribute("href", "mailto:" + CFG.email + "?subject=" + encodeURIComponent(subject));
    });
    document.querySelectorAll("[data-email-text]").forEach(function (el) { el.textContent = CFG.email; });
  }

  function initPrices() {
    var p = CFG.prices || {};
    document.querySelectorAll("[data-price]").forEach(function (el) {
      var v = p[el.getAttribute("data-price")];
      if (typeof v === "number") { el.textContent = v.toLocaleString("en-US"); }
    });
  }

  /* ---------- Mobile navigation ---------- */
  function initNav() {
    var toggle = document.getElementById("menuToggle");
    var nav = document.getElementById("siteNav");
    if (!toggle || !nav) { return; }
    var label = toggle.querySelector(".menu-label");

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (label) { label.textContent = open ? "Close" : "Menu"; }
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
    });
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("is-open") && !nav.contains(e.target) && !toggle.contains(e.target)) { setOpen(false); }
    });
    window.addEventListener("resize", function () { if (window.innerWidth > 920) { setOpen(false); } });
  }

  /* ---------- Footer year ---------- */
  function initYear() {
    var y = new Date().getFullYear();
    document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = y; });
  }

  /* ---------- Scroll reveal (restrained, respects reduced motion) ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!("IntersectionObserver" in window) || reduce) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); obs.unobserve(en.target); }
      });
    }, { threshold: 0.1 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Contact form ---------- */
  function initContactForm() {
    var form = document.getElementById("enquiryForm");
    if (!form) { return; }
    var status = document.getElementById("formStatus");
    var emailBtn = document.getElementById("emailEnquiry");
    var usesEndpoint = !!CFG.formEndpoint;
    var note = document.getElementById("formNote");
    if (note && usesEndpoint) {
      note.innerHTML = 'Your enquiry is sent to my form service and I use your details only to reply. See the <a class="text-link" href="privacy.html">Privacy Policy</a>.';
    }

    function show(msg, isError) {
      status.textContent = msg;
      status.className = "form-status is-visible" + (isError ? " is-error" : "");
    }

    function val(name) {
      var el = form.elements[name];
      return el ? String(el.value).trim() : "";
    }

    function buildMessage() {
      var lines = [
        "Hello Hakim Digital Studio, I would like a quotation.",
        "",
        "Name: " + val("name"),
        "Business type: " + (val("business") || "Not specified"),
        "Service: " + (val("service") || "Not specified"),
        "Budget range: " + (val("budget") || "Not specified"),
        (val("email") ? "Email: " + val("email") : ""),
        "",
        "About my project:",
        val("message")
      ];
      return lines.join("\n");
    }

    // Button: "Send by email"
    if (emailBtn) {
      emailBtn.addEventListener("click", function () {
        if (!form.reportValidity()) { return; }
        var url = "mailto:" + CFG.email +
          "?subject=" + encodeURIComponent("Website enquiry from " + val("name")) +
          "&body=" + encodeURIComponent(buildMessage());
        window.location.href = url;
        show("Your email app should open with the enquiry filled in. Press send there to deliver it.", false);
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) { return; }
      if (val("website")) { return; } // honeypot field: real people leave it empty

      if (usesEndpoint) {
        var data = {
          name: val("name"), email: val("email"), business: val("business"),
          service: val("service"), budget: val("budget"), message: val("message")
        };
        show("Sending…", false);
        fetch(CFG.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(data)
        }).then(function (r) {
          if (!r.ok) { throw new Error("HTTP " + r.status); }
          form.reset();
          show("Thank you — your enquiry has been sent. I will reply as soon as I can.", false);
        }).catch(function () {
          show("Sorry, the form could not send your enquiry. Please use the WhatsApp or email buttons instead.", true);
        });
        return;
      }

      // No form service configured: hand the enquiry to WhatsApp (works on a static site).
      if (!numberIsValid()) {
        show("WhatsApp is not configured yet. Please use the email button instead.", true);
        return;
      }
      var url = waLink(buildMessage());
      var w = window.open(url, "_blank", "noopener");
      if (w) {
        show("WhatsApp should open with your enquiry filled in. Nothing is sent until you press send there.", false);
      } else {
        status.innerHTML = "";
        var a = document.createElement("a");
        a.href = url; a.target = "_blank"; a.rel = "noopener"; a.className = "text-link";
        a.textContent = "Open WhatsApp with my enquiry";
        status.className = "form-status is-visible";
        status.appendChild(a);
      }
    });
  }

  /* ---------- Start ---------- */
  window.HDS = { waLink: waLink, refresh: function () { initWhatsApp(); initEmail(); initPrices(); } };

  function start() {
    initWhatsApp(); initEmail(); initPrices(); initNav(); initYear(); initReveal(); initContactForm();
  }
  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", start); } else { start(); }
})();
