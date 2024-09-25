import GoToUploadButton from "./GoToUploadButton";
import { useAuth } from "../Authentication/AuthenticationContext";
import AuthButtons from "../Navbar/AuthButtons";
import GoToSubmissionsButton from "../Essay/Submissions/GoToSubmissionsButton";

const TextContent = () => {
  const { currentUser } = useAuth();

  return (
    <div className="flex flex-col w-[45%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col items-start self-stretch my-auto max-md:mt-10 max-md:max-w-full">
        <h1 className="text-4xl font-black uppercase text-slate-500 max-md:max-w-full">
          UPLOAD OXBRIDGE & JARDINE PERSONAL STATEMENTS
        </h1>
        <p className="self-stretch mt-8 text-base font-medium leading-6 text-black max-md:max-w-full">
          Welcome to our AI-powered personal statement platform, designed specifically to provide tailored feedback for
          Oxbridge and Jardine personal statements. Don't miss out on this opportunity to refine your application with
          expert guidance. Click the button below to start enhancing your personal statement today!
        </p>

        {currentUser ? (
          <div className="flex flex-row mt-4 space-x-4">
            <GoToUploadButton />
            <GoToSubmissionsButton />
          </div>
        ) : (
          <>
            <p className="mt-4 text-base text-red-600 mb-5">
              Please log in or sign up before uploading your personal statement or viewing your past submissions.
            </p>

            <AuthButtons />
          </>
        )}
      </div>
    </div>
  );
};

export default TextContent;
