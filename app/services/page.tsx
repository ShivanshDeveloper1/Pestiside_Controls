import type { Metadata } from "next";
import ServicesPage from "@/components/pages/ServicesPage";

export const metadata: Metadata = {
  title: "Pest Control Services | Speedy Pest Control London",
  description:
    "Explore pest-control services for homes and businesses in London, including rodent, insect and commercial support.",
};

export default function Page() {
  return <ServicesPage />;
}
