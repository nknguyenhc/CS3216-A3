import React from 'react';

interface FocusSelectionProps {
  focus: string;
  setFocus: React.Dispatch<React.SetStateAction<string>>;
}

const FocusSelection: React.FC<FocusSelectionProps> = ({ focus, setFocus }) => {
  const buttonClasses = (selected: boolean) =>
    `w-52 py-3 px-6 border rounded-md text-center cursor-pointer flex items-center justify-center ${selected ? 'bg-dark-blue-custom text-white' : 'bg-light-blue-custom text-black-custom'
    }`;

  return (
    <div className="flex space-x-4">
      <button
        className={buttonClasses(focus === 'Jardine scholarship')}
        onClick={() => setFocus('Jardine scholarship')}
      >
        Jardine Scholarship
      </button>
      <button
        className={buttonClasses(focus === 'Oxbridge')}
        onClick={() => setFocus('Oxbridge')}
      >
        Oxbridge
      </button>
    </div>
  );
};

export default FocusSelection;
