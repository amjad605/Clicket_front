import hero from "../../assets/hero.jpg";
import SignupForm from "../../components/user/SignupForm";

const Signup = () => {
  return (
    <div className="flex flex-col h-screen md:flex-row">
      <div
        className="hidden lg:flex  flex-col w-full md:w-1/2 items-start justify-center px-6 md:px-10 bg-cover bg-center text-white animate-gentle-float"
        style={{
          backgroundImage: `url(${hero})`,
          height: "auto",
          backgroundSize: "fill",
        }}
      ></div>
      {/* Right side */}
      <div className="flex flex-col w-full lg:w-1/2">
        <SignupForm />
      </div>
      {/* Left side */}
    </div>
  );
};

export default Signup;
