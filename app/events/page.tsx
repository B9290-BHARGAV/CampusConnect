"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  Calendar,
  MapPin,
  Building2,
  Clock,
  Tag,
} from "lucide-react";

interface EventType {
  _id: string;
  title: string;
  description: string;
  category?: string;
  location: string;
  date: string;
  time?: string;
  organizer: string;
  image?: string;
  status?: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventType[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");

        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await res.json();

        const eventsArray = data.events || [];

        setEvents(eventsArray);
        setFilteredEvents(eventsArray);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  useEffect(() => {
    const filtered = events.filter((event) => {
      return (
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase()) ||
        event.organizer.toLowerCase().includes(search.toLowerCase())
      );
    });

    setFilteredEvents(filtered);
  }, [search, events]);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Hero */}

      <section className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 py-20">
        <div className="mx-auto max-w-7xl px-8">
          <h1 className="text-6xl font-bold text-white">
            Campus Events 🎉
          </h1>

          <p className="mt-4 max-w-2xl text-xl text-white/90">
            Explore workshops, hackathons, seminars, placement drives,
            cultural festivals and many more campus activities.
          </p>

          <div className="relative mt-10 max-w-xl">
            <Search className="absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl bg-white py-5 pl-16 pr-5 text-lg shadow-xl outline-none"
            />
          </div>
        </div>
      </section>

      {/* Events */}

      <section className="mx-auto max-w-7xl px-8 py-16">
        {loading ? (
          <div className="text-center text-2xl font-semibold">
            Loading Events...
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="rounded-3xl bg-white p-16 text-center shadow-lg">
            <h2 className="text-4xl font-bold">
              No Events Found 😔
            </h2>

            <p className="mt-4 text-slate-500">
              Try another search keyword.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredEvents.map((event) => (
              <div
                key={event._id}
                className="overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <img
                  src={
                    event.image && event.image !== ""
                      ? event.image
                      : "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800"
                  }
                  alt={event.title}
                  className="h-56 w-full object-cover"
                />

                <div className="space-y-4 p-6">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                      {event.category || "General"}
                    </span>

                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {event.status || "Upcoming"}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold">
                    {event.title}
                  </h2>

                  <p className="line-clamp-2 text-slate-600">
                    {event.description}
                  </p>

                  <div className="space-y-3 text-slate-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-red-500" />
                      {event.location}
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-indigo-600" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-orange-500" />
                      {event.time || "Time TBA"}
                    </div>

                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-green-600" />
                      {event.organizer}
                    </div>
                  </div>

                  <Link href={`/events/${event._id}`}>
                    <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 font-semibold text-white transition hover:scale-105">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}