"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
}

export default function EditAnnouncementForm({ id }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
  });

  useEffect(() => {
    async function fetchAnnouncement() {
      try {
        const res = await fetch(`/api/announcements/${id}`);
        const data = await res.json();

        if (data.success) {
          setFormData({
            title: data.announcement.title || "",
            description: data.announcement.description || "",
            category: data.announcement.category || "",
            priority: data.announcement.priority || "",
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnnouncement();
  }, [id]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch(`/api/announcements/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Announcement updated successfully.");

      router.push("/faculty/manage-announcements");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-xl">
        Loading...
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl bg-white p-8 shadow-xl"
    >
      <div>
        <label className="mb-2 block font-semibold">
          Title
        </label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Description
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          required
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Category
        </label>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full rounded-xl border p-3"
        >
          <option value="">Select Category</option>
          <option value="General">General</option>
          <option value="Academic">Academic</option>
          <option value="Placement">Placement</option>
          <option value="Event">Event</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Priority
        </label>

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          required
          className="w-full rounded-xl border p-3"
        >
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <button
        type="submit"
        className="rounded-xl bg-indigo-600 px-8 py-3 text-white transition hover:bg-indigo-700"
      >
        Update Announcement
      </button>
    </form>
  );
}