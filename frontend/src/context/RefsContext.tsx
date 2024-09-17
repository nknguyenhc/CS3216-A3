import React, { createContext, useContext, RefObject } from 'react';

type RefsContextType = {
  aboutRef: RefObject<HTMLElement>;
  howItWorksRef: RefObject<HTMLElement>;
  pricingRef: RefObject<HTMLDivElement>;
  reviewsRef: RefObject<HTMLDivElement>;
  faqRef: RefObject<HTMLDivElement>;
};

const RefsContext = createContext<RefsContextType | undefined>(undefined);

export const RefsProvider = ({ children, value }: { children: React.ReactNode; value: RefsContextType }) => {
  return <RefsContext.Provider value={value}>{children}</RefsContext.Provider>;
};

export const useRefs = () => {
  const context = useContext(RefsContext);
  if (!context) {
    throw new Error('useRefs must be used within a RefsProvider');
  }
  return context;
};