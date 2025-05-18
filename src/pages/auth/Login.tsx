import React from "react";

import hero from "../../assets/hero.jpg";
import LoginForm from "../../components/user/LoginForm";
const Login: React.FC = () => {
  return (
    <div className="flex flex-col h-screen md:flex-row">
      {/* Right side */}
      <div className="flex flex-col w-full lg:w-1/2">
        <LoginForm />
      </div>
      {/* Left side */}

      <div
        className="hidden lg:flex  flex-col w-full md:w-1/2 items-start justify-center px-6 md:px-10 bg-cover bg-center text-white animate-gentle-float"
        style={{
          backgroundImage: `url(${hero})`,
          height: "auto",
          backgroundSize: "fill",
        }}
      ></div>
    </div>
  );
};

export default Login;
