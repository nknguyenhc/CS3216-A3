import React from 'react';
import { FaPaste } from 'react-icons/fa';

interface PasteButtonProps {
  textAreaRef: React.RefObject<HTMLTextAreaElement>; // Accept the ref as a prop
  setStatement: React.Dispatch<React.SetStateAction<string>>;
}

const PasteButton: React.FC<PasteButtonProps> = ({ textAreaRef, setStatement }) => {
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const textArea = textAreaRef.current;

      if (textArea) {
        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;
        const currentText = textArea.value;
        const newText = currentText.slice(0, start) + text + currentText.slice(end);

        setStatement(newText);
        setTimeout(() => {
          textArea.focus();
          textArea.selectionStart = textArea.selectionEnd = start + text.length;
        }, 0);
      }
    } catch (error) {
      console.error('Failed to read clipboard contents: ', error);
    }
  };

  return (
    <button
      onClick={handlePaste}
      className="flex flex-col items-center text-gray-700"
    >
      <FaPaste className="text-3xl mb-1" />
      <span className="text-sm">Paste Text</span>
    </button>
  );
};

export default PasteButton;
