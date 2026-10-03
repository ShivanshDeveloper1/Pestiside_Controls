export const SERVICE_CATALOG = [
  {
    id: "rat-control",
    title: "Rat Control & Removal",
    category: "Rodents",
    shortDesc:
      "Targeted baiting and entry-point sealing that clears active rat infestations and prevents re-entry permanently.",
  },
  {
    id: "mice-removal",
    title: "Precision Mice Control",
    category: "Rodents",
    shortDesc:
      "Trap placement and gap-sealing paired with hygiene guidance to clear house and field mice quickly.",
  },
  {
    id: "cockroach-treatment",
    title: "Cockroach Colony Treatment",
    category: "Insects",
    shortDesc:
      "Advanced gel baiting and crack-and-crevice treatments reaching roaches deep where they breed.",
  },
  {
    id: "bed-bug-heat",
    title: "Bed Bug Thermal Eradication",
    category: "Nuisance & Specialty",
    shortDesc:
      "Thermal heat and residual spray treatments for mattresses, frames, and furniture breaking all lifecycle stages.",
  },
  {
    id: "wasp-removal",
    title: "Emergency Wasp & Nest Removal",
    category: "Insects",
    shortDesc:
      "Safe, fast nest removal from eaves, attics, and gardens with zero ladder risks for property owners.",
  },
  {
    id: "commercial-control",
    title: "Commercial & Business Defense",
    category: "Commercial",
    shortDesc:
      "Scheduled maintenance, audit documentation, and compliance support for restaurants, offices, and logistics.",
  },
  {
    id: "ant-extermination",
    title: "Ant Colony Extermination",
    category: "Insects",
    shortDesc:
      "Eradicate persistent carpenter, sugar, and pavement ant trails by targeting the subterranean queen.",
  },

] as const;

export type ServiceCatalogItem = (typeof SERVICE_CATALOG)[number];
export type ServiceCatalogId = ServiceCatalogItem["id"];
