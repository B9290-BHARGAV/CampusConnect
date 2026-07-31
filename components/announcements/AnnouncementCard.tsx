"use client";

import { useEffect, useMemo, useState } from "react";

interface Announcement {
  _id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  createdAt: string;
}

export default function AnnouncementCard() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const res = await fetch("/api/announcements");
        const data = await res.json();

        if (data.success) {
          setAnnouncements(data.announcements);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnnouncements();
  }, []);

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((announcement) => {
      const matchesSearch =
        announcement.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        announcement.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [announcements, search, category]);

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-xl">
        Loading announcements...
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 md:flex-row">

        <input
          type="text"
          placeholder="Search announcements..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-xl border p-3 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border p-3 outline-none"
        >
          <option>All</option>
          <option>General</option>
          <option>Academic</option>
          <option>Placement</option>
          <option>Event</option>
        </select>

      </div>

      {filteredAnnouncements.length === 0 ? (
        <div className="rounded-3xl bg-white p-10 text-center shadow-xl">
          No announcements available.
        </div>
      ) : (
        <div className="grid gap-6">

          {filteredAnnouncements.map((announcement) => (
            <div
              key={announcement._id}
              className="rounded-3xl bg-white p-8 shadow-lg transition hover:shadow-2xl"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">

                <h2 className="text-3xl font-bold">
                  {announcement.title}
                </h2>

                <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
                  {announcement.priority}
                </span>

              </div>

              <div className="mt-4 flex gap-4 text-sm text-slate-500">

                <span>
                  📂 {announcement.category}
                </span>

                <span>
                  📅 {new Date(
                    announcement.createdAt
                  ).toLocaleDateString()}
                </span>

              </div>

              <p className="mt-5 line-clamp-3 text-slate-700">
                {announcement.description}
              </p>

              <button
                className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700"
              >
                Read More
              </button>

            </div>
          ))}

        </div>
      )}
    </>
  );
}