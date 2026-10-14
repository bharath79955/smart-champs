import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  GraduationCap,
  Star,
} from "lucide-react";

export default function CourseCard({
  course,
  onEnroll,
  enrolled = false,
}) {
  if (!course) return null;

  const {
    id,
    title,
    category,
    instructor,
    price,
    rating,
    lessons,
    duration,
    level,
    image,
  } = course;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/60">
      {/* Course image */}
      <Link
        to={`/courses/${id}`}
        aria-label={`View ${title} course details`}
        className="relative block overflow-hidden bg-slate-100"
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/95 px-3 py-1.5 text-xs font-bold text-indigo-700 shadow-sm">
          {category}
        </span>

        {enrolled && (
          <span className="absolute right-4 top-4 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm">
            Enrolled
          </span>
        )}
      </Link>

      {/* Course content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-amber-500">
            <Star size={16} fill="currentColor" />
            {rating ?? "New"}
          </span>

          <span className="rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-500">
            {level || "All levels"}
          </span>
        </div>

        <Link to={`/courses/${id}`} className="mt-3 block">
          <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-extrabold leading-7 text-slate-900 transition group-hover:text-indigo-600">
            {title}
          </h3>
        </Link>

        <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
          <GraduationCap size={17} className="shrink-0 text-slate-400" />
          <span className="truncate">{instructor}</span>
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-slate-100 pb-4 text-xs font-medium text-slate-500">
          <span className="flex items-center gap-1.5">
            <BookOpen size={15} />
            {lessons ?? 0} lessons
          </span>

          <span className="flex items-center gap-1.5">
            <Clock3 size={15} />
            {duration || "Self-paced"}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <div>
            <p className="text-xs text-slate-400">
              {Number(price) === 0 ? "Course access" : "Course price"}
            </p>
            <p className="mt-1 text-xl font-extrabold text-slate-900">
              {Number(price) === 0 ? "Free" : `₹${price}`}
            </p>
          </div>

          {enrolled ? (
            <Link
              to={`/courses/${id}`}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700 transition hover:bg-emerald-100"
            >
              Continue
              <ArrowRight size={16} />
            </Link>
          ) : onEnroll ? (
            <button
              type="button"
              onClick={() => onEnroll(course)}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100"
            >
              Enroll
              <ArrowRight size={16} />
            </button>
          ) : (
            <Link
              to={`/courses/${id}`}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
            >
              View course
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}