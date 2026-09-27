import AboutSection from "@/components/home/AboutSection";
import FAQ from "@/components/home/FAQ";
import Hero from "@/components/home/Hero";
import Reviews from "@/components/home/Reviews";
import ServicesSection from "@/components/home/ServicesSection";
import Stats from "@/components/home/Stats";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <Hero />
        <AboutSection />
      <ServicesSection />
        <WhyChooseUs />
      <Stats />
      <Reviews />
      <FAQ />
    </main>
  );
}
