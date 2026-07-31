import ResourceTable from "@/components/resources/ResourceTable";
import Link from "next/link";

export default function ManageResourcesPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold">
              Manage Resources
            </h1>

            <p className="mt-2 text-slate-500">
              View, edit and delete study resources.
            </p>
          </div>

          <Link
            href="/faculty/create-resource"
            className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            + Upload Resource
          </Link>

        </div>

        <ResourceTable />

      </div>
    </main>
  );
}