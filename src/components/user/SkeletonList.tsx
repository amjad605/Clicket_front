import EventCardSkeleton from "./EventCardSkeleton";

const SkeletonList = () => {
  return (
    <div className="flex w-full flex-col space-y-10 items-center md:flex-row md:justify-center md:space-x-10 my-10 dark:bg-gray-900 ">
      {[...Array(3)].map((_, idx) => (
        <EventCardSkeleton key={idx} />
      ))}
    </div>
  );
};

export default SkeletonList;
