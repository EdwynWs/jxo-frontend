import { notFound } from "next/navigation";
import { modules } from "@/lib/data";
import { Documents, PortalForm } from "@/components/forms";
export function generateStaticParams() {
  return modules.map((item) => ({ module: item.slug }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module } = await params;
  if (!modules.some((item) => item.slug === module)) notFound();
  if (module === "documentos" || module === "arquivos")
    return <Documents machines={module === "arquivos"} />;
  return <PortalForm type={module} />;
}
