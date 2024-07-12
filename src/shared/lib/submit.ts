"use server";
import type { Region } from "@/types/cloud-provider";

let cloudProviders: Region[] = [
  // AWS Regions
  { 
    name: "US East (N. Virginia)", code: "us-east-1", cloudProvider: "aws",
    lat: 39.0438,
    lon: -77.4874,
    sustainability: 3.8,
    latency: 4,
    fitScore: 0
  },
  { 
    name: "US West (Oregon)", code: "us-west-2", cloudProvider: "aws",
    lat: 45.8399,
    lon: -45.8399,
    sustainability: 7.8,
    latency: 3,
    fitScore: 0
  },
  { 
    name: "Europe (Frankfurt)", code: "eu-central-1", cloudProvider: "aws",
    lat: 50.1109,
    lon: 8.6821,
    sustainability: 7.3,
    latency: 9,
    fitScore: 0
  },
  {
    name: "Asia Pacific (Sydney)", code: "ap-southeast-2", cloudProvider: "aws",
    lat: -33.8688,
    lon: 151.2093,
    sustainability: 2.3,
    latency: 1,
    fitScore: 0
  },
  {
    name: "South America (São Paulo)", code: "sa-east-1", cloudProvider: "aws",
    lat: -23.5558,
    lon: -46.6396,
    sustainability: 8.8,
    latency: 1,
    fitScore: 0
  },

  // GCP Regions
  { 
    name: "Iowa, USA", code: "us-central1", cloudProvider: "gcp",
    lat: 41.2619,
    lon: 95.8608,
    sustainability: 3.5,
    latency: 3,
    fitScore: 0
  },
  { 
    name: "Tokyo, Japan", code: "asia-northeast1", cloudProvider: "gcp",
    lat: 35.6764,
    lon: 139.6500,
    sustainability: 1.8,
    latency: 2,
    fitScore: 0
  },
  { 
    name: "London, UK", code: "europe-west2", cloudProvider: "gcp",
    lat: 51.5072,
    lon: 0.1276,
    sustainability: 7.2,
    latency: 10,
    fitScore: 0
  },
  {
    name: "São Paulo, Brazil", code: "southamerica-east1", cloudProvider: "gcp",
    lat: 23.5558,
    lon: 46.6396,
    sustainability: 8.8,
    latency: 1,
    fitScore: 0
  },
  {
    name: "Sydney, Australia", code: "australia-southeast1", cloudProvider: "gcp",
    lat: 46.6396,
    lon: 151.2093,
    sustainability: 2.3,
    latency: 1,
    fitScore: 0
  },

  // Azure Regions
  { 
    name: "East US", code: "eastus", cloudProvider: "azure",
    lat: 37.5407,
    lon: -77.4360,
    sustainability: 3.8,
    latency: 4,
    fitScore: 0
  },
  { 
    name: "West US", code: "westus", cloudProvider: "azure",
    lat: 41.1400,
    lon: -104.8202,
    sustainability: 3.7,
    latency: 3,
    fitScore: 0
  },
  { 
    name: "North Europe", code: "northeurope", cloudProvider: "azure",
    lat: 53.3498,
    lon: -6.2603,
    sustainability: 4.8,
    latency: 9,
    fitScore: 0
  },
  { 
    name: "Southeast Asia", code: "southeastasia", cloudProvider: "azure",
    lat: 1,
    lon: 103,
    sustainability: 0.2,
    latency: 2,
    fitScore: 0
  },
  { 
    name: "Brazil South", code: "brazilsouth", cloudProvider: "azure",
    lat: 23.5558,
    lon: 46.6396,
    sustainability: 8.8,
    latency: 1,
    fitScore: 0
  },
];

let submit = async (data: {
  cloudProvider: string[];
  sustainabilityWeight: number;
  latencyWeight: number;
}): Promise<Region[]> => {
  // Select only matching cloud providers
  console.log("cloudProvider", data.cloudProvider);
  let selectedCloudProviders = cloudProviders.filter((provider) =>
    data.cloudProvider.includes(provider.cloudProvider)
  );

  // Calculate latency here if not using estimates
  
  // Calculate fitScore
    for (let i = 0; i < selectedCloudProviders.length; i++) {
        selectedCloudProviders[i].fitScore = 
            selectedCloudProviders[i].sustainability * data.sustainabilityWeight + 
            selectedCloudProviders[i].latency * data.latencyWeight
    }
    
  // Sort and return the three best fit regions
  return selectedCloudProviders.sort((a, b) => b.fitScore - a.fitScore).slice(0, 3);
};

export default submit;
