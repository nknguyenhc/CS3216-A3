import { StepProps } from "./Step";
import Step from "./Step";

const steps: StepProps[] = [
  {
    imageIcon:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/318f34bed75f459a2f51601e57039d52b9f075ca875de28effed1dcf14d6aa46?placeholderIfAbsent=true&apiKey=605ddb38b3184de6b494a658ff50786d",
    title: "1. Fill in the purchase order form",
    description:
      "Fill out the form and choose the best plan based on how many times you'd like us to provide feedback.",
  },
  {
    imageIcon:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c8162fb064a5c7ea661c828d5d7a7b886320fbaa1f272bb7462b0069114f7173?placeholderIfAbsent=true&apiKey=605ddb38b3184de6b494a658ff50786d",
    title: "2. Proceed with the payment",
    description: "Pay for the services using your preferred card (AMEX, VISA, or MASTERCARD).",
  },
  {
    imageIcon:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/48220f1135b80d0f79a2944f8814a0d53b79a6f0cd562b19a3e6df7d57c5c7d5?placeholderIfAbsent=true&apiKey=605ddb38b3184de6b494a658ff50786d",
    title: "3. Select personal statement type",
    description: "Select whether your personal statement is for an Oxbridge application or the Jardine scholarship.",
  },
  {
    imageIcon:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/feb589982c335aa953d1388be2c999fe013bf20941a2e8970202c5c777598f53?placeholderIfAbsent=true&apiKey=605ddb38b3184de6b494a658ff50786d",
    title: "4. Insert personal statement",
    description: "Insert your personal statement and simply click 'Get Feedback!",
  },
];

const FeedbackSteps = () => {
  return (
    <section className="mt-20 mb-20">
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
            <Step key={index} imageIcon={step.imageIcon} title={step.title} description={step.description} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedbackSteps;
