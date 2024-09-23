import React from "react";

interface SortButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const SortButton: React.FC<SortButtonProps> = ({ label, active, onClick }) => {
  return (
    <div className="mb-12">
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-lg shadow-lg ${active ? "bg-dark-blue-custom text-white" : "bg-light-blue-custom text-black-custom"
          }`}
      >
        {label}
      </button>
    </div>

  );
};

export default SortButton;
