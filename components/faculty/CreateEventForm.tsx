"use client";

import { useState } from "react";

export default function CreateEventForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          location,
          date,
          organizer,
          image,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("🎉 Event Created Successfully!");

      setTitle("");
      setDescription("");
      setLocation("");
      setDate("");
      setOrganizer("");
      setImage("");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div className="w-full max-w-2xl rounded-3xl bg-white p-10 shadow-xl">
      <h1 className="mb-8 text-center text-4xl font-bold">
        Create New Event
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block font-semibold">
            Event Title
          </label>

          <input
            className="w-full rounded-xl border p-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Description
          </label>

          <textarea
            rows={4}
            className="w-full rounded-xl border p-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Location
          </label>

          <input
            className="w-full rounded-xl border p-3"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Date
          </label>

          <input
            type="date"
            className="w-full rounded-xl border p-3"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Organizer
          </label>

          <input
            className="w-full rounded-xl border p-3"
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Image URL
          </label>

          <input
            className="w-full rounded-xl border p-3"
            placeholder="https://..."
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-indigo-600 py-4 font-semibold text-white transition hover:bg-indigo-700"
        >
          {loading ? "Creating Event..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}