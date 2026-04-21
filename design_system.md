# Platform UI Unification & Design System Roadmap

> **PaddlePro** — Authored by Design Systems Lead  
> Version 1.0 | April 2026

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Visual Audit: Current Inconsistencies](#visual-audit)
3. [The North Star Theme](#north-star-theme)
4. [Component Standardization](#component-standardization)
5. [Global CSS / Tailwind Variables](#global-variables)
6. [Implementation Strategy](#implementation-strategy)

---

## 1. Executive Summary

PaddlePro is a competitive gaming platform with a strong concept but fragmented visual execution. Across the five core screens — **Login, Home, Profile, Game, and Chat** — there are at least **6 distinct color treatments, 3 different background strategies, and 2 conflicting typographic scales**. This document serves as the authoritative reference to unify all surfaces under a single, consistent design language without sacrificing the platform's gaming identity.

---

## 2. Visual Audit: Current Inconsistencies

### 2.1 Color Inconsistencies

| Screen | Background | Primary Accent | Secondary Accent | Issue |
|---|---|---|---|---|
| Login | `#1a0a2e` → `#3d1a6e` radial gradient | Purple (`~#7c3aed`) | — | Richest, most atmospheric background |
| Home | `#0d0d12` flat dark | Purple (`~#7c3aed`) | Green (`~#22d3ee`) right glow | Background is flatter than Login; the right purple glow feels tacked-on |
| Profile | `#111318` flat | Teal (`~#14b8a6`) | Red (`~#f87171`), Orange (`~#fb923c`) | **Complete tonal break.** Accent shifts from purple to teal/coral. Win/loss colors (`#22c55e`, `#ef4444`) are correct semantically but the base accent (teal) is alien to the Login/Home purple identity |
| Game | `#0d1117` flat | Teal (`~#2dd4bf`) table fill | White paddles | The game table is a solid teal rectangle — visually jarring, no relation to platform colors |
| Chat | `#0f1923` with subtle pattern | Teal (`~#0ea5e9`) | Dark slate panels | Chat sidebar and message bubbles use sky-blue, diverging from both purple and teal families |

**Audit Finding:** The platform has **three competing accent families** (purple, teal, sky-blue) being used interchangeably as primary brand colors. Only one should own that role.

---

### 2.2 Typography Inconsistencies

| Screen | Heading Style | Body Style | Observed Issue |
|---|---|---|---|
| Login | Monospaced/geometric display font (appears to be `Space Mono` or similar) | Same font | Correct for gaming aesthetic |
| Home | Same monospaced display font | Same | Consistent with Login ✓ |
| Profile | Standard sans-serif (likely system font or `Inter`) | Same | **Breaks from the established display font entirely** |
| Game | Monospaced (`Level 1` score label) | — | Consistent with Login ✓ |
| Chat | Standard sans-serif | Same | Reverts to system font, no gaming character |

**Audit Finding:** Two font families are competing. The Login and Game screens use a geometric/monospaced display font that conveys the right "precision gaming" feel. Profile and Chat silently fall back to a neutral sans-serif. The typography must be unified under a single, purposeful stack.

---

### 2.3 Button Style Inconsistencies

| Screen | Button Style | Border Radius | Background | Issue |
|---|---|---|---|---|
| Login | Solid black, white border, rounded-full | `~9999px` (pill) | `#000` with border | Heavy, opaque |
| Home | Solid purple, rounded-lg | `~8px` | `#7c3aed` | Rounded rect, different radius |
| Profile | Outlined ghost button ("Edit Profile") | `~6px` | Transparent | Ghost style, yet another radius |
| Game | Outlined, rounded-lg ("Change Table Colour") | `~8px` | Semi-transparent teal | Teal outline inconsistent with brand |
| Chat | No primary buttons visible | — | — | — |

**Audit Finding:** Four distinct button treatments exist across five screens. Border radius ranges from `6px` to fully pill-shaped. There is no single "primary action" pattern the user can learn to recognize.

---

### 2.4 Card & Surface Inconsistencies

| Screen | Card Background | Border | Border Radius |
|---|---|---|---|
| Profile | `rgba(255,255,255,0.05)` subtle glass | None / very subtle | `~12px` |
| Chat (sidebar) | `#162032` solid | None | `0px` (square) |
| Chat (messages) | `#1e2d3d` dark slate | None | `~16px` |
| Home (notification) | `#1e2535` solid | None | `~8px` |

**Audit Finding:** Card surfaces use 4 different background values and 4 different corner radii. There is no unified "surface" token.

---

## 3. The North Star Theme

### 3.1 Design Concept: **"Neon Arena"**

The platform is a competitive, real-time gaming environment. The theme should feel **precise, electric, and premium** — like the inside of a high-end gaming peripheral. The strategy is to unify around the **purple accent** (already present in Login/Home, the most polished screens) and introduce a **single neon highlight** (`electric cyan`) as the semantic "active/online/success" color only.

---

### 3.2 Unified Color Palette

```
BACKGROUNDS (Dark Matter Scale)
──────────────────────────────────────────────
--color-bg-base:        #0b0c10   /* Page canvas */
--color-bg-raised:      #13151c   /* Cards, panels */
--color-bg-overlay:     #1c1f2a   /* Modals, popovers */
--color-bg-subtle:      #22263a   /* Hover states, input fills */

BRAND (Electric Violet)
──────────────────────────────────────────────
--color-brand-500:      #7c3aed   /* Primary CTA, logo */
--color-brand-400:      #9d6ef5   /* Hover state */
--color-brand-300:      #c4a7fa   /* Text links, subtle highlights */
--color-brand-glow:     rgba(124, 58, 237, 0.25)   /* Box-shadow glow */

HIGHLIGHT (Neon Cyan — use sparingly)
──────────────────────────────────────────────
--color-highlight-500:  #06d6c7   /* Online indicators, active tab */
--color-highlight-400:  #34e8db
--color-highlight-glow: rgba(6, 214, 199, 0.20)

SEMANTIC
──────────────────────────────────────────────
--color-success:        #22c55e   /* Wins, positive */
--color-danger:         #f4483a   /* Losses, errors */
--color-warning:        #f59e0b   /* Caution states */
--color-info:           #38bdf8   /* Informational */

NEUTRAL (Text & Borders)
──────────────────────────────────────────────
--color-text-primary:   #f1f2f6   /* Headings */
--color-text-secondary: #8b91a8   /* Subtext, labels */
--color-text-muted:     #50566e   /* Placeholders, disabled */
--color-border-subtle:  rgba(255,255,255,0.07)
--color-border-default: rgba(255,255,255,0.12)
```

**Rationale:** By eliminating the competing teal-as-brand usage and demoting cyan to a semantic-only "online/active" signal, we break the three-accent conflict. The game table, chat bubbles, and profile accents will all migrate to this palette.

---

### 3.3 Typography Stack

```
Display (Headings, Scores, Hero Text):
  font-family: 'Orbitron', 'Space Grotesk', monospace;
  — Use for: h1–h3, score counters, level badges, CTA hero text
  — Rationale: Orbitron is a geometric sci-fi typeface with strong
    gaming associations. It unifies the Login hero with the Game screen
    scoreboard, which already uses a monospaced display feel.

Body (UI Text, Labels, Messages):
  font-family: 'DM Sans', 'Sora', sans-serif;
  — Use for: body copy, nav labels, chat messages, form inputs
  — Rationale: DM Sans is optically balanced at small sizes and
    technically legible at 12–14px. It pairs cleanly with Orbitron
    without competing.

Mono (Code, IDs, Timestamps):
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  — Use for: timestamps, player @handles, match IDs
```

**Type Scale:**

| Token | Size | Weight | Usage |
|---|---|---|---|
| `--text-hero` | 48–64px | 800 | Login hero, landing H1 |
| `--text-display` | 32px | 700 | Section titles |
| `--text-heading` | 22px | 600 | Card headers |
| `--text-subheading` | 16px | 500 | Labels, nav items |
| `--text-body` | 14px | 400 | Standard body text |
| `--text-caption` | 12px | 400 | Timestamps, meta info |

---

### 3.4 Shadow & Border-Radius Rules

```
BORDER RADIUS
──────────────────────────────────────────────
--radius-sm:   6px    /* Tags, badges, small chips */
--radius-md:   10px   /* Inputs, small buttons */
--radius-lg:   16px   /* Cards, panels, modals */
--radius-xl:   24px   /* Full-width sections */
--radius-pill: 9999px /* Avatar rings, toggle switches only */

SHADOWS
──────────────────────────────────────────────
--shadow-card:    0 4px 24px rgba(0,0,0,0.4);
--shadow-brand:   0 0 24px var(--color-brand-glow);
--shadow-cyan:    0 0 16px var(--color-highlight-glow);
--shadow-inset:   inset 0 1px 0 rgba(255,255,255,0.06);
```

**Rule:** All interactive surfaces use `--radius-lg` (16px). Buttons use `--radius-md` (10px). Pills are reserved exclusively for avatar rings and toggle/chip elements.

---

## 4. Component Standardization

### 4.1 Navigation Header

**Current state:** The header logo "PaddlePro" has two treatments — a box outline (Login/Home) and a transparent/solid variant (Profile). The avatar position and notification bell are also inconsistent in size.

**Unified spec:**
```
- Background: --color-bg-raised with border-bottom: 1px solid --color-border-subtle
- Logo: Orbitron font, --color-brand-400, no box outline
- Nav icons: 20px, --color-text-secondary, hover → --color-text-primary
- Avatar: 36px circle with 2px ring using --color-brand-500
- Notification badge: 8px dot, --color-danger, top-right of bell icon
- Padding: 0 24px, height: 64px
```

---

### 4.2 Buttons

Replace the current 4-style button chaos with 3 canonical variants:

**Primary:**
```css
background: var(--color-brand-500);
color: #fff;
border-radius: var(--radius-md);
padding: 10px 20px;
font-family: 'DM Sans';
font-weight: 600;
font-size: 14px;
transition: background 0.2s, box-shadow 0.2s;

&:hover {
  background: var(--color-brand-400);
  box-shadow: var(--shadow-brand);
}
```

**Secondary (Ghost):**
```css
background: transparent;
border: 1px solid var(--color-border-default);
color: var(--color-text-primary);
border-radius: var(--radius-md);
padding: 10px 20px;

&:hover {
  border-color: var(--color-brand-500);
  color: var(--color-brand-300);
}
```

**Destructive:**
```css
background: rgba(244, 72, 58, 0.12);
border: 1px solid var(--color-danger);
color: var(--color-danger);
border-radius: var(--radius-md);
padding: 10px 20px;
```

**Migration notes:**
- Login's "Continue with Google/Intra 42" buttons → **Secondary** variant
- Home's "Play Now" → **Primary** variant
- Profile's "Edit Profile" → **Secondary** variant  
- Game's "Change Table Colour" → **Secondary** variant

---

### 4.3 Cards / Panels

**Unified Card:**
```css
.card {
  background: var(--color-bg-raised);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card), var(--shadow-inset);
  padding: 20px;
}
```

All five card treatments (Profile stats panel, Profile match history, Home notification dropdown, Chat sidebar, Chat message containers) should be refactored to this single `card` class. Inner variation is achieved through padding and content, not by changing the container's background color or radius.

---

### 4.4 Inputs & Search

```css
.input {
  background: var(--color-bg-subtle);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  padding: 10px 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input:focus {
  border-color: var(--color-brand-500);
  box-shadow: 0 0 0 3px var(--color-brand-glow);
  outline: none;
}

.input::placeholder {
  color: var(--color-text-muted);
}
```

The Home screen's search bar and Chat's message input should both use this token. Remove the rounded-pill treatment on the search bar.

---

### 4.5 The Game Table

**Current state:** Solid `#2dd4bf` teal fill — a blunt shape that breaks from the dark aesthetic entirely.

**Unified spec:**
```css
.game-table {
  background: var(--color-bg-overlay);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  /* Optional: subtle brand tint */
  box-shadow: inset 0 0 80px rgba(124, 58, 237, 0.08);
}
.game-table .divider {
  border-left: 1px dashed var(--color-border-default);
}
.game-paddle {
  background: var(--color-text-primary); /* White */
  border-radius: 4px;
}
.game-ball {
  background: var(--color-brand-400);
  box-shadow: 0 0 12px var(--color-brand-glow);
}
```

The teal table immediately reads as "foreign element." Moving to `--color-bg-overlay` integrates it into the platform atmosphere while the ball's purple glow reinforces brand identity dynamically.

---

### 4.6 Chat Messages

**Current state:** Sent messages use sky-blue (`#38bdf8`), received messages use `#1e2d3d`. Neither maps to the brand.

**Unified spec:**
```
Sent bubble:   background: var(--color-brand-500), border-radius: 16px 16px 4px 16px
Received bubble: background: var(--color-bg-overlay), border: 1px solid var(--color-border-subtle),
                 border-radius: 16px 16px 16px 4px
Timestamps:    color: var(--color-text-muted), font: JetBrains Mono, 11px
```

---

### 4.7 Avatar Component

Standardize to a single `<Avatar>` component across all screens:

```
Sizes:   xs=24px | sm=32px | md=40px | lg=56px | xl=80px
Ring:    2px solid var(--color-brand-500) for active/self user
         2px solid var(--color-highlight-500) for online friends
         2px solid var(--color-bg-subtle) for offline
Border-radius: 50% always
```

---

### 4.8 Online Status Indicators

The green dot on the Chat sidebar is the only visible status indicator. Standardize:

```
Online:   8px circle, --color-highlight-500 (#06d6c7), with 0 0 6px cyan glow
Away:     8px circle, --color-warning (#f59e0b)
Offline:  8px circle, --color-bg-subtle (#22263a), border: 1px solid --color-border-default
```

---

## 5. Global CSS / Tailwind Variables

### 5.1 CSS Custom Properties (Single Source of Truth)

Place this in your global stylesheet entry point (e.g., `globals.css`, `main.css`):

```css
:root {
  /* ── Backgrounds ─────────────────────────────── */
  --color-bg-base:          #0b0c10;
  --color-bg-raised:        #13151c;
  --color-bg-overlay:       #1c1f2a;
  --color-bg-subtle:        #22263a;

  /* ── Brand ───────────────────────────────────── */
  --color-brand-300:        #c4a7fa;
  --color-brand-400:        #9d6ef5;
  --color-brand-500:        #7c3aed;
  --color-brand-glow:       rgba(124, 58, 237, 0.25);

  /* ── Highlight ───────────────────────────────── */
  --color-highlight-400:    #34e8db;
  --color-highlight-500:    #06d6c7;
  --color-highlight-glow:   rgba(6, 214, 199, 0.20);

  /* ── Semantic ────────────────────────────────── */
  --color-success:          #22c55e;
  --color-danger:           #f4483a;
  --color-warning:          #f59e0b;
  --color-info:             #38bdf8;

  /* ── Text ────────────────────────────────────── */
  --color-text-primary:     #f1f2f6;
  --color-text-secondary:   #8b91a8;
  --color-text-muted:       #50566e;

  /* ── Borders ─────────────────────────────────── */
  --color-border-subtle:    rgba(255, 255, 255, 0.07);
  --color-border-default:   rgba(255, 255, 255, 0.12);

  /* ── Radius ──────────────────────────────────── */
  --radius-sm:              6px;
  --radius-md:              10px;
  --radius-lg:              16px;
  --radius-xl:              24px;
  --radius-pill:            9999px;

  /* ── Shadows ─────────────────────────────────── */
  --shadow-card:            0 4px 24px rgba(0, 0, 0, 0.40);
  --shadow-brand:           0 0 24px var(--color-brand-glow);
  --shadow-cyan:            0 0 16px var(--color-highlight-glow);
  --shadow-inset:           inset 0 1px 0 rgba(255, 255, 255, 0.06);

  /* ── Typography ──────────────────────────────── */
  --font-display:           'Orbitron', monospace;
  --font-body:              'DM Sans', sans-serif;
  --font-mono:              'JetBrains Mono', monospace;

  --text-hero:              clamp(40px, 6vw, 64px);
  --text-display:           32px;
  --text-heading:           22px;
  --text-subheading:        16px;
  --text-body:              14px;
  --text-caption:           12px;

  /* ── Transitions ─────────────────────────────── */
  --transition-fast:        0.15s ease;
  --transition-base:        0.25s ease;
  --transition-slow:        0.40s ease;

  /* ── Z-Index Scale ───────────────────────────── */
  --z-base:         0;
  --z-raised:       10;
  --z-dropdown:     100;
  --z-modal:        200;
  --z-toast:        300;
}

/* Global reset */
*, *::before, *::after { box-sizing: border-box; }

html, body {
  background-color: var(--color-bg-base);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  font-size: var(--text-body);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
```

---

### 5.2 Tailwind Configuration Object

If the project uses Tailwind CSS, extend `tailwind.config.js` as follows:

```javascript
// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base:    '#0b0c10',
          raised:  '#13151c',
          overlay: '#1c1f2a',
          subtle:  '#22263a',
        },
        brand: {
          300: '#c4a7fa',
          400: '#9d6ef5',
          500: '#7c3aed',
        },
        highlight: {
          400: '#34e8db',
          500: '#06d6c7',
        },
        text: {
          primary:   '#f1f2f6',
          secondary: '#8b91a8',
          muted:     '#50566e',
        },
        success: '#22c55e',
        danger:  '#f4483a',
        warning: '#f59e0b',
      },
      fontFamily: {
        display: ['Orbitron', 'monospace'],
        body:    ['DM Sans', ...defaultTheme.fontFamily.sans],
        mono:    ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        hero:       'clamp(40px, 6vw, 64px)',
        display:    ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        heading:    ['22px', { lineHeight: '1.3', fontWeight: '600' }],
        subheading: ['16px', { lineHeight: '1.5', fontWeight: '500' }],
        body:       ['14px', { lineHeight: '1.6' }],
        caption:    ['12px', { lineHeight: '1.5' }],
      },
      borderRadius: {
        sm:   '6px',
        md:   '10px',
        lg:   '16px',
        xl:   '24px',
        pill: '9999px',
      },
      boxShadow: {
        card:  '0 4px 24px rgba(0, 0, 0, 0.40)',
        brand: '0 0 24px rgba(124, 58, 237, 0.25)',
        cyan:  '0 0 16px rgba(6, 214, 199, 0.20)',
        inset: 'inset 0 1px 0 rgba(255, 255, 255, 0.06)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at 60% 40%, #3d1a6e 0%, #0b0c10 70%)',
        'brand-glow':    'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
};
```

---

## 6. Implementation Strategy

### Phase 0: Foundation Setup (Day 1)

> **Goal:** Establish the token layer without touching any component.

1. **Install fonts.** Add to your `<head>` or CSS entry point:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;800&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono&display=swap" rel="stylesheet">
   ```

2. **Create `tokens.css`** with the full `:root` block from Section 5.1. Import this as the very first import in your main CSS file.

3. **Update `tailwind.config.js`** with the configuration from Section 5.2.

4. **Add base styles** (background, font, antialiasing) to the global reset.

5. **Commit and deploy.** At this stage, visual change is minimal — fonts shift — but no layout breaks.

---

### Phase 1: Screen-by-Screen Audit Pass (Days 2–5)

Work through each screen in order of descending fragmentation severity:

**Priority order:**
1. Profile (highest inconsistency — teal accents, wrong font)
2. Game (teal table, no brand integration)
3. Chat (sky-blue bubbles, font regression)
4. Home (closest to correct — mostly token cleanup)
5. Login (already strong — minor border-radius/button harmonization)

For each screen, create a feature branch: `fix/design-tokens-[screen-name]`.

**Checklist per screen:**
- [ ] Replace all hardcoded hex values with CSS variable equivalents
- [ ] Replace Tailwind arbitrary colors (`text-[#...]`) with extended theme classes
- [ ] Apply correct font-family classes (`font-display`, `font-body`, `font-mono`)
- [ ] Standardize card containers to `card` class
- [ ] Replace bespoke button styles with `btn-primary`, `btn-secondary`, or `btn-destructive`
- [ ] Verify border-radius uses `--radius-md` or `--radius-lg` (no custom values)

---

### Phase 2: Component Library Extraction (Days 6–10)

Once screens are individually consistent, extract shared elements into reusable components:

```
src/
  components/
    ui/
      Button.tsx         ← Primary, Secondary, Destructive variants
      Card.tsx           ← Single unified card component
      Avatar.tsx         ← With size and ring props
      Input.tsx          ← With focus ring
      Badge.tsx          ← For status, level, achievement chips
      StatusDot.tsx      ← Online/Away/Offline indicator
```

Each component should:
- Accept only the props needed for behavioral variance
- **Never** accept inline style props for color or radius
- Use Tailwind classes drawn exclusively from the extended theme (no arbitrary values)

---

### Phase 3: Game Table Refactor (Day 11–12)

The game canvas requires a targeted refactor:

1. If the game is rendered on `<canvas>`: Update the `fillStyle` for the table background from `#2dd4bf` to `#1c1f2a` and draw the divider line using `rgba(255,255,255,0.12)`. The ball can use `#9d6ef5` with a shadow effect.

2. If the game is DOM-based: Apply `.game-table` CSS class as specified in Section 4.5.

3. The "Change Table Colour" button should cycle through a controlled set of approved dark themes (deep navy, dark forest, dark burgundy) — not arbitrary colors — and update a CSS class rather than an inline style.

---

### Phase 4: Accessibility & Polish (Days 13–14)

1. **Contrast audit:** Run all text/background combinations through a WCAG AA checker. Ensure `--color-text-secondary` (`#8b91a8`) meets 4.5:1 ratio against `--color-bg-raised`.

2. **Focus states:** Add visible focus rings using `box-shadow: 0 0 0 3px var(--color-brand-glow)` to all interactive elements. Remove `outline: none` without a replacement.

3. **Reduced motion:** Wrap ambient animations in `@media (prefers-reduced-motion: no-preference)`.

4. **Semantic HTML audit:** Confirm buttons are `<button>`, nav links are `<a>`, and the chat message list is a proper `<ul>/<li>` or ARIA `role="log"`.

---

### Phase 5: Validation & Documentation (Day 15)

1. **Visual regression testing:** Take full-page screenshots of all 5 screens before and after. Diff them using Percy, Chromatic, or a manual side-by-side review.

2. **Cross-browser check:** Test Chrome, Firefox, and Safari (especially for `backdrop-filter` and CSS variable inheritance).

3. **Design handoff:** Export this document and the `tokens.css` file to your shared Notion/Confluence space so design and engineering share the same reference.

4. **Version the tokens:** Add a `/* Design System v1.0 */` comment header to `tokens.css`. Any future changes to tokens must increment the version and include a changelog comment.

---

## Appendix: Quick Migration Reference

| Old pattern | Replace with |
|---|---|
| `text-[#14b8a6]` (teal accent) | `text-brand-400` |
| `bg-[#2dd4bf]` (teal table) | `bg-bg-overlay` |
| `rounded-full` on buttons | `rounded-md` |
| `text-blue-400` (chat bubbles) | `bg-brand-500 text-white` |
| `font-mono` on body text | `font-body` |
| `bg-[#1e2d3d]` (chat panels) | `bg-bg-overlay` |
| Hardcoded `#7c3aed` strings | `var(--color-brand-500)` |
| Hardcoded `#22c55e` (wins) | `var(--color-success)` |
| Hardcoded `#ef4444` (losses) | `var(--color-danger)` |

---

*This document is the authoritative design reference for PaddlePro v1.0. All UI pull requests should reference this spec in their description and confirm compliance with the token system before merge.*