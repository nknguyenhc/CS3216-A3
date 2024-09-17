import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import Card from "./Card";
import cardsData from "./CardsData";

const Cards = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-55%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <h1 className="pt-20 pb-20 text-4xl font-black uppercase text-slate-500 max-md:max-w-full text-center">
        {" "}
        Reviews{" "}
      </h1>
      <div className="sticky top-0 flex h-[screen]items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cardsData.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Cards;
