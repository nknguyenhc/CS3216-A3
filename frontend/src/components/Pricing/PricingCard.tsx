import { useAuth } from "../Authentication/AuthenticationContext";
import FeatureItem from "./FeatureItem";

interface PricingCardProps {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  period: string;
  features: Array<{ icon: React.ReactNode; text: string }>;
  url: string;
  logo: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  subtitle,
  description,
  price,
  period,
  features,
  url,
  logo,
}) => {
  const { currEmail, currUsername } = useAuth();
  return (
    <section className="flex flex-col rounded-3xl max-w-[500px]">
      <div className="flex items-end px-1 py-14 bg-white rounded-3xl border border-gray-100 border-solid shadow-sm">
        <div className="flex shrink-0 mt-44 w-10 bg-white bg-opacity-0 h-[352px]" />
        <div className="flex flex-col items-start self-stretch">
          <div className="flex gap-5">
            <img
              loading="lazy"
              src={logo}
              className="object-contain shrink-0 rounded-2xl aspect-square w-[72px]"
              alt=""
            />
            <div className="flex flex-col my-auto">
              <h2 className="text-lg font-medium leading-none text-slate-500">{subtitle}</h2>
              <h3 className="self-start text-2xl font-bold leading-none text-indigo-950">{title}</h3>
            </div>
          </div>
          <p className="self-stretch mt-5 text-lg leading-8 text-slate-500">{description}</p>
          <div className="flex gap-2.5 items-center mt-3.5 whitespace-nowrap">
            <span className="self-stretch my-auto text-6xl font-bold leading-none text-indigo-950">{price}</span>
            <span className="self-stretch pt-5 my-auto text-xl font-medium leading-none text-slate-500 w-[87px]">
              {period}
            </span>
          </div>
          <h4 className="mt-4 text-lg font-bold leading-none text-indigo-950">What's included</h4>
          <ul className="flex flex-col items-start mt-6 text-lg leading-none text-indigo-950">
            {features.map((feature, index) => (
              <FeatureItem key={index} icon={feature.icon} text={feature.text} />
            ))}
          </ul>
          <form
            action={url}
            method="POST"
            className="flex items-start self-stretch mt-9 text-lg font-bold leading-none text-center text-white"
          >
            <input type="hidden" name="email" value={currEmail || ""} />
            <input type="hidden" name="username" value={currUsername || ""} />
            <button
              type="submit"
              className="relative flex-1 shrink gap-1.5 self-stretch px-10 py-7 w-full bg-indigo-600 min-w-[240px] rounded-[96px] overflow-hidden transition group"
            >
              <span className="absolute inset-0 bg-indigo-700 transform scale-0 transition-transform duration-200 origin-center group-hover:scale-100"></span>
              <span className="relative z-10 transition-colors duration-200">Proceed to Checkout</span>
            </button>
          </form>
        </div>
        <div className="flex shrink-0 mt-44 w-10 bg-white bg-opacity-0 h-[352px]" />
      </div>
    </section>
  );
};

export default PricingCard;

/*
import FeatureItem from "./FeatureItem";

interface PricingCardProps {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  period: string;
  features: Array<{ icon: React.ReactNode; text: string }>;
  url: string;
  logo: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  subtitle,
  description,
  price,
  period,
  features,
  url,
  logo,
}) => {
  return (
    <section className="flex flex-col rounded-3xl max-w-[500px]">
      <div className="flex items-end px-1 py-14 bg-white rounded-3xl border border-gray-100 border-solid shadow-sm">
        <div className="flex shrink-0 mt-44 w-10 bg-white bg-opacity-0 h-[352px]" />
        <div className="flex flex-col items-start self-stretch">
          <div className="flex gap-5">
            <img
              loading="lazy"
              src={logo}
              className="object-contain shrink-0 rounded-2xl aspect-square w-[72px]"
              alt=""
            />
            <div className="flex flex-col my-auto">
              <h2 className="text-lg font-medium leading-none text-slate-500">{subtitle}</h2>
              <h3 className="self-start text-2xl font-bold leading-none text-indigo-950">{title}</h3>
            </div>
          </div>
          <p className="self-stretch mt-5 text-lg leading-8 text-slate-500">{description}</p>
          <div className="flex gap-2.5 items-center mt-3.5 whitespace-nowrap">
            <span className="self-stretch my-auto text-6xl font-bold leading-none text-indigo-950">{price}</span>
            <span className="self-stretch pt-5 my-auto text-xl font-medium leading-none text-slate-500 w-[87px]">
              {period}
            </span>
          </div>
          <h4 className="mt-4 text-lg font-bold leading-none text-indigo-950">What's included</h4>
          <ul className="flex flex-col items-start mt-6 text-lg leading-none text-indigo-950">
            {features.map((feature, index) => (
              <FeatureItem key={index} icon={feature.icon} text={feature.text} />
            ))}
          </ul>
          <form
            action={url}
            method="POST"
            className="flex items-start self-stretch mt-9 text-lg font-bold leading-none text-center text-white"
          >
            <button
              type="submit"
              className="relative flex-1 shrink gap-1.5 self-stretch px-10 py-7 w-full bg-indigo-600 min-w-[240px] rounded-[96px] overflow-hidden transition group"
            >
              <span className="absolute inset-0 bg-indigo-700 transform scale-0 transition-transform duration-200 origin-center group-hover:scale-100"></span>
              <span className="relative z-10 transition-colors duration-200">Proceed to Checkout</span>
            </button>
          </form>
        </div>
        <div className="flex shrink-0 mt-44 w-10 bg-white bg-opacity-0 h-[352px]" />
      </div>
    </section>
  );
};

export default PricingCard;
*/



/*
import { useAuth } from "../Authentication/AuthenticationContext";
import { client, getCSRFToken } from "../../AxiosInstance/AxiosInstance";
import FeatureItem from "./FeatureItem";
import React, { useState, useEffect } from "react";

interface PricingCardProps {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  period: string;
  features: Array<{ icon: React.ReactNode; text: string }>;
  url: string;
  logo: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  subtitle,
  description,
  price,
  period,
  features,
  url,
  logo,
}) => {
  const { token, currEmail, currUsername } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const csrfToken = getCSRFToken();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const postUrl = url;

    try {
      const response = await client.post(
        postUrl,
        {
          email: currEmail,
          username: currUsername,
        },
        {
          headers: {
            "X-CSRFToken": csrfToken,
            "Authorization": `Token ${token}`,
          },
        }
      );

      console.log("Form submitted successfully:", response.data);
      setSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col rounded-3xl max-w-[500px]">
      <div className="flex items-end px-1 py-14 bg-white rounded-3xl border border-gray-100 border-solid shadow-sm">
        <div className="flex shrink-0 mt-44 w-10 bg-white bg-opacity-0 h-[352px]" />
        <div className="flex flex-col items-start self-stretch">
          <div className="flex gap-5">
            <img
              loading="lazy"
              src={logo}
              className="object-contain shrink-0 rounded-2xl aspect-square w-[72px]"
              alt=""
            />
            <div className="flex flex-col my-auto">
              <h2 className="text-lg font-medium leading-none text-slate-500">{subtitle}</h2>
              <h3 className="self-start text-2xl font-bold leading-none text-indigo-950">{title}</h3>
            </div>
          </div>
          <p className="self-stretch mt-5 text-lg leading-8 text-slate-500">{description}</p>
          <div className="flex gap-2.5 items-center mt-3.5 whitespace-nowrap">
            <span className="self-stretch my-auto text-6xl font-bold leading-none text-indigo-950">{price}</span>
            <span className="self-stretch pt-5 my-auto text-xl font-medium leading-none text-slate-500 w-[87px]">
              {period}
            </span>
          </div>
          <h4 className="mt-4 text-lg font-bold leading-none text-indigo-950">What's included</h4>
          <ul className="flex flex-col items-start mt-6 text-lg leading-none text-indigo-950">
            {features.map((feature, index) => (
              <FeatureItem key={index} icon={feature.icon} text={feature.text} />
            ))}
          </ul>
          {error && <p className="mt-4 text-red-600">{error}</p>}
          {success && <p className="mt-4 text-green-600">Form submitted successfully!</p>}
          <form onSubmit={handleSubmit} className="flex items-start self-stretch mt-9 text-lg font-bold leading-none text-center text-white">
            <button
              type="submit"
              disabled={loading}
              className={`relative flex-1 shrink gap-1.5 self-stretch px-10 py-7 w-full ${loading ? "bg-gray-400" : "bg-indigo-600"} min-w-[240px] rounded-[96px] overflow-hidden transition group`}
            >
              {loading ? (
                <span>Loading...</span>
              ) : (
                <span className="relative z-10 transition-colors duration-200">Proceed to Checkout</span>
              )}
            </button>
          </form>
        </div>
        <div className="flex shrink-0 mt-44 w-10 bg-white bg-opacity-0 h-[352px]" />
      </div>
    </section>
  );
};

export default PricingCard;
*/