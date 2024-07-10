import MapChart from "@/components/map-chart";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <main className="flex h-screen flex-col md:flex-row items-center justify-between md:p-24">
      <Hero />
      <MapChart />
    </main>
  );
}
