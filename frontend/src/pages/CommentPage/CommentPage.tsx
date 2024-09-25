import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client, getCSRFToken } from "../../AxiosInstance/AxiosInstance";
import { useAuth } from "../../components/Authentication/AuthenticationContext";
import Footer from "../../components/Footer/Footer";

interface Comment {
  id: number;
  comment: string;
  is_good: boolean;
  highlight: string;
}

interface RouteParams {
  [key: string]: string | undefined;
  id: string;
}

const CommentPage: React.FC = () => {
  const { token, currEmail, currUsername } = useAuth();
  const [activeComment, setActiveComment] = useState<number | null>(null);
  const [commentPositions, setCommentPositions] = useState<{ [key: number]: number }>({});
  const textRef = useRef<HTMLDivElement>(null);
  const [essay, setEssay] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [fieldOfStudy, setFieldOfStudy] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [generalComment, setGeneralComment] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { id } = useParams<RouteParams>();
  const psId = Number(id);

  const fetchPersonalStatement = () => {
    const csrfToken = getCSRFToken();
    const url = "api/essay/feedback/";

    client
      .get(url, {
        params: {
          email: currEmail,
          username: currUsername,
          id: psId
        },
        headers: {
          "X-CSRFToken": csrfToken,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setEssay(data.essay);
        setTitle(data.title);
        setFieldOfStudy(data.field_of_study);
        setComments(data.comments || []);
        setGeneralComment(data.general_comment || '');
        setErrorMessage(null);
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          const errorMsg = error.response.data.error.replace(/[\[\]']/g, "");
          setErrorMessage(errorMsg);
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
        console.log(errorMessage);
      });
  };

  useEffect(() => {
    fetchPersonalStatement();
  }, [currEmail, currUsername, psId]);

  const handleHighlightClick = (id: number) => {
    setActiveComment(id === activeComment ? null : id);
  };

  useEffect(() => {
    const updateCommentPositions = () => {
      if (textRef.current) {
        const newPositions: { [key: number]: number } = {};
        comments.forEach((comment) => {
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
  }, [comments]);

  const renderTextWithHighlights = () => {
    let result = [];
    let currentIndex = 0;

    comments.forEach((comment) => {
      const startIndex = essay.indexOf(comment.highlight, currentIndex);
      if (startIndex !== -1) {
        if (startIndex > currentIndex) {
          result.push(<span key={`text-${currentIndex}`}>{essay.slice(currentIndex, startIndex)}</span>);
        }

        result.push(
          <span
            key={`highlight-${comment.id}`}
            data-highlight-id={comment.id}
            className={`cursor-pointer ${!comment.is_good ? "text-red-500" : "text-green-500"}`}
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
      <div className="flex flex-col items-center max-w-7xl mx-auto p-4 space-y-4">
        <h1 className="text-4xl font-bold text-center text-black mb-16 mt-10">Review your personal statement</h1>
        <div className="w-full flex justify-center items-center space-x-4">
          <h1 className="text-center px-8 pt-2 pb-2 text-2xl font-bold text-black bg-white rounded-3xl border border-solid border-zinc-400 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-w-xl">
            {title}
          </h1>
          <div className="text-center px-8 pt-2 pb-2 text-2xl font-bold text-black bg-white rounded-3xl border border-solid border-zinc-400 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-w-xl">
            {fieldOfStudy}
          </div>
        </div>
        <div className="flex flex-col items-center max-w-4xl mx-auto p-4 w-full space-y-8">
          <div className="w-full max-w-3xl">
            <div
              ref={textRef}
              className="bg-white p-8 rounded-3xl border border-solid border-zinc-400 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-left"
            >
              <p className="text-lg">{renderTextWithHighlights()}</p>
            </div>
          </div>
          {generalComment && (
            <div className="w-full max-w-3xl mt-4">
              <h2 className="text-lg font-bold mb-2">General Comment</h2>
              <p className="text-sm text-gray-700">{generalComment}</p>
            </div>
          )}
          <div className="w-full max-w-3xl mt-4">
            <h2 className="text-lg font-bold mb-2">Comments</h2>
            {comments.length === 0 || comments.every(comment => activeComment !== comment.id) ? (
              <p className="text-sm text-gray-600 italic">Click highlighted text to see comment</p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className={`bg-gray-100 p-4 mb-4 rounded-lg transition-opacity duration-300 ${activeComment === comment.id ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                  style={{
                    position: "relative",
                    top: `${commentPositions[comment.id] || 0}px`,
                  }}
                >
                  <p className="text-sm">{comment.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CommentPage;
