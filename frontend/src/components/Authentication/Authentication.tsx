import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga";
import AuthForm from "./AuthForm";
import GoogleLoginButton from "./GoogleLoginButton";
import { useAuth } from "./AuthenticationContext";
import { client, getCSRFToken } from "../../AxiosInstance/AxiosInstance";

const Authentication: React.FC = () => {
  const { setCurrentUser, setToken, setCurrEmail, setCurrUsername } = useAuth();
  const [registrationToggle, setRegistrationToggle] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const updateFormBtn = () => {
    setRegistrationToggle((prev) => !prev);
    setErrorMessage(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      setCurrentUser(true);
    }
  }, [setToken, setCurrentUser]);

  const submitRegistration = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const csrfToken = getCSRFToken();

    client
      .post("/api/auth/register", { email, username, password }, { headers: { "X-CSRFToken": csrfToken } })
      .then((response) => {
        const tokenFromResponse = response.data.token;
        localStorage.setItem("authToken", tokenFromResponse);
        setToken(tokenFromResponse);
        setCurrentUser(true);
        setCurrEmail(email);
        setCurrUsername(username);
        ReactGA.event({
          category: "User",
          action: "Registration Successful",
          label: username,
        });
        navigate("/");
      })
      .catch((error) => {
        let errorMsg = error.response?.data?.error
          ? error.response.data.error.replace(/[\[\]']/g, "")
          : "Username, email, or password in use";
        setErrorMessage(errorMsg);
        ReactGA.event({
          category: "User",
          action: "Registration Failed",
          label: errorMsg,
        });
        console.error("Registration failed:", error || "Unknown error");
      });
  };

  const submitLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const csrfToken = getCSRFToken();

    client
      .post("/api/auth/login", { email, username, password }, { headers: { "X-CSRFToken": csrfToken } })
      .then((response) => {
        const tokenFromResponse = response.data.token;
        localStorage.setItem("authToken", tokenFromResponse);
        setToken(tokenFromResponse);
        setCurrentUser(true);
        setCurrEmail(email);
        setCurrUsername(username);
        ReactGA.event({
          category: "User",
          action: "Login Successful",
          label: username,
        });
        navigate("/");
      })
      .catch((error) => {
        let errorMsg = error.response?.data?.error
          ? error.response.data.error.replace(/[\[\]']/g, "")
          : "Invalid username, email, or password.";
        setErrorMessage(errorMsg);
        ReactGA.event({
          category: "User",
          action: "Login Failed",
          label: errorMsg,
        });
        console.error("Login failed:", error.response?.data?.error || "Unknown error");
      });
  };

  return (
    <div className="flex flex-row min-h-screen bg-gray-100 overflow-hidden">
      <div
        className="flex-1 justify-center bg-cover bg-center"
        style={{ backgroundImage: `url('/assets/cover.jpeg')` }}
      ></div>

      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="w-full px-8">
          <div className="flex flex-col items-center justify-center mb-5">
            <img
              src="/assets/logo-no-background.png"
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

            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

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
