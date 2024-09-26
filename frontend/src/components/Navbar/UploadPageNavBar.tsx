import { RefObject } from "react";
import AuthButtons from "./AuthButtons";
import { Link } from "react-router-dom";

type UploadPageNavbarProps = {
  personalStatementRef: RefObject<HTMLElement>;
  pricingRef: RefObject<HTMLElement>;
};

const UploadPageNavbar = ({ personalStatementRef, pricingRef }: UploadPageNavbarProps) => {
  const scrollToSection = (ref: RefObject<HTMLElement>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="flex overflow-hidden flex-col justify-center items-center px-10 py-6 text-base bg-gray-800 max-md:px-5">
      <div className="flex justify-between items-center w-full max-w-[1208px] max-md:max-w-full">
        <Link to="/" className="flex">
          <img
            loading="lazy"
            src="/assets/logo-no-background.png"
            alt="Company Logo"
            className="object-contain shrink-0 self-stretch my-auto max-w-full aspect-[5] w-[200px] h-auto"
          />
        </Link>
        <nav className="flex-grow flex justify-center gap-16 items-center my-auto font-medium text-gray-800 max-md:max-w-full">
          <button
            onClick={() => scrollToSection(personalStatementRef)}
            className="text-white relative text-xl w-fit block bg-gradient-to-r from-sky-600 to-sky-600 bg-[length:0%_100%] bg-left hover:bg-[length:100%_100%] hover:text-transparent transition-all duration-500 ease-out bg-clip-text after:block after:content-[''] after:absolute after:h-[3px] after:bg-sky-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
          >
            Personal Statement
          </button>
          <button
            onClick={() => scrollToSection(pricingRef)}
            className="text-white relative text-xl w-fit block bg-gradient-to-r from-sky-600 to-sky-600 bg-[length:0%_100%] bg-left hover:bg-[length:100%_100%] hover:text-transparent transition-all duration-500 ease-out bg-clip-text after:block after:content-[''] after:absolute after:h-[3px] after:bg-sky-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
          >
            Pricing
          </button>
        </nav>
        <AuthButtons />
      </div>
    </header>
  );
};

export default UploadPageNavbar;
