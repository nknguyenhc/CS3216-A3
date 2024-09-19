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
      console.log("clicked true");
      ref.current.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log("clicked false");
    }
  };

  return (
    <nav className="flex gap-8 items-center self-stretch px-px my-auto font-medium text-gray-800 max-md:max-w-full">
      <button
        onClick={() => scrollToSection(aboutRef)}
        className="text-white relative text-xl w-fit block bg-gradient-to-r from-sky-600 to-sky-600 bg-[length:0%_100%] bg-left hover:bg-[length:100%_100%] hover:text-transparent transition-all duration-500 ease-out bg-clip-text after:block after:content-[''] after:absolute after:h-[3px] after:bg-sky-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
      >
        About Us
      </button>
      <button
        onClick={() => scrollToSection(howItWorksRef)}
        className="text-white relative text-xl w-fit block bg-gradient-to-r from-sky-600 to-sky-600 bg-[length:0%_100%] bg-left hover:bg-[length:100%_100%] hover:text-transparent transition-all duration-500 ease-out bg-clip-text after:block after:content-[''] after:absolute after:h-[3px] after:bg-sky-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
      >
        How it works
      </button>
      <button
        onClick={() => scrollToSection(pricingRef)}
        className="text-white relative text-xl w-fit block bg-gradient-to-r from-sky-600 to-sky-600 bg-[length:0%_100%] bg-left hover:bg-[length:100%_100%] hover:text-transparent transition-all duration-500 ease-out bg-clip-text after:block after:content-[''] after:absolute after:h-[3px] after:bg-sky-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
      >
        Pricing
      </button>
      <button
        onClick={() => scrollToSection(reviewsRef)}
        className="text-white relative text-xl w-fit block bg-gradient-to-r from-sky-600 to-sky-600 bg-[length:0%_100%] bg-left hover:bg-[length:100%_100%] hover:text-transparent transition-all duration-500 ease-out bg-clip-text after:block after:content-[''] after:absolute after:h-[3px] after:bg-sky-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
      >
        Reviews
      </button>
      <button
        onClick={() => scrollToSection(faqRef)}
        className="text-white relative text-xl w-fit block bg-gradient-to-r from-sky-600 to-sky-600 bg-[length:0%_100%] bg-left hover:bg-[length:100%_100%] hover:text-transparent transition-all duration-500 ease-out bg-clip-text after:block after:content-[''] after:absolute after:h-[3px] after:bg-sky-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
      >
        FAQ
      </button>
    </nav>
  );
};

export default Navigations;
