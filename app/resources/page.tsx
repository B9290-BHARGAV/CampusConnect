"use client";

import { useEffect, useMemo, useState } from "react";

import ResourceCard from "@/components/resources/ResourceCard";
import ResourceSearch from "@/components/resources/ResourceSearch";
import CategoryFilter from "@/components/resources/CategoryFilter";
import SemesterFilter from "@/components/resources/SemesterFilter";

interface ResourceType {
  _id: string;
  title: string;
  description: string;
  category: string;
  subject: string;
  semester: number;
  resourceUrl: string;
  thumbnail?: string;
  uploadedBy?: {
    fullName: string;
  };
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<ResourceType[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSemester, setSelectedSemester] = useState("All");

  useEffect(() => {
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

    fetchResources();
  }, []);

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesSearch =
        resource.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        resource.subject
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        resource.category
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        resource.category === selectedCategory;

      const matchesSemester =
        selectedSemester === "All" ||
        resource.semester.toString() === selectedSemester;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSemester
      );
    });
  }, [
    resources,
    search,
    selectedCategory,
    selectedSemester,
  ]);

  return (
    <main className="min-h-screen bg-slate-100 py-10">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-10">

          <h1 className="text-5xl font-bold">
            📚 Study Resources
          </h1>

          <p className="mt-3 text-slate-600">
            Browse notes, books, videos and PDFs uploaded by faculty.
          </p>

        </div>

        <ResourceSearch
          search={search}
          setSearch={setSearch}
        />

        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <SemesterFilter
          selectedSemester={selectedSemester}
          setSelectedSemester={setSelectedSemester}
        />

        {loading ? (

          <div className="rounded-3xl bg-white p-12 text-center shadow-lg">
            Loading resources...
          </div>

        ) : filteredResources.length === 0 ? (

          <div className="rounded-3xl bg-white p-16 text-center shadow-lg">

            <h2 className="text-3xl font-bold">
              No Resources Found
            </h2>

            <p className="mt-3 text-slate-500">
              Try changing the search or filters.
            </p>

          </div>

        ) : (

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {filteredResources.map((resource) => (

              <ResourceCard
                key={resource._id}
                resource={resource}
              />

            ))}

          </div>

        )}

      </div>

    </main>
  );
}