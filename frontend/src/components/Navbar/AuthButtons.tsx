import { useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/AuthenticationContext";
import axios from "axios";
import { gapi } from "gapi-script";

// Extract CSRF token from cookies
const getCSRFToken = () => {
  const csrfCookie = document.cookie.split("; ").find((row) => row.startsWith("csrftoken="));
  return csrfCookie ? csrfCookie.split("=")[1] : null;
};

// Axios setup
const client = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

const AuthButtons = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const { loggedInWithGoogle, setLoggedInWithGoogle } = useAuth();
  const navigate = useNavigate();

  /*
  const handleAuthentication = () => {
    navigate("/authentication");
  };

  const handleLogout = async () => {
    const csrfToken = getCSRFToken();

    try {
      await client.post("/api/auth/logout", {}, { headers: { "X-CSRFToken": csrfToken } });
      setCurrentUser(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  */

  ///*
  const handleAuthentication = () => {
    navigate("/authentication");
  };

  const handleLogout = async () => {
    if (loggedInWithGoogle) {
      // Handle Google logout
      const authInstance = gapi.auth2.getAuthInstance();
      
      try {
        await authInstance.signOut();
        console.log("Google logout successful!");
        setCurrentUser(false);
        setLoggedInWithGoogle(false); // Reset state
        navigate("/");
      } catch (error) {
        console.error("Google logout failed:", error);
      }
    } else {
      // Handle normal logout
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
  //*/

  return (
    <div className="flex gap-4 self-stretch font-bold whitespace-nowrap">
      {currentUser ? (
        <button
          className="gap-2.5 self-start px-4 py-3.5 text-red-600 rounded-xl border border-red-600 border-solid min-h-[50px] hover:bg-red-600 hover:text-white transition duration-200"
          onClick={handleLogout}
        >
          Log Out
        </button>
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
