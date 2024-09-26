import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-blue-custom p-6 rounded-lg max-w-md w-full">
        <h2 className="text-lg font-semibold text-center mb-4">No Uploads Remaining</h2>
        <p className="text-center mb-6">{message}</p>
        <div className="flex justify-center">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;