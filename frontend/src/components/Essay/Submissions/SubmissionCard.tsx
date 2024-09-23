import React from "react";
import ViewButton from "../Submissions/ViewButton";

interface PersonalStatement {
  id: number;
  title: string;
  field_of_study: string;
  created_at: string;
  comments: number;
}

interface SubmissionCardProps {
  submission: PersonalStatement;
}

const SubmissionCard: React.FC<SubmissionCardProps> = ({ submission }) => {
  const handleViewClick = () => {
    console.log(`Viewing submission ID: ${submission.id}`);
  };

  return (
    <div className="border border-grey-blue-custom p-6 rounded-lg shadow-lg bg-white flex flex-col justify-between">
      <h2 className="text-lg font-bold text-black mb-2">{submission.title}</h2>
      <p className="text-sm text-grey-blue-custom mb-2">Field of Study: {submission.field_of_study}</p>
      <p className="text-sm text-grey-blue-custom mb-2">Created At: {new Date(submission.created_at).toLocaleDateString()}</p>
      <p className="text-sm text-grey-blue-custom mb-4">Comments: {submission.comments}</p>
      <ViewButton onClick={handleViewClick} />
    </div>
  );
};

export default SubmissionCard;
