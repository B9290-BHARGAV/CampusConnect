import EventTable from "@/components/faculty/EventTable";

export default function ManageEventsPage() {
  return (
    <main className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-7xl px-6">
        {/* Page Heading */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold">
            Manage Events
          </h1>

          <p className="mt-3 text-slate-600">
            View, edit and delete campus events.
          </p>
        </div>

        {/* Events Table */}
        <EventTable />
      </div>
    </main>
  );
}