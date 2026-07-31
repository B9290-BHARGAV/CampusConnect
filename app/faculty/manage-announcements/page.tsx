import AnnouncementTable from "@/components/announcements/AnnouncementTable";

export default function ManageAnnouncementsPage() {
  return (
    <main className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-10">
          <h1 className="text-5xl font-bold">
            Manage Announcements
          </h1>

          <p className="mt-3 text-slate-600">
            View, edit and delete all announcements.
          </p>
        </div>

        <AnnouncementTable />

      </div>
    </main>
  );
}