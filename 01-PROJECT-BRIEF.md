# Pati Pariwar Kalyan Samiti — Redesign Brief

## 1. What this site is
A Lucknow-based chapter of Save Indian Family (SIF) — a men's rights / family
welfare support organization. Visitors are often men in legal or family
distress (498A, 304B cases) looking for help, plus supporters/donors and
press.

## 2. Redesign goals
- Replace the dated Bootstrap-carousel look with a modern, bold, pastel-gradient
  aesthetic (reference: Girls Who Code homepage — big display type, soft
  color-blocked gradient backgrounds, rounded photo grids, generous whitespace).
- Every nav item must lead to a real page (currently ~80% are dead `#` links).
- Make the helpline + "get help" action impossible to miss, on every page,
  on every screen size.
- Fully responsive: desktop, tablet, mobile — mobile-first build.
- Feel serious and trustworthy (legal/emotional support topic) while still
  looking current, not like a 2015 NGO template.

## 3. Design system

### Color palette (pastel-gradient, warm + trustworthy)
| Role | Color | Hex |
|---|---|---|
| Primary (deep teal) | headings, nav, primary buttons | `#0F6E56` |
| Primary light | hover states, section tints | `#5DCAA5` |
| Secondary (terracotta) | accent CTAs, highlights | `#D85A30` |
| Accent (warm amber) | badges, small highlights | `#EF9F27` |
| Background gradient start | page bg | `#FAF7F0` (warm cream) |
| Background gradient end | page bg | `#E1F5EE` (soft mint) |
| Text primary | body copy | `#2C2C2A` |
| Text secondary | muted copy | `#5F5E5A` |
| Danger/urgent | helpline bar | `#E24B4A` on `#FCEBEB` |

Background treatment: soft diagonal or radial gradient from cream to mint on
every section, NOT flat white — this is what gives the "Girls Who Code" feel.
Alternate gradient direction per section so the page doesn't feel like one
flat wash.

### Typography
- Headings: a bold, geometric sans-serif with personality — **Poppins** or
  **Sora**, weight 700–800, oversized (60–96px hero, scaling down responsively).
- Body: **Inter** or **Work Sans**, weight 400/500, 16–18px, line-height 1.6.
- Devanagari support required (Hindi text appears throughout) — pair with
  **Noto Sans Devanagari** as fallback for Hindi strings.
- Avoid Bootstrap default typography entirely.

### Component style
- Rounded cards, 16–20px radius, soft 1px border or very light shadow (no
  heavy drop shadows).
- Color-blocked image grids (like the GWC hero — offset rectangular photo
  blocks in flat brand colors, not stock-photo carousels).
- Buttons: solid fill, rounded-pill or 8px radius, bold label, sentence case.
- A wavy or dashed underline accent under key headings (small illustrative
  detail, used sparingly).
- Sticky header; helpline number always visible (desktop: top-right of header;
  mobile: persistent thin bar or floating call button).

### Responsive breakpoints
- Mobile: up to 640px — single column, stacked cards, hamburger nav, floating
  "Call helpline" button (bottom-right, thumb-reachable).
- Tablet: 641–1024px — 2-column grids where homepage uses 3.
- Desktop: 1025px+ — full multi-column layout as wireframed.

## 4. Tech approach for vibecoding (Qoder / Qwen3)
- Build as static HTML/CSS/JS (or a lightweight framework if the tool defaults
  to one) — no unnecessary backend for a mostly-static informational site.
- Contact/intake form can post to a form service (Formspree/Getform) or a
  simple backend endpoint — decide once building starts.
- Must pass basic Lighthouse mobile checks: responsive, fast, accessible
  (alt text, color contrast, tap target size).
- HTTPS assumed at deploy — no mixed content.

## 5. Non-negotiables carried over from the audit
- No `href="#"` placeholder links in the final nav — every item resolves.
- Contact/intake form present (not just a phone number).
- Resources page must actually list downloadable items (judgments, government
  orders, articles, formats) even if placeholder PDFs for now.
- Gallery pages use a proper grid + lightbox, not stacked raw images.
