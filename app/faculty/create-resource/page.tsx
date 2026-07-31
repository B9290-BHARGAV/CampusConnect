import ResourceForm from "@/components/resources/ResourceForm";

export default function CreateResourcePage() {
  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-5xl">

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Upload Resource
          </h1>

          <p className="mt-2 text-slate-500">
            Upload notes, PDFs, books, videos and other study materials.
          </p>
        </div>

        <ResourceForm />

      </div>
    </main>
  );
}