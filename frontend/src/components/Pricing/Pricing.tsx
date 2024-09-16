import PricingCard from './PricingCard';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import { API_URL } from '../../config';

const Pricing: React.FC = () => {
  const pricingPlans = [
    {
      title: "Basic",
      subtitle: "3 revisions",
      description: "Perfect for users who need feedback on a few personal statement drafts.",
      price: "$10",
      period: "/upload",
      features: [
        { icon: <FaCheckCircle className="text-blue-500" />, text: "Customised Feedback" },
        { icon: <FaCheckCircle className="text-blue-500" />, text: "Overall Feedback" },
        { icon: <FaTimes className="text-red-500" />, text: "Correct Grammar Errors" },
      ],
      url: `${API_URL}/api/stripe/basic/create-checkout-session`,  // Add URL here
    },
    {
      title: "Plus",
      subtitle: "5 revisions",
      description: "Ideal for users who need feedback on several drafts.",
      price: "$8",
      period: "/upload",
      features: [
        { icon: <FaCheckCircle className="text-blue-500" />, text: "Customised Feedback" },
        { icon: <FaCheckCircle className="text-blue-500" />, text: "Overall Feedback" },
        { icon: <FaTimes className="text-red-500" />, text: "Correct Grammar Errors" },
      ],
      url: `${API_URL}/api/stripe/plus/create-checkout-session`,  // Add URL here
    },
    {
      title: "Pro",
      subtitle: "10 revisions",
      description: "Best for users who want to perfect their personal statement.",
      price: "$5",
      period: "/upload",
      features: [
        { icon: <FaCheckCircle className="text-blue-500" />, text: "Customised Feedback" },
        { icon: <FaCheckCircle className="text-blue-500" />, text: "Overall Feedback" },
        { icon: <FaCheckCircle className="text-blue-500" />, text: "Correct Grammar Errors" },
      ],
      url: `${API_URL}/api/stripe/pro/create-checkout-session`,  // Add URL here
    }
  ];

  return (
    <div className="bg-light-blue-custom flex flex-col items-center gap-10">
      <h2 className="text-3xl font-black uppercase text-slate-500 text-center mt-20">
        Pricing
      </h2>
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
          />
        ))}
      </div>
    </div>
  );
};

export default Pricing;