import { FaBullhorn } from "react-icons/fa";

const announcements = [
  {
    title: "Semester Exam Schedule Released",
    date: "Today",
  },
  {
    title: "Placement Registration Open",
    date: "Yesterday",
  },
  {
    title: "College Holiday on Monday",
    date: "2 Days Ago",
  },
];

export default function AnnouncementCard() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-bold">
          Announcements
        </h2>

        <FaBullhorn className="text-red-500 text-xl" />

      </div>

      <div className="space-y-4">

        {announcements.map((announcement, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-100 p-4 transition hover:bg-red-50"
          >
            <h3 className="font-semibold">
              {announcement.title}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {announcement.date}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}