import { FaCalendarAlt } from "react-icons/fa";

const events = [
  {
    title: "AWS Cloud Workshop",
    date: "25 July 2026",
  },
  {
    title: "Hackathon 2026",
    date: "28 July 2026",
  },
  {
    title: "Placement Drive",
    date: "30 July 2026",
  },
];

export default function EventsCard() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-bold">
          Upcoming Events
        </h2>

        <FaCalendarAlt className="text-indigo-600" />

      </div>

      <div className="space-y-4">

        {events.map((event, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-100 p-4 transition hover:bg-indigo-50"
          >
            <h3 className="font-semibold">
              {event.title}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {event.date}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}