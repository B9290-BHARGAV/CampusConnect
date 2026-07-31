"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  MapPin,
  ArrowRight,
  LoaderCircle,
} from "lucide-react";

interface Event {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  time: string;
  organizer: string;
  image?: string;
  capacity: number;
  status: string;
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");

        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await res.json();

        setEvents(data.events || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Upcoming Events
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Stay connected with campus activities
          </p>
        </div>

        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          LIVE
        </span>
      </div>

      {/* Loading */}

      {loading ? (
        <div className="flex justify-center py-10">
          <LoaderCircle className="h-8 w-8 animate-spin text-indigo-600" />
        </div>
      ) : events.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 py-12 text-center">
          <CalendarDays className="mx-auto h-12 w-12 text-slate-300" />

          <h3 className="mt-4 text-lg font-semibold text-slate-700">
            No Upcoming Events
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Check back later for new events.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {events.slice(0, 5).map((event) => (
            <div
              key={event._id}
              className="group rounded-2xl border border-slate-200 p-5 transition-all duration-300 hover:border-indigo-300 hover:bg-indigo-50"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {event.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-indigo-500" />
                      {event.location}
                    </div>

                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-indigo-500" />
                      {new Date(event.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                      {event.category}
                    </span>

                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {event.status}
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {event.time}
                    </span>
                  </div>
                </div>

                <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
                  View
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && events.length > 0 && (
        <button className="mt-6 w-full rounded-xl border border-indigo-600 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-600 hover:text-white">
          View All Events
        </button>
      )}
    </div>
  );
}