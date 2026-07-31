"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays } from "lucide-react";

interface EventType {
  _id: string;
  title: string;
  date: string;
  location: string;
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();

        if (data.success) {
          setEvents(data.events.slice(0, 4));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Upcoming Events
        </h2>

        <Link
          href="/events"
          className="text-indigo-600 hover:underline"
        >
          View All
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : events.length === 0 ? (
        <p className="text-slate-500">
          No events found.
        </p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event._id}
              className="flex items-start gap-4 rounded-xl border p-4 hover:bg-slate-50"
            >
              <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                <CalendarDays size={22} />
              </div>

              <div>
                <h3 className="font-semibold">
                  {event.title}
                </h3>

                <p className="text-sm text-slate-500">
                  {new Date(event.date).toLocaleDateString()}
                </p>

                <p className="text-sm text-slate-500">
                  📍 {event.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}