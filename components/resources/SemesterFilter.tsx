"use client";

const semesters = [
  "All",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
];

interface SemesterFilterProps {
  selectedSemester: string;
  setSelectedSemester: (value: string) => void;
}

export default function SemesterFilter({
  selectedSemester,
  setSelectedSemester,
}: SemesterFilterProps) {
  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {semesters.map((semester) => (
        <button
          key={semester}
          onClick={() => setSelectedSemester(semester)}
          className={`rounded-full px-5 py-2 font-medium transition ${
            selectedSemester === semester
              ? "bg-green-600 text-white"
              : "bg-white text-slate-700 shadow hover:bg-slate-100"
          }`}
        >
          {semester === "All"
            ? "All Semesters"
            : `Semester ${semester}`}
        </button>
      ))}
    </div>
  );
}