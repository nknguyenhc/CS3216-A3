import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FocusSection from "../components/Essay/Upload/FocusSection";
import EssayForm from "../components/Essay/Upload/EssayForm";
import Pricing from "../components/Pricing/Pricing";
import Footer from "../components/Footer/Footer";

const getCSRFToken = () => {
  const csrfCookie = document.cookie.split("; ").find((row) => row.startsWith("csrftoken="));
  return csrfCookie ? csrfCookie.split("=")[1] : null;
};

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

const UploadPage: React.FC = () => {
  const navigate = useNavigate();

  const [focus, setFocus] = React.useState<string>("Jardine scholarship");
  const [title, setTitle] = React.useState<string>("");
  const [statement, setStatement] = React.useState<string>("");
  const [fieldOfStudy, setFieldOfStudy] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const submitEssay = () => {
    const csrfToken = getCSRFToken();
    const postUrl = focus === "Oxbridge" ? "api/essay/" : "api/essay/jardine/";

    if (!statement.trim() || !fieldOfStudy.trim()) {
      setErrorMessage("Please fill in all required fields.");
      console.log(errorMessage);
      return;
    }

    /*
    client
      .post(
        `${postUrl}`,
        {
          title: title,
          essay: statement,
          field_of_study: fieldOfStudy,
        },
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }
      )
      */
    client
      .post(
        "https://jsonplaceholder.typicode.com/posts", // Dummy URL
        {
          title: title,
          essay: statement, // Assuming you want to keep 'essay'
          field_of_study: fieldOfStudy, // Keeping your original structure
        }
      )
      .then(() => {
        setErrorMessage(null);

        // Navigate to CommentPage and pass the statement via state
        navigate("/essay/comment", {
          state: {
            statement: statement, // Pass the statement as part of the state
          },
        });
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          const errorMsg = error.response.data.error.replace(/[\[\]']/g, "");
          setErrorMessage(errorMsg);
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
        console.error("Upload failed:", error);
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
