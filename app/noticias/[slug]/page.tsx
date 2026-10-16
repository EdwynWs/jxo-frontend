import { notFound } from "next/navigation";
import { news } from "@/lib/data";
import { NewsArticle } from "@/components/marketing";
export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!news.some((item) => item.slug === slug)) notFound();
  return <NewsArticle slug={slug} />;
}
