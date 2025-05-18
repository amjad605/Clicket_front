import React from "react";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../../context/authContext";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const SignupForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const { login } = UseAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://clicket.up.railway.app/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstName, lastName, email, password }),
        }
      );

      const data = await response.json();
      setIsLoading(false);

      if (response.ok) {
        toast.success(t("register_success"));
        login(data.user);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/login", { replace: true });
      } else {
        toast.error(data.message || t("register_failed"));
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.error(t("network_error"));
    }
  };

  return (
    <form
      id="Signup"
      onSubmit={handleSubmit}
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <div
        className={`flex flex-col items-center justify-center h-screen gap-5 ${
          i18n.language === "ar" ? "text-right" : "text-left"
        }`}
      >
        <p className="text-4xl font-bold text-blue-900 mb-4">
          {t("register_title")}
        </p>

        <div className="flex flex-col items-center justify-center w-full gap-2">
          <input
            type="text"
            placeholder={t("first_name_placeholder")}
            className="mb-4 p-4 rounded-2xl bg-gray-200 w-3/4 md:w-1/2 mt-4"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder={t("last_name_placeholder")}
            className="mb-4 p-4 rounded-2xl bg-gray-200 w-3/4 md:w-1/2"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder={t("email_placeholder")}
            className="mb-4 p-4 rounded-2xl bg-gray-200 w-3/4 md:w-1/2"
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
            {t("signup_button")}
          </button>
        ) : (
          <button
            type="submit"
            className="bg-gradient-to-br from-blue-700 to-cyan-500 text-white p-2 rounded-2xl px-8 mt-4 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 opacity-50 cursor-not-allowed"
            disabled
          >
            {t("signing_up")}
          </button>
        )}

        <p className="font-bold text-gray-700 mb-4 md:text-lg text-lg">
          {t("have_account")}{" "}
          <a href="/login" className="text-blue-500">
            {t("login_link")}
          </a>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;
