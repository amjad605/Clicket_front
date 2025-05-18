import AdminEventCardSkeleton from "./AdminSkeleton";

const AdminEventCardSkeletonList = () => {
  return (
    <div>
      {Array.from({ length: 4 }).map((_, idx) => (
        <AdminEventCardSkeleton key={idx} />
      ))}
    </div>
  );
};

export default AdminEventCardSkeletonList;
