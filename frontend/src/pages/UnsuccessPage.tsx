import { useNavigate } from "react-router-dom";

const UnsuccessPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
      <h1 className="text-3xl font-bold text-red-600">Transaction Failed</h1>
      <p className="mt-4 text-lg text-gray-700">Something went wrong with your transaction.</p>
      <button
        onClick={handleRedirect}
        className="mt-8 px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg"
      >
        Go to Home
      </button>
    </div>
  );
};

export default UnsuccessPage;