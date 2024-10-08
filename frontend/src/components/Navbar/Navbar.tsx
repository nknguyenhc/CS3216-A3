import { RefObject } from "react";
import Logo from "./Logo";
import Navigation from "./Navigations";
import AuthButtons from "./AuthButtons";

type NavbarProps = {
  uploadEssayRef: RefObject<HTMLElement>;
  howItWorksRef: RefObject<HTMLElement>;
  pricingRef: RefObject<HTMLElement>;
  reviewsRef: RefObject<HTMLElement>;
  faqRef: RefObject<HTMLElement>;
};

const Navbar = ({ uploadEssayRef, howItWorksRef, pricingRef, reviewsRef, faqRef }: NavbarProps) => {
  return (
    <header className="flex overflow-hidden flex-col justify-center items-center px-10 py-6 text-base bg-gray-800 max-md:px-5">
      <div className="flex justify-between items-center w-full max-w-[1208px] max-md:max-w-full">
        <Logo />
        <Navigation
          uploadEssayRef={uploadEssayRef}
          howItWorksRef={howItWorksRef}
          pricingRef={pricingRef}
          reviewsRef={reviewsRef}
          faqRef={faqRef}
        />
        <AuthButtons />
      </div>
    </header>
  );
};

export default Navbar;