import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthButtons = () => {
  const navigate = useNavigate();

  const handleAuthentication = () => {
    navigate('/authentication');
  };

  return (
    <div className="flex gap-4 self-stretch font-bold whitespace-nowrap">
      <button
        className="gap-2.5 self-start px-4 py-3.5 text-sky-600 rounded-xl border border-sky-600 border-solid min-h-[50px]"
        onClick={handleAuthentication}
      >
        Login
      </button>
    </div>
  );
};

export default AuthButtons;