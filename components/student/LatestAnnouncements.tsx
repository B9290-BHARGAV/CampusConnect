"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Megaphone, CalendarDays } from "lucide-react";

interface AnnouncementType {
  _id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  createdAt: string;
}

export default function LatestAnnouncements() {
  const [announcements, setAnnouncements] = useState<AnnouncementType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const res = await fetch("/api/announcements");
        const data = await res.json();

        if (data.success) {
          setAnnouncements(data.announcements.slice(0, 4));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnnouncements();
  }, []);

  function getPriorityColor(priority: string) {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Latest Announcements
        </h2>

        <Link
          href="/announcements"
          className="text-indigo-600 hover:underline"
        >
          View All
        </Link>
      </div>

      {loading ? (
        <p>Loading announcements...</p>
      ) : announcements.length === 0 ? (
        <p className="text-slate-500">
          No announcements available.
        </p>
      ) : (
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div
              key={announcement._id}
              className="rounded-xl border p-5 transition hover:bg-slate-50"
            >
              <div className="flex items-start gap-4">

                <div className="rounded-xl bg-red-100 p-3 text-red-600">
                  <Megaphone size={22} />
                </div>

                <div className="flex-1">

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold">
                      {announcement.title}
                    </h3>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityColor(
                        announcement.priority
                      )}`}
                    >
                      {announcement.priority}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">

                    <span>
                      📂 {announcement.category}
                    </span>

                    <span className="flex items-center gap-1">
                      <CalendarDays size={15} />
                      {new Date(
                        announcement.createdAt
                      ).toLocaleDateString()}
                    </span>

                  </div>

                  <p className="mt-3 line-clamp-2 text-slate-600">
                    {announcement.description}
                  </p>

                  <div className="mt-4 flex justify-end">
                    <Link
                      href="/announcements"
                      className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white transition hover:bg-indigo-700"
                    >
                      Read More
                    </Link>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}