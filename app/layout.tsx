import type { Metadata } from "next";
import { Figtree, Manrope,  Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";



const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });


const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Speedo Pest Control | London",
  description:
    "Professional pest control for homes and businesses in London.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`$font-sans ${manrope.variable} h-full antialiased ${sora.variable} ${figtree.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <WhatsAppButton />

        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
