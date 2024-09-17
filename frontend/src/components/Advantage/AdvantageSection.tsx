import React from "react";
import AdvantageCard from "./AdvantageCard";
import advantagesData from "./AdvantagesData";

const AdvantagesSection: React.FC = () => {
  return (
    <section className="bg-custom-gradient flex overflow-hidden flex-col items-center px-16 pt-9 pb-9 w-full max-md:px-5 max-md:max-w-full">
      <div className="w-full max-w-[1186px] max-md:max-w-full">
        <h2 className="text-3xl font-extrabold text-black mb-5">Our advantages</h2>
        <div className="flex gap-5 max-md:flex-col">
          {advantagesData.map((advantage, index) => (
            <div key={index} className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
              <AdvantageCard
                imageIcon={advantage.imageIcon}
                title={advantage.title}
                description={advantage.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
