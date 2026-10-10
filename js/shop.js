/* =====================================================================
   Shop pages — renders the catalogue (shop.html) and a single product (product.html)
   from the PRODUCTS list in products.js. No payments are processed here.
   ===================================================================== */
(function () {
  "use strict";

  var PRODUCTS = window.PRODUCTS || [];

  function el(tag, className, text) {
    var n = document.createElement(tag);
    if (className) { n.className = className; }
    if (text !== undefined) { n.textContent = text; }
    return n;
  }
  function fmt(n) { return Number(n).toLocaleString("en-US"); }
  function enquiry(p) {
    return "Hello Hakim Digital Studio, I am interested in the sample product \"" + p.name + "\" (AED " + fmt(p.price) + "). Could you tell me when it will be available?";
  }

  /* ----- Catalogue ----- */
  function renderGrid() {
    var grid = document.getElementById("productGrid");
    if (!grid) { return; }
    grid.textContent = "";
    PRODUCTS.forEach(function (p) {
      var card = el("article", "product reveal");

      var imgWrap = el("div", "product-img");
      var img = el("img");
      img.src = p.preview; img.alt = p.previewAlt || p.name;
      img.width = 800; img.height = 600; img.loading = "lazy";
      imgWrap.appendChild(img);

      var body = el("div", "product-body");
      var tags = el("div", "tag-row");
      tags.appendChild(el("span", "tag", p.type));
      tags.appendChild(el("span", "tag tag--concept", "Sample product"));
      body.appendChild(tags);
      body.appendChild(el("h3", "", p.name));
      body.appendChild(el("p", "", p.short));

      var foot = el("div", "product-foot");
      var price = el("span", "price");
      price.appendChild(el("small", "", "AED"));
      price.appendChild(document.createTextNode(fmt(p.price)));
      foot.appendChild(price);
      var link = el("a", "btn btn-outline", "View details");
      link.href = "product.html?id=" + encodeURIComponent(p.id);
      link.setAttribute("aria-label", "View details for " + p.name);
      foot.appendChild(link);
      body.appendChild(foot);

      card.appendChild(imgWrap);
      card.appendChild(body);
      grid.appendChild(card);
    });
    if (window.HDS) { window.HDS.refresh(); }
    document.querySelectorAll(".reveal").forEach(function (n) { n.classList.add("is-visible"); });
  }

  /* ----- Single product ----- */
  function renderDetail() {
    var root = document.getElementById("productDetail");
    if (!root) { return; }
    var id = new URLSearchParams(window.location.search).get("id");
    var p = PRODUCTS.filter(function (x) { return x.id === id; })[0];
    root.textContent = "";

    if (!p) {
      document.title = "Product not found | Hakim Digital Studio";
      var box = el("div", "banner");
      box.appendChild(el("strong", "", "Product not found. "));
      box.appendChild(document.createTextNode("That product is not in the catalogue. "));
      var back = el("a", "text-link", "Back to the shop");
      back.href = "shop.html";
      box.appendChild(back);
      root.appendChild(box);
      return;
    }

    document.title = p.name + " | Hakim Digital Studio Shop";
    var meta = document.querySelector('meta[name="description"]');
    if (meta) { meta.setAttribute("content", p.short + " Sample product — Hakim Digital Studio."); }

    var crumbs = el("p", "crumbs");
    var c1 = el("a", "", "Shop"); c1.href = "shop.html";
    crumbs.appendChild(c1);
    crumbs.appendChild(document.createTextNode("  /  " + p.name));
    root.appendChild(crumbs);

    var grid = el("div", "detail-grid");

    var imgWrap = el("div", "detail-img");
    var img = el("img"); img.src = p.preview; img.alt = p.previewAlt || p.name; img.width = 800; img.height = 600;
    imgWrap.appendChild(img);

    var info = el("div", "detail");
    var tags = el("div", "tag-row");
    tags.appendChild(el("span", "tag", p.type));
    tags.appendChild(el("span", "tag tag--concept", "Sample product"));
    info.appendChild(tags);
    info.appendChild(el("h1", "", p.name));
    info.appendChild(el("p", "lede", p.short));
    var price = el("span", "price");
    price.appendChild(el("small", "", "AED"));
    price.appendChild(document.createTextNode(fmt(p.price)));
    info.appendChild(price);

    info.appendChild(el("p", "", p.description));

    info.appendChild(el("h2", "", "What you receive"));
    var ul = el("ul", "plain");
    p.includes.forEach(function (t) { ul.appendChild(el("li", "", t)); });
    info.appendChild(ul);

    info.appendChild(el("h2", "", "Format"));
    info.appendChild(el("p", "", p.format));

    var notice = el("div", "banner");
    notice.appendChild(el("strong", "", "Not for sale yet. "));
    notice.appendChild(document.createTextNode("This is a sample listing. Online checkout is not set up, and paid files will only be delivered through a secure process once payments are live. Licence and refund terms will be published before any sales."));
    info.appendChild(notice);

    var row = el("div", "btn-row");
    var wa = el("a", "btn btn-primary", "Ask about this product on WhatsApp");
    wa.setAttribute("data-wa", ""); wa.setAttribute("data-wa-message", enquiry(p));
    wa.target = "_blank"; wa.rel = "noopener"; wa.href = "#";
    var back2 = el("a", "btn btn-outline", "Back to the shop"); back2.href = "shop.html";
    row.appendChild(wa); row.appendChild(back2);
    info.appendChild(row);

    grid.appendChild(imgWrap);
    grid.appendChild(info);
    root.appendChild(grid);
    if (window.HDS) { window.HDS.refresh(); }
  }

  function start() { renderGrid(); renderDetail(); }
  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", start); } else { start(); }
})();
