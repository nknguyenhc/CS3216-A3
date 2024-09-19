import { forwardRef } from "react";
import TextContent from "./TextContent";
import ImageContent from "./ImageContent";

const About = forwardRef<HTMLElement, any>((_, ref) => {
  return (
    <section ref={ref} className="self-end ml-20 mr-20 mb-20 w-full max-w-[1324px] max-md:mr-2.5 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <TextContent />
        <ImageContent />
      </div>
    </section>
  );
});

export default About;