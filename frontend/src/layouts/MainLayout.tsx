import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useRef } from "react";
import { RefsProvider } from "../context/RefsContext";

const MainLayout = () => {
  const aboutRef = useRef<HTMLElement | null>(null);
  const howItWorksRef = useRef<HTMLElement | null>(null);
  const pricingRef = useRef<HTMLDivElement | null>(null);
  const reviewsRef = useRef<HTMLDivElement | null>(null);
  const faqRef = useRef<HTMLDivElement | null>(null);

  const refs = {
    aboutRef,
    howItWorksRef,
    pricingRef,
    reviewsRef,
    faqRef,
  };

  return (
    <div>
      <Navbar
        aboutRef={aboutRef}
        howItWorksRef={howItWorksRef}
        pricingRef={pricingRef}
        reviewsRef={reviewsRef}
        faqRef={faqRef}
      />
      <div className="bg-blue-custom">
        <RefsProvider value={refs}>
          <Outlet />
        </RefsProvider>
      </div>
    </div>
  );
};

export default MainLayout;
