import { useState } from "react";
import toast from "react-hot-toast";

export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;

  isAdmin: boolean;
  bookedEvents: string[];
};
const UserCard = ({ user }: { user: UserType }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);
  const [isAdminLoading, setIsAdminLoading] = useState(false);
  const deleteUser = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(
        `https://clicket.up.railway.app/users/${user._id}`,
        {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        setDeleted(true);
        toast.success("User deleted successfully");
      }
      setIsDeleting(false);
    } catch (e) {
      console.log(e);
      toast.error(" Failed to delete user");
      setIsDeleting(false);
    }
  };
  const makeAdmin = async () => {
    setIsAdminLoading(true);
    try {
      const response = await fetch(
        `https://clicket.up.railway.app/users/${user._id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ isAdmin: true }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        user = data.user;
        setIsAdmin(true);
        toast.success("User made admin successfully");
      }

      setIsAdminLoading(false);
    } catch (e) {
      console.log(e);
      toast.error("Failed to make user admin");
      setIsAdminLoading(false);
    } finally {
      setIsAdminLoading(false);
    }
  };
  if (deleted) {
    return;
  }
  return (
    <div key={user._id} className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center">
          <div>
            <h3 className="font-medium text-gray-900">{user.firstName}</h3>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              isAdmin
                ? "bg-purple-100 text-purple-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {isAdmin ? "Admin" : "User"}
          </span>
          <div className="space-x-2">
            {!isAdmin && (
              <button
                onClick={makeAdmin}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-medium transition-colors"
              >
                {isAdminLoading ? "Loading" : "Make Admin"}
              </button>
            )}
            <button
              onClick={deleteUser}
              className={` px-3 py-1 hover:bg-red-200 text-red-800 rounded-lg text-sm font-medium transition-colors ${"bg-red-200"}`}
            >
              {isDeleting ? "Deleting" : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
