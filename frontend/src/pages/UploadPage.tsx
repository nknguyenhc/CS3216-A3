import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga";
import { useAuth } from "../components/Authentication/AuthenticationContext";
import FocusSection from "../components/Essay/Upload/FocusSection";
import EssayForm from "../components/Essay/Upload/EssayForm";
import Pricing from "../components/Pricing/Pricing";
import Footer from "../components/Footer/Footer";
import { client, getCSRFToken } from "../AxiosInstance/AxiosInstance";
import LoadingPage from "../components/LoadingPage/LoadingPage";
import Modal from "../components/Toast/Modal";

const UploadPage: React.FC = () => {
  const navigate = useNavigate();
  const { token, currEmail, currUsername } = useAuth();

  const [focus, setFocus] = React.useState<string>("Jardine scholarship");
  const [title, setTitle] = React.useState<string>("");
  const [statement, setStatement] = React.useState<string>("");
  const [fieldOfStudy, setFieldOfStudy] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false); // Modal visibility state

  useEffect(() => {
    ReactGA.pageview("/essay/upload");
  }, []);

  const submitEssay = () => {
    const csrfToken = getCSRFToken();
    const postUrl = focus === "Oxbridge" ? "api/essay/" : "api/essay/jardine/";

    if (!statement.trim() || !fieldOfStudy.trim()) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);

    client
      .post(
        `${postUrl}`,
        {
          email: currEmail,
          username: currUsername,
          title: title,
          essay: statement,
          field_of_study: fieldOfStudy,
        },
        {
          headers: {
            "X-CSRFToken": csrfToken,
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        ReactGA.event({
          category: "User",
          action: "Submitted Essay",
          label: focus,
        });
        setErrorMessage(null);
        const personalStatementId = response.data.id;
        navigate(`/essay/comment/${personalStatementId}`);
      })
      .catch((error) => {
        ReactGA.event({
          category: "User",
          action: "Upload Failed",
          label: error.response?.data?.error || "Unknown Error",
        });

        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          const errorMsg = error.response.data.error.replace(/[\[\]']/g, "");

          if (errorMsg.toLowerCase().includes("insufficient funds")) {
            setShowModal(true); // Show modal for insufficient funds
          } else {
            setErrorMessage(errorMsg);
          }
        } else {
          setErrorMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
      });
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <div className="max-w-screen-xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-center text-black mb-20 mt-10">
              Upload your personal statement
            </h1>
            {errorMessage && (
              <div className="mb-4 text-center text-red-600">
                {errorMessage}
              </div>
            )}
            <div className="max-w-[1200px] mx-auto space-y-16">
              <FocusSection focus={focus} setFocus={setFocus} />
              <EssayForm
                title={title}
                setTitle={setTitle}
                statement={statement}
                setStatement={setStatement}
                fieldOfStudy={fieldOfStudy}
                setFieldOfStudy={setFieldOfStudy}
                submitEssay={submitEssay}
              />
            </div>
          </div>
          <Pricing />
          <Footer />
        </>
      )}

      {/* Modal for insufficient funds */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message="You have insufficient funds to upload this essay. Please add funds or try again later."
      />
    </div>
  );
};

export default UploadPage;