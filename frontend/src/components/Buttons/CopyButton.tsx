import React from 'react';
import { FaCopy } from 'react-icons/fa';

interface CopyButtonProps {
  statement: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ statement }) => {
  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(statement);
      alert('Text copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex flex-col items-center text-gray-700"
    >
      <FaCopy className="text-3xl mb-1" />
      <span className="text-sm">Copy</span>
    </button>
  );
};

export default CopyButton;
