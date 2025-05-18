import { useEffect, useState, useCallback } from "react";
import type { EventType } from "../components/user/EventCard";

const useEvents = (category: string, page: number = 1, limit: number = 6) => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      let ENDPOINT = `https://clicket.up.railway.app/events?page=${page}&limit=${limit}`;

      if (category !== "null") {
        ENDPOINT = `https://clicket.up.railway.app/events/category/${category}?page=${page}&limit=${limit}`;
      }

      const response = await fetch(ENDPOINT);
      const data = await response.json();

      setEvents(data.events);
      setTotalPages(data.totalPages || 1);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [category, page, limit]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events, loading, error, totalPages, refetch: fetchEvents };
};

export default useEvents;
