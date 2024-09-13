const Hero = () => {
    return (
    <div className="bg-blue-custom">
        <header className="self-end ml-20 mr-20 w-full max-w-[1324px] max-md:mr-2.5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[45%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-start self-stretch my-auto max-md:mt-10 max-md:max-w-full">
              <h1 className="text-4xl font-black uppercase text-slate-500 max-md:max-w-full">
                OXBRIDGE & JARDINE PERSONAL STATEMENTS
              </h1>
              <p className="self-stretch mt-8 text-base font-medium leading-6 text-black max-md:max-w-full">
                A personal statement website powered by AI, providing tailored feedback specifically for Oxbridge and Jardine personal statements.
              </p>
              <button className="px-7 py-4 mt-16 text-sm font-bold text-center text-white bg-dark-blue-custom rounded-xl max-md:px-5 max-md:mt-10">
                Purchase a plan
              </button>
            </div>
          </div>
          <div className="flex flex-col pl-10 w-[55%] max-md:ml-0 max-md:w-full">
            <img 
              loading="lazy"
              src="/assets/oxbridge.jpeg"
              alt="Oxbridge and Jardine personal statements illustration" 
              className="object-contain grow w-full rounded-xl aspect-[1.5] max-md:mt-5 max-md:max-w-full" 
            />
          </div>
        </div>
      </header>
    </div>
    );
  }
  
  export default Hero;  