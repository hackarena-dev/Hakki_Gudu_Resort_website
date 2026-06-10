import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import StorySection from "./components/StorySection";
import ExperienceSection from "./components/ExperienceSection";
import AccommodationSection from "./components/AccommodationSection";
import ReviewsSection from "./components/ReviewsSection";
import FAQSection from "./components/FAQSection";
import BookingCTASection from "./components/BookingCTASection";
import LocationSection from "./components/LocationSection";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      {/* Fixed transparent → glassmorphism navbar */}
      <Navbar />

      {/* S1 — Immersive Hero */}
      <HeroSection />

      {/* S2 — Why The Nest */}
      <FeaturesSection />

      {/* S3 — Our Story */}
      <StorySection />

      {/* S4 — Experiences */}
      <ExperienceSection />

      {/* S5 — Accommodation */}
      <AccommodationSection />

      {/* S7 — Reviews */}
      <ReviewsSection />

      {/* S8 — FAQ */}
      <FAQSection />

      {/* S9 — Booking CTA */}
      <BookingCTASection />

      {/* S10 — Location */}
      <LocationSection />

      {/* S11 — Footer */}
      <Footer />
    </main>
  );
}
