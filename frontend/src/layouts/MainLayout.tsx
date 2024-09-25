import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useRef } from "react";
import { RefsProvider } from "../context/RefsContext";

const MainLayout = () => {
  const uploadEssayRef = useRef<HTMLElement | null>(null);
  const howItWorksRef = useRef<HTMLElement | null>(null);
  const pricingRef = useRef<HTMLDivElement | null>(null);
  const reviewsRef = useRef<HTMLDivElement | null>(null);
  const faqRef = useRef<HTMLDivElement | null>(null);

  const refs = {
    uploadEssayRef,
    howItWorksRef,
    pricingRef,
    reviewsRef,
    faqRef,
  };

  const location = useLocation();
  const showNavBarPaths = ["/", "/essay/upload", "/submissions"];

  const shouldShowNavBar = showNavBarPaths.includes(location.pathname) ||
    location.pathname.startsWith("/essay/comment/");

  return (
    <div>
      {shouldShowNavBar && (
        <Navbar
          uploadEssayRef={uploadEssayRef}
          howItWorksRef={howItWorksRef}
          pricingRef={pricingRef}
          reviewsRef={reviewsRef}
          faqRef={faqRef}
        />
      )}
      <div className="bg-blue-custom">
        <RefsProvider value={refs}>
          <Outlet />
        </RefsProvider>
      </div>
    </div>
  );
};

export default MainLayout;
