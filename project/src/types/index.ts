export interface EmissionsData {
  daily: {
    platforms: Record<string, number>;
    total: number;
  };
  annual: {
    platforms: Record<string, number>;
    total: number;
  };
  region: {
    id: string;
    name: string;
    carbonIntensity: number;
  };
  usage: Record<string, number>;
}