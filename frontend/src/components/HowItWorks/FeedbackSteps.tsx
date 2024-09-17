import { StepProps } from "./Step";
import Step from "./Step";
import { forwardRef } from "react";

const steps: StepProps[] = [
  {
    title: "1. Fill in the purchase order form",
    description:
      "Fill out the form and choose the best plan based on how many times you'd like us to provide feedback.",
  },
  {
    title: "2. Proceed with the payment",
    description: "Pay for the services using your preferred card (AMEX, VISA, or MASTERCARD).",
  },
  {
    title: "3. Select personal statement type",
    description: "Select whether your personal statement is for an Oxbridge application or the Jardine scholarship.",
  },
  {
    title: "4. Insert personal statement",
    description: "Insert your personal statement and simply click 'Get Feedback!",
  },
];

const FeedbackSteps = forwardRef<HTMLElement, any>((_, ref) => {
  return (
    <section ref={ref} className="mt-20 mb-20">
      <div className="flex ml-20 mr-20 w-full max-w-[1324px] max-md:ml-2.5 max-md:mr-2.5 max-md:max-w-full items-stretch">
        <div className="flex w-[45%] max-md:w-full items-stretch pr-4">
          <img
            loading="lazy"
            src="/assets/feedback.png"
            alt="Feedback process illustration"
            className="object-cover w-full rounded-xl h-full"
          />
        </div>

        <div className="flex flex-col w-[55%] max-md:w-full h-full">
          <h2 className="text-3xl font-black uppercase text-slate-500 mb-8">Our Quick 4 Step Feedback Process</h2>
          {steps.map((step, index) => (
            <Step key={index} title={step.title} description={step.description} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default FeedbackSteps;