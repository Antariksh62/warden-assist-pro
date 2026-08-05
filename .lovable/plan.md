# HOIDSS — Hostel Operations Intelligence (Design Only)

An operations-intelligence console for the Hostel Incharge of PICT Boys Hostel. Not a dashboard of charts: one continuous investigation surface where every element hands the reader to the next question. Deliverable is design — workflow, context model, hierarchy, narrative, component semantics, tokens, motion. No backend, no APIs, no auth, no data models, no business logic, no new routes.

## The investigation loop (the core UX contract)

```text
WHAT is happening?  ->  WHY?  ->  WHERE exactly?  ->  WHO owns it?
        ->  WHAT should I do?  ->  WHAT if I don't?
```

**One shared investigation context** drives the whole page: `{ category, hostel, block, floor, room, severity, dateRange, staff }`. Any click writes to it; every band reads from it.

- Clicking a KPI, a category slice, an alert row, a staff member, an inspection or a heatmap cell narrows the context — it does not open a dead end.
- A **context bar** under the header shows the active investigation as removable chips ("Electrical", "Block B", "Last 14 days") with Clear all, plus a back-step so the reader can retrace the investigation.
- Bands re-narrate under the active context: titles, verdict sentences and recommended actions all restate against the current filter.

Worked path, designed explicitly: Open Complaints -> Electrical -> Complaint Intelligence re-scopes to Electrical -> heatmap highlights affected hostels/blocks/floors/rooms and dims the rest -> selecting Room B-214 opens the Investigation Drawer -> drawer ends in Approve inspection, which returns the reader to Mission Control with that recommendation resolved.

## Page order and natural-language titles

```text
+---------+--------------------------------------------------------------+
| SIDEBAR | HEADER  PICT Boys Hostel / Today's Operational Status        |
| (hostel |         search  scope  theme  bell  user                     |
|  first: | CONTEXT BAR  active investigation chips                      |
|  Today, |--------------------------------------------------------------|
|  Comp-  | EXECUTIVE MORNING BRIEF   overnight ledger + status pill     |
|  laints,|                           health score, priority, AI summary |
|  Spaces,|--------------------------------------------------------------|
|  People,| "What is happening today?"   six operational signal cards    |
|  Assets,|--------------------------------------------------------------|
|  Money, | "What keeps breaking?"        | MISSION CONTROL              |
|  Fore-  |   complaint intelligence      |  (sticky AI rail, spans      |
|  cast)  |------------------------------ |   the investigation bands)   |
|         | "Where is it happening?"      |                              |
|         |   THE HOSTEL HEATMAP (hero)   |                              |
|         |------------------------------ |                              |
|         | "Who owns the problem?"       |                              |
|         |   ownership queue + staff     |                              |
|         |--------------------------------------------------------------|
|         | "What will become a problem soon?"  maintenance, cost,       |
|         |   prediction — each convertible into a recommendation        |
+---------+--------------------------------------------------------------+
```

Sidebar and section labels avoid Dashboard / Overview / Analytics entirely. Nav reads: Today, Complaints, Spaces, People, Assets, Money, Forecast, Settings — with the hostel name and shift indicator at the top as the product identity.

## Band specifications

**Executive Morning Brief.** The newspaper headline of the day, full width, largest type on the page. Left: an overnight ledger as a scannable list of eight or fewer plain sentences (received, resolved, approaching breach, inspections completed, occupancy milestone, outage restored, one item awaiting approval) — each line clickable, each click narrowing the investigation context. Right: Hostel Health Score as a radial gauge with week delta, Overall Operational Status pill (Stable / Strained / Critical), Today's Priority as one named commitment with owner and primary action, and the AI Executive Summary as three claim sentences with confidence.

**"What is happening today?"** Six signal cards — Occupancy, Student Satisfaction, Infrastructure Health, Complaint Health, Housekeeping Status, Maintenance Status. Each is three lines, never a bare number: the metric with delta and sparkline, the consequence, the recommended action. "SLA 88% — six complaints breach before midnight — assign two more electricians" with an inline action and a drill-down affordance.

**"What keeps breaking?"** Complaint intelligence in three clusters, each opening with a written takeaway: what keeps happening (top categories, distribution, severity split, repeat and reopened rates), how it moves (frequency over time, seasonal comparison, peak-hour matrix), how fast we clear it (aging, resolution-time distribution). Every category mark is clickable and writes to context. Each cluster closes with a recommended action, not a legend.

**"Where is it happening?" — the heatmap, signature component.** The largest interactive element on the page, ~2/3 viewport height. Hostel > Block > Floor > Room with breadcrumb drilldown and animated zoom between levels. Cells coloured by composite operational health on a graphite-to-amber-to-red scale, never by category. Hover reveals a rich tooltip: room number, complaint count, complaint types, maintenance history summary, occupant, inspection score, infrastructure health, estimated maintenance cost. Click re-scopes the entire dashboard and offers Open investigation. Under the active context, unaffected cells dim rather than disappear so the pattern stays legible. Beside it: hostel/block/floor comparison bars, most problematic rooms, hotspot list — all context-linked. Fully keyboard navigable with arrow-key cell traversal.

**"Who owns the problem?"** One ownership queue replacing seven widgets: active emergencies, SLA breaches, pending inspections, pending maintenance, housekeeping backlog, escalations, critical alerts as severity-sorted rows with severity rail, location chip, unowned duration, owner avatar, inline Assign / Escalate / Inspect. Categories are filter chips over the single queue. Below: staff workload bars, availability, response and resolution medians, cleaning performance, inspection completion, leaderboard — overloaded vs idle as the headline, ending in Rebalance.

**Mission Control (AI).** Not a card — a sticky rail that travels with the investigation bands, visually distinct (slightly elevated surface, its own header, an "active decisions" count). Each recommendation is a decision object: title with urgency icon, WHY in one sentence, an evidence list of 2-3 cited findings, confidence score with meter, operational impact, estimated financial impact if ignored (₹), urgency badge, primary action button, and See Evidence which scrolls to and flashes the exact chart mark or heatmap cell that produced it while writing that scope into the context. Resolving a recommendation animates it into a Decided section with a timestamp, so the rail reads as the day's decision log.

**"What will become a problem soon?"** Maintenance (most repaired assets, recurring failures, preventive schedule, asset health, cost trend, replacement candidates with payback), financial (spending, budget utilisation, cost by hostel, cost by complaint type, monthly trend), and predictive (complaint forecast with confidence band, high-risk rooms, expected maintenance cost, expected occupancy, failure prediction). Every forecast card carries the cost of inaction and a Convert to recommendation action that promotes it into Mission Control.

**Investigation Drawer.** 520px right drawer opened from any card, row, table or heatmap cell. Header names the entity and its health; tabs: Timeline, Previous Complaints, Maintenance History, Inspection History, Assigned Staff, Student Feedback, Photos, Assets in Room, AI Recommendation. Sticky footer holds one primary action plus Investigate further, which pushes the entity into context and closes the drawer so the page below is already re-scoped.

**Persistent chrome.** Sticky header: hostel name + shift, ⌘K search, scope filters, theme toggle (dark first), notification bell with unread dot, user chip. Notification Center as a right sheet grouped by event type, each event clickable into the investigation. Modals only to commit or destroy.

## Design language

- Dark mode first with a header toggle; all theming via semantic tokens.
- Near-black graphite canvas, elevated card surfaces, hairline borders, soft low-spread shadows, 10-12px radii. One blue accent for interaction; emerald / amber / red for status only. No decorative gradients. Glass used twice: sticky header and drawer scrim.
- Typography: one clean geometric sans — 34/42 brief headline, 20/28 question titles, 13-14 body, 11 uppercase tracked labels, tabular numerals everywhere.
- Spacing: 8px base, 24px card padding, 48px band rhythm, 1440px max width, generous negative space.
- Motion earns its place: 120-180ms hovers, 220ms drawer, 260ms heatmap level zoom, context changes cross-fade affected bands, See Evidence scroll plus a single 400ms highlight pulse. Reduced-motion respected; nothing loops.
- Accessibility: 4.5:1 minimum, visible focus rings, status carries icon plus text, heatmap and drawer fully keyboard operable, context changes announced politely.
- Responsive: sidebar to icon rail under 1280px and a sheet under 768px; signal strip 6 > 3 > 2; Mission Control becomes a promoted section above the evidence bands on mobile; heatmap gains a level-selector control in place of hover tooltips.

## Reference extraction (inspiration only, nothing copied)

Lunor: dark shell, hairline cards, grouped sidebar. Kravio: signal-card anatomy and the right-hand activity rail that becomes the Notification Center. Power BI: small-multiple discipline and titled-with-dimension charts (its palette rejected). Signalry: metric row -> three-up analysis -> full-width insight table rhythm. PlanMate: card breathing room and light-theme calibration. Adflux: breadcrumb + title + status pill + filter cluster as one header block, delta chips. TailAdmin: header composition (collapse, ⌘K search, theme toggle, bell with dot, user chip) and the radial gauge reused for Health Score (its brightness rejected); its skeleton shot sets the loading choreography. No reference data, palette or branding is reused.

## Technical notes

- Tokens (surfaces, borders, status scale, heatmap ramp, radii, shadows, chart series) defined in `src/styles.css` as oklch variables for both themes; components consume semantic tokens only.
- Presented at `/`, replacing the placeholder index. No other page touched, no routes added.
- The shared investigation context is client-side presentation state only; charts use existing chart primitives with illustrative static values. No fetching, no persistence. Lucide icons at 16/18px, 1.5px stroke.
