import PurchaseButton from "./PurchaseButton";

const TextContent = () => (
  <div className="flex flex-col w-[45%] max-md:ml-0 max-md:w-full">
    <div className="flex flex-col items-start self-stretch my-auto max-md:mt-10 max-md:max-w-full">
      <h1 className="text-4xl font-black uppercase text-slate-500 max-md:max-w-full">
        OXBRIDGE & JARDINE PERSONAL STATEMENTS
      </h1>
      <p className="self-stretch mt-8 text-base font-medium leading-6 text-black max-md:max-w-full">
        A personal statement website powered by AI, providing tailored feedback specifically for Oxbridge and Jardine
        personal statements.
      </p>
      <PurchaseButton />
    </div>
  </div>
);

export default TextContent;
