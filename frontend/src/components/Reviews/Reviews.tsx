import { forwardRef } from "react";
import Cards from "./Cards";


const Reviews = forwardRef<HTMLDivElement, {}>((_, ref) => {
  return (
    <div ref={ref}>
      <Cards />
    </div>
  );
});

export default Reviews;