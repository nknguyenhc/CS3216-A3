import Logo from "./Logo";
import Navigation from "./Navigations";
import AuthButtons from "./AuthButtons";

const Navbar = () => {
  return (
    <header className="flex overflow-hidden flex-col justify-center items-center px-16 py-6 text-base bg-white max-md:px-5">
      <div className="flex gap-5 justify-between items-center w-full max-w-[1208px] max-md:max-w-full">
        <Logo />
        <Navigation />
        <AuthButtons />
      </div>
    </header>
  );
};

export default Navbar;
