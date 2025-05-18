import Lottie from "lottie-react";
import noData from "../../assets/no_data.json";

const NoData = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-start items-center text-top">
      <Lottie
        animationData={noData}
        style={{
          height: "30%",
        }}
      />
      <h1 className="text-4xl text-[rgb(11,53,88)] dark:text-white font-bold">
        No Events Today.
      </h1>
      <p className="text-xl text-gray-500 dark:text-gray-100 mt-2">
        Check again later
      </p>
    </div>
  );
};

export default NoData;
