import { SiteNav } from "./components/site-nav";
import { Hero } from "./components/hero";
import { DemographicStats } from "./components/demographic-stats";
import { Ecosystem } from "./components/ecosystem";
import { HoldingKonten } from "./components/holding-konten";
import { HoldingTws } from "./components/holding-tws";
import { Genesis } from "./components/genesis";
import { ValueCards } from "./components/value-cards";
import { Contact } from "./components/contact";
import { SiteFooter } from "./components/site-footer";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col font-display">
      <SiteNav />
      <Hero />
      <DemographicStats />
      <Ecosystem />
      <HoldingKonten />
      <HoldingTws />
      <Genesis />
      <ValueCards />
      <Contact />
      <SiteFooter />
    </main>
  );
}
