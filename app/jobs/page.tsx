import JobCard from "@/components/jobs/JobCard";

export default function JobsPage() {
  return (
    <main className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10">
          <h1 className="text-5xl font-bold">
            Jobs & Internships
          </h1>

          <p className="mt-3 text-slate-600">
            Discover internships and job opportunities posted by faculty.
          </p>
        </div>

        <JobCard />
      </div>
    </main>
  );
}