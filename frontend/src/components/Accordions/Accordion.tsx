import React, { useState } from "react";
import AccordionItem from "./AccordionItem";

const accordionData = [
  {
    id: "element1",
    title: "How many free attempts are provided?",
    answer: "We provide the first 3 attempts free. Thereafter, it is $10 per attempt.",
  },
  {
    id: "element2",
    title: "What are the payment options?",
    answer: "We accept Amex, Visa, and Mastercard. We do not accept cash or cheques.",
  },
  {
    id: "element3",
    title: "How can I leave feedback?",
    answer: "You can leave feedback in our 'Contact Us' section :-)",
  },
];

const Accordion: React.FC = () => {
  const [activeElement, setActiveElement] = useState<string | null>(null);

  const handleClick = (value: string) => {
    setActiveElement(activeElement === value ? null : value);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-black uppercase text-slate-500 text-center mb-8">FAQ</h2>
      <section>
        <div className="border block bg-gray-100 dark:bg-neutral-700 rounded-xl">
          {accordionData.map((item) => (
            <AccordionItem
              key={item.id}
              id={item.id}
              title={item.title}
              isActive={activeElement === item.id}
              onClick={() => handleClick(item.id)}
            >
              <strong className="block bg-gray-100 dark:bg-neutral-700 p-2 w-full">{item.answer}</strong>
            </AccordionItem>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Accordion;
