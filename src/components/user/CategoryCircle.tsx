import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMusic,
  FaRunning,
  FaCalendarAlt,
  FaLaptopCode,
  FaTshirt,
  FaGamepad,
  FaGlassCheers,
  FaPalette,
  FaAtom,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface CategoryData {
  icon: React.ReactNode;
  color: string;
}
export const categoryMap: Record<string, CategoryData> = {
  Music: {
    icon: <FaMusic size={24} />,
    color: "bg-purple-500",
  },
  Sports: {
    icon: <FaRunning size={24} />,
    color: "bg-blue-500",
  },
  Festivals: {
    icon: <FaCalendarAlt size={24} />,
    color: "bg-yellow-500",
  },
  Technology: {
    icon: <FaLaptopCode size={24} />,
    color: "bg-indigo-500",
  },
  Fashion: {
    icon: <FaTshirt size={24} />,
    color: "bg-pink-500",
  },
  Gaming: {
    icon: <FaGamepad size={24} />,
    color: "bg-green-500",
  },
  Nightlife: {
    icon: <FaGlassCheers size={24} />,
    color: "bg-red-500",
  },
  Arts: {
    icon: <FaPalette size={24} />,
    color: "bg-orange-500",
  },
  Science: {
    icon: <FaAtom size={24} />,
    color: "bg-teal-500",
  },
};

interface CategoryProps {
  cat: string;
}

const CategoryCircle = ({ cat }: CategoryProps) => {
  const { t } = useTranslation();
  const categoryData = categoryMap[cat] || {
    icon: null,
    color: "bg-gray-400",
  };
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/category/${cat}`);
      }}
      className=" flex flex-col items-center mx-4 cursor-pointer group"
    >
      <div
        className={`
        w-25 h-25 
        rounded-full 
        ${categoryData.color}
        flex 
        items-center 
        justify-center
        text-white
        transition-all
        duration-300
        group-hover:scale-110
        group-hover:shadow-md
        group-hover:rotate-360


        border-2
        border-transparent
        group-hover:border-blue-500
      `}
      >
        {categoryData.icon}
      </div>
      <span className="mt-2 text-sm font-medium">
        {t(`Categories.${cat.toLowerCase()}`)}
      </span>
    </div>
  );
};

export default CategoryCircle;
