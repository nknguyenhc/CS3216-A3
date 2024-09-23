import React from "react";
import { FaEye } from "react-icons/fa";

interface ViewButtonProps {
  onClick: () => void;
}

const ViewButton: React.FC<ViewButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center px-6 py-3 bg-dark-blue-custom text-white rounded-lg shadow-lg w-full hover:bg-blue-700"
    >
      <FaEye className="mr-2" />
      View
    </button>
  );
};

export default ViewButton;
