import { ReactNode } from "react";

interface AdvantageCardProps {
  imageIcon: ReactNode;
  title: string;
  description: string;
}

const AdvantageCard: React.FC<AdvantageCardProps> = ({ imageIcon, title, description }) => {
  return (
    <article className="flex flex-col items-start text-black max-md:mt-10">
      <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-full">{imageIcon}</div>
      <h3 className="mt-4 text-xl font-bold">{title}</h3>
      <p className="mt-2.5 text-base leading-7">{description}</p>
    </article>
  );
};

export default AdvantageCard;
