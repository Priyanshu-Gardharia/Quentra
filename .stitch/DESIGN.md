# Design System: Quentra – Hospital Queue Management System

## 1. Visual Theme & Atmosphere
Clean, minimal, professional healthcare app. Light and airy with a soft mint-tinted background. The UI is functional, trustworthy, and information-dense without feeling cluttered. Generous whitespace with clear visual hierarchy.

## 2. Color Palette & Roles
- **Soft Mint Background** (#f2fbf9) — Page background throughout the entire application
- **Pure White** (#ffffff) — Card backgrounds, header backgrounds, form surfaces
- **Deep Indigo Blue** (#2B419C) — Primary CTA buttons, issue-token buttons, key actions
- **Indigo Hover** (#22358a) — Button hover state
- **Bright Blue Accent** (#3B82F6) — Now-serving token numbers, highlights
- **Sky Blue** (#2D9CDB) — Tags, pills, badges (e.g., OPD badge)
- **Soft Blue Accent** (#3A8EEB) — Active sidebar items, navigation active state
- **Light Blue Surface** (#EBF2FF / #EFF6FF / #e7f0ff) — Form cards, token form backgrounds, now-serving panels
- **Slate Background** (#EAF2F7) — Sidebar background, stat cards
- **Near Black** (#000000 / #0f172a / #1A1A1A) — Primary text, headings
- **Dark Gray** (#262626 / #4F4F4F) — Secondary text, labels
- **Muted Gray** (#7B7B7B / #64748b) — Tertiary text, metric labels
- **Light Border** (#e2e8f0 / rgba(0,0,0,0.08-0.1)) — Input borders, card borders
- **Soft Green** (rgba(93, 239, 98, 0.25)) — Visit type active state
- **Alert Red** (#EF4444 / #FF6B6B) — Urgent priority, errors
- **Success Green** (#10B981) — Online status

## 3. Typography Rules
- **Font Family**: `Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif` as primary font
- **Heading Font**: `Poppins, system-ui, sans-serif` for section titles and card titles
- **Font Weights**: 200 (light labels), 300 (subtle info), 400 (body text), 500 (section titles, buttons), 600 (emphasis, button text, heading emphasis), 700 (logo, dashboard titles)
- **Font Sizes**: 13-14px (labels, small text), 16px (body, datetime), 18px (sub-sections), 20-22px (form titles, metrics), 24-28px (section titles), 32px (logo)
- **Line Height**: 1.21em for body, 1.5em for headings

## 4. Component Stylings
* **Buttons (Primary):** Gently rounded (8px radius), deep indigo blue (#2B419C) background, white text, Poppins 18px font-weight 600. Hover: darker shade (#22358a). 0.2s transition.
* **Buttons (Pill):** Fully rounded (999px radius), light blue (#e7f0ff) background, black text, Inter 18px 500 weight. Hover: slightly darker background.
* **Cards:** Generously rounded (16px radius), white background, soft shadow `0 8px 24px rgba(15, 23, 42, 0.06)`. Padding 24px. Hover: subtle shadow change.
* **Form Cards:** 12px radius, light blue (#EBF2FF) background, no shadow. 24px padding.
* **Inputs/Forms:** 8px radius, white background, 1px solid #e2e8f0 border. 12px 16px padding. Focus: blue border #1578f8.
* **Stat Cards:** 12px radius, #EAF2F7 background, 24px padding, no shadow.

## 5. Layout Principles
- Max content width: 1400px, centered with `margin: 0 auto`
- Page padding: 32px
- Content grid: `grid-template-columns: 1fr 400px` with 32px gap
- Card grid: `repeat(auto-fit, minmax(300px, 1fr))` with 24px gap
- Section gaps: 24px between sections
- Header: full-width, 3-column grid (logo | datetime | login button), 6px vertical padding, 24px horizontal padding
