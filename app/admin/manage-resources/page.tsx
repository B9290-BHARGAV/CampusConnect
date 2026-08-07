"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Trash2,
  Pencil,
  ExternalLink,
  BookOpen,
} from "lucide-react";

interface ResourceData {
  _id: string;
  title: string;
  description: string;
  category: string;
  subject: string;
  semester: number;
  resourceUrl: string;
  uploadedBy?: {
    fullName: string;
    email: string;
  };
  createdAt: string;
}

export default function AdminManageResourcesPage() {
  const [resources, setResources] = useState<ResourceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResources() {
      try {
        const res = await fetch("/api/resources");
        const data = await res.json();

        if (data.success) {
          setResources(data.resources);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchResources();
  }, []);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete resource "${title}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/resources/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        setResources((prev) => prev.filter((r) => r._id !== id));
      } else {
        alert(data.message || "Failed to delete resource");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const categoryBadge: Record<string, string> = {
    Notes: "bg-blue-100 text-blue-700",
    PDF: "bg-red-100 text-red-700",
    Book: "bg-emerald-100 text-emerald-700",
    Video: "bg-purple-100 text-purple-700",
    Presentation: "bg-amber-100 text-amber-700",
    Other: "bg-slate-100 text-slate-600",
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
          Manage Resources
        </h1>

        {loading ? (
          <p className="py-12 text-center text-slate-400">
            Loading resources...
          </p>
        ) : resources.length === 0 ? (
          <p className="py-12 text-center text-slate-400">
            No resources found.
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {resources.map((resource) => (
              <div
                key={resource._id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition hover:shadow-lg"
              >
                <div className="mb-3 flex items-start justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      categoryBadge[resource.category] ||
                      "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {resource.category}
                  </span>
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                    Sem {resource.semester}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {resource.title}
                </h3>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <BookOpen size={14} />
                  {resource.subject}
                </div>

                <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                  {resource.description}
                </p>

                {resource.uploadedBy && (
                  <p className="mt-3 text-xs text-slate-400">
                    Uploaded by {resource.uploadedBy.fullName}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                  <a
                    href={resource.resourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                  >
                    <ExternalLink size={14} /> View
                  </a>

                  <Link
                    href={`/faculty/edit-resource/${resource._id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100"
                  >
                    <Pencil size={14} /> Edit
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(resource._id, resource.title)
                    }
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
