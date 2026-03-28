

// This is the Municipality type.
export interface Municipality {
  id: string;
  slug: string;
  geo_uid?: number;
  name: string;
  csd: string;
  region: string;
  timezone: string;
  budget: number;
  servicesCount: number;
  population: number;
  status: string;
  type?: string;
  lastUpdated: Date;
}
