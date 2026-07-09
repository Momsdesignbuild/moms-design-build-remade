import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/PortableBody";
import ServicePageBody from "@/components/services/ServicePageBody";
import { getServicePage, serviceMetadata } from "@/components/services/servicePageData";

export const revalidate = 3600;
const SLUG = "homeowner-portal";

export async function generateMetadata(): Promise<Metadata> {
  return serviceMetadata(await getServicePage(SLUG));
}

export default async function Page() {
  const doc = await getServicePage(SLUG);
  if (!doc) notFound();
  return (
    <>
      {doc.jsonLd && <JsonLd raw={doc.jsonLd} />}
      <ServicePageBody template={doc.template} body={doc.body} cardsSet={doc.cardsSet} divisionLogoUrl={doc.divisionLogoUrl} />
    </>
  );
}
