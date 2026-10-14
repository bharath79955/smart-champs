import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Eye,
  EyeOff,
  GraduationCap,
  LockKeyhole,
  Mail,
  UserRound,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;

    const name = formData.name.trim();
    const email = formData.email.trim();

    if (!name || !email || !formData.password || !formData.confirmPassword) {
      toast.error("Please complete all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must contain at least 8 characters.");
      return;
    }

    if (!/[A-Z]/.test(formData.password)) {
      toast.error("Password must contain an uppercase letter.");
      return;
    }

    if (!/\d/.test(formData.password)) {
      toast.error("Password must contain a number.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = register({
        name,
        email,
        password: formData.password,
      });

      if (!result.success) {
        toast.error(result.message || "Registration failed.");
        return;
      }

      toast.success("Account created successfully!");
      navigate("/my-learning", { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  }

  const passwordChecks = [
    { label: "At least 8 characters", valid: formData.password.length >= 8 },
    {
      label: "Contains an uppercase letter",
      valid: /[A-Z]/.test(formData.password),
    },
    { label: "Contains a number", valid: /\d/.test(formData.password) },
  ];

  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-2">
      {/* Branding panel */}
      <section className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700 p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-violet-300/20 blur-3xl" />

        <div className="relative">
          <Link to="/" className="inline-flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-indigo-700">
              <GraduationCap size={27} />
            </span>
            <span>
              <span className="block text-xl font-extrabold">Smart Champs</span>
              <span className="text-xs tracking-widest text-indigo-100">
                LEARN. GROW. SUCCEED.
              </span>
            </span>
          </Link>

         
        </div>

        <div className="relative max-w-lg">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
            <BookOpen size={29} />
          </div>

          <h1 className="text-4xl font-extrabold leading-tight xl:text-5xl">
            Invest in yourself. Build your future.
          </h1>

          <p className="mt-5 text-base leading-8 text-indigo-100">
            Create your learning account and discover courses that help you
            develop new skills and reach your goals.
          </p>

          <div className="mt-9 space-y-4">
            {[
              "Learn at your own pace",
              "Track your learning progress",
              "Build skills for your career",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <CheckCircle2 size={19} className="text-indigo-200" />
                <span className="text-sm text-indigo-50">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-sm text-indigo-100">
          © {new Date().getFullYear()} Smart Champs
        </p>
      </section>

      {/* Registration form */}
      <section className="flex items-center justify-center px-5 py-8 sm:px-10 sm:py-10 lg:px-12">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="mb-7 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
          >
            <ArrowLeft size={17} />
            Back to Home
          </Link>

          <div className="mb-7">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <UserRound size={24} />
            </span>

            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900">
              Create your account
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Sign up to enroll in courses and track your progress.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700">
                Full name
              </label>
              <div className="relative">
                <UserRound size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  maxLength={80}
                  className="w-full rounded-xl border border-slate-200 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
                Email address
              </label>
              <div className="relative">
                <Mail size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-slate-200 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>
              <div className="relative">
                <LockKeyhole size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  minLength={8}
                  required
                  className="w-full rounded-xl border border-slate-200 py-3.5 pl-11 pr-12 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {formData.password && (
                <div className="mt-3 space-y-2">
                  {passwordChecks.map((check) => (
                    <p
                      key={check.label}
                      className={`flex items-center gap-2 text-xs ${
                        check.valid ? "text-emerald-600" : "text-slate-400"
                      }`}
                    >
                      <CheckCircle2 size={14} />
                      {check.label}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-slate-700">
                Confirm password
              </label>
              <div className="relative">
                <LockKeyhole size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  required
                  className="w-full rounded-xl border border-slate-200 py-3.5 pl-11 pr-12 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((visible) => !visible)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:text-slate-700"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-indigo-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-700">
              Sign in
            </Link>
          </p>

          <p className="mt-7 text-center text-xs leading-5 text-slate-400">
            Demo registration only. Do not use a real password.
          </p>
        </div>
      </section>
    </div>
  );
}