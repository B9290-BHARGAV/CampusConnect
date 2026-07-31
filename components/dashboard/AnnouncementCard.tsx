import {
  Megaphone,
  CalendarDays,
  Pin,
} from "lucide-react";

const announcements = [
  {
    title: "Semester Exam Schedule Released",
    date: "Today",
    priority: "High",
    postedBy: "Examination Cell",
  },
  {
    title: "Placement Registration Open",
    date: "Yesterday",
    priority: "Medium",
    postedBy: "Placement Cell",
  },
  {
    title: "College Holiday on Monday",
    date: "2 Days Ago",
    priority: "Low",
    postedBy: "Administration",
  },
];

export default function AnnouncementCard() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Announcements
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest campus updates
          </p>
        </div>

        <div className="rounded-xl bg-red-100 p-3">
          <Megaphone className="h-6 w-6 text-red-600" />
        </div>
      </div>

      {/* Announcement List */}

      <div className="space-y-4">
        {announcements.map((announcement, index) => (
          <div
            key={index}
            className="group rounded-2xl border border-slate-200 p-5 transition-all duration-300 hover:border-red-300 hover:bg-red-50"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Pin className="h-4 w-4 text-red-500" />

                  <h3 className="font-semibold text-slate-900">
                    {announcement.title}
                  </h3>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4 text-red-500" />
                    {announcement.date}
                  </div>

                  <span>•</span>

                  <span>{announcement.postedBy}</span>
                </div>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  announcement.priority === "High"
                    ? "bg-red-100 text-red-700"
                    : announcement.priority === "Medium"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {announcement.priority}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}

      <button className="mt-6 w-full rounded-xl border border-red-600 py-3 font-semibold text-red-600 transition hover:bg-red-600 hover:text-white">
        View All Announcements
      </button>
    </div>
  );
}