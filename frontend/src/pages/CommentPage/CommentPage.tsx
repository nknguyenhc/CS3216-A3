import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client, getCSRFToken } from "../../AxiosInstance/AxiosInstance";
import { useAuth } from "../../components/Authentication/AuthenticationContext";
import Footer from "../../components/Footer/Footer";
import NoLinkNavBar from "../../components/Navbar/NoLinkNavBar";

interface Comment {
  id: number;
  comment: string;
  is_good: boolean;
  text: string;
}

interface RouteParams {
  [key: string]: string | undefined;
  id: string;
}

const CommentPage: React.FC = () => {
  const { token, currEmail, currUsername } = useAuth();
  const [activeComment, setActiveComment] = useState<number | null>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [essay, setEssay] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [generalComment, setGeneralComment] = useState<string>("");
  const [, setErrorMessage] = useState<string | null>(null);
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
          id: psId,
        },
        headers: {
          "X-CSRFToken": csrfToken,
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setEssay(data.essay);
        setTitle(data.title);
        setCreatedAt(data.created_at);
        setComments(data.comments || []);
        setGeneralComment(data.general_comment || "");
        setErrorMessage(null);
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          const errorMsg = error.response.data.error.replace(/[\[\]']/g, "");
          setErrorMessage(errorMsg);
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      });
  };

  useEffect(() => {
    fetchPersonalStatement();
  }, [currEmail, currUsername, psId]);

  const handleHighlightClick = (id: number) => {
    setActiveComment(id === activeComment ? null : id);
  };

  const renderTextWithHighlights = () => {
    let result = [];
    let currentIndex = 0;

    comments.forEach((comment) => {
      const startIndex = essay.indexOf(comment.text, currentIndex);
      if (startIndex !== -1) {
        if (startIndex > currentIndex) {
          result.push(<span key={`text-${currentIndex}`}>{essay.slice(currentIndex, startIndex)}</span>);
        }

        result.push(
          <span
            key={`highlight-${comment.id}`}
            data-highlight-id={comment.id}
            className={`cursor-pointer relative inline-block break-words max-w-full 
    ${!comment.is_good
                ? comment.id === activeComment
                  ? "text-red-700 bg-red-200"
                  : "text-red-500"
                : comment.id === activeComment
                  ? "text-green-700 bg-green-200"
                  : "text-green-500"
              }`}
            onClick={() => handleHighlightClick(comment.id)}
            style={{ whiteSpace: "normal" }}
          >
            {comment.text}
          </span>
        );

        currentIndex = startIndex + comment.text.length;
      }
    });

    if (currentIndex < essay.length) {
      result.push(<span key={`text-${currentIndex}`}>{essay.slice(currentIndex)}</span>);
    }

    return result;
  };

  const renderGeneralComment = () => {
    if (generalComment) {
      return (
        <div className="bg-gray-100 p-4 mb-4 rounded-lg">
          <p className="text-sm text-gray-700">{generalComment}</p>
        </div>
      );
    } else {
      return (
        <div className="bg-gray-100 p-4 mb-4 rounded-lg">
          <p className="text-sm text-gray-600 italic">No comments available.</p>
        </div>
      );
    }
  };

  const renderActiveComment = () => {
    if (activeComment === null) {
      return <p className="text-sm text-gray-600 italic">Click highlighted text to see comment</p>;
    }

    const active = comments.find((comment) => comment.id === activeComment);

    if (active) {
      return (
        <div className="bg-gray-100 p-4 mb-4 rounded-lg">
          <p className="text-sm">{active.comment}</p>
        </div>
      );
    } else {
      return <p className="text-sm text-gray-600 italic">Comment not found.</p>;
    }
  };

  return (
    <>
      <NoLinkNavBar />
      <div className="flex flex-col items-center max-w-7xl mx-auto p-4 space-y-4">
        <h1 className="text-4xl font-bold text-center text-black mb-8 mt-10">Review your personal statement</h1>
        <div className="flex justify-center items-center space-x-4 max-w-4xl">
          <h2 className="text-center px-8 pt-2 pb-2 text-2xl font-bold text-black bg-white rounded-3xl border border-solid border-zinc-400 shadow-md max-w-2xl">
            {title}
          </h2>
        </div>
        {createdAt && (
          <div className="w-full flex justify-center items-center">
            <p className="text-sm text-gray-500">{new Date(createdAt).toLocaleDateString()}</p>
          </div>
        )}
        <div className="flex flex-row items-start w-full space-x-8">
          <div className="w-full max-w-5xl relative">
            <div
              ref={textRef}
              className="bg-white p-10 rounded-3xl border border-solid border-zinc-400 shadow-md text-left relative"
              style={{ overflow: "hidden" }}
            >
              <p className="text-lg">{renderTextWithHighlights()}</p>
            </div>
            <p className="text-sm text-gray-500 mt-2 italic">
              AI comments are suggestions and should be reviewed critically. Your final decision matters most.
            </p>
          </div>
          <div className="w-1/4">
            <div className="w-full mb-4">
              <h2 className="text-lg font-bold mb-2">Comments</h2>
              {renderActiveComment()}
            </div>
            <div className="w-full mb-4">
              <h2 className="text-lg font-bold mb-2">General Comment</h2>
              {renderGeneralComment()}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CommentPage;
