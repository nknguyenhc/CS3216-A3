import React, { useRef } from 'react';
import TitleInput from './TitleInput';
import PersonalStatementInput from './PersonalStatementInput';
import SubmitButton from './SubmitButton';
import FormFooter from './FormFooter';

interface EssayFormProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  statement: string;
  setStatement: React.Dispatch<React.SetStateAction<string>>;
}

const EssayForm: React.FC<EssayFormProps> = ({
  title,
  setTitle,
  statement,
  setStatement,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div>
      <div className="text-lg font-bold text-left text-black mb-8">
        Upload your personal statement
      </div>
      <div className="p-10 bg-white border border-[#B0B0B0] border-custom-thin shadow-lg rounded-[20px] h-[800px] flex flex-col justify-between">
        <TitleInput title={title} setTitle={setTitle} />
        <PersonalStatementInput statement={statement} setStatement={setStatement} textAreaRef={textAreaRef} />
        <FormFooter statement={statement} setStatement={setStatement} textAreaRef={textAreaRef} /> {/* Pass the ref */}
        <div className="flex justify-center">
          <SubmitButton />
        </div>
      </div>
    </div>
  );
};

export default EssayForm;
