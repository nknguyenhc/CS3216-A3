import React from 'react';
import CharacterCount from './CharacterCount';
import PasteButton from '../../Buttons/PasteButton';
import CopyButton from '../../Buttons/CopyButton';
import DeleteButton from '../../Buttons/DeleteButton';

interface FormFooterProps {
  statement: string;
  setStatement: React.Dispatch<React.SetStateAction<string>>;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
}

const FormFooter: React.FC<FormFooterProps> = ({ statement, setStatement, textAreaRef }) => {
  return (
    <div className="border-t-2 border-gray-300 pt-4 w-full">
      <div className="flex justify-between items-center">
        <CharacterCount count={statement.length} />
        <div className="flex space-x-12">
          <PasteButton setStatement={setStatement} textAreaRef={textAreaRef} />
          <CopyButton statement={statement} />
          <DeleteButton setStatement={setStatement} />
        </div>
      </div>
    </div>
  );
};

export default FormFooter;