const ImageContent = () => (
  <div className="flex flex-col w-full lg:w-[55%] lg:pl-10">
    <img
      loading="lazy"
      src="/assets/oxbridge.jpeg"
      alt="Illustration representing Oxbridge and Jardine personal statements"
      className="object-contain w-full h-auto rounded-xl mt-5 lg:mt-0"
    />
  </div>
);

export default ImageContent;