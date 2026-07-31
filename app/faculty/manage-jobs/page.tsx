import JobTable from "@/components/jobs/JobTable";

export default function ManageJobsPage() {
  return (
    <main className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold">
              Manage Jobs
            </h1>

            <p className="mt-3 text-slate-600">
              View, edit and delete jobs & internships.
            </p>
          </div>
        </div>

        <JobTable />
      </div>
    </main>
  );
}