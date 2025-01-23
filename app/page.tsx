import HeroSection from "@/components/HeroSection";
import FeaturedEpisodes from "@/components/FeaturedEpisodes";
import AboutSection from "@/components/AboutSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedEpisodes />
      <AboutSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}