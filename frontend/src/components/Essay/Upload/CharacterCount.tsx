import React from 'react';

interface CharacterCountProps {
  count: number;
}

const CharacterCount: React.FC<CharacterCountProps> = ({ count }) => {
  return (
    <div className="text-lg text-gray-500">
      <span>Character Count: {count} / 4000</span>
    </div>
  );
};

export default CharacterCount;