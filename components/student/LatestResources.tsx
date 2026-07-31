"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  FolderOpen,
  Download,
} from "lucide-react";

interface ResourceType {
  _id: string;
  title: string;
  category: string;
  fileType: string;
  fileUrl: string;
}

export default function LatestResources() {
  const [resources, setResources] = useState<ResourceType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResources() {
      try {
        const res = await fetch("/api/resources");
        const data = await res.json();

        if (data.success) {
          setResources(data.resources.slice(0, 4));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchResources();
  }, []);

  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Latest Resources
        </h2>

        <Link
          href="/resources"
          className="text-indigo-600 hover:underline"
        >
          View All
        </Link>
      </div>

      {loading ? (
        <p>Loading resources...</p>
      ) : resources.length === 0 ? (
        <p className="text-slate-500">
          No resources available.
        </p>
      ) : (
        <div className="space-y-4">
          {resources.map((resource) => (
            <div
              key={resource._id}
              className="rounded-xl border p-5 transition hover:bg-slate-50"
            >
              <div className="flex items-start gap-4">

                <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
                  <BookOpen size={22} />
                </div>

                <div className="flex-1">

                  <h3 className="text-lg font-semibold">
                    {resource.title}
                  </h3>

                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">

                    <span className="flex items-center gap-1">
                      <FolderOpen size={15} />
                      {resource.category}
                    </span>

                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                      {resource.fileType}
                    </span>

                  </div>

                  <div className="mt-3 flex justify-end">
                    <a
                      href={resource.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white transition hover:bg-indigo-700"
                    >
                      <Download size={16} />
                      Download
                    </a>
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