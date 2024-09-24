import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { mockComments, mockEssay } from "./mockData";

const title = "Key Points";
const points = [
  "Identify areas that need more evidence or elaboration.",
  "At its core, Game of Thrones is about the quest for the Iron Throne, which symbolizes control over the Seven Kingdoms. Themes of loyalty, betrayal, and the corrupting nature of power dominate the narrative. The story also includes mystical elements such as dragons, the undead, and ancient prophecies.",
];

const CommentPage: React.FC = () => {
  const [activeComment, setActiveComment] = useState<number | null>(null);
  const [commentPositions, setCommentPositions] = useState<{ [key: number]: number }>({});
  const textRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const response = location.state?.response || "No response provided.";
  const essay = response?.essay || mockEssay

  const handleHighlightClick = (id: number) => {
    setActiveComment(id === activeComment ? null : id);
  };

  useEffect(() => {
    const updateCommentPositions = () => {
      if (textRef.current) {
        const newPositions: { [key: number]: number } = {};
        mockComments.forEach((comment) => {
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
    window.addEventListener("resize", updateCommentPositions);
    return () => window.removeEventListener("resize", updateCommentPositions);
  }, []);

  const renderTextWithHighlights = () => {
    let result = [];
    let currentIndex = 0;

    mockComments.forEach((comment) => {
      const startIndex = essay.indexOf(comment.highlight, currentIndex);
      if (startIndex !== -1) {
        if (startIndex > currentIndex) {
          result.push(<span key={`text-${currentIndex}`}>{essay.slice(currentIndex, startIndex)}</span>);
        }

        result.push(
          <span
            key={`highlight-${comment.id}`}
            data-highlight-id={comment.id}
            className={`bg-yellow-300 cursor-pointer ${activeComment === comment.id ? "bg-orange-300" : ""}`}
            onClick={() => handleHighlightClick(comment.id)}
          >
            {comment.highlight}
          </span>
        );

        currentIndex = startIndex + comment.highlight.length;
      }
    });

    if (currentIndex < essay.length) {
      result.push(<span key={`text-${currentIndex}`}>{essay.slice(currentIndex)}</span>);
    }

    return result;
  };

  return (
    <>
      <div className="flex max-w-7xl mx-auto p-4">
        <div className="w-3/4 pr-4">
          <h1 className="text-center px-16 pt-3.5 pb-3.5 max-w-full text-base font-bold text-black bg-white rounded-3xl border border-solid border-zinc-400 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-full">
            Short title
          </h1>
        </div>
      </div>
      <div className="flex max-w-7xl mx-auto p-4">
        <div className="w-3/4 pr-4">
          <div
            ref={textRef}
            className="bg-white p-20 bg-white rounded-3xl border border-solid border-zinc-400 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
          >
            <p>{renderTextWithHighlights()}</p>
          </div>
        </div>
        <div className="w-1/4 relative">
          {mockComments.map((comment) => (
            <div
              key={comment.id}
              className={`absolute left-0 right-0 bg-gray-100 p-2 rounded-lg transition-opacity duration-300 ${
                activeComment === comment.id ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              style={{
                top: `${commentPositions[comment.id]}px`,
                transform: "translateY(-300%)",
              }}
            >
              <p className="text-sm">{comment.comment}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="mt-32 text-base font-bold text-black max-md:mt-10 max-md:max-w-full">
        <h2 className="text-2xl">{title}</h2>
        <ul>
          {points.map((point, index) => (
            <li key={index}>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default CommentPage;