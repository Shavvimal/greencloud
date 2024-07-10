"use server";
import type { Region } from "@/types/cloud-provider";

let cloudProviders: Region[] = [
  // AWS Regions
  { name: "US East (N. Virginia)", code: "us-east-1", cloudProvider: "aws" },
  { name: "US West (Oregon)", code: "us-west-2", cloudProvider: "aws" },
  { name: "Europe (Frankfurt)", code: "eu-central-1", cloudProvider: "aws" },
  {
    name: "Asia Pacific (Sydney)",
    code: "ap-southeast-2",
    cloudProvider: "aws",
  },
  {
    name: "South America (São Paulo)",
    code: "sa-east-1",
    cloudProvider: "aws",
  },

  // GCP Regions
  { name: "Iowa, USA", code: "us-central1", cloudProvider: "gcp" },
  { name: "Tokyo, Japan", code: "asia-northeast1", cloudProvider: "gcp" },
  { name: "London, UK", code: "europe-west2", cloudProvider: "gcp" },
  {
    name: "São Paulo, Brazil",
    code: "southamerica-east1",
    cloudProvider: "gcp",
  },
  {
    name: "Sydney, Australia",
    code: "australia-southeast1",
    cloudProvider: "gcp",
  },

  // Azure Regions
  { name: "East US", code: "eastus", cloudProvider: "azure" },
  { name: "West US", code: "westus", cloudProvider: "azure" },
  { name: "North Europe", code: "northeurope", cloudProvider: "azure" },
  { name: "Southeast Asia", code: "southeastasia", cloudProvider: "azure" },
  { name: "Brazil South", code: "brazilsouth", cloudProvider: "azure" },
];

let submit = async (data: {
  cloudProvider: string[];
  sustainabilityWeight: number;
  latencyWeight: number;
}): Promise<Region[]> => {
  console.log("cloudProvider", data.cloudProvider);
  let selectedCloudProviders = cloudProviders.filter((provider) =>
    data.cloudProvider.includes(provider.cloudProvider)
  );
  return selectedCloudProviders.sort(() => 0.5 - Math.random()).slice(0, 3);
};

export default submit;
