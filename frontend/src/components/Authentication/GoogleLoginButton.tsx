import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthenticationContext';

const GoogleLoginButton: React.FC = () => {
  const { setCurrentUser, setLoggedInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const onSuccess = (credentialResponse: any) => {
    if (credentialResponse && credentialResponse.credential) {
      // Process the credential token (JWT) from the response
      const token = credentialResponse.credential;

      // You can authenticate the user or store the token here
      setCurrentUser(true);
      setLoggedInWithGoogle(true);
      navigate("/");

      console.log("Login success! Token:", token);
    }
  };

  const onError = () => {
    console.log("Login failed");
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
      />
    </div>
  );
};

export default GoogleLoginButton;


/*
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthenticationContext";
import { useEffect } from "react";
import { gapi } from "gapi-script"

// const clientId: string = "577083967585-ofhpvr34hgknf49vacjpkpth8n2gklub.apps.googleusercontent.com";

const clientId: string = "577083967585-e2klir9v7vt5edbn4juc7b705tjck9t0.apps.googleusercontent.com";

const GoogleLoginButton: React.FC = () => {
  const { setCurrentUser } = useAuth();
  const { setLoggedInWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({
        clientId: clientId,
        scope: 'email',
        plugin_name: "hello"
      } as any);
    });
  }, []);
  
  const onSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ("profileObj" in response) {
      setCurrentUser(true);
      setLoggedInWithGoogle(true);
      navigate("/");
      console.log("Login success! Current user: ", response.profileObj);
    }
  };

  const onFailure = (response: any) => {
    console.log("Login failed! response: ", response);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Sign in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default GoogleLoginButton;
*/

/*
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthenticationContext";
import { gapi } from "gapi-script";

const clientId: string = "577083967585-ofhpvr34hgknf49vacjpkpth8n2gklub.apps.googleusercontent.com";

const GoogleLoginButton: React.FC = () => {
  const { setCurrentUser, setLoggedInWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeGapi = () => {
      gapi.load("client:auth2", () => {
        gapi.auth2.init({
          clientId: clientId,
          scope: "profile email",
          prompt: "select_account",
        });
      });
    };

    initializeGapi();
  }, []);

  const handleLogin = () => {
    gapi.auth2.getAuthInstance().signIn().then((response: gapi.auth2.GoogleUser) => {
      const profile = response.getBasicProfile();
      setCurrentUser(true);
      setLoggedInWithGoogle(true);
      navigate("/");
      console.log("Login success! Current user: ", profile);
    }).catch((error: any) => {
      console.error("Login failed! response: ", error);
    });
  };

  return (
    <div>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
};

export default GoogleLoginButton;
*/