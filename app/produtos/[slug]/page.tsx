import { notFound } from "next/navigation";
import { products } from "@/lib/data";
import { ProductDetail } from "@/components/marketing";
export function generateStaticParams() {
  return products.map((item) => ({ slug: item.slug }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!products.some((item) => item.slug === slug)) notFound();
  return <ProductDetail slug={slug} />;
}
