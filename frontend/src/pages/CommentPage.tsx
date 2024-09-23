import React, { useState } from 'react';

type Comment = {
  id: number;
  text: string;   // The sentence where the highlighted part resides
  highlight: string; // The part that should be highlighted
  comment: string; // The comment related to the highlighted text
};

interface CommentPageProps {
  data: Comment[];
  pageText: string; // The full page of text to display
}

const CommentPage: React.FC<CommentPageProps> = ({ data, pageText }) => {
  const [activeComment, setActiveComment] = useState<number | null>(null);

  const handleHighlightClick = (id: number) => {
    setActiveComment(id === activeComment ? null : id); // Toggle the comment on/off
  };

  const renderTextWithHighlights = () => {
    // Split the pageText into individual words and attempt to match it with the dynamic highlight data
    return pageText.split(' ').map((word, index) => {
      const commentData = data.find((item) => word.includes(item.highlight));

      if (commentData) {
        return (
          <span
            key={index}
            className={`bg-yellow-300 p-1 cursor-pointer ${activeComment === commentData.id ? 'bg-orange-300' : ''}`}
            onClick={() => handleHighlightClick(commentData.id)}
          >
            {word}{' '}
          </span>
        );
      }

      return <span key={index}>{word} </span>;
    });
  };

  return (
    <div className="flex max-w-4xl mx-auto p-4">
      {/* Left panel: Text */}
      <div className="flex-1 space-y-4">
        <p>{renderTextWithHighlights()}</p>
      </div>

      {/* Right panel: Comments */}
      <div className="w-72 ml-4 border-l pl-4">
        {data.map((item) => (
          <div
            key={item.id}
            className={`transition-opacity duration-300 space-y-2 ${
              activeComment === item.id ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {activeComment === item.id && (
              <div className="bg-gray-100 rounded-lg shadow-md p-3">
                <p className="text-sm">{item.comment}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentPage;