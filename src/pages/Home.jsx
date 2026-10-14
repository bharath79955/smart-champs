import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Code2,
  GraduationCap,
  Laptop,
  Palette,
  Play,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Clock3,
  Zap,
} from "lucide-react";

import CourseCard from "../components/CourseCard";
import { courses } from "../data/courses";

const categories = [
  {
    name: "Development",
    description: "Build websites, apps and software.",
    icon: Code2,
    gradient: "from-blue-500 to-indigo-600",
    background: "bg-blue-50",
  },
  {
    name: "Design",
    description: "Create beautiful digital experiences.",
    icon: Palette,
    gradient: "from-pink-500 to-rose-500",
    background: "bg-pink-50",
  },
  {
    name: "Business",
    description: "Turn ideas into opportunities.",
    icon: BriefcaseBusiness,
    gradient: "from-amber-500 to-orange-500",
    background: "bg-amber-50",
  },
  {
    name: "Data Science",
    description: "Discover insights through data.",
    icon: ChartNoAxesCombined,
    gradient: "from-emerald-500 to-teal-600",
    background: "bg-emerald-50",
  },
];

const benefits = [
  {
    icon: Laptop,
    title: "Learn practical skills",
    description:
      "Explore hands-on topics designed to help you build real-world skills.",
  },
  {
    icon: Clock3,
    title: "Learn at your pace",
    description:
      "Fit learning into your schedule and continue whenever you're ready.",
  },
  {
    icon: TrendingUp,
    title: "Track your progress",
    description:
      "Keep track of your enrolled courses and celebrate your milestones.",
  },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const popularCourses = useMemo(
    () =>
      [...courses]
        .sort(
          (a, b) => Number(b.rating || 0) - Number(a.rating || 0)
        )
        .slice(0, 3),
    []
  );

  function handleSearch(event) {
    event.preventDefault();

    const query = searchTerm.trim();

    navigate(
      query
        ? `/courses?q=${encodeURIComponent(query)}`
        : "/courses"
    );
  }

  function openCategory(category) {
    navigate(`/courses?category=${encodeURIComponent(category)}`);
  }

  return (
    <div className="overflow-hidden bg-white text-slate-900">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#f7f8ff]">
        <div className="pointer-events-none absolute -right-40 -top-32 -z-10 h-[500px] w-[500px] rounded-full bg-violet-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 left-0 -z-10 h-[450px] w-[450px] rounded-full bg-blue-200/30 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-8 lg:py-20">
          {/* Hero content */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 shadow-sm">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white">
                <Sparkles size={13} />
              </span>
              <span className="text-xs font-bold tracking-wide text-indigo-700 sm:text-sm">
                YOUR JOURNEY STARTS HERE
              </span>
            </div>

            <h1 className="mt-7 max-w-2xl text-[2.65rem] font-black leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-[3.8rem]">
              Learn today.
              <br />
              Build your{" "}
              <span className="relative inline-block text-indigo-600">
                tomorrow.
                <svg
                  viewBox="0 0 260 14"
                  fill="none"
                  className="absolute -bottom-2 left-0 w-full"
                  aria-hidden="true"
                >
                  <path
                    d="M4 9C67 2 180 2 255 8"
                    stroke="#A5B4FC"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Discover inspiring courses, develop practical skills, and
              turn your ambitions into achievements with Smart Champs.
            </p>

            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="mt-8 flex max-w-xl flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-indigo-100/50 sm:flex-row sm:items-center"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
                <Search
                  size={21}
                  className="shrink-0 text-slate-400"
                />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="What do you want to learn?"
                  aria-label="Search courses"
                  className="w-full min-w-0 bg-transparent py-3 text-sm outline-none placeholder:text-slate-400"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-700 active:scale-[0.98]"
              >
                Find courses
                <ArrowRight size={17} />
              </button>
            </form>

            {/* Quick benefits */}
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
              {[
                "Flexible learning",
                "Track your progress",
                "Learn new skills",
              ].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 text-xs font-semibold text-slate-600 sm:text-sm"
                >
                  <CheckCircle2
                    size={16}
                    className="shrink-0 text-emerald-500"
                  />
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/courses"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
              >
                Explore courses
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/my-learning"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-700"
              >
                <BookOpen size={18} />
                My Learning
              </Link>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-indigo-300/40 to-violet-300/40 blur-2xl" />

            <div className="relative rounded-[2rem] border border-white/80 bg-white p-2.5 shadow-2xl shadow-indigo-200/40 sm:p-3">
              <div className="relative overflow-hidden rounded-[1.5rem]">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85"
                  alt="Students learning and collaborating together"
                  fetchPriority="high"
                  className="h-[310px] w-full object-cover sm:h-[390px] lg:h-[430px]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 text-white sm:bottom-7 sm:left-7">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur-md">
                    <Sparkles size={14} />
                    Your next chapter begins now
                  </span>
                  <p className="mt-3 max-w-sm text-2xl font-extrabold leading-tight sm:text-3xl">
                    Small steps. Big possibilities.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating learning card */}
            <div className="absolute -left-2 top-8 max-w-[205px] rounded-2xl border border-white bg-white p-3.5 shadow-xl sm:-left-8 sm:top-12 sm:max-w-[225px] sm:p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <GraduationCap size={23} />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-slate-900">
                    Learn something new
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    One lesson at a time
                  </p>
                </div>
              </div>
            </div>

            {/* Floating achievement card */}
            <div className="absolute -bottom-5 right-3 rounded-2xl border border-white bg-white p-3.5 shadow-xl sm:-right-5 sm:p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                  <Award size={23} />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-slate-900">
                    Every step counts
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Progress you can track
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <a
            href="#categories"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
          >
            Discover what you can learn
            <ArrowDownRight size={17} />
          </a>
        </div>
      </section>

      {/* BENEFIT STRIP */}
      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <article
                key={benefit.title}
                className="flex items-start gap-4 rounded-2xl p-3 transition hover:bg-slate-50"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Icon size={23} />
                </span>
                <div>
                  <h2 className="font-extrabold text-slate-900">
                    {benefit.title}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {benefit.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CATEGORIES */}
      <section
        id="categories"
        className="scroll-mt-24 mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-indigo-600">
              Find your path
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              What will you learn next?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
              Explore subjects that match your interests and career goals.
            </p>
          </div>

          <Link
            to="/courses"
            className="inline-flex items-center gap-2 self-start text-sm font-bold text-indigo-600 transition hover:text-indigo-800 sm:self-auto"
          >
            Browse all courses
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.name}
                type="button"
                onClick={() => openCategory(category.name)}
                className="group rounded-2xl border border-slate-200 bg-white p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50"
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${category.gradient} text-white shadow-lg transition group-hover:scale-105`}
                  >
                    <Icon size={25} />
                  </span>

                  <span className="rounded-full bg-slate-50 p-2 text-slate-400 transition group-hover:bg-indigo-50 group-hover:text-indigo-600">
                    <ChevronRight size={18} />
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-extrabold text-slate-900">
                  {category.name}
                </h3>

                <p className="mt-2 min-h-10 text-sm leading-6 text-slate-500">
                  {category.description}
                </p>

                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-indigo-600">
                  Explore category
                  <ArrowRight
                    size={15}
                    className="transition group-hover:translate-x-1"
                  />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* POPULAR COURSES */}
      <section className="bg-[#f7f8fc]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-indigo-600">
                Start learning
              </span>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Popular courses
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                Find your next opportunity to learn, practice, and grow.
              </p>
            </div>

            <Link
              to="/courses"
              className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-700 sm:self-auto"
            >
              View all courses
              <ArrowRight size={17} />
            </Link>
          </div>

          {popularCourses.length > 0 ? (
            <div className="mt-9 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {popularCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <BookOpen className="mx-auto text-indigo-600" size={32} />
              <p className="mt-3 font-bold text-slate-800">
                New courses are coming soon.
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Check back to discover your next learning opportunity.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* LEARNING JOURNEY */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl bg-indigo-100/80 blur-xl" />
            <img
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1100&q=85"
              alt="Student studying and taking notes"
              loading="lazy"
              className="relative h-72 w-full rounded-3xl object-cover shadow-xl sm:h-96"
            />

            <div className="absolute -bottom-5 right-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:-right-5 sm:p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={24} />
                </span>
                <div>
                  <p className="font-extrabold text-slate-900">
                    One step at a time
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Your learning, your pace
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-indigo-600">
              Learning made personal
            </span>

            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl">
              Your goals deserve a plan.
              <span className="text-indigo-600">
                {" "}Your progress deserves to be seen.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
              Smart Champs brings your learning journey into one place.
              Enroll in courses, return to your lessons, and see how far
              you've come.
            </p>

            <div className="mt-7 space-y-4">
              {[
                {
                  title: "Choose your next skill",
                  text: "Find a course that fits your interests.",
                },
                {
                  title: "Learn one lesson at a time",
                  text: "Build consistency at a comfortable pace.",
                },
                {
                  title: "Celebrate your progress",
                  text: "Track completed lessons in My Learning.",
                },
              ].map((item, index) => (
                <div key={item.title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm font-extrabold text-indigo-700">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/my-learning"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition hover:-translate-y-0.5 hover:bg-indigo-700"
            >
              Open My Learning
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-4 pb-14 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-16 lg:py-16">
          <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-indigo-600/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-indigo-200">
                <Zap size={14} />
                YOUR NEXT CHAPTER
              </span>

              <h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                Great things start with a single lesson.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Take the next step toward your goals. Discover a course
                and start building skills today.
              </p>
            </div>

            <Link
              to="/courses"
              className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-white px-6 py-4 text-sm font-extrabold text-slate-950 transition hover:-translate-y-0.5 hover:bg-indigo-50 lg:self-center"
            >
              Find your course
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}