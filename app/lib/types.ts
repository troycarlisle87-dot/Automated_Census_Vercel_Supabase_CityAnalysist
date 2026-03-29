

// This is the Municipality type.
export interface Municipality {
  id: string;
  name: string;
  csd: string;
  region: string,
  timezone: string;
  budget: number;
  servicesCount: number;
  population: number;
  status: string;
  lastUpdated: Date;
}