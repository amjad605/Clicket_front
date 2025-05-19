import { useState } from "react";
import EventCard from "./EventCard";
import { useParams } from "react-router-dom";
import NoData from "./NoEvents";
import useEvents from "../../hooks/useEvents";
import SkeletonList from "./SkeletonList";
import { useTranslation } from "react-i18next";

const EventsLists = () => {
  const { name } = useParams();
  const category = name || "null";
  const [page, setPage] = useState(1);
  const { t, i18n } = useTranslation();

  const { events, totalPages, loading, error } = useEvents(category, page);

  if (!loading)
    return (
      <div className=" w-screen flex items-center dark:bg-gray-900">
        {" "}
        <SkeletonList />
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center">{error.message}</div>;

  return (
    <div className="flex flex-col items-center  w-full  justify-center mx-auto px-[8%] bg-white dark:bg-gray-900">
      {category !== "null" && (
        <h1 className="text-[rgb(11,53,88)] dark:text-white text-4xl lg:text-6xl font-bold text-center mt-10 capitalize">
          {category}
        </h1>
      )}

      {events.length > 0 ? (
        <>
          <div className="grid   bg-white dark:bg-gray-900  items-center  justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
          <div
            className={`flex justify-center gap-4 mt-10 mb-20 ${
              i18n.language === "ar" ? "flex-row-reverse" : ""
            }`}
          >
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="py-2 px-6 bg-gray-300 rounded-xl disabled:opacity-50"
            >
              {t("prev")}
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="py-2 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
            >
              {page < totalPages ? t("load_more") : t("no_more_pages")}
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center min-h-[40vh]">
          <NoData />
        </div>
      )}
    </div>
  );
};

export default EventsLists;
