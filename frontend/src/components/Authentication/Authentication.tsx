import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import axios, { AxiosResponse } from 'axios';
import { gapi } from 'gapi-script';
import AuthForm from './AuthForm';
import NavBar from './Navbar';

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true
  });

const Authentication: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<boolean | null>(null);
  const [registrationToggle, setRegistrationToggle] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    const clientId: string = "577083967585-ofhpvr34hgknf49vacjpkpth8n2gklub.apps.googleusercontent.com";

    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);

    client.get("/api/user")
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


  const submitRegistration = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    client.post("/api/register", { email, username, password })
      //.then(() => client.post("/api/login", { email, password }))
      .then(() => setCurrentUser(true));
  };

  const submitLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    client.post("/api/login", { email, password }).then(() => setCurrentUser(true));
  };

  const submitLogout = () => {
    client.post("/api/logout").then(() => setCurrentUser(false));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavBar onLogout={submitLogout} isLoggedIn={!!currentUser} onToggleForm={updateFormBtn} isRegistrationToggle={registrationToggle} />
      <div className="flex-grow flex items-center justify-center">
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
            onUsernameChange={() => {}}
            onPasswordChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            onSubmit={submitLogin}
          />
        )}
      </div>
    </div>
  );
};

export default Authentication;
