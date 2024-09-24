import React, { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import GoogleLoginButton from "./GoogleLoginButton";
import { useAuth } from "./AuthenticationContext";

// Extract CSRF token from cookies
const getCSRFToken = () => {
  const csrfCookie = document.cookie.split("; ").find((row) => row.startsWith("csrftoken="));
  return csrfCookie ? csrfCookie.split("=")[1] : null;
};

// Axios setup
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

const Authentication: React.FC = () => {
  const { setCurrentUser } = useAuth();
  const [registrationToggle, setRegistrationToggle] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  /*
  useEffect(() => {
    const clientId: string = "577083967585-ofhpvr34hgknf49vacjpkpth8n2gklub.apps.googleusercontent.com";

    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  }, []);
  */

  const updateFormBtn = () => {
    setRegistrationToggle((prev) => !prev);
    setErrorMessage(null);
  };

  // Registration handler
  const submitRegistration = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const csrfToken = getCSRFToken();

    client
      .post("/api/auth/register", { email, username, password }, { headers: { "X-CSRFToken": csrfToken } })
      .then(() => {
        setCurrentUser(true);
        navigate("/");
      })
      .catch((error) => {
        const errorMsg = error.response.data.error.replace(/[\[\]']/g, "");
        setErrorMessage(errorMsg);
        console.error("Registration failed:", error);
      });
  };

  // Login handler
  const submitLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const csrfToken = getCSRFToken();

    client
      .post("/api/auth/login", { email, username, password }, { headers: { "X-CSRFToken": csrfToken } })
      .then(() => {
        setCurrentUser(true);
        navigate("/");
      })
      .catch((error) => {
        let errorMsg = error.response?.data?.error
          ? error.response.data.error.replace(/[\[\]']/g, "")
          : "Invalid username, email, or password.";
        setErrorMessage(errorMsg);
        console.error("Login failed:", error.response?.data?.error || "Unknown error");
      });
  };

  return (
    <div className="flex flex-row min-h-screen bg-gray-100 overflow-hidden">
      {/* Left Column with Image */}
      <div
        className="flex-1 justify-center bg-cover bg-center"
        style={{ backgroundImage: `url('./assets/cover.jpeg')` }}
      ></div>

      {/* Right Column with Auth Form */}
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="w-full px-8">
          <div className="flex flex-col items-center justify-center mb-5">
            <img
              src="./assets/logo-no-background.png"
              alt="Description of image"
              className="w-1/2 md:w-1/3 lg:w-1/4 h-auto object-cover"
            />
          </div>

          <div className="flex flex-col items-center justify-center space-y-6">
            {registrationToggle ? (
              <AuthForm
                isRegistration={true}
                email={email}
                username={username}
                password={password}
                onEmailChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                onUsernameChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                onPasswordChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                onSubmit={submitRegistration}
              />
            ) : (
              <AuthForm
                isRegistration={false}
                email={email}
                username={username}
                password={password}
                onEmailChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                onUsernameChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                onPasswordChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                onSubmit={submitLogin}
              />
            )}

            {/* Display error message */}
            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

            {/* Toggle between login and registration */}
            <div className="text-center w-full">
              {registrationToggle ? (
                <p>
                  Already have an account?{" "}
                  <button onClick={updateFormBtn} className="text-blue-500 underline">
                    Sign in
                  </button>
                </p>
              ) : (
                <p>
                  Don't have an account?{" "}
                  <button onClick={updateFormBtn} className="text-blue-500 underline">
                    Sign Up
                  </button>
                </p>
              )}

              {/* Google Auth buttons */}
              <div className="mt-5">
                <GoogleLoginButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
