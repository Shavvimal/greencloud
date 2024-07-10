"use client";
import { SiMicrosoftazure } from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import submit from "@/lib/submit";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Region } from "@/types/cloud-provider";

const FormSchema = z.object({
  // List of cloud providers allowed
  cloudProvider: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one Cloud Provider.",
    }),
  // Sustainability weight 1-10
  sustainabilityWeight: z.number().int().min(0).max(10),
  // latency weight 1-10
  latencyWeight: z.number().int().min(0).max(10),
});

const cloudProvider = [
  {
    id: "aws",
    label: "AWS",
  },
  {
    id: "gcp",
    label: "GCP",
  },
  {
    id: "azure",
    label: "Azure",
  },
] as const;

export function CarbonForm() {
  const [regions, setRegions] = useState<Region[]>([]);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cloudProvider: ["aws"],
      sustainabilityWeight: 5,
      latencyWeight: 5,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // Invoke the server-side submit function
    // alert(JSON.stringify(data, null, 2));
    let res = await submit(data);
    toast({
      description: "Success 🌱 ",
    });
    setRegions(res);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="cloudProvider"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Cloud Providers</FormLabel>
                  <FormDescription>
                    Select the Cloud Providers you want to use.
                  </FormDescription>
                </div>
                {cloudProvider.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="cloudProvider"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sustainabilityWeight"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Sustainability Importance - {value}</FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={10}
                    step={1}
                    defaultValue={[value]}
                    onValueChange={(value) => {
                      onChange(value[0]);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Sustainability is calculated using proprietary Emergy
                  Algorithms.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="latencyWeight"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Lower Latency Importance - {value}</FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={10}
                    step={1}
                    defaultValue={[value]}
                    onValueChange={(value) => {
                      onChange(value[0]);
                    }}
                  />
                </FormControl>
                <FormDescription>Latency Selection Criteria</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <div className="mt-5 w-full">
        <h2 className="mb-5">{regions.length > 1 ? "Chosen Regions:" : ""}</h2>
        {
          // Display the regions
          regions.map((region) => (
            <Alert key={region.code} variant="default" className="my-2">
              {region.cloudProvider === "aws" && <FaAws className="h-4 w-4" />}
              {region.cloudProvider === "gcp" && (
                <FaGoogle className="h-4 w-4" />
              )}
              {region.cloudProvider === "azure" && (
                <SiMicrosoftazure className="h-4 w-4" />
              )}

              <AlertTitle>{region.name}</AlertTitle>
              <AlertDescription>{region.code}</AlertDescription>
            </Alert>
          ))
        }
      </div>
    </>
  );
}
