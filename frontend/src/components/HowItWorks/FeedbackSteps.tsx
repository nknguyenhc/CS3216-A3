import { forwardRef } from "react";

const FeedbackSteps = forwardRef<HTMLElement, any>((_, ref) => {
  return (
    <section ref={ref} className="h-auto">
      {/* Step 1: Image on Left, Text on Right */}
      <div className="h-screen flex items-center">
        <div className="w-1/2 h-full">
          <img src="/assets/pay.png" alt="Pay Process" className="object-contain w-full h-full" />
        </div>
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-black uppercase text-slate-500 mb-4">1. Fill in the purchase order form</h2>
          <p className="text-base leading-6 text-black">
            Fill out the payment form after selecting whether you'd like to receive feedback on your Oxbridge or Jardine
            personal statement.
          </p>
        </div>
      </div>

      {/* Step 2: Text on Left, Image on Right */}
      <div className="h-screen flex items-center">
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-black uppercase text-slate-500 mb-4">2. Upload your personal statement</h2>
          <p className="text-base leading-6 text-black">
            Paste your personal statement into the text box after selecting the appropriate personal statement type
            (either Oxbridge or Jardine). Then click Get Feedback.
          </p>
        </div>
        <div className="w-1/2 h-full">
          <img src="/assets/upload.png" alt="Upload Process" className="object-contain w-full h-full" />
        </div>
      </div>

      {/* Step 3: Image on Left, Text on Right */}
      <div className="h-screen flex items-center">
        <div className="w-1/2 h-full">
          <img
            src="/assets/comments.png"
            alt="Specific Comments"
            className="object-contain w-full h-full"
          />
        </div>
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-black uppercase text-slate-500 mb-4">3. Read Specific Comments</h2>
          <p className="text-base leading-6 text-black">
            Click on the highlighted text to read the specific comments. If it is green, it indicates a positive
            comment, while red indicates a negative comment.
          </p>
        </div>
      </div>

      {/* Step 4: Text on Left, Image on Right */}
      <div className="h-screen flex items-center">
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-black uppercase text-slate-500 mb-4">4. Read General Comments</h2>
          <p className="text-base leading-6 text-black">
            The general comment is meant to provide a general idea of the overall state of your current personal
            statement.
          </p>
        </div>
        <div className="w-1/2 h-full">
          <img
            src="/assets/general.png"
            alt="General Comments"
            className="object-contain w-full h-full"
          />
        </div>
      </div>
    </section>
  );
});

export default FeedbackSteps;
