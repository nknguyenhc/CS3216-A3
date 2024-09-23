import { useRefs } from "../context/RefsContext";
import Upload from "../components/Upload/Upload";
import Pricing from "../components/Pricing/Pricing";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import Accordion from "../components/Faq/Accordion";
import ScrollVideo from "../components/Video/ScrollVideo";
import FeedbackSteps from "../components/HowItWorks/FeedbackSteps";
import AdvantagesSection from "../components/Advantage/AdvantageSection";
import Reviews from "../components/Reviews/Reviews";
import CommentPage from "./CommentPage";
import { ParallaxProvider } from "react-scroll-parallax";

const mockData = [
  { id: 1, text: 'The quick brown fox jumps over the lazy dog', highlight: 'fox', comment: 'Classic sentence for typing practice.' },
  { id: 2, text: 'In a world of uncertainty, technology provides clarity', highlight: 'technology', comment: 'Note about the importance of tech.' },
  { id: 3, text: 'Humans have always sought to understand the cosmos', highlight: 'cosmos', comment: 'Comment on human curiosity.' },
];

const pageText = `
  The quick brown fox jumps over the lazy dog. In a world of uncertainty, technology provides clarity.
  Humans have always sought to understand the cosmos.
`;

const LandingPage = () => {
  const { uploadEssayRef, howItWorksRef, pricingRef, reviewsRef, faqRef } = useRefs();

  return (
    <div>
      { /* <CommentPage data={mockData} pageText={pageText} /> */ }

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