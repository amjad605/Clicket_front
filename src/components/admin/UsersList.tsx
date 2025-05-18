import { useEffect, useState } from "react";
import UserCard, { type UserType } from "./UserCard";

const UsersList = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // ثابت حاليًا
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://clicket.up.railway.app/users?page=${page}&limit=${limit}`,
          {
            method: "GET",

            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data.docs || data.users || []);
        setTotalPages(data.totalPages || 1);
        setError(null); // clear error on success
      } catch (error) {
        setError(error instanceof Error ? error : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, limit]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center">{error.message}</div>;
  if (!users.length) return <div className="text-center">No users found.</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <UserCard user={user} key={user._id} />
        ))}
      </div>

      {/* Pagination Controls (اختياري لو عايز تضيفه) */}
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
    </div>
  );
};

export default UsersList;
