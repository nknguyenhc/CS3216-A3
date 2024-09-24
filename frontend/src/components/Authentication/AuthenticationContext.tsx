import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  currentUser: boolean | null;
  setCurrentUser: (state: boolean | null) => void;
  loggedInWithGoogle: boolean;
  setLoggedInWithGoogle: (state: boolean) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  currUsername: string | null;
  setCurrUsername: (token: string | null) => void;
  currEmail: string | null;
  setCurrEmail: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<boolean | null>(null);
  const [loggedInWithGoogle, setLoggedInWithGoogle] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [currUsername, setCurrUsername] = useState<string | null>(null);
  const [currEmail, setCurrEmail] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, loggedInWithGoogle, setLoggedInWithGoogle, token, setToken, currUsername, setCurrUsername, currEmail, setCurrEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};