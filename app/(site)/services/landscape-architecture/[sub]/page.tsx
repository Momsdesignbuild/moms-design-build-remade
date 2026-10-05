import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/PortableBody";
import ServicePageBody from "@/components/services/ServicePageBody";
import { getServicePage, serviceMetadata, serviceSubSlugs } from "@/components/services/servicePageData";
import { getDoc, nestedMetadata, NestedView } from "../../../[...path]/page";

export const revalidate = 3600;
const SECTION = "landscape-architecture";

export async function generateStaticParams() {
  return (await serviceSubSlugs(SECTION)).map((sub) => ({ sub }));
}

export async function generateMetadata({ params }: { params: Promise<{ sub: string }> }): Promise<Metadata> {
  const { sub } = await params;
  const doc = await getServicePage(`${SECTION}/${sub}`);
  // a plain page doc at this path (e.g. Basements) when there's no service page
  return doc ? serviceMetadata(doc) : nestedMetadata(`services/${SECTION}/${sub}`);
}

export default async function Page({ params }: { params: Promise<{ sub: string }> }) {
  const { sub } = await params;
  const doc = await getServicePage(`${SECTION}/${sub}`);
  if (!doc) {
    const page = await getDoc(`services/${SECTION}/${sub}`);
    if (!page) notFound();
    return <NestedView doc={page} />;
  }
  return (
    <>
      {doc.jsonLd && <JsonLd raw={doc.jsonLd} />}
      <ServicePageBody template={doc.template} body={doc.body} cardsSet={doc.cardsSet} divisionLogoUrl={doc.divisionLogoUrl} hero={doc.hero} />
    </>
  );
}
