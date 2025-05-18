import EventsList from "../../components/user/EventsList";
import Categories from "../../components/user/Categories";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/user/Footer";
import { UseAuth } from "../../context/authContext";
import { useTranslation } from "react-i18next";

const Landing = () => {
  const { isAdmin } = UseAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (isAdmin) {
      navigate("/admin/dashboard");
    }
  }, [isAdmin, navigate]);

  const location = useLocation();
  const middleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollTo = location.state?.scrollTo;
    if (scrollTo === "middle") {
      setTimeout(() => {
        middleRef.current?.scrollIntoView({ behavior: "smooth" });
        navigate(location.pathname, { replace: true });
      }, 100);
    }
  }, [location, navigate]);

  return (
    <div className="flex flex-col h-screen items-center bg-white dark:bg-gray-900 transition-colors duration-300">
      <motion.div
        initial={{
          opacity: 0,
          x: i18n.language === "ar" ? 100 : -100,
        }}
        animate={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.5 }}
      >
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-[rgb(11,53,88)] dark:text-white text-center mt-10 md:mt-16 lg:mt-20">
          {t("main_heading_line1")}
          <br className="hidden sm:block" />
          {t("main_heading_line2")}
        </h1>
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
          x: i18n.language === "ar" ? 100 : -100,
        }}
        animate={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      >
        <p className="text-sm text-gray-500 dark:text-gray-300 text-center mt-10 px-4 md:px-20 lg:px-80 lg:text-xxl md:text-lg">
          {t("event_description_line1")}
          <br />
          {t("event_description_line2")}
        </p>
      </motion.div>

      <Categories />

      <div className="flex flex-col  w-full items-center justify-center  lg:flex-row lg:items-start md:items-start  dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1 }}
        >
          <p
            ref={middleRef}
            className="
    text-3xl md:text-4xl lg:text-5xl text-[rgb(11,53,88)] dark:text-white font-bold dark:bg-gray-900  md:w-screen md:ms-[6%] md:justify-center
  "
          >
            {t("explore_events")}
          </p>
        </motion.div>
      </div>

      <EventsList />
      <Footer />
    </div>
  );
};

export default Landing;
