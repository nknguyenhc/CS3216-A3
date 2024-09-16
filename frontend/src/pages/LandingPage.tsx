import Hero from "../components/Hero/Hero";
import Pricing from "../components/Pricing/Pricing";
import Footer from "../components/Footer/Footer";
import Banner from "../components/Hero/Banner";
import Accordion from "../components/Faq/Accordion";
import ScrollVideo from "../components/Video/ScrollVideo";
import FeedbackSteps from "../components/Steps/FeedbackSteps";
import AdvantagesSection from "../components/Advantage/AdvantageSection";
import Reviews from "../components/Reviews/Reviews";
import { ParallaxProvider } from "react-scroll-parallax";

const LandingPage = () => {
  return (
    <div>
      <ParallaxProvider>
        <Banner />
      </ParallaxProvider>

      <Hero />
      <AdvantagesSection />
      <ScrollVideo />
      <FeedbackSteps />
      <Pricing />
      <Reviews />
      <Accordion />

      <Footer />
    </div>
  );
};

export default LandingPage;
