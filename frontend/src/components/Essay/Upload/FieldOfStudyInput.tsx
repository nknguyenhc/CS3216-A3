import React from 'react';

interface FieldOfStudyInputProps {
  fieldOfStudy: string;
  setFieldOfStudy: React.Dispatch<React.SetStateAction<string>>;
}

const FieldOfStudyInput: React.FC<FieldOfStudyInputProps> = ({
  fieldOfStudy,
  setFieldOfStudy,
}) => {
  return (
    <div>
      <input
        type="text"
        value={fieldOfStudy}
        onChange={(e) => setFieldOfStudy(e.target.value)}
        placeholder="Enter your field of study"
        className="w-full px-4 py-3 border border-[#B0B0B0] border-custom-thin rounded-[100px] shadow-lg focus:outline-none focus:ring-2 focus:ring-dark-blue-custom placeholder:text-[#BDBDBD]"
      />
    </div>
  );
};

export default FieldOfStudyInput;
