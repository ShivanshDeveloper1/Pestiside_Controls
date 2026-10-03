import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailPage from "@/components/services/ServiceDetailPage";
import {
  getService,
  getServiceIds,
} from "@/components/services/serviceData";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getServiceIds().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found | Speedo Pest Control" };

  return {
    title: `${service.title} | Speedo Pest Control London`,
    description: service.shortDesc,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return <ServiceDetailPage service={service} />;
}
