import React from "react";
import { useAuth } from "../../context/authContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://clicket.up.railway.app/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      setIsLoading(false);

      if (response.ok) {
        toast.success(t("login_success"));
        login(data.user);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate(data.user.isAdmin ? "/admin/dashboard" : "/landing", {
          replace: true,
        });
      } else {
        toast.error(data.message || t("login_failed"));
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.error(t("network_error"));
    }
  };

  return (
    <form
      id="Login"
      onSubmit={handleSubmit}
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <div
        className={`flex flex-col items-center justify-center h-screen gap-5 ${
          i18n.language === "ar" ? "text-right" : "text-left"
        }`}
      >
        <p className="text-4xl font-bold text-blue-900 mb-4">
          {t("login_title")}
        </p>

        <div className="flex flex-col items-center justify-center w-full gap-2">
          <input
            type="email"
            placeholder={t("email_placeholder")}
            className="mb-4 p-4 rounded-2xl bg-gray-200 w-3/4 md:w-1/2 mt-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder={t("password_placeholder")}
            className="mb-4 p-4 rounded-2xl bg-gray-200 w-3/4 md:w-1/2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {!isLoading ? (
          <button
            type="submit"
            className="bg-gradient-to-br from-blue-700 to-cyan-500 text-white p-2 rounded-2xl px-8 mt-4 w-1/2 sm:w-1/4 md:w-1/4 lg:w-1/3"
          >
            {t("login_button")}
          </button>
        ) : (
          <button
            type="submit"
            className="bg-gradient-to-br from-blue-700 to-cyan-500 text-white p-2 rounded-2xl px-8 mt-4 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 opacity-50 cursor-not-allowed"
            disabled
          >
            {t("logging_in")}
          </button>
        )}

        <p className="font-bold text-gray-700 mb-4 md:text-lg text-lg">
          {t("no_account")}{" "}
          <a href="/register" className="text-blue-500">
            {t("register_link")}
          </a>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
