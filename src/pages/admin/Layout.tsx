import { useState } from "react";
import EventsDashboard from "./EventsDashboard";
import Sidebar from "../../components/admin/SideBar";
import UsersDashboard from "./UserDashboard";

const Layout = () => {
  const [activeTab, setActiveTab] = useState("events");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - using the component we created earlier */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800 capitalize">
              {activeTab}
            </h1>
            <div className="flex items-center space-x-4"></div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === "events" && <EventsDashboard />}
          {activeTab === "users" && <UsersDashboard />}
        </main>
      </div>
    </div>
  );
};

export default Layout;
