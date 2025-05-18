import EventCardSkeleton from "./EventCardSkeleton";

const SkeletonList = () => {
  return (
    <div className="grid h-full w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10 dark:bg-gray-900 ">
      {[...Array(3)].map((_, idx) => (
        <EventCardSkeleton key={idx} />
      ))}
    </div>
  );
};

export default SkeletonList;
