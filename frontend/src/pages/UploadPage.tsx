import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga";
import { useAuth } from "../components/Authentication/AuthenticationContext";
import FocusSection from "../components/Essay/Upload/FocusSection";
import EssayForm from "../components/Essay/Upload/EssayForm";
import Pricing from "../components/Pricing/Pricing";
import Footer from "../components/Footer/Footer";
import { client, getCSRFToken } from "../AxiosInstance/AxiosInstance";

const UploadPage: React.FC = () => {
  const navigate = useNavigate();
  const { token, currEmail, currUsername } = useAuth();

  const [focus, setFocus] = React.useState<string>("Jardine scholarship");
  const [title, setTitle] = React.useState<string>("");
  const [statement, setStatement] = React.useState<string>("");
  const [fieldOfStudy, setFieldOfStudy] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

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
            "Authorization": `Bearer ${token}`,
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

        if (error.response && error.response.data && error.response.data.error) {
          const errorMsg = error.response.data.error.replace(/[\[\]']/g, "");
          setErrorMessage(errorMsg);
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
        console.log(errorMessage);
      });
  };

  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center text-black mb-20 mt-10">Upload your personal statement</h1>
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
    </div>
  );
};

export default UploadPage;
