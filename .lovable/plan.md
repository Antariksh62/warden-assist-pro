# HOIDSS — Hostel Operations Intelligence (Design Only)

An operations-intelligence console for the Hostel Incharge of PICT Boys Hostel. Not a dashboard of charts: one calm, continuous investigation surface where every element hands the reader to the next question and detail appears only when asked for. Deliverable is design — workflow, context model, hierarchy, disclosure tiers, component semantics, tokens, motion. No backend, no APIs, no auth, no data models, no business logic, no new routes.

## Calm by default: three tiers of disclosure

The full feature list is not a layout instruction. Everything requested exists, but only Tier 1 is on screen at rest.

```text
TIER 1  AT REST      What must be seen without asking.
                     Morning brief, six signals, heatmap, Mission Control,
                     the ownership queue's top items. Fits ~2 screens.
TIER 2  ON REQUEST   Expanded in place: a band opens into its detail cluster
                     (charts, comparisons, tables) when the reader chooses it,
                     or when the investigation context makes it relevant.
TIER 3  ON INVESTIGATION  The drawer. Per-entity depth: timelines, histories,
                     photos, feedback, assets, per-room recommendation.
```

Rules that keep it calm:

- No band shows more than three visuals at rest; the rest live behind a single "Show detail" expansion with a one-line summary of what is inside.
- Every band opens with one plain-language verdict sentence. If the reader reads only sentences, they are correctly informed and can stop.
- A metric appears once on the page. Repetition is replaced by links into context.
- Whitespace is a requirement, not a leftover: 48px between bands, at most six cards in any row, no card shorter than its content needs.
- Charts default to their simplest useful form. Small multiples, dual axes and dense matrices are Tier 2 only.
- If a section cannot be made legible in its slot, the layout changes — the section moves to Tier 2 or gets its own full-width band. Nothing is shrunk to fit.

## The investigation loop (the core UX contract)

```text
WHAT is happening?  ->  WHY?  ->  WHERE exactly?  ->  WHO owns it?
        ->  WHAT should I do?  ->  WHAT if I don't?
```

**One shared investigation context** drives the page: `{ category, hostel, block, floor, room, severity, dateRange, staff }`. Any click writes to it; every band reads from it.

- Clicking a KPI, category, alert row, staff member, inspection or heatmap cell narrows the context — never a dead end.
- A **context bar** under the header shows the active investigation as removable chips ("Electrical", "Block B", "Last 14 days") with Clear all and a back-step to retrace.
- Under an active context, relevant Tier 2 detail auto-expands and irrelevant bands collapse to their verdict line — the page gets quieter as the question gets sharper.

Worked path: Open Complaints -> Electrical -> complaint detail expands, scoped to Electrical -> heatmap highlights affected blocks and dims the rest -> Room B-214 opens the Investigation Drawer -> drawer ends in Approve inspection, returning to Mission Control with that decision logged.

## Page order and natural-language titles

```text
+---------+--------------------------------------------------------------+
| SIDEBAR | HEADER   PICT Boys Hostel / Today's Operational Status       |
| Today   | CONTEXT BAR   active investigation chips                     |
| Comp-   |--------------------------------------------------------------|
| laints  | EXECUTIVE MORNING BRIEF   overnight ledger + status,          |
| Spaces  |                           health score, priority, AI summary |
| People  |--------------------------------------------------------------|
| Assets  | "What is happening today?"   six signal cards, 3 lines each   |
| Money   |--------------------------------------------------------------|
| Forecast| "Where is it happening?"      | MISSION CONTROL              |
|         |   THE HOSTEL HEATMAP (hero)   |  sticky AI rail, travels     |
|         |------------------------------ |  with the investigation      |
|         | "What keeps breaking?"        |  bands                       |
|         |   verdict + 3 visuals         |                              |
|         |   [Show complaint detail]     |                              |
|         |------------------------------ |                              |
|         | "Who owns the problem?"       |                              |
|         |   top 5 queue [Open queue]    |                              |
|         |--------------------------------------------------------------|
|         | "What will become a problem soon?"  3 forecast cards          |
|         |   [Show maintenance & cost detail]                            |
+---------+--------------------------------------------------------------+
```

The heatmap sits above complaint detail because "where" is the Incharge's fastest route to action. Sidebar and section labels avoid Dashboard / Overview / Analytics: Today, Complaints, Spaces, People, Assets, Money, Forecast, Settings, with the hostel name and shift as the product identity.

## Band specifications

**Executive Morning Brief (Tier 1).** The newspaper headline of the day, full width, largest type on the page. Left: the overnight ledger as up to eight plain clickable sentences (received, resolved, approaching breach, inspections completed, occupancy milestone, outage restored, one item awaiting approval), each click narrowing context. Right: Hostel Health Score radial gauge with week delta, Overall Operational Status pill (Stable / Strained / Critical), Today's Priority as one named commitment with owner and primary action, AI Executive Summary as three claim sentences with confidence.

**"What is happening today?" (Tier 1).** Six signal cards — Occupancy, Student Satisfaction, Infrastructure Health, Complaint Health, Housekeeping Status, Maintenance Status. Three lines each, never a bare number: metric with delta and sparkline; the consequence; the recommended action with an inline control. Cards that are within tolerance say so and stay quiet — no alarm styling, no filler action.

**"Where is it happening?" — the heatmap, signature component (Tier 1).** The largest interactive element, roughly two-thirds viewport height, given its own full-width band with real margins. Hostel > Block > Floor > Room via breadcrumb with animated level zoom. Cells coloured by composite operational health on a graphite-to-amber-to-red ramp, never by category. Hover reveals a rich tooltip: room number, complaint count, complaint types, maintenance summary, occupant, inspection score, infrastructure health, estimated maintenance cost. Click re-scopes the dashboard. Comparisons (hostel / block / floor bars, most problematic rooms, hotspots) are Tier 2 under "Compare spaces" so the map itself stays uncluttered. Arrow-key cell traversal, focus visible.

**"What keeps breaking?" (Tier 1 verdict + 3 visuals, Tier 2 detail).** At rest: the verdict sentence, top complaint categories, frequency over time, and complaint aging. Behind "Show complaint detail": distribution, severity split, repeat and reopened rates, seasonal comparison, peak-hour matrix, resolution-time distribution. Every category mark writes to context. Each cluster closes with a recommended action, not a legend.

**"Who owns the problem?" (Tier 1 top five, Tier 2 full queue).** One ownership queue instead of seven widgets: emergencies, SLA breaches, pending inspections, pending maintenance, housekeeping backlog, escalations, critical alerts as severity-sorted rows with severity rail, location chip, unowned duration, owner avatar, inline Assign / Escalate / Inspect. Five rows at rest with a count of what is hidden; "Open queue" expands to the filterable full table. Staff detail (workload, availability, response and resolution medians, cleaning performance, inspection completion, leaderboard) is Tier 2 under "Who has capacity?", headlined by overloaded vs idle and ending in Rebalance.

**Mission Control (Tier 1, persistent).** Not a card — a sticky rail travelling with the investigation bands, on its own elevated surface with an active-decisions count. Three recommendations at rest, ranked; the rest behind a count. Each is a decision object: title with urgency icon, WHY in one sentence, 2-3 cited evidence findings, confidence score with meter, operational impact, estimated financial impact if ignored (₹), urgency badge, primary action, and See Evidence which scrolls to and pulses the exact chart mark or heatmap cell while writing that scope into context. Resolved items animate into a timestamped Decided log, so the rail reads as the day's decisions.

**"What will become a problem soon?" (Tier 1 three cards, Tier 2 detail).** At rest: complaint forecast with confidence band, high-risk rooms, expected maintenance cost — each stating the cost of inaction and offering Convert to recommendation, which promotes it into Mission Control. Behind "Show maintenance & cost detail": most repaired assets, recurring failures, preventive schedule, asset health, replacement candidates with payback, spending, budget utilisation, cost by hostel, cost by complaint type, monthly trend, expected occupancy, failure prediction.

**Investigation Drawer (Tier 3).** 520px right drawer from any card, row, table or heatmap cell. Header names the entity and its health; tabs: Timeline, Previous Complaints, Maintenance History, Inspection History, Assigned Staff, Student Feedback, Photos, Assets in Room, AI Recommendation. Only the first tab loads visually at open; the rest reveal on selection. Sticky footer: one primary action plus Investigate further, which pushes the entity into context and closes the drawer onto an already re-scoped page.

**Persistent chrome.** Sticky header: hostel name + shift, ⌘K search, scope filters, theme toggle (dark first), notification bell with unread dot, user chip. Notification Center as a right sheet grouped by event type, each event clickable into the investigation. Modals only to commit or destroy.

## Design language

- Dark mode first with a header toggle; all theming via semantic tokens.
- Near-black graphite canvas, elevated card surfaces, hairline borders, soft low-spread shadows, 10-12px radii. One blue accent for interaction; emerald / amber / red for status only. No decorative gradients. Glass used twice: sticky header and drawer scrim.
- Typography: one clean geometric sans — 34/42 brief headline, 20/28 question titles, 14/22 body sized for daily reading, 11 uppercase tracked labels, tabular numerals everywhere.
- Spacing: 8px base, 24-28px card padding, 48px band rhythm, 1440px max width, generous negative space.
- Motion earns its place: 120-180ms hovers, 220ms drawer, 260ms heatmap zoom, 200ms expand/collapse with height animation, context changes cross-fade affected bands, See Evidence scroll plus one 400ms pulse. Reduced-motion respected; nothing loops.
- Accessibility: 4.5:1 minimum, visible focus rings, status carries icon plus text, heatmap and drawer fully keyboard operable, expansions are real disclosure buttons with aria-expanded, context changes announced politely.
- Responsive: sidebar to icon rail under 1280px and a sheet under 768px; signal strip 6 > 3 > 2; Mission Control promoted above the evidence bands on mobile; heatmap gains a level selector in place of hover tooltips; all Tier 2 sections stay collapsed by default on small screens.

## Reference extraction (inspiration only, nothing copied)

Lunor: dark shell, hairline cards, grouped sidebar. Kravio: signal-card anatomy and the right-hand activity rail that becomes the Notification Center. Power BI: titled-with-dimension chart discipline, held to Tier 2 (its palette and density rejected). Signalry: metric row -> analysis -> full-width table rhythm. PlanMate: card breathing room and light-theme calibration. Adflux: breadcrumb + title + status pill + filter cluster as one header block, delta chips. TailAdmin: header composition (collapse, ⌘K search, theme toggle, bell with dot, user chip) and the radial gauge reused for Health Score (its brightness rejected); its skeleton shot sets the loading choreography. No reference data, palette or branding is reused.

## Technical notes

- Tokens (surfaces, borders, status scale, heatmap ramp, radii, shadows, chart series) defined in `src/styles.css` as oklch variables for both themes; components consume semantic tokens only.
- Presented at `/`, replacing the placeholder index. No other page touched, no routes added.
- Investigation context and disclosure state are client-side presentation state only; charts use existing chart primitives with illustrative static values. No fetching, no persistence. Lucide icons at 16/18px, 1.5px stroke.
