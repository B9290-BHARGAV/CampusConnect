"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface ResourceFormProps {
  initialData?: {
    _id?: string;
    title: string;
    description: string;
    category: string;
    subject: string;
    semester: number;
    resourceUrl: string;
    thumbnail: string;
  };
  isEditing?: boolean;
}

export default function ResourceForm({
  initialData,
  isEditing = false,
}: ResourceFormProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(
    initialData?.title || ""
  );

  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  const [category, setCategory] = useState(
    initialData?.category || "Notes"
  );

  const [subject, setSubject] = useState(
    initialData?.subject || ""
  );

  const [semester, setSemester] = useState(
    initialData?.semester || 1
  );

  const [resourceUrl, setResourceUrl] = useState(
    initialData?.resourceUrl || ""
  );

  const [thumbnail, setThumbnail] = useState(
    initialData?.thumbnail || ""
  );

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!session?.user?.id) {
      alert("Please login first.");
      return;
    }

    if (
      !title ||
      !description ||
      !category ||
      !subject ||
      !semester ||
      !resourceUrl
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title,
        description,
        category,
        subject,
        semester,
        resourceUrl,
        thumbnail,
      };

      const response = await fetch(
        isEditing
          ? `/api/resources/${initialData?._id}`
          : "/api/resources",
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      alert(
        isEditing
          ? "Resource Updated Successfully"
          : "Resource Uploaded Successfully"
      );

      router.push("/faculty/manage-resources");
      router.refresh();
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
      className="space-y-8 rounded-3xl bg-white p-8 shadow-xl"
    >
      <div>
        <label className="mb-2 block font-semibold">
          Resource Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Resource Title"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Description
        </label>

        <textarea
          rows={5}
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          placeholder="Enter Resource Description"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
          required
        />
      </div>
            <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-semibold">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
          >
            <option>Notes</option>
            <option>PDF</option>
            <option>Book</option>
            <option>Video</option>
            <option>Presentation</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Semester
          </label>

          <select
            value={semester}
            onChange={(e) => setSemester(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
          >
            <option value={1}>Semester 1</option>
            <option value={2}>Semester 2</option>
            <option value={3}>Semester 3</option>
            <option value={4}>Semester 4</option>
            <option value={5}>Semester 5</option>
            <option value={6}>Semester 6</option>
            <option value={7}>Semester 7</option>
            <option value={8}>Semester 8</option>
          </select>
        </div>

      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Subject
        </label>

        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Cloud Computing"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Resource URL
        </label>

        <input
          type="url"
          value={resourceUrl}
          onChange={(e) => setResourceUrl(e.target.value)}
          placeholder="https://drive.google.com/... or https://youtube.com/..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
          required
        />

        <p className="mt-2 text-sm text-gray-500">
          Add a Google Drive, OneDrive, Dropbox, YouTube, GitHub, or any public resource link.
        </p>
      </div>
            <div>
        <label className="mb-2 block font-semibold">
          Thumbnail URL
          <span className="ml-2 text-sm font-normal text-gray-500">
            (Optional)
          </span>
        </label>

        <input
          type="url"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          placeholder="https://example.com/thumbnail.jpg"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
        />

       <p className="mt-2 text-sm text-gray-500">
       Leave this empty if you don&#39;t have a thumbnail.
     </p>
      </div>

      <div className="flex justify-end gap-4">

        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? isEditing
              ? "Updating..."
              : "Uploading..."
            : isEditing
            ? "Update Resource"
            : "Upload Resource"}
        </button>

      </div>

    </form>
  );
}