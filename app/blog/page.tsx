import type { Metadata } from "next";
import BlogIndexPage from "@/components/blog/BlogIndexPage";

export const metadata: Metadata = {
  title: "Pest Control Advice & Articles | Speedy Pest Control",
  description:
    "Read practical pest-prevention tips and guidance for household, seasonal and commercial pest problems.",
};

export default function Page() {
  return <BlogIndexPage />;
}
