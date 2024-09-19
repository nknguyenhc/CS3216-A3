import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import axios, { AxiosResponse } from "axios";
import { gapi } from "gapi-script";
import AuthForm from "./AuthForm";
import GoogleLoginButton from "./GoogleLoginButton";
import GoogleLogoutButton from "./GoogleLogoutButton";

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
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

const Authentication: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<boolean | null>(null);
  const [registrationToggle, setRegistrationToggle] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Gapi setup
  useEffect(() => {
    const clientId: string = "577083967585-ofhpvr34hgknf49vacjpkpth8n2gklub.apps.googleusercontent.com";

    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);

    client
      .get("/api/user")
      .then((res: AxiosResponse) => {
        setCurrentUser(true);
      })
      .catch(() => {
        setCurrentUser(false);
      });
  }, []);

  const updateFormBtn = () => {
    setRegistrationToggle((prev) => !prev);
  };

  // Registration handler
  const submitRegistration = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const csrfToken = getCSRFToken();

    client
      .post("/api/register", { email, username, password }, { headers: { "X-CSRFToken": csrfToken } })
      .then(() => setCurrentUser(true))
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  };

  // Login handler
  const submitLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const csrfToken = getCSRFToken();

    client
      .post("/api/login", { email, username, password }, { headers: { "X-CSRFToken": csrfToken } })
      .then(() => setCurrentUser(true))
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  // Logout handler
  const submitLogout = () => {
    const csrfToken = getCSRFToken();

    client
      .post("/api/logout", {}, { headers: { "X-CSRFToken": csrfToken } })
      .then(() => setCurrentUser(false))
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <div className="flex flex-row min-h-screen bg-gray-100">
      {/* Left Column with Image */}
      <div
        className="flex-1 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url('/path-to-your-image.jpg')` }}
      >
        {/* Optional content inside the image section (if needed) */}
      </div>

      {/* Right Column with Auth Form */}
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="w-full px-8">
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
                    Register now
                  </button>
                </p>
              )}
            </div>

            {/* Google Auth buttons */}
            <div className="w-full space-y-4">
              <GoogleLoginButton />
              <GoogleLogoutButton />
            </div>

            {/* Logout button only shown if the user is logged in */}
            {currentUser && (
              <div className="w-full mt-4">
                <button className="w-full py-2 bg-gray-600 text-white rounded hover:bg-gray-700" onClick={submitLogout}>
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
