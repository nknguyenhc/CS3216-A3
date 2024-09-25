import { useEffect } from "react";
import { useRefs } from "../context/RefsContext";
import ReactGA from "react-ga";
import Upload from "../components/Upload/Upload";
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
  const { uploadEssayRef, howItWorksRef, pricingRef, reviewsRef, faqRef } = useRefs();

  useEffect(() => {
    ReactGA.event({
      category: "Page View",
      action: "Viewed Landing Page"
    });
  }, []);

  return (
    <div>
      <ParallaxProvider>
        <Hero />
      </ParallaxProvider>

      <Upload ref={uploadEssayRef} />
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
