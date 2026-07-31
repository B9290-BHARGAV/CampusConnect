"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, PlusCircle } from "lucide-react";

interface AnnouncementType {
  _id: string;
  title: string;
  category: string;
  priority: string;
  createdAt: string;
}

export default function AnnouncementTable() {
  const [announcements, setAnnouncements] = useState<AnnouncementType[]>([]);
  const [loading, setLoading] = useState(true);

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

  async function deleteAnnouncement(id: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this announcement?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/announcements/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setAnnouncements((prev) =>
        prev.filter((announcement) => announcement._id !== id)
      );

      alert("Announcement deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
        Loading announcements...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

      <div className="flex items-center justify-between border-b p-6">

        <h2 className="text-2xl font-bold">
          All Announcements
        </h2>

        <Link
          href="/faculty/create-announcement"
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-700"
        >
          <PlusCircle size={18} />
          Create Announcement
        </Link>

      </div>

      {announcements.length === 0 ? (
        <div className="p-10 text-center text-slate-500">
          No announcements found.
        </div>
      ) : (
        <table className="w-full">

          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-left">Title</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Priority</th>
              <th className="px-6 py-4 text-left">Created</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {announcements.map((announcement) => (
              <tr
                key={announcement._id}
                className="border-b hover:bg-slate-50"
              >
                <td className="px-6 py-5 font-medium">
                  {announcement.title}
                </td>

                <td className="px-6 py-5">
                  {announcement.category}
                </td>

                <td className="px-6 py-5">
                  <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                    {announcement.priority}
                  </span>
                </td>

                <td className="px-6 py-5">
                  {new Date(
                    announcement.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">

                    <Link
                      href={`/faculty/edit-announcement/${announcement._id}`}
                      className="rounded-lg bg-blue-500 p-2 text-white transition hover:bg-blue-600"
                    >
                      <Pencil size={18} />
                    </Link>

                    <button
                      onClick={() =>
                        deleteAnnouncement(announcement._id)
                      }
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