import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import EverythingIncluded from "../components/EverythingIncluded";
import TrustBar from "../components/TrustBar";
import WhyChoose from "../components/WhyChoose";
import Reviews from "../components/Reviews";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import About from "../components/About";
import WorkoutVideos from "../components/WorkoutVideos";
import EmailCapture from "../components/EmailCapture";
import FlyerCollection from "../components/FlyerCollection";


function Home() {

  return (
    <div className="bg-black text-white">
      <Navbar />

      <main className="pt-28 lg:pt-20">
        <Hero />
        <TrustBar />

        <FlyerCollection />
        <FeaturedProducts />

        <EverythingIncluded />
        <WhyChoose />
        <Reviews />
        <About />
        <WorkoutVideos />
        <FAQ />
        <EmailCapture />
      </main>

      <Footer />

    </div>
  );
}

export default Home;