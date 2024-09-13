import React, { useState } from "react";
import AccordionItem from "./AccordionItem";

const Accordion: React.FC = () => {
  const [activeElement, setActiveElement] = useState<string | null>(null);

  const handleClick = (value: string) => {
    setActiveElement(activeElement === value ? null : value);
  };

  return (
    <section className="bg-white dark:bg-neutral-800 mt-10 mb-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="border border-neutral-200 dark:border-neutral-600 rounded-xl">
          {["element1", "element2", "element3"].map((element, index) => (
            <AccordionItem
              key={element}
              id={element}
              title={`Accordion Item #${index + 1}`}
              isActive={activeElement === element}
              onClick={() => handleClick(element)}
            >
              <strong>
                This is the {`item ${index + 1}`}'s accordion body.
              </strong>{" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum eu rhoncus purus, vitae tincidunt nibh. Vivamus
              elementum egestas ligula in varius. Proin ac erat pretium,
              ultricies leo at, cursus ante. Pellentesque at odio euismod,
              mattis urna ac, accumsan metus. Nam nisi leo, malesuada vitae
              pretium et, laoreet at lorem. Curabitur non sollicitudin
              neque.
            </AccordionItem>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accordion;