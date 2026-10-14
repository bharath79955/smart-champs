import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Play,
  Search,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

import CourseCard from "../components/CourseCard";
import ProgressBar from "../components/ProgressBar";
import { courses } from "../data/courses";
import { useAuth } from "../context/AuthContext";
import { useLearning } from "../context/LearningContext";

export default function MyLearning() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const { user } = useAuth();
  const { enrolledIds, getProgress } = useLearning();

  const myCourses = useMemo(
    () =>
      courses.filter((course) =>
        enrolledIds.some((id) => String(id) === String(course.id))
      ),
    [enrolledIds]
  );

  const stats = useMemo(() => {
    const completed = myCourses.filter(
      (course) => getProgress(course.id) >= 100
    ).length;

    const totalProgress = myCourses.reduce(
      (total, course) => total + getProgress(course.id),
      0
    );

    return {
      total: myCourses.length,
      completed,
      inProgress: myCourses.length - completed,
      averageProgress: myCourses.length
        ? Math.round(totalProgress / myCourses.length)
        : 0,
    };
  }, [myCourses, getProgress]);

  const filteredCourses = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return myCourses.filter((course) => {
      const progress = getProgress(course.id);

      const matchesSearch =
        !query ||
        [course.title, course.instructor, course.category]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(query));

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "in-progress" && progress < 100) ||
        (activeTab === "completed" && progress >= 100);

      return matchesSearch && matchesTab;
    });
  }, [myCourses, searchTerm, activeTab, getProgress]);

  const continueCourse = useMemo(
    () =>
      myCourses.find((course) => getProgress(course.id) < 100) ||
      myCourses[0] ||
      null,
    [myCourses, getProgress]
  );

  const statCards = [
    {
      label: "Enrolled courses",
      value: stats.total,
      icon: BookOpen,
      color: "bg-blue-50 text-blue-600",
      accent: "border-blue-100",
    },
    {
      label: "In progress",
      value: stats.inProgress,
      icon: Clock3,
      color: "bg-amber-50 text-amber-600",
      accent: "border-amber-100",
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-600",
      accent: "border-emerald-100",
    },
    {
      label: "Average progress",
      value: `${stats.averageProgress}%`,
      icon: TrendingUp,
      color: "bg-violet-50 text-violet-600",
      accent: "border-violet-100",
    },
  ];

  const tabs = [
    { id: "all", label: "All courses", count: myCourses.length },
    {
      id: "in-progress",
      label: "In progress",
      count: stats.inProgress,
    },
    {
      id: "completed",
      label: "Completed",
      count: stats.completed,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Welcome banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700 text-white">
        <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1fr_300px] lg:px-8 lg:py-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-bold uppercase tracking-widest text-indigo-100">
              <Sparkles size={15} />
              Student dashboard
            </span>

            <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Welcome back{user?.name
                ? `, ${user.name.trim().split(/\s+/)[0]}`
                : ""}!
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-indigo-100 sm:text-base">
              Every lesson brings you closer to your goals. Continue learning,
              track your progress, and celebrate your achievements.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to={continueCourse
                  ? `/courses/${continueCourse.id}`
                  : "/courses"}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-indigo-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50"
              >
                <Play size={17} fill="currentColor" />
                {continueCourse ? "Continue learning" : "Explore courses"}
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-bold text-white transition hover:bg-white/20"
              >
                <BookOpen size={17} />
                Browse courses
              </Link>
            </div>
          </div>

          {/* Learning summary illustration */}
          <div className="hidden lg:block">
            <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <GraduationCap size={27} />
                </span>
                <span className="rounded-full bg-emerald-400/20 px-3 py-1.5 text-xs font-bold text-emerald-100">
                  Your progress
                </span>
              </div>

              <p className="mt-6 text-sm font-medium text-indigo-100">
                Average course progress
              </p>

              <div className="mt-2 flex items-end justify-between gap-3">
                <span className="text-4xl font-extrabold">
                  {stats.averageProgress}%
                </span>
                <Target size={29} className="mb-1 text-indigo-200" />
              </div>

              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-white transition-all duration-500"
                  style={{ width: `${stats.averageProgress}%` }}
                />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/10 p-3">
                  <p className="text-2xl font-extrabold">{stats.total}</p>
                  <p className="mt-1 text-xs text-indigo-100">
                    Courses enrolled
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-3">
                  <p className="text-2xl font-extrabold">{stats.completed}</p>
                  <p className="mt-1 text-xs text-indigo-100">
                    Completed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* Statistics */}
        <section
          aria-label="Learning statistics"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {statCards.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.label}
                className={`rounded-2xl border ${stat.accent} bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}
                  >
                    <Icon size={23} />
                  </span>

                  <span className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-500">
                    Learning
                  </span>
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">
                  {stat.label}
                </p>

                <p className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
                  {stat.value}
                </p>
              </article>
            );
          })}
        </section>

        {/* Continue learning */}
        {continueCourse && (
          <section className="mt-10">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-indigo-600">
                  PICK UP WHERE YOU LEFT OFF
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                  Continue learning
                </h2>
              </div>

              <Link
                to={`/courses/${continueCourse.id}`}
                className="hidden items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 sm:inline-flex"
              >
                Open course
                <ArrowRight size={17} />
              </Link>
            </div>

            <article className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:grid-cols-[280px_1fr]">
              <Link
                to={`/courses/${continueCourse.id}`}
                className="block overflow-hidden"
              >
                <img
                  src={continueCourse.image}
                  alt={continueCourse.title}
                  loading="lazy"
                  className="h-52 w-full object-cover transition duration-500 hover:scale-105 md:h-full"
                />
              </Link>

              <div className="flex flex-col justify-center p-5 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700">
                    {continueCourse.category}
                  </span>

                  <span className="inline-flex items-center gap-1 text-sm font-bold text-amber-500">
                    <Sparkles size={15} />
                    {continueCourse.level}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-2xl">
                  {continueCourse.title}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Instructor: {continueCourse.instructor}
                </p>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                    <span className="font-semibold text-slate-600">
                      Your progress
                    </span>
                    <span className="font-extrabold text-indigo-600">
                      {getProgress(continueCourse.id)}%
                    </span>
                  </div>

                  <ProgressBar progress={getProgress(continueCourse.id)} />
                </div>

                <Link
                  to={`/courses/${continueCourse.id}`}
                  className="mt-5 inline-flex items-center justify-center gap-2 self-start rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                >
                  {getProgress(continueCourse.id) >= 100
                    ? "Review course"
                    : "Continue course"}
                  <ArrowRight size={17} />
                </Link>
              </div>
            </article>
          </section>
        )}

        {/* My courses */}
        <section className="mt-12">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
                Your learning library
              </p>

              <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                My courses
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Pick up where you left off and keep building your skills.
              </p>
            </div>

            <Link
              to="/courses"
              className="inline-flex items-center gap-2 self-start text-sm font-bold text-indigo-600 hover:text-indigo-700"
            >
              Discover more
              <ArrowRight size={17} />
            </Link>
          </div>

          {/* Search */}
          <div className="relative mt-6 max-w-lg">
            <Search
              size={19}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search your courses..."
              aria-label="Search enrolled courses"
              className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* Tabs */}
          <div className="mt-6 flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={activeTab === tab.id}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:text-indigo-700"
                }`}
              >
                {tab.label}
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    activeTab === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Course grid */}
          {filteredCourses.length > 0 ? (
            <div className="mt-7 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <div key={course.id} className="flex flex-col gap-3">
                  <CourseCard course={course} enrolled />

                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <ProgressBar progress={getProgress(course.id)} />

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span
                        className={`text-xs font-bold ${
                          getProgress(course.id) >= 100
                            ? "text-emerald-600"
                            : "text-slate-500"
                        }`}
                      >
                        {getProgress(course.id) >= 100
                          ? "Course completed"
                          : "Keep going"}
                      </span>

                      <Link
                        to={`/courses/${course.id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-2 text-sm font-bold text-indigo-700 transition hover:bg-indigo-100"
                      >
                        {getProgress(course.id) >= 100 ? "Review" : "Continue"}
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-7 rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                {myCourses.length === 0 ? (
                  <GraduationCap size={32} />
                ) : (
                  <Search size={29} />
                )}
              </span>

              <h3 className="mt-5 text-xl font-extrabold text-slate-900">
                {myCourses.length === 0
                  ? "Your learning journey starts here"
                  : "No matching courses"}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                {myCourses.length === 0
                  ? "Explore our course library and enroll in your first course to see it here."
                  : "Try a different search term or choose another course filter."}
              </p>

              {myCourses.length === 0 && (
                <Link
                  to="/courses"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white transition hover:bg-indigo-700"
                >
                  Explore courses
                  <ArrowRight size={17} />
                </Link>
              )}
            </div>
          )}
        </section>

        {/* Achievement banner */}
        <section className="relative mt-12 overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-6 text-white sm:p-9">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

          <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                <Award size={26} />
              </span>

              <div>
                <h2 className="text-xl font-extrabold sm:text-2xl">
                  Every lesson is progress.
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-indigo-100">
                  Stay consistent, finish your courses, and celebrate each
                  milestone along the way.
                </p>
              </div>
            </div>

            <Link
              to="/courses"
              className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-white px-5 py-3 font-bold text-indigo-700 transition hover:bg-indigo-50 sm:self-center"
            >
              Find your next course
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}