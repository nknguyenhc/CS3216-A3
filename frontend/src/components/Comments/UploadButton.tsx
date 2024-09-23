import React from 'react';

const UploadButton: React.FC = () => {
  return (
    <button className="flex gap-6 self-center px-3 py-4 mt-28 max-w-full text-sm font-bold text-center text-white bg-sky-600 rounded-xl w-[222px] max-md:mt-10">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/3b93afba176deec5a87c5baf768146bbc003c39aa5f6fc65446162bfb0257276?placeholderIfAbsent=true&apiKey=605ddb38b3184de6b494a658ff50786d" className="object-contain shrink-0 self-start aspect-[1.07] w-[15px]" alt="" />
      <span className="grow shrink w-[156px]">Make another upload</span>
    </button>
  );
};

export default UploadButton;