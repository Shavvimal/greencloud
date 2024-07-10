import MapChart from "@/components/map-chart";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col md:flex-row items-center justify-between ">
      <Hero />
      <MapChart />
    </main>
  );
}
