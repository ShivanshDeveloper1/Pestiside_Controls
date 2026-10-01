import type { Metadata } from "next";
import LegalPage from "@/components/pages/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | Speedy Pest Control",
  description: "Terms and conditions placeholder for Speedy Pest Control.",
};

export default function Page() {
  return (
    <LegalPage
      title="Terms & conditions"
      intro="General information about using the Speedy Pest Control website."
      sections={[
        {
          heading: "Website information",
          text: "Website content is provided for general information. Service availability, treatment suitability and any commercial arrangements should be confirmed directly with Speedy Pest Control.",
        },
        {
          heading: "Quotes and service arrangements",
          text: "The quote and contact forms on this demo do not send or store submissions and do not create a booking or service agreement. The business should add its confirmed quotation, cancellation and service terms before accepting live requests.",
        },
        {
          heading: "Updates",
          text: "These draft terms should be reviewed and replaced with terms approved by the business before the website is used to offer services.",
        },
      ]}
    />
  );
}
