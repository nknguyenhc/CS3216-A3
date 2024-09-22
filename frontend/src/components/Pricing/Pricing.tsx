import React, { forwardRef } from "react";
import PricingCard from "./PricingCard";
import { FaCheckCircle } from "react-icons/fa";
import { API_URL } from "../../config";

interface PricingPlan {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  period: string;
  features: { icon: React.ReactNode; text: string }[];
  url: string;
  logo: string;
}

const pricingPlans: PricingPlan[] = [
  {
    title: "Oxbridge",
    subtitle: "Personal Statement Review",
    description: "Provides feedback on their Oxbridge personal statement.",
    price: "$10",
    period: "/upload",
    features: [
      { icon: <FaCheckCircle className="text-blue-500" />, text: "Constructive feedback on key sentences." },
      { icon: <FaCheckCircle className="text-blue-500" />, text: "Overall Feedback" },
      { icon: <FaCheckCircle className="text-blue-500" />, text: "Feedback within 5 minutes" },
    ],
    url: `${API_URL}/api/auth/stripe/oxbridge/create-checkout-session`,
    logo: "/assets/oxbridge-logo.png",
  },
  {
    title: "Jardine",
    subtitle: "Personal Statement Review",
    description: "Provides feedback on their Jardine personal statement.",
    price: "$15",
    period: "/upload",
    features: [
      { icon: <FaCheckCircle className="text-blue-500" />, text: "Constructive feedback on key sentences." },
      { icon: <FaCheckCircle className="text-blue-500" />, text: "Overall Feedback" },
      { icon: <FaCheckCircle className="text-blue-500" />, text: "Feedback within 5 minutes" },
    ],
    url: `${API_URL}/api/auth/stripe/jardine/create-checkout-session`,
    logo: "/assets/jardine-logo.png",
  },
];

const Pricing = forwardRef<HTMLDivElement, {}>((_, ref) => {
  return (
    <div ref={ref} className="bg-light-blue-custom flex flex-col items-center gap-10">
      <h2 className="text-3xl font-black uppercase text-slate-500 text-center mt-20">Pricing</h2>
      <div className="flex flex-wrap justify-center gap-6 mb-20">
        {pricingPlans.map((plan, index) => (
          <PricingCard
            key={index}
            title={plan.title}
            subtitle={plan.subtitle}
            description={plan.description}
            price={plan.price}
            period={plan.period}
            features={plan.features}
            url={plan.url}
            logo={plan.logo}
          />
        ))}
      </div>
    </div>
  );
});

export default Pricing;
