import Hero from "../components/Hero";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";
import Accordion from "../components/Accordions/Accordion";
import FeedbackSteps from "../components/Steps/FeedbackSteps";
import AdvantagesSection from "../components/Advantage/AdvantageSection";

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <AdvantagesSection />
      <FeedbackSteps />
      <Accordion />
      <Pricing />
      <Footer />
    </div>
  );
};

export default LandingPage;
