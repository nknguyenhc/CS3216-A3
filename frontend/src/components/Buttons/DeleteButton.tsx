import React from 'react';
import { FaTrash } from 'react-icons/fa';

interface DeleteButtonProps {
  setStatement: React.Dispatch<React.SetStateAction<string>>;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ setStatement }) => {
  const handleDelete = () => {
    setStatement('');
  };

  return (
    <button
      onClick={handleDelete}
      className="flex flex-col items-center text-gray-700"
    >
      <FaTrash className="text-3xl mb-1" />
      <span className="text-sm">Delete</span>
    </button>
  );
};

export default DeleteButton;
