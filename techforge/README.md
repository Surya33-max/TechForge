# TechForge India — Demo E-Commerce Site

A fully working, front-end-only e-commerce site built for **digital marketing & SEO practice**.
No build step, no backend, no database — open `index.html` in a browser, or host the folder
on any static host (GitHub Pages, Netlify, Vercel, cPanel, etc.).

## How to run it
- **Locally:** just double-click `index.html` (some browsers restrict `localStorage` on `file://`
  URLs — if products/cart don't save, run a tiny local server instead: `python3 -m http.server`
  in this folder, then open `http://localhost:8000`).
- **Deploy:** drag-and-drop the whole folder into Netlify Drop, or push it to a GitHub repo and
  enable GitHub Pages. It's plain HTML/CSS/JS, so it works anywhere.

## What's inside
| File/Folder | Purpose |
|---|---|
| `index.html` | Home page — hero, categories, bestsellers, testimonials, blog preview, newsletter |
| `store.html` | Full catalog with category filters, search and sorting |
| `product.html?id=TF-01` | Product detail page — specs, reviews, related products, JSON-LD |
| `cart.html` | Cart with coupon codes (`TECH10`, `WELCOME500`) |
| `checkout.html` | Shipping + payment form, deducts stock, creates an order |
| `order-success.html?order=...` | Order confirmation |
| `wishlist.html` | Saved items |
| `admin.html` | Merchant dashboard — password `admin123` |
| `blog.html` / `blog-post.html?slug=...` | Content-marketing / SEO blog |
| `about.html`, `contact.html`, `404.html` | Supporting pages |
| `robots.txt`, `sitemap.xml` | Crawler/indexing config |
| `css/style.css` | Shared neumorphic + glassmorphism theme |
| `js/data.js` | Product & blog seed data (edit this to add real products) |
| `js/storage.js` | Cart, wishlist, orders, reviews, analytics — all via `localStorage` |
| `js/ui.js` | Shared header/cart-drawer behaviour |

## Where the data lives
Everything (cart, orders, wishlist, product edits, analytics events, leads, reviews) is saved in
your browser's `localStorage`, scoped per-domain. Clearing browser data resets the demo.
Swap the functions in `js/storage.js` for real `fetch()` calls to a backend when you're ready —
every page calls those functions instead of touching `localStorage` directly, so it's a single
place to change.

## SEO features to study
- **Per-page `<title>` and `<meta description>`**, unique on every product and blog post
- **`rel="canonical"`** tags to avoid duplicate-content issues (e.g. `store.html?cat=...`)
- **JSON-LD structured data**: `Organization` + `WebSite` on the home page, `Product` on PDPs
  (price/availability/rating), `BreadcrumbList` on the store page, `BlogPosting` on articles
- **`robots.txt`** blocking cart/checkout/admin from indexing, pointing to `sitemap.xml`
- **`sitemap.xml`** listing every indexable URL
- **Semantic HTML** (`<header>`, `<main>`, `<footer>`, `<h1>`–`<h2>` hierarchy) and descriptive
  `alt` text on images
- A blog (`blog.html`) for keyword-targeted content marketing — see `js/data.js` → `BLOG_POSTS`
  for target-keyword notes on each post

## Digital marketing features to study
- **Marketing event tracking**: every add-to-cart, page view, search, wishlist add, purchase,
  newsletter signup and contact form submit calls `logEvent()` in `js/storage.js`, which pushes
  to `window.dataLayer` — open DevTools Console and type `dataLayer` after browsing to see the
  events a real GTM container would receive
- **Coupon codes** (`TECH10`, `WELCOME500`) to practice promo-driven campaigns
- **Newsletter capture** with a mock "coupon on subscribe" flow
- **Urgency/scarcity cues**: "Low Stock" badges, limited-time offer marquee
- **Social proof**: star ratings, review counts, testimonials
- **Merchant analytics dashboard** (`admin.html` → Overview tab): revenue, orders, page views,
  add-to-cart count and a mock conversion-rate funnel

## Connecting real analytics
Open the `<head>` of `index.html` and uncomment the Google Tag Manager snippet, replacing
`GTM-XXXXXXX` with your real container ID. A Meta Pixel placeholder is commented out in the
same block. Because every meaningful user action already calls `logEvent()`, GTM will start
receiving `add_to_cart`, `view_item`, `purchase`, etc. automatically once the container is live —
just map these `dataLayer` events to GA4 events inside GTM.

## Admin login
Go to `admin.html` and enter password: **admin123**
From there you can add/edit/delete products, view orders and leads, and see a live analytics
funnel — all useful for practicing merchant-side reporting and inventory management.

## Notes
This is a learning project: checkout does not process real payments, and all "backend" data is
local to your browser. It's designed to be a realistic sandbox for practicing SEO audits,
Google Tag Manager setup, conversion-rate-optimization experiments, and content marketing —
not for production use as-is.
