import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us | Speedo Pest Control London",
  description:
    "Contact Speedo Pest Control about residential or commercial pest concerns in London and nearby areas.",
};

export default function Page() {
  return <ContactPage />;
}
