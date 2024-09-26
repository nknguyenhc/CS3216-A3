import { forwardRef } from "react";

const FeedbackSteps = forwardRef<HTMLElement, any>((_, ref) => {
  return (
    <section ref={ref} className="h-auto">
      {/* Step 1: Image on Left, Text on Right */}
      <div className="h-screen flex items-center">
        <div className="w-1/2 h-full">
          <img
            src="/assets/feedback.png"
            alt="Feedback process illustration"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-black uppercase text-slate-500 mb-4">
            1. Fill in the purchase order form
          </h2>
          <p className="text-base leading-6 text-black">
            Fill out the form and choose the best plan based on how many times you'd like us to provide feedback.
          </p>
        </div>
      </div>

      {/* Step 2: Text on Left, Image on Right */}
      <div className="h-screen flex items-center">
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-black uppercase text-slate-500 mb-4">
            2. Proceed with the payment
          </h2>
          <p className="text-base leading-6 text-black">
            Pay for the services using your preferred card (AMEX, VISA, or MASTERCARD).
          </p>
        </div>
        <div className="w-1/2 h-full">
          <img
            src="/assets/payment.png"
            alt="Payment process illustration"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Step 3: Image on Left, Text on Right */}
      <div className="h-screen flex items-center">
        <div className="w-1/2 h-full">
          <img
            src="/assets/personal_statement.png"
            alt="Personal statement selection"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-black uppercase text-slate-500 mb-4">
            3. Select personal statement type
          </h2>
          <p className="text-base leading-6 text-black">
            Select whether your personal statement is for an Oxbridge application or the Jardine scholarship.
          </p>
        </div>
      </div>

      {/* Step 4: Text on Left, Image on Right */}
      <div className="h-screen flex items-center">
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-black uppercase text-slate-500 mb-4">
            4. Insert personal statement
          </h2>
          <p className="text-base leading-6 text-black">
            Insert your personal statement and simply click 'Get Feedback!
          </p>
        </div>
        <div className="w-1/2 h-full">
          <img
            src="/assets/submit_statement.png"
            alt="Submit personal statement"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
});

export default FeedbackSteps;