import { notFound } from "next/navigation";
import { getMunicipalityBySlug } from "@/app/lib/supabase/municipalities";
import { CityDashboardShell } from "@/app/features/dashboard/components/CityDashboardShell";

interface CityPageProps {
  params: Promise<{ cityname: string }>;
}

export default async function CityDashboardPage({ params }: CityPageProps) {
  const { cityname } = await params;

  const initialMunicipality = await getMunicipalityBySlug(cityname);

  if (!initialMunicipality) {
    notFound();
  }

  return <CityDashboardShell initialMunicipality={initialMunicipality} />;
}