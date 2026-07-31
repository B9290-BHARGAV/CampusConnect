"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

interface JobType {
  _id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  type: string;
  salary: string;
  applyLink: string;
}

export default function JobCard() {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

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

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || job.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [jobs, search, filter]);

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-xl">
        Loading jobs...
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        <input
          type="text"
          placeholder="Search by title or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-xl border p-3 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-xl border p-3 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option>All</option>
          <option>Internship</option>
          <option>Full-Time</option>
          <option>Part-Time</option>
          <option>Remote</option>
        </select>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="rounded-3xl bg-white p-10 text-center shadow-xl">
          No jobs found.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <div
              key={job._id}
              className="rounded-3xl bg-white p-6 shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-slate-800">
                {job.title}
              </h2>

              <p className="mt-2 text-lg font-semibold text-indigo-600">
                {job.company}
              </p>

              <span className="mt-3 inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                {job.type}
              </span>

              <p className="mt-4 line-clamp-3 text-slate-600">
                {job.description}
              </p>

              <div className="mt-5 space-y-2 text-sm">
                <p>
                  📍 <strong>Location:</strong> {job.location}
                </p>

                <p>
                  💰 <strong>Salary:</strong>{" "}
                  {job.salary || "Not Disclosed"}
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <Link
                  href={`/jobs/${job._id}`}
                  className="flex-1 rounded-xl bg-slate-200 py-3 text-center font-medium transition hover:bg-slate-300"
                >
                  View Details
                </Link>

                <a
                  href={job.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-xl bg-indigo-600 py-3 text-center font-medium text-white transition hover:bg-indigo-700"
                >
                  Apply
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}