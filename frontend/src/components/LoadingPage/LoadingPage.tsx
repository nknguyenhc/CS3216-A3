import React from "react";
import Lottie from "lottie-react";
import writingAnimation from "../../animations/loading.json";

const LoadingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <Lottie animationData={writingAnimation} className="w-64 h-64 mb-8" />
      <div className="relative w-80 h-10">
        <div className="absolute inset-0 flex items-center">
          <div className="w-10 h-10 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="ml-4 text-2xl font-semibold text-gray-700">
            Analyzing your personal statement...
          </div>
        </div>
      </div>
      <div className="mt-16">
        <svg
          className="w-40 h-40 animate-spin-slow text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle
            className="opacity-25"
            cx={12}
            cy={12}
            r={10}
            stroke="currentColor"
            strokeWidth={4}
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      </div>
    </div>
  );
};

export default LoadingPage;