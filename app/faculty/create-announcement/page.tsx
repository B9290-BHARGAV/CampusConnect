import AnnouncementForm from "@/components/announcements/AnnouncementForm";

export default function CreateAnnouncementPage() {
  return (
    <main className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-5xl px-6">

        <div className="mb-10">
          <h1 className="text-5xl font-bold">
            Create Announcement
          </h1>

          <p className="mt-3 text-slate-600">
            Publish important announcements for students and faculty.
          </p>
        </div>

        <AnnouncementForm />

      </div>
    </main>
  );
}