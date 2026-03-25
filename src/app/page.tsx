import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import KeyFeatures from "@/components/KeyFeatures";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Floorplans from "@/components/Floorplans";
import Location from "@/components/Location";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <KeyFeatures />
        <About />
        <Gallery />
        <Floorplans />
        <Location />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
