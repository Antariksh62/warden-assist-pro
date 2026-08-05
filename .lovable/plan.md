# HOIDSS — Hostel Incharge Decision-Support Dashboard (Design Only)

Not a chart collection. A single executive briefing surface that walks the Chief Warden from "how are we doing" to "what do I do in the next hour" to "what will hurt me next month". Deliverable is design: workflow, hierarchy, narrative, component semantics, tokens. No backend, no APIs, no auth, no data models, no business logic, no new routes.

## The executive workflow the screen is built around

The Incharge opens this once in the morning and again before evening rounds. Five moves, in order:

```text
1. ORIENT    Is the hostel operation healthy today?          -> one verdict, not six numbers
2. TRIAGE    What is on fire and who owns it?                -> act now, assign, escalate
3. DIAGNOSE  Why is it happening, and where does it repeat?  -> cause, place, pattern
4. DECIDE    What should I approve or fund?                  -> ranked recommendations
5. ANTICIPATE What breaks next, and what will it cost?       -> forecast, prevent
```

The page reads top to bottom in exactly that order. Nothing appears out of sequence, and each band ends with a way forward — an action button, a drill-down, or a recommendation — so the reader never lands on a dead metric.

## Narrative arc, band by band

**Band 1 — The verdict (Orient).** A single sentence in display type: the operational state of the hostel today, written as a claim, not a label ("Operations are stable, but Block B electrical load is trending toward failure"). Beside it: the Hostel Health Score as one composite figure with its week-over-week direction, and Today's Priority as one named commitment with one primary action. This band exists so the reader can stop here and still be correctly informed.

**Band 2 — The six signals (Orient, in detail).** Health, Satisfaction, Occupancy, Open Complaints, SLA Compliance, Infrastructure Health. Each card is written to answer "So what?" on its face: value, direction, and a one-line consequence clause ("SLA 88% — 6 complaints will breach before midnight"). Every card is a button into the drill-down drawer; a card with no consequence shows "within tolerance" rather than a bare number.

**Band 3 — Act now (Triage).** Critical alerts as an ownership queue, not a log. Sorted by decision urgency: safety, then SLA-breaching, then aging. Each row states the risk, the exact location, how long it has been unowned, who owns it, and offers Assign / Escalate / Inspect inline. Overdue complaints, safety issues, electrical failures, water leakage, internet outages and overdue inspections surface here as filters over one queue rather than as separate widgets.

**Band 4 — Understand the pattern (Diagnose).** Complaint intelligence framed as three questions instead of ten charts: *What keeps happening* (most frequent, category mix, repeat and reopened rate), *Where it concentrates* (hotspots, hostel/block/floor/room comparison, most problematic rooms), *How fast we clear it* (aging, average resolution, peak hours, seasonality). Each cluster carries a one-line takeaway above the visual, so the visual proves the sentence rather than replacing it.

**Band 5 — Where it lives (Diagnose, spatial).** The interactive heatmap as the spatial answer to Band 4: Hostel > Block > Floor > Room, breadcrumb-driven, every cell clickable into the drawer. Selecting a cell filters the bands above it, making the heatmap the primary investigative instrument rather than decoration.

**Band 6 — What to do about it (Decide).** The AI Recommendation panel is the destination of the whole narrative, pinned alongside Bands 4-5 so cause and remedy stay visible together. Each recommendation is a decision object: the ask, the reason drawn from the evidence above, confidence, expected impact in operational and rupee terms, priority, and Approve / Snooze / See evidence. "See evidence" jumps to the exact chart or heatmap cell that produced it.

**Band 7 — Who can absorb the work (Decide, capacity).** Staff and housekeeping intelligence, framed as a staffing decision: current workload, overloaded vs idle, response and resolution times, SLA compliance, leaderboard, cleaning completion, verification rate and failed inspections. Ends in a rebalance action, because the only useful output of this band is a reassignment.

**Band 8 — What it costs and what breaks next (Anticipate).** Maintenance and financial intelligence joined to prediction: recurring repairs and replacement candidates with payback, cost by category and hostel, budget forecast with variance, then expected complaints, upcoming failures, high-risk rooms and expected budget — each with a confidence interval and a "convert to recommendation" affordance so a forecast can become a decision.

**Always available, never in the way.** Scope filters (date, hostel, block, category, severity, staff) live in the sticky header as removable chips and re-narrate every band. The notification center is a right-hand sheet of real-time events, escalations, maintenance updates and inspection alerts. The drill-down drawer opens from any KPI, alert, table row or heatmap cell and always tells the same story: Timeline, History, Photos, Assigned Staff, Previous Complaints, Maintenance History, Student Feedback, Recommendations — ending in a primary action. Modals are used only to commit or destroy.

## Information hierarchy rules

- One verdict per band, stated in words before any visual.
- Numbers earn their size: the composite score is largest, the six signals next, supporting series smallest.
- Status is meaning, never decoration: emerald / amber / red only for state, blue only for interaction, everything else graphite.
- Every metric surface has exactly one next step — drill down, assign, or approve.
- Tables are for enumeration after a decision is framed, never as the first answer to a question.

## Design language

- Dark mode first with a header light/dark toggle; theming through semantic tokens only.
- Slate/graphite surfaces, hairline borders, one blue accent, status-only emerald/amber/red.
- Clean geometric sans: display 32/40 verdicts, 20/28 band titles, 13-14 body, 11 uppercase tracked labels, tabular numerals everywhere.
- 8px base spacing, 24px card padding, 32-48px band rhythm, 1440px max width, generous negative space.
- Glass used once: sticky header and drawer scrim. Motion 120-180ms ease-out, 220ms drawer, staggered load fade, reduced-motion respected.
- WCAG: 4.5:1 minimum, visible focus rings, status carries icon plus label, drawer and heatmap fully keyboard navigable.
- Responsive: sidebar collapses to icon rail under 1280px and to a sheet under 768px; signal strip reflows 6 > 3 > 2; the recommendation panel is promoted above the diagnostic charts on mobile because the decision matters more than the evidence on a phone.

## Technical notes

- Tokens (surfaces, borders, status, radii, shadows, chart series) defined in `src/styles.css` as oklch variables for both themes; components consume semantic tokens only.
- Presented at `/`, replacing the placeholder index. No other page touched, no routes added.
- Charts use existing chart primitives styled to the token palette with illustrative static values; no fetching, no persistence.
- Lucide icons at 16/18px, 1.5px stroke. Theme toggle is presentation-only.
