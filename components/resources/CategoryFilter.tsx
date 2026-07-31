"use client";

const categories = [
  "All",
  "PDF",
  "Notes",
  "Book",
  "Video",
  "Presentation",
];

interface CategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}

export default function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
}: CategoryFilterProps) {
  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`rounded-full px-5 py-2 font-medium transition ${
            selectedCategory === category
              ? "bg-indigo-600 text-white"
              : "bg-white text-slate-700 shadow hover:bg-slate-100"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}