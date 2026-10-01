import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: "About Us | Speedy Pest Control London",
  description:
    "Learn about Speedy Pest Control’s professional pest-control approach for homes and businesses across London.",
};

export default function Page() {
  return <AboutPage />;
}
