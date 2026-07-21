import { FaBriefcase } from "react-icons/fa";

const jobs = [
  {
    company: "Google",
    role: "Software Engineer Intern",
    location: "Bangalore",
  },
  {
    company: "Microsoft",
    role: "Cloud Engineer",
    location: "Hyderabad",
  },
  {
    company: "Amazon",
    role: "SDE Intern",
    location: "Chennai",
  },
];

export default function JobsCard() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-bold">
          Latest Jobs
        </h2>

        <FaBriefcase className="text-green-600 text-xl" />

      </div>

      <div className="space-y-4">

        {jobs.map((job, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-100 p-4 transition hover:bg-green-50"
          >
            <h3 className="font-semibold">
              {job.company}
            </h3>

            <p className="text-sm text-gray-600">
              {job.role}
            </p>

            <p className="text-xs text-gray-400">
              📍 {job.location}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}