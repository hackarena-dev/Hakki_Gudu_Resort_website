import Navbar from "./components/navbar/Navbar";
import HeroSection from "./components/hero/HeroSection";
import FeaturesSection from "./components/features/FeaturesSection";
import StorySection from "./components/story/StorySection";
import ExperienceSection from "./components/experience/ExperienceSection";
import AccommodationSection from "./components/accommodation/AccommodationSection";
import GallerySection from "./components/gallery/GallerySection";
import ReviewsSection from "./components/reviews/ReviewsSection";
import FAQSection from "./components/faq/FAQSection";
import BookingCTASection from "./components/booking/BookingCTASection";
import LocationSection from "./components/location/LocationSection";
import Footer from "./components/footer/Footer";

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

      {/* S6 — Gallery */}
      <GallerySection />

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
