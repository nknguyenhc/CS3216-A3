import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 text-white">
      <h1 className="text-9xl font-bold leading-none">404</h1>
      <p className="mt-4 text-2xl">Page Not Found</p>
      <p className="mt-2 text-lg">Sorry, the page you are looking for does not exist.</p>
      <button 
        onClick={() => navigate("/")} 
        className="mt-6 px-4 py-2 bg-white text-blue-600 rounded-lg shadow-lg hover:bg-gray-100 transition"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFoundPage;