import "./index.css";
import { Toaster } from "react-hot-toast";

import { AdminRoute } from "./routes/adminRoutes";

import { UseAuth } from "./context/authContext";
import { UserRoute } from "./routes/userRoutes";
import "./il8n";

function App() {
  const { isAdmin } = UseAuth();
  return (
    <div className="  dark:bg-gray-900 dark:text-white">
      {isAdmin ? <AdminRoute /> : <UserRoute />}

      <Toaster />
    </div>
  );
}

export default App;
