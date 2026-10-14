import { Link } from "react-router-dom";
import { ArrowLeft, Compass, GraduationCap } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[65vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl text-center">
        <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 sm:h-44 sm:w-44">
          <div>
            <p className="text-5xl font-black sm:text-6xl">404</p>
            <Compass size={25} className="mx-auto mt-2" />
          </div>
        </div>

        <p className="mt-8 text-sm font-bold uppercase tracking-widest text-indigo-600">
          Page not found
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Oops! Wrong turn.
        </h1>
        <p className="mt-4 leading-7 text-slate-500">
          This page may have moved or no longer exists. Let's get you back to
          your learning journey.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white hover:bg-indigo-700"
          >
            <ArrowLeft size={18} /> Back to Home
          </Link>
          <Link
            to="/courses"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-700 hover:bg-indigo-50"
          >
            <GraduationCap size={19} /> Explore Courses
          </Link>
        </div>
      </div>
    </section>
  );
}