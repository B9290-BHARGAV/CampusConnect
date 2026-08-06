"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Trash2,
  Pencil,
  MapPin,
  Building2,
  ExternalLink,
} from "lucide-react";

interface JobData {
  _id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  type: string;
  salary: string;
  applyLink: string;
  postedBy?: {
    fullName: string;
    email: string;
  };
  createdAt: string;
}

export default function AdminManageJobsPage() {
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();

        if (data.success) {
          setJobs(data.jobs);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  async function handleDelete(jobId: string, title: string) {
    if (!confirm(`Delete job "${title}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/jobs/${jobId}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        setJobs((prev) => prev.filter((j) => j._id !== jobId));
      } else {
        alert(data.message || "Failed to delete job");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const typeBadge: Record<string, string> = {
    Internship: "bg-blue-100 text-blue-700",
    "Full-Time": "bg-green-100 text-green-700",
    "Part-Time": "bg-amber-100 text-amber-700",
    Remote: "bg-purple-100 text-purple-700",
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
          Manage Jobs
        </h1>

        {loading ? (
          <p className="py-12 text-center text-slate-400">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="py-12 text-center text-slate-400">No jobs found.</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition hover:shadow-lg"
              >
                <div className="mb-3 flex items-start justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      typeBadge[job.type] || "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {job.type}
                  </span>
                  {job.salary && (
                    <span className="text-sm font-semibold text-emerald-600">
                      {job.salary}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {job.title}
                </h3>

                <div className="mt-2 space-y-1.5 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <Building2 size={14} />
                    {job.company}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    {job.location}
                  </div>
                </div>

                <p className="mt-3 line-clamp-2 text-sm text-slate-500">
                  {job.description}
                </p>

                {job.postedBy && (
                  <p className="mt-3 text-xs text-slate-400">
                    Posted by {job.postedBy.fullName}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                  <a
                    href={job.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                  >
                    <ExternalLink size={14} /> Apply Link
                  </a>

                  <Link
                    href={`/faculty/edit-job/${job._id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100"
                  >
                    <Pencil size={14} /> Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(job._id, job.title)}
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
