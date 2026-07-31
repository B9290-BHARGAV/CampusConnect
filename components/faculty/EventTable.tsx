"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, PlusCircle } from "lucide-react";

interface EventType {
  _id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  organizer: string;
  status: string;
}

export default function EventTable() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  // ============================
  // Load Events
  // ============================

  useEffect(() => {
    async function loadEvents() {
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

    loadEvents();
  }, []);

  // ============================
  // Delete Event
  // ============================

  async function deleteEvent(id: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setEvents((prev) => prev.filter((event) => event._id !== id));

      alert("Event deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
        Loading events...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
      <div className="flex items-center justify-between border-b p-6">
        <h2 className="text-2xl font-bold">
          All Events
        </h2>

        <Link
          href="/faculty/create-event"
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-700"
        >
          <PlusCircle size={18} />
          Create Event
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="p-10 text-center text-slate-500">
          No events found.
        </div>
      ) : (
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-left">Title</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Venue</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {events.map((event) => (
              <tr
                key={event._id}
                className="border-b hover:bg-slate-50"
              >
                <td className="px-6 py-5 font-medium">
                  {event.title}
                </td>

                <td className="px-6 py-5">
                  {event.category}
                </td>

                <td className="px-6 py-5">
                  {event.date}
                </td>

                <td className="px-6 py-5">
                  {event.location}
                </td>

                <td className="px-6 py-5">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    {event.status}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">
                    <Link
                      href={`/faculty/edit-event/${event._id}`}
                      className="rounded-lg bg-blue-500 p-2 text-white transition hover:bg-blue-600"
                    >
                      <Pencil size={18} />
                    </Link>

                    <button
                      onClick={() => deleteEvent(event._id)}
                      className="rounded-lg bg-red-500 p-2 text-white transition hover:bg-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}