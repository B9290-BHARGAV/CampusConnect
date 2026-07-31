import {
  BookOpen,
  Download,
  CalendarDays,
} from "lucide-react";

const resources = [
  {
    title: "React Roadmap",
    type: "PDF",
    uploadedBy: "Faculty",
    date: "20 Jul 2026",
  },
  {
    title: "AWS Cloud Notes",
    type: "Document",
    uploadedBy: "Cloud Club",
    date: "18 Jul 2026",
  },
  {
    title: "DSA Handbook",
    type: "E-Book",
    uploadedBy: "Placement Cell",
    date: "15 Jul 2026",
  },
];

export default function ResourcesCard() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Latest Resources
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Access study materials and documents
          </p>
        </div>

        <div className="rounded-xl bg-orange-100 p-3">
          <BookOpen className="h-6 w-6 text-orange-600" />
        </div>
      </div>

      {/* Resource List */}

      <div className="space-y-4">
        {resources.map((resource, index) => (
          <div
            key={index}
            className="group rounded-2xl border border-slate-200 p-5 transition-all duration-300 hover:border-orange-300 hover:bg-orange-50"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900">
                  {resource.title}
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                    {resource.type}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {resource.uploadedBy}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                  <CalendarDays className="h-4 w-4 text-orange-600" />
                  {resource.date}
                </div>
              </div>

              <button className="rounded-xl bg-orange-600 p-3 text-white transition hover:bg-orange-700">
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}

      <button className="mt-6 w-full rounded-xl border border-orange-600 py-3 font-semibold text-orange-600 transition hover:bg-orange-600 hover:text-white">
        View All Resources
      </button>
    </div>
  );
}