import Hero from "../components/Hero";
import Reviews from "../components/Reviews";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";
import FeedbackSteps from "../components/Steps/FeedbackSteps";
import AdvantagesSection from "../components/Advantage/AdvantageSection";

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <AdvantagesSection />
      <FeedbackSteps />
      <Reviews />
      <Pricing />
      <Footer />
    </div>
  );
};

export default LandingPage;
