import React from 'react';

const SideBox: React.FC = () => {
  return (
    <aside className="flex flex-col ml-5 w-1/5 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col pt-2.5 pr-12 pb-20 pl-5 w-full text-base text-black bg-white rounded-3xl border border-solid border-neutral-200 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:pr-5">
        <div className="flex shrink-0 self-end bg-white rounded-full border-2 border-solid border-zinc-800 h-[19px] w-[19px]" />
        <p className="self-start mt-2">Should .......</p>
      </div>
    </aside>
  );
};

export default SideBox;