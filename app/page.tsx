import HeroSection from "@/components/HeroSection";
import FeaturedEpisodes from "@/components/FeaturedEpisodes";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedEpisodes />
      <AboutSection />
      <Footer />
    </main>
  );
}