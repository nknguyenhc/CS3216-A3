import Hero from "../components/Hero";
import Pricing from "../components/Pricing/Pricing";
import Footer from "../Footer/Footer";
import Banner from "../Footer/Banner";
import Accordion from "../components/Accordions/Accordion";
import ScrollVideo from "../components/Features/ScrollVideo";
import FeedbackSteps from "../components/Steps/FeedbackSteps";
import AdvantagesSection from "../components/Advantage/AdvantageSection";
import Reviews from "../components/Reviews/Reviews";
import { ParallaxProvider } from 'react-scroll-parallax';

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
