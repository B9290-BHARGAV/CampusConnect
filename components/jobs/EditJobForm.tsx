"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface EditJobFormProps {
  id: string;
}

interface JobFormData {
  title: string;
  company: string;
  description: string;
  location: string;
  type: string;
  salary: string;
  applyLink: string;
  companyLogo: string;
}

export default function EditJobForm({ id }: EditJobFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    company: "",
    description: "",
    location: "",
    type: "Internship",
    salary: "",
    applyLink: "",
    companyLogo: "",
  });

  // ============================
  // Load Job
  // ============================

  useEffect(() => {
    async function loadJob() {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        const data = await res.json();

        if (!res.ok) {
          alert(data.message);
          return;
        }

        setFormData({
          title: data.job.title || "",
          company: data.job.company || "",
          description: data.job.description || "",
          location: data.job.location || "",
          type: data.job.type || "Internship",
          salary: data.job.salary || "",
          applyLink: data.job.applyLink || "",
          companyLogo: data.job.companyLogo || "",
        });
      } catch (error) {
        console.error(error);
        alert("Failed to fetch job.");
      } finally {
        setLoading(false);
      }
    }

    loadJob();
  }, [id]);

  // ============================
  // Handle Input Change
  // ============================

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  // ============================
  // Update Job
  // ============================

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setUpdating(true);

    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Job updated successfully!");

      router.push("/faculty/manage-jobs");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
        Loading Job...
      </div>
    );
  }

  return (
        <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white p-8 shadow-xl"
    >
      <div className="grid gap-6">

        {/* Job Title */}
        <div>
          <label className="mb-2 block font-semibold">
            Job Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full rounded-xl border p-3 outline-none focus:border-indigo-500"
          />
        </div>

        {/* Company */}
        <div>
          <label className="mb-2 block font-semibold">
            Company Name
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full rounded-xl border p-3 outline-none focus:border-indigo-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block font-semibold">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            required
            className="w-full rounded-xl border p-3 outline-none focus:border-indigo-500"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">

          {/* Location */}
          <div>
            <label className="mb-2 block font-semibold">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full rounded-xl border p-3 outline-none focus:border-indigo-500"
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="mb-2 block font-semibold">
              Job Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-xl border p-3 outline-none focus:border-indigo-500"
            >
              <option>Internship</option>
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Remote</option>
            </select>
          </div>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          {/* Salary */}
          <div>
            <label className="mb-2 block font-semibold">
              Salary
            </label>

            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="₹3-4 lakhs per annum"
              className="w-full rounded-xl border p-3 outline-none focus:border-indigo-500"
            />
          </div>

          {/* Apply Link */}
          <div>
            <label className="mb-2 block font-semibold">
              Apply Link
            </label>

            <input
              type="url"
              name="applyLink"
              value={formData.applyLink}
              onChange={handleChange}
              required
              className="w-full rounded-xl border p-3 outline-none focus:border-indigo-500"
            />
          </div>

        </div>

        {/* Company Logo */}
        <div>
          <label className="mb-2 block font-semibold">
            Company Logo URL
          </label>

          <input
            type="url"
            name="companyLogo"
            value={formData.companyLogo}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full rounded-xl border p-3 outline-none focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={updating}
          className="mt-4 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
        >
          {updating ? "Updating..." : "Update Job"}
        </button>

      </div>
    </form>
  );
}