import { FaBookOpen } from "react-icons/fa";

const resources = [
  {
    title: "React Roadmap",
    type: "PDF",
  },
  {
    title: "AWS Cloud Notes",
    type: "Document",
  },
  {
    title: "DSA Handbook",
    type: "E-Book",
  },
];

export default function ResourcesCard() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-bold">
          Latest Resources
        </h2>

        <FaBookOpen className="text-orange-500 text-xl" />

      </div>

      <div className="space-y-4">

        {resources.map((resource, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-100 p-4 transition hover:bg-orange-50"
          >
            <h3 className="font-semibold">
              {resource.title}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {resource.type}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}