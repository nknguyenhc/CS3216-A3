import { useRefs } from "../context/RefsContext";
import About from "../components/About/About";
import Pricing from "../components/Pricing/Pricing";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import Accordion from "../components/Faq/Accordion";
import ScrollVideo from "../components/Video/ScrollVideo";
import FeedbackSteps from "../components/HowItWorks/FeedbackSteps";
import AdvantagesSection from "../components/Advantage/AdvantageSection";
import Reviews from "../components/Reviews/Reviews";
import { ParallaxProvider } from "react-scroll-parallax";

const LandingPage = () => {
  const { aboutRef, howItWorksRef, pricingRef, reviewsRef, faqRef } = useRefs();

  return (
    <div>
      <ParallaxProvider>
        <Hero />
      </ParallaxProvider>

      <About ref={aboutRef} />
      <AdvantagesSection />
      <ScrollVideo />
      <FeedbackSteps ref={howItWorksRef} />
      <Pricing ref={pricingRef} />
      <Reviews ref={reviewsRef} />
      <Accordion ref={faqRef} />

      <Footer />
    </div>
  );
};

export default LandingPage;