"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BriefcaseBusiness, MapPin, IndianRupee } from "lucide-react";

interface JobType {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
}

export default function LatestJobs() {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();

        if (data.success) {
          setJobs(data.jobs.slice(0, 4));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Latest Jobs
        </h2>

        <Link
          href="/jobs"
          className="text-indigo-600 hover:underline"
        >
          View All
        </Link>
      </div>

      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-slate-500">
          No jobs available.
        </p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="rounded-xl border p-5 transition hover:bg-slate-50"
            >
              <div className="flex items-start gap-4">

                <div className="rounded-xl bg-cyan-100 p-3 text-cyan-600">
                  <BriefcaseBusiness size={22} />
                </div>

                <div className="flex-1">

                  <h3 className="text-lg font-semibold">
                    {job.title}
                  </h3>

                  <p className="font-medium text-indigo-600">
                    {job.company}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">

                    <span className="flex items-center gap-1">
                      <MapPin size={15} />
                      {job.location}
                    </span>

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      {job.type}
                    </span>

                  </div>

                  <div className="mt-3 flex items-center justify-between">

                    <span className="flex items-center gap-1 font-semibold text-green-600">
                      <IndianRupee size={16} />
                      {job.salary || "Not Disclosed"}
                    </span>

                    <Link
                      href="/jobs"
                      className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white transition hover:bg-indigo-700"
                    >
                      View
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