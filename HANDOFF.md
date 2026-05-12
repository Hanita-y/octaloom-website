# OctaLoom Homepage V2 — Handoff Doc
_Last updated: 2026-05-11_

---

## File
`/Users/hanitasmac/HY Workspaces/OctaLoom HQ/website/octaloom-website/OctaLoomHomepageV2.tsx`

GitHub: `https://github.com/Hanita-y/octaloom-website` (private repo, branch: `main`)
Latest commit: `041c882` — "fix: mobile nav expands inline — no separate fixed overlay (Framer-safe)"

---

## Build
```bash
cd "/Users/hanitasmac/HY Workspaces/OctaLoom HQ/website/octaloom-website"
bash build.sh
```
Outputs `_preview_bundle.js` (~1.5MB). Build must be clean before pushing.

---

## Framer Constraints (non-negotiable)
- Only `react` + `framer-motion` imports
- All styles: inline `style={{}}` — no Tailwind, no CSS files
- Hebrew text: `\uXXXX` Unicode escapes (raw Hebrew breaks in Framer editor)
- Required file headers: `// @framerSupportedLayoutWidth any` + `// @framerSupportedLayoutHeight any`
- No Supabase SDK — raw `fetch()` only
- Animations: `framer-motion` animate on mount (NOT `whileInView`/`useInView` — broken in Framer)
- Icons: inline SVGs only

---

## Architecture — Component Map
Single mega TSX file. Key functions:
| Function | What it is |
|---|---|
| `HPNav` | Navbar — fixed, glass, dropdown, mobile hamburger |
| `HPHero` | Hero section — video + text + CTAs + marquee |
| `HPProblem` | "3 broken options" cards |
| `HPFourthOption` | Purple banner — fourth option |
| `HPServices` | Tear-off poster (5 strips) |
| `HPProcess` | How it works — 3 steps |
| `HPTestimonials` | Auto-rotating 6 testimonials |
| `HPCaseStudy` | Case study + animated numbers |
| `HPAbout` | About Hanita |
| `HPFAQ` | FAQ accordion |
| `HPBookCall` | Book a call CTA |
| `HPLinkedInFeed` | LinkedIn feed embed |
| `HPBlog` | 3 blog preview cards |
| `HPNewsletter` | Email signup + consent |
| `HPFooter` | Footer — navy, 4-column |
| `HomepageSchema` | JSON-LD schema blocks |
| `CustomCursor` | Desktop-only custom cursor |

---

## Known Framer-Specific Issues & Fixes Applied

### 1. Root div width
Framer canvas is ~4669px wide. Root div MUST have:
```tsx
<div style={{ width: "100vw", overflowX: "hidden", ... }}>
```
Without this, everything centers at x=1830px and is invisible.

### 2. Animations — no whileInView
`whileInView` and `useInView` from framer-motion are broken in Framer's rendering environment.
`Reveal` component uses `animate={{ opacity: 1, y: 0 }}` on mount instead.
`AnimatedNum` uses raw `IntersectionObserver`.

### 3. Mobile nav — no separate fixed overlay
`position: fixed` inside a Framer code component doesn't work reliably — Framer's container transforms break it.
**Fix:** The `<nav>` itself expands to `bottom: 0` when mobile menu is open. Menu content renders inside the nav. No separate overlay div.

### 4. position: fixed for cursor
`CustomCursor` uses `position: fixed` which works because it's in the root, not inside a transformed Framer container. It skips on mobile (`if (w < 768) return`).

---

## Design System
| Token | Value |
|---|---|
| `C.cream` | `#ece9e7` — main background |
| `C.purple` | `#712eac` — primary brand |
| `C.deepPurple` | `#201e4b` — text, footer tint |
| `C.navy` | `#060d3d` — footer bg |
| `C.lime` | `#c5e6a2` — accents, CTAs |
| `C.textDim` | `#5c5878` — secondary text |
| `F.display` | `'DiscoveryFs', 'Discovery', 'Aeonik', sans-serif` — Hebrew font |
| `F.body` | `'Aeonik', sans-serif` — English font |

---

## Font Weights (EN vs HE)
All h2 headings: `fontWeight: lang === "he" ? 500 : 600`
"The Fourth Option." and case study headline h2: `fontWeight: lang === "he" ? 500 : 700`
"TAKE WHAT YOU NEED" poster title: `fontWeight: lang === "he" ? 500 : 600`

---

## Mobile Specifics
- `isMobile = windowWidth < 768`
- Hero: video has `order: isMobile ? 1 : 0`, text has `order: isMobile ? 2 : 0` — video appears first on mobile
- Hero CTAs: `flexDirection: "row"`, `justifyContent: isMobile ? "center" : "flex-start"` — side-by-side centered, not full-width
- Poster strips: all 5 in `display: flex` with `flex: 1`, no icons on mobile, no dots on mobile, no strikethrough on mobile

---

## Nav Details
- Logo href: `/`
- About href: `/about-he`
- Blog href: `/blog`
- Contact href: `#contact`
- Goodies href: `https://octagoodies.com`
- CTA button: `https://calendar.notion.so/meet/octaloom/discovery`
- Services dropdown: 3 items, LinkedIn Growth Engine has 3 sub-items
- Language toggle: `setLang("he")` / `setLang("en")` — updates `document.documentElement.lang`

---

## Footer Logo Sizes
- OctaLoom logo: `height: 128`
- OctaGoodies logo: `height: 37`

---

## What's Done (this project)
- [x] Full homepage V2 component
- [x] Invisible text fix (root div width: 100vw)
- [x] Animations: mount-based (not scroll-triggered)
- [x] Mobile hero: video before text
- [x] Mobile hero CTAs: centered side-by-side
- [x] Poster strips mobile: all 5 visible, no icons, no dots, no strikethrough
- [x] EN heading weights: semi-bold (600) everywhere, 700 on key bold items
- [x] Footer logos enlarged
- [x] Mobile nav: nav expands to full screen (Framer-safe approach)
- [x] About link: `/about-he`

## What's Pending / Not Started
- [ ] Mobile nav still needs testing in Framer after paste (user hasn't confirmed it works yet)
- [ ] 6 service pages (not started)
- [ ] About page
- [ ] Contact page
- [ ] Blog archive / post template
- [ ] Legal pages (Privacy, Terms, Accessibility) — content drafted in `octaloom-legal-compliance.md`
- [ ] Cookie consent banner (Amendment 13 compliance — deadline Aug 14, 2025 — already passed)
- [ ] Microsoft Clarity heatmaps (recommended, not installed)
- [ ] ScrollBgTransition (cream → purple) — discussed but deferred

---

## Key External Files
| File | Path |
|---|---|
| Homepage copy | `/Users/hanitasmac/nanoclaw/groups/main/claude-code-handoff/homepage-copy.pdf` |
| Build summary | `/Users/hanitasmac/nanoclaw/groups/main/claude-code-handoff/octaloom-build-summary.md` |
| Site map | `/Users/hanitasmac/nanoclaw/groups/main/claude-code-handoff/octaloom-site-map.md` |
| Brand voice | `/Users/hanitasmac/nanoclaw/groups/main/brand-voice-guide.md` |
| Legal compliance | `/Users/hanitasmac/nanoclaw/groups/main/claude-code-handoff/octaloom-legal-compliance.md` |
| Tasks checklist | `/Users/hanitasmac/nanoclaw/groups/main/claude-code-handoff/TASKS-CHECKLIST.md` |

---

## How to Resume
1. Open new Claude Code session in `/Users/hanitasmac/HY Workspaces/OctaLoom HQ/website/Webdeveloper Agent`
2. Say: "קראי את HANDOFF.md ב-octaloom-website ותמשיכי מאיפה שעצרנו"
3. Claude reads this file + `CLAUDE.md` and is fully context-loaded
