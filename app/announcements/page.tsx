import AnnouncementCard from "@/components/announcements/AnnouncementCard";

export default function AnnouncementsPage() {
  return (
    <main className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-10">
          <h1 className="text-5xl font-bold">
            Campus Announcements
          </h1>

          <p className="mt-3 text-slate-600">
            Stay updated with the latest announcements from faculty.
          </p>
        </div>

        <AnnouncementCard />

      </div>
    </main>
  );
}
