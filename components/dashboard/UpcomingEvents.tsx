"use client";

import { useEffect, useState } from "react";

interface Event {
  _id: string;
  title: string;
  location: string;
  date: string;
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();

        setEvents(data);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    }

    fetchEvents();
  }, []);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          Upcoming Events
        </h2>

        <span className="text-sm text-indigo-600 font-semibold">
          Live
        </span>

      </div>

      {loading ? (
        <p>Loading...</p>
      ) : events.length === 0 ? (
        <p>No Events Found</p>
      ) : (
        <div className="space-y-4">

          {events.map((event) => (

            <div
              key={event._id}
              className="rounded-2xl border p-4 hover:bg-indigo-50 transition"
            >
              <h3 className="font-bold text-lg">
                {event.title}
              </h3>

              <p className="text-gray-500">
                📍 {event.location}
              </p>

              <p className="text-sm text-gray-400">
                📅 {event.date}
              </p>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}