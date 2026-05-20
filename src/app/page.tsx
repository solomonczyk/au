import { HeroSection } from "@/components/home/HeroSection";
import { TrustSection } from "@/components/home/TrustSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyGoldSection } from "@/components/home/WhyGoldSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrustSection />
      <HowItWorks />
      <WhyGoldSection />
    </main>
  );
}
