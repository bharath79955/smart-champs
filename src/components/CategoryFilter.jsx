import { categories } from "../data/categories";

export default function CategoryFilter({
  selectedCategory = "All",
  onCategoryChange,
}) {
  const categoryItems = categories.map((category) => ({
    ...category,
    filterValue: category.name === "All Courses" ? "All" : category.name,
  }));

  return (
    <div
      className="flex gap-2 overflow-x-auto pb-3"
      role="group"
      aria-label="Filter courses by category"
    >
      {categoryItems.map((category) => {
        const active = selectedCategory === category.filterValue;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategoryChange?.(category.filterValue)}
            aria-pressed={active}
            className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
              active
                ? "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-100"
                : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-700"
            }`}
          >
            {category.filterValue}
          </button>
        );
      })}
    </div>
  );
}