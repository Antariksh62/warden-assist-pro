# HOIDSS — Hostel Incharge Executive Dashboard (Design Only)

A single-screen enterprise decision-support dashboard for the Chief Warden / Operations Head. Deliverable is design, not application code: layout, hierarchy, component arrangement, spacing, tokens, and UX behaviour, expressed as a rendered dashboard surface (design system + static presentation layer, no backend, no APIs, no auth, no data models, no business logic, no new routes).

## Design language

- Dark mode first, with a persistent light/dark toggle in the header (token-level theming, no hardcoded colors).
- Palette: slate/graphite surfaces, one blue accent for interaction, emerald / amber / red reserved strictly for status semantics. No decorative color.
- Typography: one clean geometric sans. Display 32/40 for the executive headline, 20/28 section titles, 13-14 body, 11 uppercase tracked labels, tabular numerals for all metrics.
- Spacing: 8px base, 24px card padding, 32px section rhythm, 1440px max content width, generous negative space.
- Glass used once only: the sticky header and drawer scrim (subtle blur, 1px hairline borders). Everything else is flat surface + hairline.
- Motion: 120-180ms ease-out for hover/expand, 220ms drawer slide, staggered card fade on load. Nothing loops, nothing bounces. Respects reduced-motion.
- Accessibility: 4.5:1 minimum contrast, visible focus rings, status never encoded by color alone (icon + label), keyboard-reachable drawers and heatmap cells.

## Layout architecture

```text
+-----------+---------------------------------------------------------------+
| SIDEBAR   | STICKY HEADER: date | scope filters | search | theme | bell   |
| (collapse |---------------------------------------------------------------|
|  to icon) | EXECUTIVE BRIEF BAND  (AI summary + Today's Priority + score) |
|           |---------------------------------------------------------------|
| Overview  | KPI STRIP  6 cards (health, satisfaction, occupancy, open,    |
| Alerts    |            SLA, infra) - each click-through to drawer         |
| Complaint |---------------------------------------------------------------|
| Infra     | CRITICAL ALERTS  (triage list, severity rail, action buttons)  |
| Staff     |---------------------------------------------------------------|
| Housekeep | 8/4 SPLIT: charts column        | AI RECOMMENDATION PANEL     |
| Maintain  |  trends, distribution, aging    |  ranked cards: reason,      |
| Finance   |  hotspots, resolution time      |  confidence, impact,        |
| Predict   |---------------------------------|  priority, accept/dismiss   |
| Insights  | INTERACTIVE HEATMAP  hostel > block > floor > room breadcrumb  |
|           |---------------------------------------------------------------|
| footer:   | INTELLIGENCE TABS: Infra | Staff | Housekeeping | Maintenance |
| user chip | Finance | Predictive  -> dense sortable tables + mini charts   |
+-----------+---------------------------------------------------------------+
```

Right-side drill-down drawer (520px, overlay + scrim) and modals sit above this. Responsive: sidebar collapses to icon rail under 1280px and to a sheet under 768px; KPI strip reflows 6 > 3 > 2; the 8/4 split stacks with the recommendation panel promoted above charts on mobile.

## Sections and component specs

1. **Executive brief band** — Hostel Health Score as a large radial figure with delta vs last week, an AI Executive Brief paragraph (3 sentences max) and a "Today's Priority" callout with a single primary action.
2. **KPI strip** — six uniform cards: label, big tabular value, delta chip with trend arrow, 40px sparkline, status dot. Whole card is a button that opens the drill-down drawer.
3. **Critical alerts** — grouped triage list with a 3px severity rail, category icon, location chip (Hostel/Block/Floor/Room), age-since-breach, owner avatar, and inline Assign / Escalate / View actions. Filter chips: overdue, SLA breach, safety, electrical, water, internet, inspection.
4. **Complaint intelligence** — trend area chart with forecast band, category donut, aging histogram, repeat-complaint list, peak-hours matrix, seasonal comparison, resolution-time gauge, reopened-rate stat.
5. **Infrastructure intelligence** — hostel/block/floor comparison bars, room + asset health tables, most-problematic-rooms ranked list, maintenance backlog burn chart.
6. **Staff intelligence** — workload bars per staff, leaderboard table (response, resolution, SLA), overloaded/idle split callouts with rebalance action.
7. **Housekeeping** — completion progress rings, verification rate, inspection calendar strip, failed-inspection list.
8. **Maintenance intelligence** — cost trend, recurring-repair table, replacement candidates with payback estimate, asset failure rate.
9. **Financial insights** — cost by category and by hostel bars, budget forecast line with variance band, cost-saving opportunity cards.
10. **Predictive insights** — forecast cards for expected complaints, upcoming failures, high-risk rooms, expected budget, each with confidence interval.
11. **AI recommendation panel** — ranked cards: title, one-line reason, confidence meter, expected impact metric, priority badge, Accept / Snooze / Details.
12. **Notification center** — header bell opens a right sheet with grouped real-time feed (critical, maintenance, escalation, inspection), unread markers, mark-all-read.
13. **Drill-down drawer** — header with entity + status, tabs for Timeline, History, Photos, Assigned Staff, Previous Complaints, Maintenance History, Student Feedback, Recommendations. Sticky footer with primary action.
14. **Filters** — sticky header scope bar: date range, hostel, block, category, severity, staff — rendered as removable chips with a Reset control.
15. **Tables** — dense 44px rows, sticky header, zebra-free hairline dividers, right-aligned numerics, status pills, row hover reveals actions, pagination footer.
16. **Modals** — centered confirm/assign dialogs with a two-button footer, used for destructive or committing actions only.

## Technical notes

- Design tokens (surfaces, borders, status colors, radii, shadows, chart series) defined in `src/styles.css` as oklch variables for both themes; components consume semantic tokens only.
- The dashboard is presented at `/` (replacing the placeholder index) as the single designed surface. No other page is touched, no routes added.
- Charts rendered with the existing chart primitives, styled to the token palette; illustrative static values only — no fetching, no state persistence, no backend.
- Icons: Lucide throughout, 16/18px, 1.5px stroke.
- Theme toggle is presentation-only (class on the document root), persisted in-memory for the session.
