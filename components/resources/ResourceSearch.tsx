"use client";

interface ResourceSearchProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function ResourceSearch({
  search,
  setSearch,
}: ResourceSearchProps) {
  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="🔍 Search resources by title, subject or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-lg outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
      />
    </div>
  );
}