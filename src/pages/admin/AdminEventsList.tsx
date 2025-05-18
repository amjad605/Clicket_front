import { useState } from "react";
import useEvents from "../../hooks/useEvents";
import EventAdminCard from "../../components/admin/EventAdminCard";
import NoData from "../../components/user/NoEvents";
import AdminEventCardSkeletonList from "../../components/admin/AdminSkeletonList";

const AdminEventsList = () => {
  const [page, setPage] = useState(1);
  const { events, totalPages, loading, error } = useEvents("null", page);

  if (loading) return <AdminEventCardSkeletonList />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {events.length > 0 ? (
        <div>
          {events.map((event) => (
            <EventAdminCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen lg:w-3/4 mx-auto mt-10">
          <NoData />
        </div>
      )}

      <div className="flex justify-center gap-4 mt-10">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className={`py-3 px-6 rounded-3xl text-white ${
            page === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Prev
        </button>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className={`py-3 px-6 rounded-3xl text-white ${
            page === totalPages
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default AdminEventsList;
