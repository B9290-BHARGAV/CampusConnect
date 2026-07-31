"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, PlusCircle } from "lucide-react";

interface JobType {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
}

export default function JobTable() {
  const [jobs, setJobs] = useState<JobType[]>([]);
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

  async function deleteJob(id: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setJobs((prev) => prev.filter((job) => job._id !== id));

      alert("Job deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
        Loading jobs...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

      <div className="flex items-center justify-between border-b p-6">

        <h2 className="text-2xl font-bold">
          All Jobs
        </h2>

        <Link
          href="/faculty/create-job"
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-700"
        >
          <PlusCircle size={18} />
          Create Job
        </Link>

      </div>
            {jobs.length === 0 ? (
        <div className="p-10 text-center text-slate-500">
          No jobs found.
        </div>
      ) : (
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-left">Title</th>
              <th className="px-6 py-4 text-left">Company</th>
              <th className="px-6 py-4 text-left">Location</th>
              <th className="px-6 py-4 text-left">Type</th>
              <th className="px-6 py-4 text-left">Salary</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr
                key={job._id}
                className="border-b hover:bg-slate-50"
              >
                <td className="px-6 py-5 font-medium">
                  {job.title}
                </td>

                <td className="px-6 py-5">
                  {job.company}
                </td>

                <td className="px-6 py-5">
                  {job.location}
                </td>

                <td className="px-6 py-5">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                    {job.type}
                  </span>
                </td>

                <td className="px-6 py-5">
                  {job.salary || "-"}
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">

                    <Link
                      href={`/faculty/edit-job/${job._id}`}
                      className="rounded-lg bg-blue-500 p-2 text-white transition hover:bg-blue-600"
                    >
                      <Pencil size={18} />
                    </Link>

                    <button
                      onClick={() => deleteJob(job._id)}
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