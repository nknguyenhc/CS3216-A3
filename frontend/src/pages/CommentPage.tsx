import React, { useState, useRef, useEffect } from "react";

type Comment = {
  id: number;
  text: string;
  highlight: string;
  comment: string;
};

interface CommentPageProps {
  data: Comment[];
  pageText: string;
}

const CommentPage: React.FC<CommentPageProps> = ({ data, pageText }) => {
  const [activeComment, setActiveComment] = useState<number | null>(null);
  const [commentPositions, setCommentPositions] = useState<{[key: number]: number}>({});
  const textRef = useRef<HTMLDivElement>(null);

  const handleHighlightClick = (id: number) => {
    setActiveComment(id === activeComment ? null : id);
  };

  useEffect(() => {
    const updateCommentPositions = () => {
      if (textRef.current) {
        const newPositions: {[key: number]: number} = {};
        data.forEach((comment) => {
          const element = textRef.current?.querySelector(`[data-highlight-id="${comment.id}"]`);
          if (element) {
            const rect = element.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            newPositions[comment.id] = rect.top + scrollTop;
          }
        });
        setCommentPositions(newPositions);
      }
    };

    updateCommentPositions();
    window.addEventListener('resize', updateCommentPositions);
    return () => window.removeEventListener('resize', updateCommentPositions);
  }, [data]);

  const renderTextWithHighlights = () => {
    let result = [];
    let currentIndex = 0;

    data.forEach((comment) => {
      const startIndex = pageText.indexOf(comment.highlight, currentIndex);
      if (startIndex !== -1) {
        if (startIndex > currentIndex) {
          result.push(
            <span key={`text-${currentIndex}`}>
              {pageText.slice(currentIndex, startIndex)}
            </span>
          );
        }

        result.push(
          <span
            key={`highlight-${comment.id}`}
            data-highlight-id={comment.id}
            className={`bg-yellow-300 cursor-pointer ${
              activeComment === comment.id ? "bg-orange-300" : ""
            }`}
            onClick={() => handleHighlightClick(comment.id)}
          >
            {comment.highlight}
          </span>
        );

        currentIndex = startIndex + comment.highlight.length;
      }
    });

    if (currentIndex < pageText.length) {
      result.push(
        <span key={`text-${currentIndex}`}>
          {pageText.slice(currentIndex)}
        </span>
      );
    }

    return result;
  };

  return (
    <div className="flex max-w-6xl mx-auto p-4">
      <div className="w-2/3 pr-4" ref={textRef}>
        <p>{renderTextWithHighlights()}</p>
      </div>
      <div className="w-1/3 relative">
        {data.map((comment) => (
          <div
            key={comment.id}
            className={`absolute left-0 right-0 bg-gray-100 p-2 rounded-lg transition-opacity duration-300 ${
              activeComment === comment.id ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            style={{
              top: `${commentPositions[comment.id]}px`,
              transform: 'translateY(-350%)',
            }}
          >
            <p className="text-sm">{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentPage;


/*
import React, { useState } from 'react';

type Comment = {
  id: number;
  text: string;
  highlight: string;
  comment: string;
};

interface CommentPageProps {
  data: Comment[];
  pageText: string;
}

const CommentPage: React.FC<CommentPageProps> = ({ data, pageText }) => {
  const [activeComment, setActiveComment] = useState<number | null>(null);

  const handleHighlightClick = (id: number) => {
    setActiveComment(id === activeComment ? null : id);
  };

  const renderTextWithHighlights = () => {
    return pageText.split(' ').map((word, index) => {
      const commentData = data.find((item) => word.includes(item.highlight));
      
      const isActive = commentData && activeComment === commentData.id;

      return (
        <span
          key={index}
          className={`relative inline-block ${isActive ? 'bg-orange-300' : ''}`}
          onClick={() => {
            if (commentData) handleHighlightClick(commentData.id);
          }}
        >
          {commentData ? (
            <span className="bg-yellow-300 p-1 cursor-pointer">
              {word}
            </span>
          ) : (
            word
          )}
        </span>
      );
    });
  };

  return (
    <div className="flex max-w-4xl mx-auto p-4">
      <div className="flex-1 space-y-4">
        <p>{renderTextWithHighlights()}</p>
      </div>

      <div className="w-72 ml-4 border-l pl-4">
        {data.map((item) => (
          <div key={item.id} className={`mb-4 ${activeComment === item.id ? 'block' : 'hidden'}`}>
            <div className="bg-gray-100 rounded-lg shadow-md p-3">
              <p className="text-sm">{item.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentPage;
*/