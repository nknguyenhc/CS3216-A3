import { useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/AuthenticationContext";
import { googleLogout } from "@react-oauth/google";
import { client, getCSRFToken } from "../../AxiosInstance/AxiosInstance";
import ReactGA from "react-ga4";

const AuthButtons = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const { loggedInWithGoogle, setLoggedInWithGoogle, setToken, setCurrUsername, setCurrEmail } = useAuth();
  const navigate = useNavigate();

  const handleAuthentication = () => {
    navigate("/authentication");
  };

  const handleLogoutSuccess = () => {
    console.log("Google logout successful!");
    ReactGA.event({
      category: "User",
      action: "Logout Successful",
      label: "Google Logout"
    });
    setCurrentUser(false);
    setLoggedInWithGoogle(false);
    setToken(null);
    setCurrEmail(null);
    setCurrUsername(null);
    localStorage.removeItem('authToken');
    navigate('/');
    console.log('Logout successful!');
  };

  const handleLogout = async () => {
    if (loggedInWithGoogle) {
      googleLogout();
      handleLogoutSuccess();
    } else {
      const csrfToken = getCSRFToken();

      try {
        await client.post("/api/auth/logout", {}, { headers: { "X-CSRFToken": csrfToken } });
        ReactGA.event({
          category: "User",
          action: "Logout Successful",
          label: "API Logout"
        });
        setCurrentUser(false);
        navigate("/");
      } catch (error) {
        ReactGA.event({
          category: "User",
          action: "Logout Failed",
        });
        console.error("Logout failed:", error);
      }
    }
  };

  return (
    <div className="flex gap-4 self-stretch font-bold whitespace-nowrap">
      {currentUser ? (
        <>
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