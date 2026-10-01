import type { Metadata } from "next";
import QuotePage from "@/components/pages/QuotePage";

export const metadata: Metadata = {
  title: "Request a Free Quote | Speedy Pest Control London",
  description:
    "Request a pest-control quote for your home or business in London. Share the pest type, location and preferred contact details.",
};

export default function Page() {
  return <QuotePage />;
}
