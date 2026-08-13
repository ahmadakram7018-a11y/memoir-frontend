import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import Epigraph from "@/components/landing/Epigraph";
import HowItWorks from "@/components/landing/HowItWorks";
import MemoirPreview from "@/components/landing/MemoirPreview";
import Keepsake from "@/components/landing/Keepsake";
import Trust from "@/components/landing/Trust";
import Pricing from "@/components/landing/Pricing";
import FinalCta from "@/components/landing/FinalCta";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Problem />
      <Epigraph />
      <HowItWorks />
      <MemoirPreview />
      <Keepsake />
      <Trust />
      <Pricing />
      <FinalCta />
      <Footer />
    </main>
  );
}
