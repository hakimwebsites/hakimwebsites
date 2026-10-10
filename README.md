# Hakim Digital Studio — website

A static website built with plain **HTML, CSS and JavaScript**. No frameworks, no Node.js, no build step.
It works on GitHub Pages, including when published under a repository sub-path (all links are relative).

## Folder structure

```
hakim-digital-studio/
├── index.html            Homepage (hero, services, portfolio, process, pricing, about, shop teaser, FAQ, contact)
├── shop.html             Sample digital-products catalogue
├── product.html          Product detail page (opened as product.html?id=<product-id>)
├── privacy.html          Privacy Policy TEMPLATE (review before publishing)
├── terms.html            Terms and Conditions TEMPLATE (review before publishing)
├── refund-policy.html    Refund Policy TEMPLATE (complete before any sales)
├── robots.txt            Search-engine rules (needs your site URL after publishing)
├── sitemap.xml           Sitemap (needs your site URL after publishing)
├── css/
│   └── style.css         All styling. Colours, fonts and spacing are CSS variables at the top (:root).
├── js/
│   ├── config.js         ★ YOUR SETTINGS: WhatsApp number, email, prices, optional form service
│   ├── main.js           Mobile menu, WhatsApp/email links, prices, footer year, contact form
│   ├── products.js       ★ Shop catalogue data (sample products)
│   └── shop.js           Draws the shop and product pages from products.js
└── images/
    ├── hakim.jpg / .webp Your photo, resized and compressed (original was 2.1 MB; now ~100 KB / ~57 KB)
    ├── favicon.svg       Browser-tab icon
    └── products/         Six SAMPLE product previews (illustrative SVGs — replace with real ones)
```

## What changed from your old site

- **Rebranded** from "Hakim Web Studio" to **Hakim Digital Studio**, with the forest/cream/sage/charcoal/white palette, a serif + sans type pairing, and flatter, less-rounded styling.
- **Kept and improved:** your four concept projects (La Bella, Kampala Hub, FitForge, Nexora) with their links, your photo, the FAQ, the concept-projects disclaimer, the WhatsApp floating button, the 4-step process and your footer-year script.
- **New:** services detail (7 services), pricing packages with exclusions, About section, shop + product pages, contact/quotation form, Privacy/Terms/Refund templates, `robots.txt`, `sitemap.xml`, favicon, accessibility improvements (skip link, focus styles, native `<details>` FAQ, reduced-motion support).
- **Removed on purpose:** the old AED 199 starting price (replaced by your new AED 399 / 799 / 149 packages), the "2–3 days" delivery promise (timelines now depend on scope), "Google Maps location" and "social media links" from the inclusions (they weren't in your new package lists), decorative emoji icons, and the dead `#` link on Kampala Hub (it now says "Demo link coming soon").
- **File layout:** `style.css` → `css/style.css`, `script.js` → `js/main.js` (+ `config.js`), `images/hakim.png` → optimised `hakim.jpg/.webp`.

## Open and test in Visual Studio Code

1. Unzip the folder, then in VS Code choose **File → Open Folder…** and select `hakim-digital-studio`.
2. Install the **Live Server** extension (by Ritwick Dey): Extensions icon → search "Live Server" → Install.
3. Right-click `index.html` → **Open with Live Server**. The site opens at something like `http://127.0.0.1:5500/` and refreshes when you save.
   - Alternative with no extension: open the VS Code terminal (**Terminal → New Terminal**) and run `python -m http.server 8000`, then visit `http://localhost:8000`.
   - Please preview through a local server rather than double-clicking the file; it matches how GitHub Pages serves the site.
4. Press **F12** in the browser and check the **Console** tab: it should show no red errors.
5. Test on a phone-sized screen: DevTools → toggle device toolbar (Ctrl+Shift+M).

## Put your real details in (js/config.js)

```js
whatsappNumber: "971558311047",          // digits only: country code + number, no +, spaces, dashes or leading 0
email: "hakimwebsites.ug@gmail.com",
formEndpoint: "",                        // optional form service URL (see below)
prices: { starter: 399, business: 799, careFrom: 149 }
```

- **WhatsApp format:** international number, digits only. UAE mobile `055 831 1047` becomes `971558311047` (drop the leading 0, add 971). The site builds `https://wa.me/971558311047?text=…` links and URL-encodes the message for you. **Every** WhatsApp button reads this one value.
- **Prefilled message:** change `defaultWhatsAppMessage` in `config.js`. Service and package buttons have their own messages (the `data-wa-message` attribute in `index.html`).
- **Prices:** change the numbers in `config.js`; the pricing cards and the hero note update. (The currency label "AED" is plain text in `index.html`.)
- These contact details were **copied from your old website** — please confirm they are still right.

## Publish with GitHub Pages

1. Open the VS Code terminal in the project folder.
2. If this folder is already your existing site's repository, copy these new files over the old ones (replace `index.html`, `style.css`, `script.js`; the old `style.css`/`script.js` in the root are no longer used and can be deleted). Then:
   ```
   git add .
   git commit -m "Redesign: Hakim Digital Studio"
   git push
   ```
3. If this is a **new** repository: create an empty repo on github.com (no README), then
   ```
   git init
   git add .
   git commit -m "Hakim Digital Studio website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
4. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main`, folder `/ (root)` → Save.**
5. After a minute the site is live at `https://YOUR-USERNAME.github.io/YOUR-REPO/` (or `https://YOUR-USERNAME.github.io/` if the repo is named `YOUR-USERNAME.github.io`).
6. Open `sitemap.xml` and `robots.txt`, replace `YOUR-SITE-URL` with that address, commit and push again.
7. GitHub Pages file names are **case-sensitive** — keep the lowercase names used here.

## Checklist: things only you can fill in

- [ ] Confirm WhatsApp number and email in `js/config.js`.
- [ ] Confirm the prices you actually want to charge (AED 399 / 799 / 149 are the provisional prices you gave me — they are not market-verified).
- [ ] Confirm statements that came from your old site: "Dubai-based", "Open for freelance projects", "Usually within 24 hours".
- [ ] Review the FAQ answers about **payment terms** (deposit + balance) and **timelines** — I wrote them in a general way; make them match how you really work.
- [ ] Confirm the three feature bullets under each portfolio project — I wrote them from your own project descriptions.
- [ ] Add a demo link for **Kampala Hub** if one exists (edit the project in `index.html`).
- [ ] Optional: replace the CSS project previews with real screenshots (save in `images/portfolio/`, then use `<img>` in the `.project-preview` block).
- [ ] Complete `privacy.html`, `terms.html`, `refund-policy.html` (everything in `[square brackets]`) and check them against your real business and UAE requirements — consider professional advice. Remove the yellow "Template" banner only when you are done.
- [ ] Replace sample products in `js/products.js` and sample previews in `images/products/` with real, original work. Do not sell anything until the refund policy and licence terms are finished.
- [ ] Replace `YOUR-SITE-URL` in `sitemap.xml` and `robots.txt` after publishing.
- [ ] Optional: add an Open Graph image and canonical URL (comment in each page's `<head>`).
- [ ] Optional: connect a form service (below), buy a domain.
- [ ] Decide whether to mention your values (for example halal-conscious business practices) on the About section; I did not add anything you hadn't approved.

## What works now vs. what needs more setup

| Feature | Status |
|---|---|
| Responsive layout, mobile menu, FAQ, footer year | Works now |
| WhatsApp buttons (all read `js/config.js`), email links | Works now (links open WhatsApp / your mail app) |
| Contact form → **WhatsApp** | Works now. Submitting opens WhatsApp with the details filled in; nothing is sent until the visitor presses send. |
| Contact form → **Email** button | Works now (opens the visitor's email app with the enquiry filled in) |
| Contact form → **delivered to you automatically** | **Needs a third-party form service** (e.g. Formspree, Web3Forms). Create an account, paste its URL into `formEndpoint` in `config.js`. A static site cannot receive form submissions by itself. Add that service to your Privacy Policy. |
| Shop catalogue and product pages | Works now (sample data) |
| **Buying and paying** | **Not implemented, on purpose.** Product pages only offer a WhatsApp enquiry. |
| Secure delivery of paid downloads | Needs a payment/delivery service (see below) |
| Sitemap / robots | Need your final site URL |

### Taking payments safely later

Don't build checkout yourself in front-end JavaScript. A static site cannot verify payments, and anything in browser code is public. When you're ready:

1. Use a hosted checkout from a payment/digital-goods platform available in the UAE (check which ones support your account and your payout bank).
2. Let that platform's **server** confirm the payment and send the buyer a private, expiring download link. Never put files in the public repo, and never put secret keys in `config.js`.
3. Test completely in the provider's **sandbox / test mode** first.
4. Only then link the platform's checkout from `product.html`, and finish the refund policy and licence terms.

## What I tested (and what I didn't)

Tested with a headless Chromium browser, serving the site from a **sub-folder URL** to mimic a GitHub Pages project site:

- No console/JavaScript errors and no 404s on all 6 pages (Google Fonts excluded — the sandbox has no internet).
- No horizontal overflow at 320, 360, 768 and 1280 px.
- All internal links and `#anchors` resolve; all image/CSS/JS paths exist; unique titles and meta descriptions; one `<h1>` per page; every image has alt text.
- All 17 WhatsApp links on the homepage use the configured number with an encoded message; special characters (`&`, `%`, `?`, accents) survive in the form message.
- Mobile menu opens/closes (button, Escape, link click); FAQ opens; form validation blocks empty required fields; shop renders 6 products; product page and "not found" case.
- Text/background colour pairings used all meet WCAG AA contrast (≥ 4.5:1).

**Not tested:** a real WhatsApp send, a real form-service submission, real devices (iPhone/Android), Safari/Firefox, screen readers, and live GitHub Pages deployment. The Google Fonts (Newsreader, Inter) could not load in my sandbox, so I judged the layout with fallback fonts; they should look slightly more refined online. Please check the live site on your own phone after publishing.
