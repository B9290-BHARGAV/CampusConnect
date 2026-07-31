import EventForm from "@/components/faculty/EventForm";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditEventPage({
  params,
}: PageProps) {
  await connectDB();

  const { id } = await params;

  const event = await Event.findById(id).lean();

  if (!event) {
    notFound();
  }

  const eventData = JSON.parse(JSON.stringify(event));

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-5xl">

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Edit Event
          </h1>

          <p className="mt-2 text-slate-500">
            Update your event details.
          </p>
        </div>

        <EventForm
          initialData={eventData}
          isEditing={true}
        />

      </div>
    </main>
  );
}