import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FocusSection from "../components/Essay/Upload/FocusSection";
import { useAuth } from "../components/Authentication/AuthenticationContext";
import SubmissionsSection from "../components/Essay/Submissions/SubmissionsSection";
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

const SubmissionsPage: React.FC = () => {
  interface PersonalStatement {
    id: number;
    title: string;
    field_of_study: string;
    created_at: string;
    comments: number;
  }

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/authentication");
    }
  }, [currentUser, navigate]);

  const [focus, setFocus] = React.useState<string>("Jardine scholarship");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [submissions, setSubmissions] = React.useState<Array<PersonalStatement>>([
    {
      id: 1,
      title: "Personal Statement for Computer Science",
      field_of_study: "Computer Science",
      created_at: "2023-08-15T12:34:56Z",
      comments: 6,
    },
    {
      id: 2,
      title: "Personal Statement for Business Administration",
      field_of_study: "Business Administration",
      created_at: "2023-07-10T09:15:20Z",
      comments: 4,
    },
    {
      id: 3,
      title: "Personal Statement for Economics",
      field_of_study: "Economics",
      created_at: "2023-06-01T16:22:10Z",
      comments: 8,
    },
  ]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  useEffect(() => {
    fetchSubmissions();
  }, [focus]);

  const fetchSubmissions = () => {
    const csrfToken = getCSRFToken();
    const url = focus === "Oxbridge" ? "api/essay/" : "api/essay/jardine/";

    client
      .get(url, {
        headers: {
          "X-CSRFToken": csrfToken,
        },
      })
      .then((response) => {
        setSubmissions(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          const errorMsg = error.response.data.error.replace(/[\[\]']/g, "");
          setErrorMessage(errorMsg);
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
        console.error("Fetch failed:", error);
      });
  };

  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center text-black mb-20 mt-10">
          See your past submissions
        </h1>
        <div className="max-w-[1200px] mx-auto space-y-16">
          <FocusSection focus={focus} setFocus={setFocus} />
          <SubmissionsSection submissions={submissions} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubmissionsPage;
