import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex">
      <img
        loading="lazy"
        src="/assets/logo-no-background.png"
        alt="Company Logo"
        className="object-contain shrink-0 self-stretch my-auto max-w-full aspect-[5] w-[200px] h-auto"
      />
    </Link>
  );
};

export default Logo;
