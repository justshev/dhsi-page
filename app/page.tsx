// import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import LatestTrainingSection from "@/components/latest-training-section";
import UpcomingWorkshopSection from "@/components/upcoming-workshop-section";
import FeaturesSection from "@/components/features-section";
import PastTrainingReviewSection from "@/components/past-training-review-section";
import TestimonialsSection from "@/components/testimonials-section";
import { InheritanceCalculatorSection } from "@/components/inheritance-calculator-section";
import CTA from "@/components/cta";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <main className="">
        <Navbar />
        <Hero />
        <LatestTrainingSection />
        <UpcomingWorkshopSection />
        {/* <ClassesSection /> */}
        <FeaturesSection />
        <PastTrainingReviewSection />
        <TestimonialsSection />
        <InheritanceCalculatorSection />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
