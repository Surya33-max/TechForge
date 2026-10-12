# Arqora Studio — product website

Responsive static storefront for Arqora, an independent creative technology studio. The site uses a refined soft-neumorphic system with violet and mint accents.

## Preview
Run `python3 -m http.server 8000` from this directory and open `http://localhost:8000`.

## Design files
- `assets/brand/BRAND.md`: brand strategy, color rules, typography, layout, accessibility
- `assets/brand/brand-system.json`: machine-readable design tokens and metadata
- `assets/brand/tokens.css`: canonical CSS tokens and focus styling
- `assets/brand/arqora-mark.svg`: vector mark and favicon master
- `assets/brand/arqora-wordmark.svg`: vector wordmark lockup
- `assets/brand/arqora-social-card.svg`: 1200×630 social preview artwork
- `assets/products/*.svg`: six standalone product artwork masters
- `css/style.css`: responsive site structure and components
- `js/main.js`: filters, search, mobile navigation and contact form behavior

## Metadata and release checks
The title, description, Open Graph and Twitter metadata now use Arqora's positioning. The final domain and real contact email are intentionally not fabricated: add them when confirmed. SVG social images may not render on every social crawler, so export a PNG fallback before launch.

WhipRush is in development; the other catalogue items are concepts. Do not present them as purchasable until delivery, pricing and product destinations exist.

## Reference
Reviewed Themesberg's open-source Neumorphism UI repository for general neumorphic patterns: https://github.com/technext/neumorphism-ui (MIT). Its vendor logos and artwork are not included in the Arqora identity. If code is copied from that upstream project later, preserve the copyright and MIT license notice.
