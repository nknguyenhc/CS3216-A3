import React from 'react';

interface ContentBoxProps {
  content: string;
}

const ContentBox: React.FC<ContentBoxProps> = ({ content }) => {
  return (
    <article className="flex flex-col w-4/5 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col w-full text-base font-medium leading-6 text-black rounded-none max-md:max-w-full">
        <div className="flex gap-4 items-start pt-10 pb-20 pl-14 bg-white rounded-3xl border border-solid border-neutral-200 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:pl-5">
          <div className="flex-auto mt-5 w-[858px] max-md:max-w-full">
            {content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph.includes("Martin's A Song of Ice and Fire novels.") ? (
                  <>
                    {paragraph.split("Martin's A Song of Ice and Fire novels.")[0]}
                    <span className="text-red-600 underline">Martin's A Song of Ice and Fire novels.</span>
                    {paragraph.split("Martin's A Song of Ice and Fire novels.")[1]}
                  </>
                ) : (
                  paragraph
                )}
              </p>
            ))}
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/45c9e004d2f53ebefae7e8ab5b3fe361fd47aa8cc7563cebf9ba8fdbae7f1470?placeholderIfAbsent=true&apiKey=605ddb38b3184de6b494a658ff50786d"
            className="object-contain z-10 shrink-0 w-[75px] aspect-[1.29] ml-4" // Added margin for spacing
            alt=""
          />
        </div>
      </div>
    </article>
  );
};

export default ContentBox;