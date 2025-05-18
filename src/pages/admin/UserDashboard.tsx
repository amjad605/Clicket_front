import UsersList from "../../components/admin/UsersList";
const UsersDashboard = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">User Management</h2>
      </div>
      <UsersList />
    </div>
  );
};
export default UsersDashboard;
