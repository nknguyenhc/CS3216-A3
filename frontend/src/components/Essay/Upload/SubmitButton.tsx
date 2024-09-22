import React from 'react';
import { FaCommentDots } from 'react-icons/fa';

interface SubmitButtonProps {
  submitEssay: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ submitEssay }) => {
  return (
    <button
      className="flex items-center justify-center px-6 py-3 bg-dark-blue-custom text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      onClick={submitEssay}
    >
      <FaCommentDots className="mr-2 text-lg" />
      Get your feedback
    </button>
  );
};

export default SubmitButton;
