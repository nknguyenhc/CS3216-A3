import AuthButtons from "./AuthButtons";
import { Link } from "react-router-dom";

const NoLinkNavBar = () => {
  return (
    <header className="flex overflow-hidden flex-col justify-center items-center px-10 py-6 text-base bg-gray-800 max-md:px-5">
      <div className="flex justify-between items-center w-full max-w-[1208px] max-md:max-w-full">
        <Link to="/" className="flex">
          <img
            loading="lazy"
            src="../assets/logo-no-background.png"
            alt="Company Logo"
            className="object-contain shrink-0 self-stretch my-auto max-w-full aspect-[5] w-[200px] h-auto"
          />
        </Link>
        <AuthButtons />
      </div>
    </header>
  );
};

export default NoLinkNavBar;