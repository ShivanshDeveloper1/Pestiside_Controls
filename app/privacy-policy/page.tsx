import type { Metadata } from "next";
import LegalPage from "@/components/pages/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Speedo Pest Control",
  description: "Privacy policy placeholder for Speedo Pest Control.",
};

export default function Page() {
  return (
    <LegalPage
      title="Privacy policy"
      intro="Information about how personal information is handled when you visit or contact Speedo Pest Control."
      sections={[
        {
          heading: "Information and enquiries",
          text: "This website currently demonstrates frontend enquiry forms only. Form entries are not transmitted or stored by this demo. Before a live contact service is enabled, the business should explain what information it collects and why.",
        },
        {
          heading: "How information may be used",
          text: "The final policy should describe how enquiry details are used to respond to requests, who can access them, and how long they are retained. These details must be confirmed by the business before publication.",
        },
        {
          heading: "Questions",
          text: "For questions about privacy information, please use the contact page. The business should add its confirmed privacy contact and final policy details here.",
        },
      ]}
    />
  );
}
