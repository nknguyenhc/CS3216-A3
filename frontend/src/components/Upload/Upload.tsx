import { forwardRef } from "react";
import TextContent from "./TextContent";
import ImageContent from "./ImageContent";

const Upload = forwardRef<HTMLElement, any>((_, ref) => {
  return (
    <section ref={ref} className="w-full mt-20 max-w-[1324px] mx-auto px-4 sm:px-6 lg:px-20 mb-20">
      <div className="flex flex-col lg:flex-row gap-5">
        <TextContent />
        <ImageContent />
      </div>
    </section>
  );
});

export default Upload;