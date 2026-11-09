import type { Metadata } from "next";
import { COPY } from "@/sanity/copy/defaults";
import CityPageView, { cityMetadata } from "@/components/areas/CityPageView";

export const dynamicParams = false;
export function generateStaticParams() {
  return COPY.areas.cities.map((x) => ({ city: x.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  return cityMetadata((await params).city, "pools");
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  return <CityPageView city={(await params).city} variant="pools" />;
}
