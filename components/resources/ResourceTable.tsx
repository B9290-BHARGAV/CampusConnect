"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

interface ResourceType {
  _id: string;
  title: string;
  category: string;
  subject: string;
  semester: number;
  uploadedBy?: {
    fullName: string;
  };
}

export default function ResourceTable() {
  const [resources, setResources] = useState<ResourceType[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
  (async () => {
    await fetchResources();
  })();
}, []);

  async function deleteResource(id: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this resource?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/resources/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setResources((prev) =>
        prev.filter((resource) => resource._id !== id)
      );

      alert("Resource deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
        Loading resources...
      </div>
    );
  }
    return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

      <div className="flex items-center justify-between border-b p-6">

        <h2 className="text-2xl font-bold">
          All Resources
        </h2>

   

      </div>

      {resources.length === 0 ? (

        <div className="p-10 text-center text-slate-500">
          No resources found.
        </div>

      ) : (

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>
              <th className="px-6 py-4 text-left">Title</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Subject</th>
              <th className="px-6 py-4 text-left">Semester</th>
              <th className="px-6 py-4 text-left">Uploaded By</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {resources.map((resource) => (

              <tr
                key={resource._id}
                className="border-b hover:bg-slate-50"
              >
                <td className="px-6 py-5 font-medium">
                  {resource.title}
                </td>

                <td className="px-6 py-5">
                  {resource.category}
                </td>

                <td className="px-6 py-5">
                  {resource.subject}
                </td>

                <td className="px-6 py-5">
                  Semester {resource.semester}
                </td>

                <td className="px-6 py-5">
                  {resource.uploadedBy?.fullName || "Faculty"}
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">
                                        <Link
                      href={`/faculty/edit-resource/${resource._id}`}
                      className="rounded-lg bg-blue-500 p-2 text-white transition hover:bg-blue-600"
                    >
                      <Pencil size={18} />
                    </Link>

                    <button
                      onClick={() => deleteResource(resource._id)}
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