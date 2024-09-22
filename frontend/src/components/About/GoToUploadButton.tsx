import { useNavigate } from "react-router-dom";

const GoToUploadButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="px-7 py-4 mt-16 text-sm font-bold text-center text-white bg-dark-blue-custom rounded-xl max-md:px-5 max-md:mt-10 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
      onClick={() => navigate("/essay/upload")}
    >
      Upload Essay
    </button>
  );
};

export default GoToUploadButton;
