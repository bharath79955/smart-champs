import { useMemo, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  GraduationCap,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import CourseCard from "../components/CourseCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import { courses } from "../data/courses";
import { useLearning } from "../context/LearningContext";
import { useAuth } from "../context/AuthContext";

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("q") || ""
  );

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All"
  );

  const [sortBy, setSortBy] = useState("rating");

  const { enroll, isEnrolled } = useLearning();
  const { isAuthenticated } = useAuth();

  const featuredCourse = useMemo(() => {
    if (!courses.length) return null;

    return [...courses].sort(
      (a, b) => Number(b.rating || 0) - Number(a.rating || 0)
    )[0];
  }, []);

  const filteredCourses = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    const filtered = courses.filter((course) => {
      const matchesCategory =
        selectedCategory === "All" ||
        selectedCategory === "All Courses" ||
        course.category?.toLowerCase() === selectedCategory.toLowerCase();

      const searchableText = [
        course.title,
        course.instructor,
        course.category,
        course.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchableText.includes(query);
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return Number(a.price || 0) - Number(b.price || 0);

        case "price-high":
          return Number(b.price || 0) - Number(a.price || 0);

        case "title":
          return a.title.localeCompare(b.title);

        default:
          return Number(b.rating || 0) - Number(a.rating || 0);
      }
    });
  }, [searchTerm, selectedCategory, sortBy]);

  function handleSearchChange(value) {
    setSearchTerm(value);

    const nextParams = new URLSearchParams(searchParams);

    if (value.trim()) {
      nextParams.set("q", value);
    } else {
      nextParams.delete("q");
    }

    setSearchParams(nextParams, { replace: true });
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);

    const nextParams = new URLSearchParams(searchParams);

    if (category === "All" || category === "All Courses") {
      nextParams.delete("category");
    } else {
      nextParams.set("category", category);
    }

    setSearchParams(nextParams, { replace: true });
  }

  function handleEnroll(course) {
    if (!isAuthenticated) {
      toast.error("Please log in to enroll in a course.");

      navigate("/login", {
        state: { from: `/courses/${course.id}` },
      });

      return;
    }

    const result = enroll(course.id);

    if (!result.success) {
      toast.error(result.message || "Unable to enroll.");
      return;
    }

    if (result.alreadyEnrolled) {
      toast("You're already enrolled in this course.");
      return;
    }

    toast.success(`Enrolled in ${course.title}!`);
  }

  function clearFilters() {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortBy("rating");
    setSearchParams({});
  }

  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    selectedCategory !== "All" ||
    sortBy !== "rating";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Featured hero section */}
      <section className="relative overflow-hidden border-b border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-violet-50">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-violet-200/40 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-16">
          {/* Left side */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-bold text-indigo-700 shadow-sm">
              <Sparkles size={16} />
              Learn something new
            </span>

            <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Explore courses that move you{" "}
              <span className="text-indigo-600">forward.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Build practical skills, learn from experienced instructors,
              and make progress at your own pace.
            </p>

            <form
              onSubmit={(event) => {
                event.preventDefault();

                if (searchTerm.trim()) {
                  navigate(
                    `/courses?q=${encodeURIComponent(searchTerm.trim())}`
                  );
                }
              }}
              className="mt-7"
            >
              <div className="flex max-w-xl flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg shadow-indigo-100/50 sm:flex-row">
                <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
                  <Search size={20} className="shrink-0 text-slate-400" />

                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(event) => handleSearchChange(event.target.value)}
                    placeholder="Search courses, skills, or instructors..."
                    aria-label="Search courses"
                    className="w-full min-w-0 border-0 bg-transparent py-3 text-sm text-slate-800 outline-none focus:ring-0"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white transition hover:bg-indigo-700"
                >
                  Search courses
                  <ArrowRight size={17} />
                </button>
              </div>
            </form>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <BookOpen size={17} className="text-indigo-600" />
                Practical courses
              </span>

              <span className="flex items-center gap-2">
                <GraduationCap size={17} className="text-indigo-600" />
                Self-paced learning
              </span>
            </div>
          </div>

          {/* Right-side featured course */}
          {featuredCourse && (
            <div className="relative mx-auto w-full max-w-lg lg:ml-auto">
              <div className="absolute -inset-4 rounded-3xl bg-indigo-200/50 blur-2xl" />

              <article className="relative overflow-hidden rounded-3xl border border-white bg-white p-3 shadow-2xl shadow-indigo-200/50">
                <div className="relative">
                  <img
                    src={featuredCourse.image}
                    alt={featuredCourse.title}
                    className="h-56 w-full rounded-2xl object-cover sm:h-72"
                  />

                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-xs font-extrabold text-indigo-700 shadow-sm">
                    <Sparkles size={14} />
                    FEATURED COURSE
                  </span>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700">
                      {featuredCourse.category}
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-500">
                      <Star size={16} fill="currentColor" />
                      {featuredCourse.rating}
                    </span>
                  </div>

                  <h2 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-2xl">
                    {featuredCourse.title}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    By {featuredCourse.instructor}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <BookOpen size={15} />
                      {featuredCourse.lessons} lessons
                    </span>

                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 size={15} />
                      {featuredCourse.duration}
                    </span>

                    <span className="inline-flex items-center gap-1.5">
                      <Users size={15} />
                      {featuredCourse.level}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
                    <span className="text-2xl font-extrabold text-slate-900">
                      {Number(featuredCourse.price) === 0
                        ? "Free"
                        : `₹${featuredCourse.price}`}
                    </span>

                    <Link
                      to={`/courses/${featuredCourse.id}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                    >
                      View course
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          )}
        </div>
      </section>

      {/* Course listing */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
              Find your next skill
            </p>

            <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              All courses
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {filteredCourses.length}{" "}
              {filteredCourses.length === 1 ? "course" : "courses"} found
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label
              htmlFor="course-sort"
              className="flex items-center gap-2 text-sm font-semibold text-slate-600"
            >
              <SlidersHorizontal size={17} />
              Sort by
            </label>

            <select
              id="course-sort"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="rating">Highest rated</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="title">Course name</option>
            </select>
          </div>
        </div>

        <div className="mb-7">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {hasActiveFilters && (
          <div className="mb-6">
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
            >
              <X size={15} />
              Clear filters
            </button>
          </div>
        )}

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                enrolled={isEnrolled(course.id)}
                onEnroll={handleEnroll}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <BookOpen size={26} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              No courses found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Try another search term or choose a different category.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Show all courses
            </button>
          </div>
        )}

        {/* Bottom call to action */}
        <div className="mt-12 flex flex-col justify-between gap-5 rounded-3xl bg-indigo-600 px-6 py-8 text-white sm:px-10 sm:py-10 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-2xl font-extrabold">
              Ready to continue your learning journey?
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100 sm:text-base">
              Track your enrolled courses and keep building your skills.
            </p>
          </div>

          <Link
            to="/my-learning"
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-white px-5 py-3 font-bold text-indigo-700 transition hover:bg-indigo-50 lg:self-center"
          >
            Go to My Learning
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  );
}