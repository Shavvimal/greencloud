export interface Region {
  name: string;
  code: string;
  cloudProvider: string;
  lat: number;    // positive north, negative south
  lon: number;    // positive east, negative west
  sustainability: number;
  latency: number;
  fitScore: number;
}
