import {
  BriefcaseBusiness,
  Building2,
  MapPin,
  ArrowRight,
} from "lucide-react";

const jobs = [
  {
    company: "Google",
    role: "Software Engineer Intern",
    location: "Bangalore",
    salary: "₹12 LPA",
    type: "Internship",
  },
  {
    company: "Microsoft",
    role: "Cloud Engineer",
    location: "Hyderabad",
    salary: "₹18 LPA",
    type: "Full Time",
  },
  {
    company: "Amazon",
    role: "SDE Intern",
    location: "Chennai",
    salary: "₹14 LPA",
    type: "Internship",
  },
];

export default function JobsCard() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Latest Jobs
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Explore new career opportunities
          </p>
        </div>

        <div className="rounded-xl bg-green-100 p-3">
          <BriefcaseBusiness className="h-6 w-6 text-green-600" />
        </div>
      </div>

      {/* Jobs */}

      <div className="space-y-4">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="group rounded-2xl border border-slate-200 p-5 transition-all duration-300 hover:border-green-300 hover:bg-green-50"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {job.role}
                </h3>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                  <Building2 className="h-4 w-4 text-green-600" />
                  {job.company}
                </div>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <MapPin className="h-4 w-4 text-green-600" />
                  {job.location}
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    {job.type}
                  </span>

                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                    {job.salary}
                  </span>
                </div>
              </div>

              <button className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700">
                Apply
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}

      <button className="mt-6 w-full rounded-xl border border-green-600 py-3 font-semibold text-green-600 transition hover:bg-green-600 hover:text-white">
        View All Jobs
      </button>
    </div>
  );
}