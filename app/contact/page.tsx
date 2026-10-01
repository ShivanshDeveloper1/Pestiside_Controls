import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us | Speedy Pest Control London",
  description:
    "Contact Speedy Pest Control about residential or commercial pest concerns in London and nearby areas.",
};

export default function Page() {
  return <ContactPage />;
}
