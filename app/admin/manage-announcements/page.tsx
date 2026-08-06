"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2, Pencil } from "lucide-react";

interface AnnouncementData {
  _id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  createdBy?: {
    fullName: string;
    email: string;
  };
  createdAt: string;
}

export default function AdminManageAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<AnnouncementData[]>([]);
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

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete announcement "${title}"? This cannot be undone.`))
      return;

    try {
      const res = await fetch(`/api/announcements/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setAnnouncements((prev) => prev.filter((a) => a._id !== id));
      } else {
        alert(data.message || "Failed to delete announcement");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const priorityBadge: Record<string, string> = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-green-100 text-green-700",
  };

  const categoryBadge: Record<string, string> = {
    General: "bg-slate-100 text-slate-700",
    Academic: "bg-blue-100 text-blue-700",
    Exam: "bg-purple-100 text-purple-700",
    Placement: "bg-emerald-100 text-emerald-700",
    Event: "bg-indigo-100 text-indigo-700",
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
          Manage Announcements
        </h1>

        {loading ? (
          <p className="py-12 text-center text-slate-400">
            Loading announcements...
          </p>
        ) : announcements.length === 0 ? (
          <p className="py-12 text-center text-slate-400">
            No announcements found.
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {announcements.map((item) => (
              <div
                key={item._id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition hover:shadow-lg"
              >
                <div className="mb-3 flex items-start justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      categoryBadge[item.category] ||
                      "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.category}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      priorityBadge[item.priority] ||
                      "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.priority}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 line-clamp-3 text-sm text-slate-500">
                  {item.description}
                </p>

                {item.createdBy && (
                  <p className="mt-3 text-xs text-slate-400">
                    By {item.createdBy.fullName}
                  </p>
                )}

                <p className="mt-1 text-xs text-slate-400">
                  {new Date(item.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>

                <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4">
                  <Link
                    href={`/faculty/edit-announcement/${item._id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100"
                  >
                    <Pencil size={14} /> Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(item._id, item.title)}
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
