# HOIDSS — Hostel Operations Intelligence & Decision Support System (Design Only)

An executive decision-support surface for the Hostel Incharge / Chief Warden. Not an analytics dashboard: the screen walks the reader through six questions in order and ends every element in an action. Deliverable is design — workflow, hierarchy, narrative, component semantics, tokens, motion. No backend, no APIs, no auth, no data models, no business logic, no new routes.

## The six questions as the page spine

```text
1. WHAT IS HAPPENING NOW?     Executive Brief + KPI signal strip
2. WHY IS IT HAPPENING?       Complaint Intelligence
3. WHERE IS IT HAPPENING?     Spatial Intelligence + heatmap
4. WHO IS RESPONSIBLE?        Operational queue + Staff Intelligence
5. WHAT SHOULD I DO NEXT?     AI Recommendation rail (pinned)
6. WHAT BREAKS SOON?          Maintenance, Financial, Predictive Intelligence
```

Each band is titled with its question, carries a one-line written verdict above any visual, and ends with a way forward. The recommendation rail is pinned alongside bands 2-4 so cause and remedy stay visible together.

## What each reference contributes (extract, don't average)

- **Lunor (dark contract app)** — the overall dark shell: near-black canvas, hairline-bordered cards, restrained monochrome charts, sidebar grouping with a workspace section. This sets the base surface language.
- **Kravio (dark ticketing)** — the KPI card pattern (label + eyebrow icon, large tabular value, delta vs last week, inline sparkline) and the right-hand "Latest Updates" activity rail, which becomes the Notification Center sheet.
- **Power BI board** — density and small-multiple discipline: tight labelled chart titles with a subtitle stating the dimension. Adopted for Complaint and Financial Intelligence; its color use is explicitly rejected.
- **Signalry** — the toolbar rhythm: horizontal metric row, then a three-up analysis grid, then a full-width insight table. Adopted for the band internals.
- **PlanMate** — the breathing spacing and the light-mode calibration: how much air a card needs, how the light theme should read.
- **Adflux** — breadcrumb + page title + status pill + tab strip + filter cluster as one header block, and delta chips with directional micro-sparklines. Adopted for the sticky scope bar.
- **TailAdmin (both shots)** — the header composition: hamburger/collapse, command-palette search with ⌘K affordance, theme toggle, notification bell with unread dot, user chip. Also the radial gauge treatment, reused for the Hostel Health Score. Its blue-on-white brightness is rejected.
- **TailAdmin skeleton shot** — the loading choreography: skeleton blocks in the exact final card geometry, staggered fade-in.

Nothing is copied verbatim: no reference data, no reference palette, no branding.

## Band specifications

**Band 1 — Executive Brief (What is happening now).** Full-width band, three zones: Hostel Health Score as a large radial gauge with week delta; AI Executive Summary written as three claim sentences with confidence noted; Today's Priority as one named commitment with a single primary action and its owner. An Overall Operational Status pill (Stable / Strained / Critical) anchors the left.

**Band 2 — KPI signal strip.** Six cards: Occupancy, Student Satisfaction, Infrastructure Health, Open Complaints, SLA Compliance, Housekeeping Completion. Each carries label + icon, big tabular value, delta chip, 40px sparkline, and a consequence clause answering "so what" ("SLA 88% — 6 items breach before midnight"). Entire card is a button into the drill-down drawer.

**Band 3 — Complaint Intelligence (Why).** Grouped as three questions, each with a written takeaway: *what keeps happening* (top categories, distribution, severity split, repeat and reopened rates), *how it moves* (frequency over time with trend line, seasonal comparison, peak-hour matrix), *how fast we clear it* (aging histogram, resolution-time distribution). Charts are monochrome-plus-status, gridlines hairline, axis labels 11px.

**Band 4 — Spatial Intelligence (Where).** Interactive heatmap as the centrepiece: Hostel > Block > Floor > Room with a breadcrumb, every cell keyboard-focusable and clickable into the drawer; selecting a cell re-scopes the bands above. Beside it: hostel/block/floor comparison bars, most problematic rooms and hotspot list.

**Band 5 — Operational Intelligence (Who, part 1).** One ownership queue, not seven widgets: active emergencies, SLA breaches, pending inspections, pending maintenance, housekeeping backlog, escalations and critical alerts appear as severity-sorted rows with a severity rail, location chip, unowned duration, owner avatar, and inline Assign / Escalate / Inspect. The seven categories are filter chips over this one queue.

**Band 6 — Staff Intelligence (Who, part 2).** Workload bars per staff member, availability state, response and resolution medians, cleaning performance, inspection completion, leaderboard table. Overloaded vs idle contrast is the headline, and the band ends in a Rebalance action.

**Band 7 — AI Recommendations (What next).** Pinned right rail on wide screens, promoted above charts on mobile. Each card: the ask, WHY drawn from the evidence above, confidence meter, expected impact in operational and rupee terms, priority badge, and Approve / Snooze / See evidence — where "See evidence" scrolls to the exact chart or heatmap cell that produced it.

**Band 8 — Maintenance & Financial Intelligence (What breaks soon, cost).** Most-repaired assets, recurring failures, preventive-maintenance schedule, asset health table, maintenance cost trend, replacement recommendations with payback. Then maintenance spending, budget utilisation bar, cost by hostel, cost by complaint type, monthly trend.

**Band 9 — Predictive Intelligence.** Complaint forecast with a confidence band, high-risk rooms, expected maintenance cost, expected occupancy, failure prediction — each forecast card offering "convert to recommendation" so a prediction becomes a decision.

**Persistent chrome.** Collapsible sidebar with grouped sections (Executive, Intelligence, Operations, Settings) and a user chip footer. Sticky header: breadcrumb, page title, status pill, ⌘K search, scope filters as removable chips (date, hostel, block, category, severity, staff), theme toggle, notification bell with unread dot. Notification Center as a right sheet grouped by event type. Drill-down drawer (520px) opening from any card, row or heatmap cell with tabs — Timeline, History, Photos, Assigned Staff, Previous Complaints, Maintenance History, Student Feedback, Recommendations — and a sticky primary action. Modals only for committing or destructive actions.

## Design language

- Dark mode first, header toggle to light; all theming through semantic tokens.
- Near-black graphite canvas, elevated card surfaces, hairline borders, soft low-spread shadows, 10-12px radii. One blue accent for interaction; emerald / amber / red strictly for status. No decorative gradients.
- Glass used twice only: sticky header and drawer scrim.
- Typography: one clean geometric sans — 32/40 display verdicts, 20/28 band titles, 13-14 body, 11 uppercase tracked labels, tabular numerals for every metric.
- Spacing: 8px base, 24px card padding, 40-48px band rhythm, 1440px max width, generous negative space.
- Motion: 120-180ms ease-out hovers, 220ms drawer slide, staggered skeleton-to-content fade on load, reduced-motion respected. Nothing loops.
- Accessibility: 4.5:1 minimum, visible focus rings, status carries icon plus text, heatmap and drawer fully keyboard operable.
- Responsive: sidebar to icon rail under 1280px and a sheet under 768px; KPI strip 6 > 3 > 2; recommendation rail promoted above evidence on mobile.

## Technical notes

- Tokens (surfaces, borders, status, radii, shadows, chart series) defined in `src/styles.css` as oklch variables for both themes; components consume semantic tokens only.
- Presented at `/`, replacing the placeholder index. No other page touched, no routes added.
- Charts use existing chart primitives styled to the token palette with illustrative static values; no fetching, no persistence. Lucide icons at 16/18px, 1.5px stroke. Theme toggle is presentation-only.
