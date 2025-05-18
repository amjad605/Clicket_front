import React from "react";
import { useAuth } from "../../context/authContext";
import CategoryTag from "./CategoryTag";
import { useNavigate } from "react-router-dom";
import success from "../../assets/success.json";
import Lottie from "lottie-react";
import { useBooking } from "../../hooks/useBooking";
import congrat from "../../assets/congrat.json";
import PriceTag from "./PriceTag";
import { useTranslation } from "react-i18next";

export type EventType = {
  _id: string;
  name: string;
  description: string;
  category: string;
  date: string;

  venue: string;
  price: number;
  isFree: boolean;
  image: string;
};

interface Props {
  event: EventType;
}

export const EventCard = ({ event }: Props) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const [isBooked, setIsBooked] = React.useState(
    user?.bookedEvents.includes(event._id) || false
  );

  const { bookEvent, isBookedLoading, showSuccess } = useBooking();
  const handleBookEvent = async () => {
    const success = await bookEvent(event._id);
    if (success) {
      setIsBooked(true);
    }
  };
  const handleClick = () => {
    navigate(`/events/${event._id}`);
  };
  if (showSuccess) {
    // return (
    //   <div className="fixed inset-0 bg-white bg-opacity-20 flex items-center justify-center z-50">
    //     <div className="bg-white p-8 rounded-lg max-w-md text-center flex flex-col items-center justify-center">
    //       <div className="w-1/2 h-1/2">
    //         <Lottie animationData={success} loop={false} />
    //       </div>
    //       <div className="w-3/4 h-3/4 ">
    //         <Lottie animationData={congrat} loop={false} />
    //       </div>
    //       <p className="mb-4">You've successfully booked "{event.name}"</p>
    //       <p className="text-gray-500">Returning to events in a moment...</p>
    //     </div>
    //   </div>
    // );
    return (
      <div className="bg-white dark:bg-gray-900 bg-opacity-20 flex items-center justify-center">
        <div className="bg-white  dark:bg-gray-900 p-8 rounded-lg max-w-md text-center flex flex-col items-center justify-center">
          <div className="w-1/2 h-1/2">
            <Lottie animationData={success} loop={false} />
          </div>
          <div className="w-3/4 h-3/4 ">
            <Lottie animationData={congrat} loop={false} />
          </div>
          <p className="mb-4">You've successfully booked "{event.name}"</p>
          <p className="text-gray-500">Returning to events in a moment...</p>
        </div>
      </div>
    );
  }
  return (
    <div
      className="max-w-sm   dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm bg-white transition-all hover:scale-105
        hover:shadow-xl hover:-translate-y-1 cursor-pointer"
    >
      <div onClick={handleClick} className="h-48 bg-gray-200 overflow-hidden">
        <img
          src={
            event.image ||
            "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"
          }
          alt={event.name}
          className="w-full h-full object-cover overflow-ellipsis dark:text-white"
        />
      </div>

      <div className="p-6">
        <div className=" flex flex-row items-start">
          <PriceTag price={event.price} />
          <CategoryTag category={event.category} />
        </div>

        <h3 className="text-xl   dark:text-white font-bold mb-2 line-clamp-1">
          {event.name}
        </h3>
        <p className="text-gray-600  dark:text-white mb-4 line-clamp-2  min-h-[3rem]">
          {event.description}
        </p>

        <div className="flex items-center text-gray-500 mb-4">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-sm  dark:text-white">{event.venue}</span>
        </div>

        {isAuthenticated ? (
          <button
            onClick={handleBookEvent}
            disabled={isBooked || isBookedLoading}
            className={`
           w-full py-2 px-4 rounded-lg transition-colors
           ${
             isBooked
               ? "bg-gray-400 text-white cursor-not-allowed"
               : isBookedLoading
               ? "bg-blue-400 text-white cursor-wait"
               : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
           }
         `}
          >
            {isBookedLoading
              ? t("booking_loading")
              : isBooked
              ? t("booked")
              : t("book_now")}
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            Login to Book
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
