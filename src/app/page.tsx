import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import KeyFeatures from "@/components/KeyFeatures";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Floorplans from "@/components/Floorplans";
import SitePlan from "@/components/SitePlan";
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
        <SitePlan />
        <Location />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
