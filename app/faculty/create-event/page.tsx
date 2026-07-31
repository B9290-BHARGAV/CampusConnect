import EventForm from "@/components/faculty/EventForm";

export default function CreateEventPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            Create Event
          </h1>

          <p className="mt-2 text-slate-500">
            Fill in the details below to create a new campus event.
          </p>
        </div>

        <EventForm />
      </div>
    </main>
  );
}