import { useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/AuthenticationContext";
import axios from "axios";
import { GoogleLogout } from "react-google-login";
import { useRef } from "react";

// Extract CSRF token from cookies
const getCSRFToken = () => {
  const csrfCookie = document.cookie.split("; ").find((row) => row.startsWith("csrftoken="));
  return csrfCookie ? csrfCookie.split("=")[1] : null;
};

// Axios setup
const client = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

const clientId: string = "577083967585-ofhpvr34hgknf49vacjpkpth8n2gklub.apps.googleusercontent.com";

const AuthButtons = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const { loggedInWithGoogle, setLoggedInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const googleLogoutRef = useRef<HTMLDivElement | null>(null);

  const handleAuthentication = () => {
    navigate("/authentication");
  };

  const handleLogoutSuccess = () => {
    console.log("Google logout successful!");
    setCurrentUser(false);
    setLoggedInWithGoogle(false);
    navigate("/");
  };

  const handleLogout = async () => {
    if (loggedInWithGoogle && googleLogoutRef.current) {
      const googleLogoutButton = googleLogoutRef.current.querySelector("button");
      if (googleLogoutButton) {
        googleLogoutButton.click();
      }
    } else {
      const csrfToken = getCSRFToken();

      try {
        await client.post("/api/auth/logout", {}, { headers: { "X-CSRFToken": csrfToken } });
        setCurrentUser(false);
        navigate("/");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };

  return (
    <div className="flex gap-4 self-stretch font-bold whitespace-nowrap">
      {currentUser ? (
        <>
          {loggedInWithGoogle && (
            <div style={{ display: "none" }} ref={googleLogoutRef}>
              <GoogleLogout clientId={clientId} buttonText="Log Out" onLogoutSuccess={handleLogoutSuccess} />
            </div>
          )}
          <button
            className="gap-2.5 self-start px-4 py-3.5 text-red-600 rounded-xl border border-red-600 border-solid min-h-[50px] hover:bg-red-600 hover:text-white transition duration-200"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </>
      ) : (
        <button
          className="gap-2.5 self-start px-4 py-3.5 text-sky-600 rounded-xl border border-sky-600 border-solid min-h-[50px] hover:bg-sky-600 hover:text-white transition duration-200"
          onClick={handleAuthentication}
        >
          Login / Sign Up
        </button>
      )}
    </div>
  );
};

export default AuthButtons;
