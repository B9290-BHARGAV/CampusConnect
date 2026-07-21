"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Calendar,
  MapPin,
  Building2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface EventType {
  _id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  organizer: string;
  image?: string;
}

export default function EventDetailsPage() {
  const { id } = useParams();

  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    async function loadEvent() {
      try {
        const res = await fetch(`/api/events/${id}`);
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadEvent();
    }
  }, [id]);

  async function handleRegister() {
    if (!event) return;

    setRegistering(true);

    try {
      // Temporary student id
      // Later we'll replace this with NextAuth session user id
      const studentId = "687abcf123456789abcdef01";

      const res = await fetch("/api/events/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId,
          eventId: event._id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("🎉 Registered Successfully!");
      setRegistered(true);
    } catch (err) {
      console.log(err);
      alert("Something went wrong.");
    } finally {
      setRegistering(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-3xl font-bold">
        Loading Event...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex h-screen items-center justify-center text-3xl font-bold">
        Event Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="relative h-[420px]">

        <img
          src={
            event.image && event.image !== ""
              ? event.image
              : "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1400"
          }
          className="h-full w-full object-cover"
          alt={event.title}
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute left-10 top-10">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold shadow-lg"
          >
            <ArrowLeft size={20} />
            Back
          </Link>
        </div>

        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="text-6xl font-bold">
            {event.title}
          </h1>

          <p className="mt-3 text-xl">
            {event.description}
          </p>
        </div>

      </div>

      <div className="mx-auto max-w-6xl p-10">

        <div className="grid gap-8 md:grid-cols-3">

          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <Calendar className="mb-3 text-indigo-600" size={35} />
            <h3 className="text-xl font-bold">Date</h3>
            <p className="mt-2 text-gray-600">{event.date}</p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <MapPin className="mb-3 text-red-500" size={35} />
            <h3 className="text-xl font-bold">Venue</h3>
            <p className="mt-2 text-gray-600">{event.location}</p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <Building2 className="mb-3 text-green-600" size={35} />
            <h3 className="text-xl font-bold">Organizer</h3>
            <p className="mt-2 text-gray-600">{event.organizer}</p>
          </div>

        </div>

        <div className="mt-12 rounded-3xl bg-white p-10 shadow-lg">

          <h2 className="mb-5 text-3xl font-bold">
            About This Event
          </h2>

          <p className="text-lg leading-8 text-gray-600">
            {event.description}
          </p>

          <button
            onClick={handleRegister}
            disabled={registered || registering}
            className={`mt-10 rounded-2xl px-10 py-4 text-xl font-semibold text-white shadow-lg transition ${
              registered
                ? "bg-green-600"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105"
            }`}
          >
            {registered
              ? "✅ Registered"
              : registering
              ? "Registering..."
              : "Register Now 🚀"}
          </button>

        </div>

      </div>

    </div>
  );
}