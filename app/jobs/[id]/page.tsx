"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Job {
  _id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  type: string;
  salary: string;
  applyLink: string;
  companyLogo?: string;
  createdAt: string;
}

export default function JobDetailsPage() {
  const params = useParams();

  const id =
    typeof params.id === "string"
      ? params.id
      : params.id?.[0];

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        const data = await res.json();

        if (data.success) {
          setJob(data.job);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchJob();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl font-bold">
        Job Not Found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 shadow-xl">

        <Link
          href="/jobs"
          className="mb-8 inline-block rounded-lg bg-slate-200 px-5 py-2 transition hover:bg-slate-300"
        >
          ← Back
        </Link>

        <h1 className="text-5xl font-bold">
          {job.title}
        </h1>

        <p className="mt-3 text-2xl font-semibold text-indigo-600">
          {job.company}
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <div className="rounded-xl bg-slate-100 p-5">
            <h3 className="font-bold">📍 Location</h3>
            <p>{job.location}</p>
          </div>

          <div className="rounded-xl bg-slate-100 p-5">
            <h3 className="font-bold">💼 Job Type</h3>
            <p>{job.type}</p>
          </div>

          <div className="rounded-xl bg-slate-100 p-5">
            <h3 className="font-bold">💰 Salary</h3>
            <p>{job.salary || "Not Disclosed"}</p>
          </div>

          <div className="rounded-xl bg-slate-100 p-5">
            <h3 className="font-bold">📅 Posted</h3>
            <p>
              {new Date(job.createdAt).toLocaleDateString()}
            </p>
          </div>

        </div>

        <div className="mt-10">

          <h2 className="mb-5 text-3xl font-bold">
            Job Description
          </h2>

          <p className="leading-8 text-slate-700">
            {job.description}
          </p>

        </div>

        <a
          href={job.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block rounded-xl bg-indigo-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-indigo-700"
        >
          Apply Now
        </a>

      </div>
    </main>
  );
}