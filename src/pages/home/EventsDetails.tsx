import React, { useState, useEffect } from "react";
import { useBooking } from "../../hooks/useBooking";
import Lottie from "lottie-react";
import successAnimation from "../../assets/success.json";
import { useParams, useNavigate } from "react-router-dom";
import type { EventType } from "../../components/user/EventCard";
import { UseAuth } from "../../context/authContext";
import congrat from "../../assets/congrat.json";
const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { bookEvent, isBookedLoading, showSuccess } = useBooking();

  useEffect(() => {
    if (!id) {
      setError("No event ID provided");
      setLoading(false);
      navigate("/events"); // Redirect if no ID
      return;
    }

    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://clicket.up.railway.app/events/id/${id}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch event: ${response.status}`);
        }

        const data = await response.json();
        if (!data) {
          throw new Error("Event data is empty");
        }

        setEvent(data.event);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "Failed to load event");
        navigate("/events", { state: { error: "Event not found" } });
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, navigate]);

  const handleBooking = async () => {
    if (!event || !event._id) {
      setError("Cannot book - event data missing");
      return;
    }

    try {
      const success = await bookEvent(event._id);
      if (success) {
        setIsBooked(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Booking failed");
    }
  };
  const { user, isAuthenticated } = UseAuth();
  const [isBooked, setIsBooked] = React.useState(
    user?.bookedEvents.includes(id!) || false
  );
  if (showSuccess) {
    return (
      <div className="fixed inset-0  dark:bg-gray-900 bg-white bg-opacity-20 flex items-center justify-center z-50">
        <div className="bg-white  dark:bg-gray-900  p-8 rounded-lg max-w-md text-center flex flex-col items-center justify-center">
          <Lottie
            animationData={successAnimation}
            loop={false}
            className="w-[70%]"
          />
          <div className="w-[80%] p-0 m-auto">
            <Lottie animationData={congrat} loop={false} />
          </div>
          <p className="mb-2">You've successfully booked "{event?.name}"</p>
          <p className="text-gray-500">Returning to events in a moment...</p>
        </div>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading event details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
          <p className="text-red-500 font-medium">Error: {error}</p>
          <button
            onClick={() => navigate("/events")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>No event found.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <section className="flex justify-center py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl gap-6 px-4">
          {/* Event Image */}
          <div className="relative aspect-square md:aspect-1 rounded-xl overflow-hidden shadow-lg">
            <img
              src={
                event.image ||
                "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"
              }
              alt={event.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/500";
              }}
            />
          </div>

          {/* Event Details */}
          <div className="flex flex-col gap-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {event.name}
            </h1>

            <div className="flex flex-wrap gap-3 items-center">
              <span className="px-4 py-2 rounded-full bg-green-100 text-green-800  font-semibold">
                ${event.price}
              </span>
              <span className="px-4 py-2 rounded-full bg-gray-100 text-gray-800  font-medium">
                {event.category}
              </span>
            </div>
            {isAuthenticated ? (
              <button
                className={`w-full py-3 px-6 ${
                  isBooked
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : isBookedLoading
                    ? "bg-blue-400 text-white cursor-wait"
                    : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                } text-white font-medium rounded-lg transition-colors disabled:opacity-50`}
                onClick={handleBooking}
                disabled={isBooked || isBookedLoading}
              >
                {isBookedLoading
                  ? "Booking..."
                  : isBooked
                  ? "Booked"
                  : "Book Now"}
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
              >
                Login to Book
              </button>
            )}

            {/* Date & Time */}
            <div className="flex items-start gap-4 pt-4 border-t border-gray-200">
              <img
                src="https://cdn-icons-png.flaticon.com/512/747/747310.png"
                alt="Calendar"
                className="w-6 h-6  dark:text-white dark:invert"
              />
              <div>
                <p className="text-gray-700 font-medium  dark:text-white">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/484/484167.png"
                alt="Location"
                className="w-6 h-6  dark:text-white dark:invert"
              />
              <p className="text-gray-700  dark:text-white font-medium">
                {event.venue}
              </p>
            </div>

            {/* Description */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-xl font-semibold  dark:text-white  text-gray-800 mb-2">
                Event Description:
              </h3>
              <p className="text-gray-600  dark:text-white">
                {event.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventDetails;
