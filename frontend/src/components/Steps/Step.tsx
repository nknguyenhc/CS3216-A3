import { ReactNode } from "react";

export interface StepProps {
  imageIcon: ReactNode;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ title, description }) => {
  return (
    <div>
      <div className="flex flex-col mb-6 p-4 bg-gray-100 rounded-xl h-full">
        <h3 className="text-xl font-bold text-slate-700">{title}</h3>
        <p className="mt-2.5 text-base leading-6 text-black">{description}</p>
      </div>
    </div>
  );
};

export default Step;
