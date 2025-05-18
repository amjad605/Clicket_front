import logo from "../../assets/white_logo.png";

const Sidebar = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4 border-b border-gray-700 flex items-center justify-center">
        <img src={logo} alt="Logo" className="h-15" />
        <p className="text-xl font-bold ">Clicket</p>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setActiveTab("events")}
              className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
                activeTab === "events" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Events
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
                activeTab === "users" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              Users
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
