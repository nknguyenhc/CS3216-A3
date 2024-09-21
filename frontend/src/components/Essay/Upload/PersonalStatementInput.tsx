import React from 'react';

interface PersonalStatementInputProps {
  statement: string;
  setStatement: React.Dispatch<React.SetStateAction<string>>;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
}

const PersonalStatementInput: React.FC<PersonalStatementInputProps> = ({
  statement,
  setStatement,
  textAreaRef,
}) => {
  return (
    <div>
      <textarea
        ref={textAreaRef}
        value={statement}
        onChange={(e) => setStatement(e.target.value)}
        placeholder="Type or paste your personal statement here"
        className="w-full h-80 px-4 py-3 border border-[#B0B0B0] border-custom-thin rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-dark-blue-custom resize-none placeholder:text-[#BDBDBD]"
      />
    </div>
  );
};

export default PersonalStatementInput;
