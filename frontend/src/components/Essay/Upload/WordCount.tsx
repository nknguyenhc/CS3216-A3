import React from 'react';

interface WordCountProps {
  count: number;
}

const WordCount: React.FC<WordCountProps> = ({ count }) => {
  return (
    <div className="text-lg text-gray-500">
      <span>Words Count: {count}</span>
    </div>
  );
};

export default WordCount;
