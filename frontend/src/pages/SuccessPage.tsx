import { useNavigate } from "react-router-dom";

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h1 className="text-3xl font-bold text-green-600">Success</h1>
      <p className="mt-4 text-lg text-gray-700">Your transaction was successful!</p>
      <button
        onClick={handleRedirect}
        className="mt-8 px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg"
      >
        Go to Home
      </button>
    </div>
  );
};

export default SuccessPage;