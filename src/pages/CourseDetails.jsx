import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  GraduationCap,
  PlayCircle,
  Star,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";

import { courses } from "../data/courses";
import ProgressBar from "../components/ProgressBar";
import { useAuth } from "../context/AuthContext";
import { useLearning } from "../context/LearningContext";

const LESSONS = [
  "Introduction and course overview",
  "Core concepts and fundamentals",
  "Practical examples",
  "Hands-on project",
  "Review and next steps",
];

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const course = courses.find(
    (item) => String(item.id) === String(id)
  );

  const { isAuthenticated } = useAuth();
  const { enroll, isEnrolled, getProgress, updateProgress } =
    useLearning();

  const [progress, setProgress] = useState(0);

  const enrolled = course ? isEnrolled(course.id) : false;

  useEffect(() => {
    if (course && enrolled) {
      setProgress(getProgress(course.id));
    } else {
      setProgress(0);
    }
  }, [course, enrolled, getProgress]);

  if (!course) {
    return (
      <div className="min-h-[60vh] px-4 py-20 text-center">
        <BookOpen size={42} className="mx-auto text-indigo-600" />
        <h1 className="mt-5 text-3xl font-extrabold text-slate-900">
          Course not found
        </h1>
        <p className="mt-3 text-slate-500">
          This course may have been removed or is no longer available.
        </p>
        <Link
          to="/courses"
          className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white hover:bg-indigo-700"
        >
          Browse courses
        </Link>
      </div>
    );
  }

  const completedLessons = Math.min(
    LESSONS.length,
    Math.floor(progress / 20)
  );

  function handleEnroll() {
    if (!isAuthenticated) {
      toast.error("Please log in to enroll in this course.");

      navigate("/login", {
        state: { from: location.pathname },
      });

      return;
    }

    const result = enroll(course.id);

    if (!result.success) {
      toast.error(result.message || "Enrollment failed.");
      return;
    }

    if (result.alreadyEnrolled) {
      toast("You're already enrolled in this course.");
      return;
    }

    setProgress(0);
    toast.success("Successfully enrolled! Start learning.");
  }

  function completeNextLesson() {
    if (!enrolled) {
      toast.error("Enroll in this course first.");
      return;
    }

    if (progress >= 100) {
      toast.success("You've completed this course!");
      return;
    }

    const nextProgress = Math.min(100, progress + 20);
    const saved = updateProgress(course.id, nextProgress);

    if (saved) {
      setProgress(nextProgress);

      toast.success(
        nextProgress === 100
          ? "Congratulations! Course completed."
          : "Lesson marked as complete!"
      );
    } else {
      toast.error("Unable to save progress. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Course hero */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to courses
          </Link>

          <div className="mt-7 grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-indigo-500/20 px-3 py-1.5 text-sm font-semibold text-indigo-200">
                {course.category}
              </span>

              <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                {course.title}
              </h1>

              <p className="mt-5 leading-7 text-slate-300">
                {course.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-300">
                <span className="flex items-center gap-2">
                  <GraduationCap size={17} />
                  {course.instructor}
                </span>

                <span className="flex items-center gap-2">
                  <Star size={17} className="text-amber-400" />
                  {course.rating}
                </span>

                <span className="flex items-center gap-2">
                  <Clock size={17} />
                  {course.duration}
                </span>

                <span className="flex items-center gap-2">
                  <BookOpen size={17} />
                  {course.lessons} lessons
                </span>
              </div>
            </div>

            <img
              src={course.image}
              alt={course.title}
              className="h-64 w-full rounded-2xl object-cover shadow-2xl sm:h-80"
            />
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[1fr_340px] lg:px-8">
        <div className="space-y-7">
          {/* About */}
          <article className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-extrabold text-slate-900">
              About this course
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              {course.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-600">
                Level: {course.level}
              </span>
              <span className="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-600">
                Self-paced learning
              </span>
            </div>
          </article>

          {/* Curriculum */}
          <article className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <h2 className="text-xl font-extrabold text-slate-900">
                Course curriculum
              </h2>

              {enrolled && (
                <span className="text-sm font-semibold text-indigo-600">
                  {completedLessons} of {LESSONS.length} demo lessons completed
                </span>
              )}
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Sample lessons for the Smart Champs demonstration.
            </p>

            <div className="mt-5 divide-y divide-slate-100">
              {LESSONS.map((lesson, index) => {
                const completed =
                  enrolled && progress >= (index + 1) * 20;

                return (
                  <div
                    key={lesson}
                    className="flex items-center gap-3 py-4"
                  >
                    {completed ? (
                      <CheckCircle2
                        size={21}
                        className="shrink-0 text-emerald-500"
                      />
                    ) : (
                      <PlayCircle
                        size={21}
                        className="shrink-0 text-indigo-500"
                      />
                    )}

                    <span className="min-w-0 flex-1 text-sm font-medium text-slate-700">
                      <span className="mr-2 text-slate-400">
                        {String(index + 1).padStart(2, "0")}.
                      </span>
                      {lesson}
                    </span>

                    <span className="shrink-0 text-xs text-slate-400">
                      {completed ? "Completed" : `Lesson ${index + 1}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </article>
        </div>

        {/* Enrollment and progress card */}
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
          <p className="text-sm font-semibold text-slate-500">
            Course price
          </p>

          <p className="mt-1 text-3xl font-extrabold text-slate-900">
            {Number(course.price) === 0
              ? "Free"
              : `₹${course.price}`}
          </p>

          <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
            <ShieldCheck size={17} className="text-emerald-600" />
            Learn at your own pace
          </div>

          {enrolled ? (
            <>
              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-slate-700">
                    Your progress
                  </span>
                  <span className="text-sm font-extrabold text-indigo-600">
                    {progress}%
                  </span>
                </div>

                <ProgressBar progress={progress} />
              </div>

              <button
                type="button"
                onClick={completeNextLesson}
                disabled={progress >= 100}
                className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3.5 font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-emerald-600"
              >
                {progress >= 100
                  ? "Course completed"
                  : "Complete next lesson"}
              </button>

              <Link
                to="/my-learning"
                className="mt-3 flex w-full items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Back to My Learning
              </Link>
            </>
          ) : (
            <button
              type="button"
              onClick={handleEnroll}
              className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3.5 font-bold text-white transition hover:bg-indigo-700"
            >
              {isAuthenticated ? "Enroll in course" : "Log in to enroll"}
            </button>
          )}

          <p className="mt-4 text-center text-xs leading-5 text-slate-500">
            Your enrollment and progress are saved in this browser.
          </p>
        </aside>
      </section>
    </div>
  );
}