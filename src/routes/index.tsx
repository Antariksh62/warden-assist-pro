import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { ComplaintsBand } from "@/components/hoidss/complaints";
import { InvestigationProvider } from "@/components/hoidss/context";
import { InvestigationDrawer } from "@/components/hoidss/drawer";
import { ForecastBand } from "@/components/hoidss/forecast";
import { HeatmapBand } from "@/components/hoidss/heatmap";
import { MissionControl } from "@/components/hoidss/mission-control";
import { MorningBrief } from "@/components/hoidss/morning-brief";
import { OwnershipBand } from "@/components/hoidss/ownership";
import { HostelSidebar, TopBar } from "@/components/hoidss/shell";
import { SignalStrip } from "@/components/hoidss/signals";

const title = "HOIDSS — Hostel Operations Intelligence";
const description =
  "Executive decision-support console for the hostel incharge: morning brief, operational signals, complaint intelligence, a room-level heatmap and AI recommendations.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Console,
});

function Console() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <InvestigationProvider>
      <div className="flex min-h-screen w-full bg-canvas">
        <HostelSidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />

        <div className="min-w-0 flex-1">
          <TopBar />

          <main className="mx-auto max-w-[1440px] px-5 pb-24 pt-10 sm:px-8">
            <div className="space-y-14">
              <MorningBrief />
              <SignalStrip />

              <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
                {/* Mission control leads on small screens: the decision matters more than the evidence. */}
                <div className="order-2 space-y-14 xl:order-1">
                  <HeatmapBand />
                  <ComplaintsBand />
                  <OwnershipBand />
                </div>
                <div className="order-1 xl:order-2">
                  <MissionControl />
                </div>
              </div>

              <ForecastBand />
            </div>
          </main>
        </div>

        <InvestigationDrawer />
      </div>
    </InvestigationProvider>
  );
}
