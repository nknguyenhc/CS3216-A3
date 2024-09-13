import React from "react";
import AdvantageCard from "./AdvantageCard";
import { FaShieldAlt, FaFileAlt, FaPencilAlt, FaRegFile } from "react-icons/fa";

const advantagesData = [
  {
    imageIcon: <FaShieldAlt size={40} />,
    title: "100% confidentiality",
    description: "We aim at providing academic writing services as confidential as possible",
  },
  {
    imageIcon: <FaFileAlt size={40} />,
    title: "100% authenticity",
    description:
      "Focused on providing honest and constructive insights to help you genuinely improve your Oxbridge and Jardine personal statements",
  },
  {
    imageIcon: <FaPencilAlt size={40} />,
    title: "Immediate feedback",
    description: "Get instant feedback on your Oxbridge and Jardine personal statements with no need for booking",
  },
  {
    imageIcon: <FaRegFile size={40} />,
    title: "Personalized approach",
    description: "Every feedback is specifically designed to enhance your chances of success.",
  },
];

const AdvantagesSection: React.FC = () => {
  return (
    <section className="bg-custom-gradient flex overflow-hidden flex-col items-center px-16 pt-9 w-full max-md:px-5 max-md:max-w-full">
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
