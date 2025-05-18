import React from "react";
interface category {
  category: string;
}
const CategoryTag = ({ category }: category) => {
  return (
    <div className="flex gap-2 mb-3">
      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800  text-sm font-semibold">
        {category}
      </span>
    </div>
  );
};

export default CategoryTag;
