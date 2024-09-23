import React, { useState } from "react";
import SubmissionCard from "./SubmissionCard";
import FindByTitle from "./FindByTitle";
import SortButton from "./SortButton";

interface PersonalStatement {
  id: number;
  title: string;
  field_of_study: string;
  created_at: string;
  comments: number;
}

interface SubmissionsSectionProps {
  submissions: PersonalStatement[];
}

const SubmissionsSection: React.FC<SubmissionsSectionProps> = ({ submissions }) => {
  const [title, setTitle] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

  const filteredSubmissions = submissions.filter((submission) =>
  ((submission.title) ? submission.title.toLowerCase().includes(title.toLowerCase())
    : '')
  );

  const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
    if (sortBy === "created") {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    } else if (sortBy === "comments") {
      return b.comments - a.comments;
    } else {
      return 0;
    }
  });

  return (
    <div>
      <div className="text-lg font-bold text-left text-black mb-6">Your past submissions</div>
      <div className="flex items-center space-x-6 mb-12">
        <FindByTitle title={title} setTitle={setTitle} />
        <SortButton
          label="Sort by Create Time"
          active={sortBy === "created"}
          onClick={() => setSortBy("created")}
        />
        <SortButton
          label="Sort by Comments"
          active={sortBy === "comments"}
          onClick={() => setSortBy("comments")}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedSubmissions.length > 0 ? (
          sortedSubmissions.map((submission) => (
            <SubmissionCard key={submission.id} submission={submission} />
          ))
        ) : (
          <div>No submissions found.</div>
        )}
      </div>
    </div>
  );
};

export default SubmissionsSection;
