import React from "react";

interface FindByTitleProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const FindByTitle: React.FC<FindByTitleProps> = ({ title, setTitle }) => {
  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Find Title"
        className="w-full px-4 py-3 border border-[#B0B0B0] border-custom-thin rounded-[100px] shadow-lg focus:outline-none focus:ring-2 focus:ring-dark-blue-custom placeholder:text-[#BDBDBD]"
      />
    </div>
  );
};

export default FindByTitle;
