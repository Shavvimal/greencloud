import React from "react";
import { CarbonForm } from "@/components/form";

export function Hero() {
  return (
    <div className="md:w-1/2 flex flex-col items-center justify-center antialiased ">
      <div className=" mx-auto p-4">
        <h1 className="relative z-10 text-4xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-emerald-500 to-emerald-600  text-center font-sans font-bold">
          GreenCloud
        </h1>
        <p></p>
        <p className="md:max-w-2xl mx-auto my-2 text-sm text-center relative z-10 border-red-400">
          Welcome to GreenCloud. GreenCloud empowers companies to reduce carbon
          emissions from cloud computing effortlessly. Our cloud-agnostic
          platform routes compute workloads, including AI tasks, to data centers
          with the lowest carbon intensity, using real-time data and emergy
          accounting, while maintaining existing SLA&apos;s. Maintain top
          performance and compliance without extra effort, and make a tangible
          impact on global greenhouse gas emissions. Join us in driving
          sustainable computing and building a greener future.
        </p>
      </div>
      <CarbonForm />
    </div>
  );
}
