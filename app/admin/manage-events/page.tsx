"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Trash2,
  Pencil,
  CalendarDays,
  MapPin,
  Users,
} from "lucide-react";

interface EventData {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  time: string;
  organizer: string;
  capacity: number;
  status: string;
  createdBy?: {
    fullName: string;
    email: string;
  };
  createdAt: string;
}

export default function AdminManageEventsPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();

        if (data.success) {
          setEvents(data.events);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  async function handleDelete(eventId: string, title: string) {
    if (!confirm(`Delete event "${title}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/events/${eventId}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        setEvents((prev) => prev.filter((e) => e._id !== eventId));
      } else {
        alert(data.message || "Failed to delete event");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const statusBadge: Record<string, string> = {
    Upcoming: "bg-green-100 text-green-700",
    Completed: "bg-slate-100 text-slate-600",
    Cancelled: "bg-red-100 text-red-600",
  };

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <Link
          href="/admin"
          className="mb-4 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-indigo-600"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <h1 className="mb-8 text-4xl font-bold text-slate-900">
          Manage Events
        </h1>

        {loading ? (
          <p className="py-12 text-center text-slate-400">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="py-12 text-center text-slate-400">No events found.</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
              <div
                key={event._id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition hover:shadow-lg"
              >
                <div className="mb-3 flex items-start justify-between">
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                    {event.category}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      statusBadge[event.status] || "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {event.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                  {event.description}
                </p>

                <div className="mt-4 space-y-2 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={14} />
                    {event.date} at {event.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={14} />
                    Capacity: {event.capacity}
                  </div>
                </div>

                {event.createdBy && (
                  <p className="mt-3 text-xs text-slate-400">
                    By {event.createdBy.fullName}
                  </p>
                )}

                <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4">
                  <Link
                    href={`/faculty/edit-event/${event._id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100"
                  >
                    <Pencil size={14} /> Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(event._id, event.title)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
