import { redirect } from "next/navigation";

// Posts live at ROOT paths (URL parity with their WordPress). Old /blog/<slug>
// links bounce to the real location.
export default async function LegacyBlogPath({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/${slug}`);
}
