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
import EssayComments from "../components/Comments/EssayComments";
import { ParallaxProvider } from "react-scroll-parallax";

const mockData = [
  { id: 1, text: 'The quick brown fox jumps over the lazy dog', highlight: 'fox', comment: 'Classic sentence for typing practice.' },
  { id: 2, text: 'In a world of uncertainty, technology provides clarity', highlight: 'technology', comment: 'Note about the importance of tech.' },
  { id: 3, text: 'Humans have always sought to understand the cosmos', highlight: 'cosmos', comment: 'Comment on human curiosity.' },
];

const pageText = `
  Sure! Here’s an expanded version of your essay, filled with additional context and elaboration to create a fuller narrative:

---

The quick brown fox jumps over the lazy dog, a phrase that has long been celebrated in the realm of typography and language. This whimsical sentence serves not only as a tool for testing fonts but also encapsulates the vibrant life of nature, where agility meets lethargy in the most playful manner. It reminds us of the beauty of contrast in the animal kingdom, where each creature plays its unique role in the ecosystem.

In a world of uncertainty, technology provides clarity, a beacon of hope amidst the chaos of modern life. As we navigate through rapid advancements and the overwhelming influx of information, technology acts as our compass. Innovations such as artificial intelligence and data analytics enable us to decipher complex patterns and make informed decisions. We can now analyze vast amounts of data with unparalleled speed, transforming uncertainty into actionable insights. This shift empowers individuals and businesses alike, fostering a landscape where knowledge is power and clarity reigns supreme.

Humans have always sought to understand the cosmos, driven by an insatiable curiosity that defines our species. From the ancient astronomers who gazed at the stars, trying to make sense of the universe, to the modern scientists exploring the mysteries of black holes and dark matter, our quest for knowledge has no bounds. The cosmos holds countless secrets, and our desire to unlock them fuels our passion for exploration. Every advancement in space technology brings us closer to answering profound questions about our existence and the nature of reality itself.

As we continue to explore the vastness of space, we discover not only new worlds but also new perspectives on our place in the universe. The study of celestial bodies and cosmic phenomena broadens our understanding of life on Earth, revealing the interconnectedness of all things. Each star we observe and every planet we study serves as a reminder of the infinite possibilities that lie beyond our atmosphere.

In summary, the quick brown fox symbolizes the playful dance of nature, while technology serves as our guide through an ever-evolving landscape of uncertainty. Our innate curiosity drives us to explore the cosmos, seeking knowledge and understanding in a universe filled with mysteries. Together, these elements highlight the dynamic interplay between nature, technology, and human ambition, painting a rich tapestry of life and discovery.

---

Feel free to adjust any parts to better suit your style or the specific requirements you have in mind!
`;

const LandingPage = () => {
  //const { uploadEssayRef, howItWorksRef, pricingRef, reviewsRef, faqRef } = useRefs();

  return (
    <div>
      <CommentPage data={mockData} pageText={pageText} />
      <EssayComments />

      { /* 
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

      */ }

    </div>
  );
};

export default LandingPage;