import JobForm from "@/components/jobs/JobForm";

export default function CreateJobPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Create Job / Internship
          </h1>

          <p className="mt-2 text-slate-500">
            Post internships and job opportunities for students.
          </p>
        </div>

        <JobForm />
      </div>
    </main>
  );
}