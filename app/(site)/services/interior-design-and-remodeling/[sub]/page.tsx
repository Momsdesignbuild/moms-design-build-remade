import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/PortableBody";
import ServicePageBody from "@/components/services/ServicePageBody";
import { getServicePage, serviceMetadata, serviceSubSlugs } from "@/components/services/servicePageData";

export const revalidate = 3600;
const SECTION = "interior-design-and-remodeling";

export async function generateStaticParams() {
  return (await serviceSubSlugs(SECTION)).map((sub) => ({ sub }));
}

export async function generateMetadata({ params }: { params: Promise<{ sub: string }> }): Promise<Metadata> {
  const { sub } = await params;
  return serviceMetadata(await getServicePage(`${SECTION}/${sub}`));
}

export default async function Page({ params }: { params: Promise<{ sub: string }> }) {
  const { sub } = await params;
  const doc = await getServicePage(`${SECTION}/${sub}`);
  if (!doc) notFound();
  return (
    <>
      {doc.jsonLd && <JsonLd raw={doc.jsonLd} />}
      <ServicePageBody template={doc.template} body={doc.body} cardsSet={doc.cardsSet} divisionLogoUrl={doc.divisionLogoUrl} />
    </>
  );
}
