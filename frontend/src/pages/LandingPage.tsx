import Hero from "../components/Hero";
import Pricing from "../components/Pricing/Pricing";
import Footer from "../components/Footer";
import Accordion from "../components/Accordions/Accordion";
import ScrollVideo from "../components/Features/ScrollVideo";
import FeedbackSteps from "../components/Steps/FeedbackSteps";
import AdvantagesSection from "../components/Advantage/AdvantageSection";
import HorizontalScrollSections from "../components/Features/HorizontalScrollSections";

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <AdvantagesSection />
      <ScrollVideo />
      <FeedbackSteps />
      <Pricing />
      <Accordion />
      <HorizontalScrollSections/>

      
      <Footer />
    </div>
  );
};

export default LandingPage;
