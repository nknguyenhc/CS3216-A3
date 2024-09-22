/*
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  currentUser: boolean | null;
  setCurrentUser: (state: boolean | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<boolean | null>(null);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
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
*/

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  currentUser: boolean | null;
  setCurrentUser: (state: boolean | null) => void;
  loggedInWithGoogle: boolean;
  setLoggedInWithGoogle: (state: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<boolean | null>(null);
  const [loggedInWithGoogle, setLoggedInWithGoogle] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, loggedInWithGoogle, setLoggedInWithGoogle }}>
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