import React, { useRef } from "react";
import TitleInput from "./TitleInput";
import PersonalStatementInput from "./PersonalStatementInput";
import FieldOfStudyInput from "./FieldOfStudyInput";
import SubmitButton from "./SubmitButton";
import FormFooter from "./FormFooter";

interface EssayFormProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  statement: string;
  setStatement: React.Dispatch<React.SetStateAction<string>>;
  fieldOfStudy: string;
  setFieldOfStudy: React.Dispatch<React.SetStateAction<string>>;
  submitEssay: () => void;
  consentChecked: boolean;
  setConsentChecked: React.Dispatch<React.SetStateAction<boolean>>;
  acknowledgeChecked: boolean;
  setAcknowledgeChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const EssayForm: React.FC<EssayFormProps> = ({
  title,
  setTitle,
  statement,
  setStatement,
  fieldOfStudy,
  setFieldOfStudy,
  submitEssay,
  consentChecked,
  setConsentChecked,
  acknowledgeChecked,
  setAcknowledgeChecked,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div>
      <div className="text-lg font-bold text-left text-black mb-8">Upload your personal statement</div>
      <div className="p-10 bg-white border border-[#B0B0B0] border-custom-thin shadow-lg rounded-[20px] h-[800px] flex flex-col justify-between">
        <div className="flex space-x-8">
          <TitleInput title={title} setTitle={setTitle} />
          <FieldOfStudyInput fieldOfStudy={fieldOfStudy} setFieldOfStudy={setFieldOfStudy} />
        </div>
        <PersonalStatementInput statement={statement} setStatement={setStatement} textAreaRef={textAreaRef} />
        <FormFooter statement={statement} setStatement={setStatement} textAreaRef={textAreaRef} />

        <div className="mb-4">
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={consentChecked}
              onChange={() => setConsentChecked(!consentChecked)}
              className="mr-2"
            />
            <label>I consent to the use of AI and human review for feedback on my personal statement.</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={acknowledgeChecked}
              onChange={() => setAcknowledgeChecked(!acknowledgeChecked)}
              className="mr-2"
            />
            <label>By uploading, you agree to our use of AI for analysis and acknowledge that human reviewers will access your statement.</label>
          </div>
        </div>

        <div className="flex justify-center">
          <SubmitButton submitEssay={submitEssay} />
        </div>
      </div>
    </div>
  );
};

export default EssayForm;
