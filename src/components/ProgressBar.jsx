export default function ProgressBar({
  progress = 0,
  showLabel = true,
  size = "md",
  className = "",
}) {
  const percentage = Number.isFinite(Number(progress))
    ? Math.min(100, Math.max(0, Number(progress)))
    : 0;

  const heights = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3",
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-slate-600">
            Course progress
          </span>

          <span className="text-sm font-bold text-indigo-600">
            {Math.round(percentage)}%
          </span>
        </div>
      )}

      <div
        className={`w-full overflow-hidden rounded-full bg-slate-100 ${
          heights[size] || heights.md
        }`}
        role="progressbar"
        aria-label="Course completion"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(percentage)}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-500 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}