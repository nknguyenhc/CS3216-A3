import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-custom">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-green-600 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" />
      </svg>

      <h1 className="text-3xl font-bold text-green-600">Success</h1>
      <p className="mt-4 text-lg text-gray-700">
        Your transaction was successful! You will be redirected to the home page shortly.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-8 px-6 py-3 bg-dark-blue-custom text-white rounded-lg shadow-lg"
      >
        Back to Home
      </button>
    </div>
  );
};

export default SuccessPage;
