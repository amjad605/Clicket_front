import { useEffect, useState, useRef } from "react";
import {
  FaUser,
  FaSignOutAlt,
  FaMoon,
  FaSun,
  FaEllipsisV,
  FaLanguage,
  FaTimes,
} from "react-icons/fa";
import { useNavigate, NavLink } from "react-router-dom";
import { UseAuth } from "../../context/authContext";
import logo from "../../assets/logo.png";
import darkLogo from "../../assets/white_logo.png";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";

const eventCategories: string[] = [
  "Music",
  "Sports",
  "Festivals",
  "Technology",
  "Fashion",
  "Gaming",
  "Nightlife",
  "Arts",
  "Science",
];

const NavBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, isAdmin, logout } = UseAuth();
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const savedLang = localStorage.getItem("i18nextLng") || "en";
    document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = savedLang;
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/landing");
  };
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('button[aria-label="Menu"]')
      ) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleLanguageChange = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
  };

  const goToMiddle = () => {
    navigate("/landing", { state: { scrollTo: "middle" } });
    setIsMenuOpen(false);
  };

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-blue-600 font-bold text-xl"
      : "text-[rgb(11,53,88)] dark:text-white hover:text-blue-500 transition font-bold text-xl";

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-blue-600 border-b-2 border-blue-600 pb-1 font-bold scale-115"
      : `text-[rgb(11,53,88)] dark:text-white hover:text-blue-500 transition font-bold pb-1 ${
          i18n.language === "ar" ? "text-right" : "text-left"
        }`;

  return (
    <nav
      ref={topRef}
      className="flex items-center justify-between w-full p-4 px-4 md:px-20 lg:px-30 shadow-[0_3px_7px_-6px_rgba(0,0,10,0.2)] relative dark:bg-gray-950 dark:text-white"
    >
      <div
        onClick={() => navigate("/landing")}
        className="w-20 md:w-32 flex-shrink-0 flex items-center cursor-pointer"
      >
        <img
          src={theme === "dark" ? darkLogo : logo}
          alt="logo"
          style={{
            width: "40%",
            height: "40%",
            margin: "0px",
            padding: "0px",
          }}
        />
        <p className="text-xl dark:text-white font-bold text-[rgb(11,53,88)]">
          Clicket
        </p>
      </div>

      <button
        className="lg:hidden p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-6 lg:space-x-10">
          <NavLink to="/landing" className={linkClass}>
            {t("home")}
          </NavLink>

          <span onClick={goToMiddle} className="cursor-pointer">
            <span className="text-[rgb(11,53,88)] dark:text-white hover:text-blue-500 transition font-bold">
              {t("events")}
            </span>
          </span>

          <div
            className="relative"
            onMouseEnter={() => setIsCategoriesOpen(true)}
            onMouseLeave={() => {
              setTimeout(() => {
                setIsCategoriesOpen(false);
              }, 200);
            }}
          >
            <button className="hover:text-blue-500 transition focus:outline-none text-[rgb(11,53,88)] dark:text-white font-bold">
              {t("categories")}
            </button>
            {isCategoriesOpen && (
              <div
                className={`absolute top-full ${
                  i18n.language === "ar" ? "right-0" : "left-0"
                } p-3 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg z-300 border border-gray-200 dark:border-gray-900`}
              >
                {eventCategories.map((category) => (
                  <NavLink
                    key={category}
                    to={`/category/${category}`}
                    className="block px-4 py-2 dark:text-white hover:text-blue-500 hover:scale-105 text-gray-800"
                  >
                    {t(`Categories.${category.toLowerCase()}`)}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {isAdmin && (
            <NavLink to="/dashboard" className={linkClass}>
              {t("manage_events")}
            </NavLink>
          )}
        </div>
      </div>

      {isAuthenticated ? (
        <div className="hidden lg:flex items-center space-x-4 ms-auto ltr:space-x-reverse">
          <div className="flex items-center m-3 p-2 rounded-full bg-gray-300">
            <FaUser size={18} color="rgb(11,53,88)" />
          </div>

          <p className="text-[rgb(11,53,88)] dark:text-white">
            {t("welcome", { name: user?.firstName })}
          </p>
          <div className="relative ml-10" ref={menuRef}>
            <button
              className="p-2 rounded-xl dark:hover:bg-gray-700 hover:bg-gray-200"
              onClick={() => setOpen(!open)}
            >
              <FaEllipsisV size={20} />
            </button>

            {open && (
              <div
                className={`absolute ${
                  i18n.language === "ar" ? "left-0" : "right-0"
                } mt-2 w-48 dark:bg-gray-800 bg-white rounded shadow-md z-50`}
              >
                <button
                  onClick={handleLanguageChange}
                  className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaLanguage />
                  <span>{i18n.language === "en" ? "العربية" : "English"}</span>
                </button>

                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {theme === "light" ? <FaMoon /> : <FaSun />}
                  <span>
                    {theme === "light" ? t("dark_mode") : t("light_mode")}
                  </span>
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
                >
                  <FaSignOutAlt />
                  <span>{t("logout")}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="hidden lg:flex items-center space-x-4 ms-auto  rtl:space-x-reverse">
          <NavLink to="/login" className="hover:text-blue-500 transition">
            {t("login")}
          </NavLink>
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-500 rounded-2xl px-4 py-1.5 text-white hover:bg-blue-600 transition whitespace-nowrap"
          >
            {t("get_started")}
          </button>
        </div>
      )}

      {/* Mobile menu - you should implement this similarly */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed inset-0 bg-white dark:bg-gray-950 z-50 flex flex-col items-center justify-center p-4 transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full pointer-events-none"
        }`}
      >
        <button
          className="absolute top-4 right-4 p-2"
          onClick={() => setIsMenuOpen(false)}
        >
          <FaTimes size={24} className="dark:text-white" />
        </button>

        <div className="flex flex-col items-center space-y-8 w-full">
          <NavLink
            to="/landing"
            className={mobileLinkClass}
            onClick={() => setIsMenuOpen(false)}
          >
            {t("home")}
          </NavLink>

          <button
            onClick={goToMiddle}
            className="text-[rgb(11,53,88)] dark:text-white hover:text-blue-500 transition font-bold text-xl"
          >
            {t("events")}
          </button>

          <div className="relative w-full text-center">
            <button
              className="text-[rgb(11,53,88)] dark:text-white hover:text-blue-500 transition font-bold text-xl"
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            >
              {t("categories")}
            </button>
            {isCategoriesOpen && (
              <div className="mt-4 space-y-4">
                {eventCategories.map((category) => (
                  <NavLink
                    key={category}
                    to={`/category/${category}`}
                    className="block px-4 py-2 dark:text-white hover:text-blue-500 text-gray-800 dark:text-gray-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(`Categories.${category.toLowerCase()}`)}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {isAdmin && (
            <NavLink
              to="/dashboard"
              className={mobileLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("manage_events")}
            </NavLink>
          )}

          {isAuthenticated ? (
            <div className="flex flex-col items-center space-y-6 mt-4 w-full">
              <div className="flex items-center space-x-2">
                <div className="flex items-center m-3 p-2 rounded-full bg-gray-300">
                  <FaUser size={18} color="rgb(11,53,88)" />
                </div>
                <p className="text-[rgb(11,53,88)] dark:text-white">
                  {t("welcome", { name: user?.firstName })}
                </p>
              </div>

              <div className="flex flex-col space-y-4 w-full max-w-xs">
                <button
                  onClick={handleLanguageChange}
                  className="flex items-center justify-center gap-2 px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                >
                  <FaLanguage />
                  <span>{i18n.language === "en" ? "العربية" : "English"}</span>
                </button>

                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center gap-2 px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                >
                  {theme === "light" ? <FaMoon /> : <FaSun />}
                  <span>
                    {theme === "light" ? t("dark_mode") : t("light_mode")}
                  </span>
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-red-500"
                >
                  <FaSignOutAlt />
                  <span>{t("logout")}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-4 w-full max-w-xs mt-4">
              <NavLink
                to="/login"
                className="text-center py-2 hover:text-blue-500 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("login")}
              </NavLink>
              <button
                onClick={() => {
                  navigate("/register");
                  setIsMenuOpen(false);
                }}
                className="bg-blue-500 rounded-2xl px-4 py-2 text-white hover:bg-blue-600 transition"
              >
                {t("get_started")}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
