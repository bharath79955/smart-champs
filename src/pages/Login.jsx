import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Eye,
  EyeOff,
  GraduationCap,
  LockKeyhole,
  Mail,
} from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;

    if (!formData.email.trim() || !formData.password) {
      toast.error("Please enter your email and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = login({
        email: formData.email.trim(),
        password: formData.password,
      });

      if (!result.success) {
        toast.error(result.message || "Unable to log in.");
        return;
      }

      toast.success("Welcome back!");

      const requestedPath = location.state?.from;

      const destination =
        typeof requestedPath === "string" &&
        requestedPath.startsWith("/") &&
        !requestedPath.startsWith("//") &&
        !requestedPath.startsWith("/login") &&
        !requestedPath.startsWith("/register")
          ? requestedPath
          : "/my-learning";

      navigate(destination, { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-2">
      {/* Branding panel */}
      <section className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700 p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-violet-300/20 blur-3xl" />

        <div className="relative">
          <Link
            to="/"
            className="inline-flex items-center gap-3"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-indigo-700">
              <GraduationCap size={27} />
            </span>

            <span>
              <span className="block text-xl font-extrabold">
                Smart Champs
              </span>

              <span className="text-xs tracking-widest text-indigo-100">
                LEARN. GROW. SUCCEED.
              </span>
            </span>
          </Link>

          {/* Desktop Back to Home */}
       
        </div>

        <div className="relative max-w-lg">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
            <BookOpen size={29} />
          </div>

          <h1 className="text-4xl font-extrabold leading-tight xl:text-5xl">
            Your next achievement starts here.
          </h1>

          <p className="mt-5 text-base leading-8 text-indigo-100">
            Continue learning, build practical skills, and move closer
            to your career goals with Smart Champs.
          </p>

          <div className="mt-9 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
            <p className="text-sm leading-7 text-indigo-50">
              "Small steps every day lead to remarkable progress."
            </p>
          </div>
        </div>

        <p className="relative text-sm text-indigo-100">
          © {new Date().getFullYear()} Smart Champs
        </p>
      </section>

      {/* Login form */}
      <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-12">
        <div className="w-full max-w-md">
          {/* Back to Home - Desktop, Tablet, Mobile */}
          <Link
            to="/"
            className="mb-10 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition duration-300 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <div className="mb-8">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <LockKeyhole size={24} />
            </span>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900">
              Welcome back
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Sign in to access your courses and learning progress.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-12 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((visible) => !visible)
                  }
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Sign in button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-indigo-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-indigo-100 transition duration-300 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Register link */}
          <p className="mt-7 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-indigo-600 transition hover:text-indigo-700"
            >
              Create account
            </Link>
          </p>

          <p className="mt-8 text-center text-xs leading-5 text-slate-400">
            Demo authentication only. Do not use a real password.
          </p>
        </div>
      </section>
    </div>
  );
}