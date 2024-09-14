import Hero from "../components/Hero";
import Pricing from "../components/Pricing/Pricing";
import Footer from "../components/Footer";
import Accordion from "../components/Accordions/Accordion";
import AnimateOnScroll from "../components/Features/AnimateOnScroll";
import FeedbackSteps from "../components/Steps/FeedbackSteps";
import AdvantagesSection from "../components/Advantage/AdvantageSection";


interface SampleComponentProps {
    children: React.ReactNode
  }
  
  
  const SampleComponent = ({ children }: SampleComponentProps) => {
    return (
      <div className='h-screen grid grid-cols-1 place-items-center'>
        <h1 className='bg-blue-700 p-20 rounded-xl text-white '>{children}</h1>
      </div>
    )
  }

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <AdvantagesSection />
      <FeedbackSteps />
      <Pricing />
      
      <AnimateOnScroll reappear initialThreshold={0.5} fadeOutOffset={3000}>
  <SampleComponent>I appear on Scroll 1!</SampleComponent>
</AnimateOnScroll>

<AnimateOnScroll reappear initialThreshold={0.5} fadeOutOffset={3500}>
  <SampleComponent>I appear on Scroll 2!</SampleComponent>
</AnimateOnScroll>

<AnimateOnScroll reappear initialThreshold={0.5} fadeOutOffset={4000}>
  <SampleComponent>I appear on Scroll 3!</SampleComponent>
</AnimateOnScroll>

      <Accordion />
      <Footer />
    </div>
  );
};

export default LandingPage;
