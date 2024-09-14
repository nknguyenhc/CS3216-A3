import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-blue-custom">
        <Outlet/>
      </div>
    </div>
  );
};

export default MainLayout;
