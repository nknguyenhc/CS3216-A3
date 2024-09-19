import { useState } from "react";
import AccordionItem from "./AccordionItem";
import { forwardRef } from "react";
import accordionData from "./AccordionData";

const Accordion = forwardRef<HTMLDivElement, any>((_, ref) => {
  const [activeElement, setActiveElement] = useState<string | null>(null);

  const handleClick = (value: string) => {
    setActiveElement(activeElement === value ? null : value);
  };

  return (
    <div ref={ref} className="max-w-4xl mx-auto px-4 mt-20 mb-20">
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
});

export default Accordion;