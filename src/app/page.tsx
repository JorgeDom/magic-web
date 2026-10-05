import { Hero } from "@/components/sections/hero/Hero";
import { Intro } from "@/components/sections/Intro";
import { Nav } from "@/components/sections/Nav";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="contenido">
        <Hero />
        <Intro />
      </main>
    </>
  );
}
