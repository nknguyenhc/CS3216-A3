import { RefObject } from "react";

type NavigationProps = {
  aboutRef: RefObject<HTMLElement>;
  howItWorksRef: RefObject<HTMLElement>;
  pricingRef: RefObject<HTMLElement>;
  reviewsRef: RefObject<HTMLElement>;
  faqRef: RefObject<HTMLElement>;
};

const Navigations = ({ aboutRef, howItWorksRef, pricingRef, reviewsRef, faqRef }: NavigationProps) => {
  const scrollToSection = (ref: RefObject<HTMLElement>) => {
    if (ref && ref.current) {
      console.log("clicked true")
      ref.current.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log("clicked false")
    }
  };

  return (
    <nav className="flex gap-8 items-center self-stretch px-px my-auto font-medium text-gray-800 max-md:max-w-full">
      <button onClick={() => scrollToSection(aboutRef)} className="self-stretch my-auto text-center">
        About Us
      </button>
      <button onClick={() => scrollToSection(howItWorksRef)} className="self-stretch my-auto text-center">
        How it works
      </button>
      <button onClick={() => scrollToSection(pricingRef)} className="self-stretch my-auto text-center">
        Pricing
      </button>
      <button onClick={() => scrollToSection(reviewsRef)} className="self-stretch my-auto text-center">
        Reviews
      </button>
      <button onClick={() => scrollToSection(faqRef)} className="self-stretch my-auto text-center">
        FAQ
      </button>
    </nav>
  );
};

export default Navigations;
