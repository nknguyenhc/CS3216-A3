import Hero from "../components/Hero";
import Pricing from "../components/Pricing/Pricing";
import Footer from "../components/Footer";
import Accordion from "../components/Accordions/Accordion";
import ScrollVideo from "../components/Features/ScrollVideo";
import FeedbackSteps from "../components/Steps/FeedbackSteps";
import AdvantagesSection from "../components/Advantage/AdvantageSection";
import ScrollAnimation from "../components/Features/ScrollAnimation";

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <AdvantagesSection />
      <ScrollVideo />
      <FeedbackSteps />
      <Pricing />
      <Accordion />
      <ScrollAnimation/>

      
      <Footer />
    </div>
  );
};

export default LandingPage;
