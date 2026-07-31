import { notFound } from "next/navigation";

import ResourceForm from "@/components/resources/ResourceForm";
import { connectDB } from "@/lib/mongodb";
import Resource from "@/models/Resource";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditResourcePage({
  params,
}: PageProps) {
  await connectDB();

  const { id } = await params;

  const resource = await Resource.findById(id).lean();

  if (!resource) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-5xl">

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Edit Resource
          </h1>

          <p className="mt-2 text-slate-500">
            Update the study resource details.
          </p>
        </div>

        <ResourceForm
          isEditing
          initialData={{
            _id: resource._id.toString(),
            title: resource.title,
            description: resource.description,
            category: resource.category,
            subject: resource.subject,
            semester: resource.semester,
            resourceUrl: resource.resourceUrl,
            thumbnail: resource.thumbnail || "",
          }}
        />

      </div>
    </main>
  );
}