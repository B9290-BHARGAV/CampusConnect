"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function JobForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    type: "Internship",
    salary: "",
    applyLink: "",
    companyLogo: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
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

      alert("Job posted successfully.");

      router.push("/faculty/manage-jobs");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl bg-white p-8 shadow-xl"
    >
      <div>
        <label className="mb-2 block font-semibold">
          Job Title
        </label>

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Software Engineer Intern"
          required
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Company Name
        </label>

        <input
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Google"
          required
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Description
        </label>

        <textarea
          rows={5}
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Describe the job..."
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-semibold">
            Location
          </label>

          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Ahmedabad"
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Job Type
          </label>

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          >
            <option>Internship</option>
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Remote</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-semibold">
            Salary / Stipend
          </label>

          <input
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="₹25,000/month"
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Apply Link
          </label>

          <input
            name="applyLink"
            value={formData.applyLink}
            onChange={handleChange}
            required
            placeholder="https://company.com/apply"
            className="w-full rounded-xl border p-3"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Company Logo (Optional)
        </label>

        <input
          name="companyLogo"
          value={formData.companyLogo}
          onChange={handleChange}
          placeholder="https://logo-url.com/logo.png"
          className="w-full rounded-xl border p-3"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Posting..." : "Post Job"}
      </button>
    </form>
  );
}