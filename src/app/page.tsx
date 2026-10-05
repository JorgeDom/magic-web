import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/hero/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Intro } from "@/components/sections/Intro";
import { Making } from "@/components/sections/Making";
import { Nav } from "@/components/sections/Nav";
import { Testimonials } from "@/components/sections/Testimonials";
import { Worlds } from "@/components/worlds/Worlds";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="contenido">
        <Hero />
        <Intro />
        <Worlds />
        <HowItWorks />
        <Making />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
