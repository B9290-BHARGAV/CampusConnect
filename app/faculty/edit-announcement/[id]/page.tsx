import EditAnnouncementForm from "@/components/announcements/EditAnnouncementForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditAnnouncementPage({
  params,
}: Props) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-4xl px-6">

        <div className="mb-10">
          <h1 className="text-5xl font-bold">
            Edit Announcement
          </h1>

          <p className="mt-3 text-slate-600">
            Update announcement details.
          </p>
        </div>

        <EditAnnouncementForm id={id} />

      </div>
    </main>
  );
}