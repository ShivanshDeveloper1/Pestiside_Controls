import { SERVICE_CATALOG, type ServiceCatalogId } from "@/components/services/serviceCatalog";
import { SERVICE_DETAILS } from "@/components/services/serviceDetails";

export const SERVICES = SERVICE_CATALOG.map((service) => ({
  ...service,
  ...SERVICE_DETAILS[service.id],
}));

export type ServiceEntry = (typeof SERVICES)[number];

export function getService(slug: string) {
  return SERVICES.find((service) => service.id === slug);
}

export function getServiceIds(): ServiceCatalogId[] {
  return SERVICE_CATALOG.map((service) => service.id);
}
