import FeatureItem from "./FeatureItem";

interface PricingCardProps {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  period: string;
  features: Array<{ icon: React.ReactNode; text: string }>;
  url: string;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, subtitle, description, price, period, features, url }) => {
  return (
    <section className="flex flex-col rounded-3xl max-w-[394px]">
      <div className="flex items-end px-1 py-14 bg-white rounded-3xl border border-gray-100 border-solid shadow-sm">
        <div className="flex shrink-0 mt-44 w-10 bg-white bg-opacity-0 h-[352px]" />
        <div className="flex flex-col items-start self-stretch">
          <div className="flex gap-5">
            <img
              loading="lazy"
              src="/assets/price-icon.png"
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
              className="flex-1 shrink gap-1.5 self-stretch px-10 py-7 w-full bg-indigo-600 min-w-[240px] rounded-[96px]"
            >
              Get started
            </button>
          </form>
        </div>
        <div className="flex shrink-0 mt-44 w-10 bg-white bg-opacity-0 h-[352px]" />
      </div>
    </section>
  );
};

export default PricingCard;