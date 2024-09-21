import React from 'react';
import FocusSelection from './FocusSelection';

interface FocusSectionProps {
  focus: string;
  setFocus: React.Dispatch<React.SetStateAction<string>>;
}

const FocusSection: React.FC<FocusSectionProps> = ({ focus, setFocus }) => {
  return (
    <div>
      <div className="text-lg font-bold text-left text-black mb-6">
        Select Your Focus
      </div>
      <FocusSelection focus={focus} setFocus={setFocus} />
    </div>
  );
};

export default FocusSection;
