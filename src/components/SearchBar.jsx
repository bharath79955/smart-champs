import { Search, X } from "lucide-react";

export default function SearchBar({
  value = "",
  onChange,
  onSubmit,
  placeholder = "Search courses...",
  className = "",
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.(value.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={`flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50 ${className}`}
    >
      <Search
        size={20}
        className="ml-2 shrink-0 text-slate-400"
        aria-hidden="true"
      />

      <input
        type="search"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange?.("")}
          aria-label="Clear search"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={18} />
        </button>
      )}

      {onSubmit && (
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
        >
          Search
        </button>
      )}
    </form>
  );
}