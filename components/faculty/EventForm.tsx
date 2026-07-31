"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface EventFormProps {
  initialData?: {
    _id?: string;
    title: string;
    description: string;
    category: string;
    location: string;
    date: string;
    time: string;
    organizer: string;
    capacity: number;
    image: string;
  };
  isEditing?: boolean;
}

export default function EventForm({
  initialData,
  isEditing = false,
}: EventFormProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [category, setCategory] = useState(
    initialData?.category || "Workshop"
  );
  const [location, setLocation] = useState(
    initialData?.location || ""
  );
  const [date, setDate] = useState(initialData?.date || "");
  const [time, setTime] = useState(initialData?.time || "");
  const [organizer, setOrganizer] = useState(
    initialData?.organizer || ""
  );
  const [capacity, setCapacity] = useState(
    initialData?.capacity || 50
  );
  const [image, setImage] = useState(
    initialData?.image || ""
  );

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!session?.user?.id) {
      alert("Please login first.");
      return;
    }

    if (
      !title ||
      !description ||
      !category ||
      !location ||
      !date ||
      !time ||
      !organizer
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title,
        description,
        category,
        location,
        date,
        time,
        organizer,
        capacity,
        image,
      };

      const response = await fetch(
        isEditing
          ? `/api/events/${initialData?._id}`
          : "/api/events",
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      alert(
        isEditing
          ? "Event Updated Successfully"
          : "Event Created Successfully"
      );

      router.push("/faculty/manage-events");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-3xl bg-white p-8 shadow-xl"
    >
      <div>
        <label className="mb-2 block font-semibold">
          Event Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Event Title"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Description
        </label>

        <textarea
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Event Description"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
          required
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-semibold">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          >
            <option>Workshop</option>
            <option>Seminar</option>
            <option>Hackathon</option>
            <option>Competition</option>
            <option>Sports</option>
            <option>Cultural</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Venue
          </label>

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Seminar Hall"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
            required
          />
        </div>

      </div>
            <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-semibold">
            Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Time
          </label>

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
            required
          />
        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-semibold">
            Organizer
          </label>

          <input
            type="text"
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
            placeholder="Computer Engineering Department"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Capacity
          </label>

          <input
            type="number"
            min={1}
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
            required
          />
        </div>

      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Event Image URL
          <span className="ml-2 text-sm font-normal text-gray-500">
            (Optional)
          </span>
        </label>

        <input
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://example.com/event-image.jpg"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
        />

        <p className="mt-2 text-sm text-gray-500">
          Leave this empty to use the default event image.
        </p>
      </div>
            <div className="flex justify-end gap-4">

        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? isEditing
              ? "Updating..."
              : "Creating..."
            : isEditing
            ? "Update Event"
            : "Create Event"}
        </button>

      </div>

    </form>
  );
}