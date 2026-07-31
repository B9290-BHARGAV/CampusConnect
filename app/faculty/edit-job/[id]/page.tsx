import EditJobForm from "@/components/jobs/EditJobForm";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditJobPage({
  params,
}: PageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-5xl px-6">

        <div className="mb-10">
          <h1 className="text-5xl font-bold">
            Edit Job
          </h1>

          <p className="mt-3 text-slate-600">
            Update job details.
          </p>
        </div>

        <EditJobForm id={id} />

      </div>
    </main>
  );
}