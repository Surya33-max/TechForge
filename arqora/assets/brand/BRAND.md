# Arqora Studio — Brand & Design System
Version 1.0 · 12 October 2026

## Brand position
Arqora is an independent creative technology studio spanning interface design, web development, motion design and useful digital products. The identity should feel precise, quietly expressive and practical, not like a generic AI-startup gradient generator.

## Identity
- Name: Arqora
- Descriptor: Independent Digital Studio
- Brand line: Digital products, designed to move.
- Voice: clear, curious, capable, direct. Avoid inflated claims and vague “revolutionary” language.
- Wordmark: lowercase “arqora”; the circular accent is a distinct finishing mark.
- Symbol: rounded lowercase a-form paired with a small accent dot. Keep proportions; don't stretch or add effects.

## Color tokens
| Token | HEX | Purpose |
|---|---|---|
| Canvas / Surface | #E8E9EE | Main neumorphic background |
| Raised surface | #ECECF1 | Subtle raised cards |
| Sunken surface | #E1E2E9 | Inset fields and controls |
| Shadow dark | #C3C5CF | Neumorphic lower-right shadow |
| Shadow light | #FFFFFF | Neumorphic upper-left highlight |
| Ink | #202334 | Primary text and wordmark |
| Muted | #6E7284 | Secondary copy |
| Violet | #6C5CE7 | Primary accent and focus |
| Violet soft | #9B91FF | Secondary accent |
| Mint | #9CE6D1 | Rare positive signal |
| Deep | #191B29 | Dark sections and motion artwork |

Use violet for key actions, active states and small highlights. Mint is secondary, not a competing primary color. Avoid rainbow gradients and large saturated backgrounds.

## Typography
- Display: Manrope, 700–800; tight tracking, short headlines.
- UI/body: DM Sans, 400–700; readable body size and calm rhythm.
- Code/data: JetBrains Mono when technical labels need a distinct voice.
- Use no more than two type families in one asset unless code labels are required.

## Layout and structure
- Grid: 12 columns desktop, 6 tablet, 4 mobile; content max-width 1160px.
- Spacing: 4/8/12/16/24/32/48/64/96.
- Corners: 12px controls, 16px media, 24px primary cards.
- Elevation: soft paired shadows; keep edge contrast visible. Use inset shadows only for controls and active filters.
- Content hierarchy: eyebrow → concise headline → one-sentence explanation → one primary action.
- Motion: purposeful and reduced-motion aware. Never block reading or navigation.
- Product states must distinguish concept, in-development and available.

## Design files
- arqora-mark.svg: icon / favicon master
- arqora-wordmark.svg: horizontal identity lockup
- arqora-social-card.svg: 1200×630 social preview master
- tokens.css: canonical site tokens and focus styles
- brand-system.json: machine-readable colors, typography, spacing and metadata
- products/*.svg: standalone product artwork masters
- README.md: setup, asset map and license notes

## Metadata policy
Title: Arqora Studio — Digital products, designed to move
Description: UI systems, web experiences and motion tools built for creative workflows.
OG/Twitter preview: assets/brand/arqora-social-card.svg
Do not publish a fake canonical URL, contact email, product checkout URL, analytics ID or availability claim. Add only real destinations.

## Accessibility
Maintain visible focus rings, keyboard access, strong contrast and reduced-motion support. Do not use color alone to communicate state.

## Reference research and licensing
Themesberg's open-source Neumorphism UI repository was reviewed as a design-pattern reference: https://github.com/technext/neumorphism-ui (MIT). Its logo and vendor artwork are not included as Arqora assets. If source code is copied later, preserve the upstream copyright and MIT notice.
