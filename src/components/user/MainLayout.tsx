import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <div className="content h-full m-auto p-auto">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
