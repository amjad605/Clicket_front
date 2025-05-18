import CategoryCircle from "./CategoryCircle";
function Categories() {
  const eventCategories: Array<string> = [
    "Music",
    "Sports",
    "Festivals",
    "Technology",
    "Fashion",
    "Gaming",
    "Nightlife",
    "Arts",
    "Science",
  ];
  return (
    <div className="my-15 w-full">
      <div className="flex flex-row items-center overflow-x-auto py-10 scrollbar-hide px-4 gap-4 md:justify-center">
        {eventCategories.map((cat, index) => (
          <CategoryCircle cat={cat} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Categories;
