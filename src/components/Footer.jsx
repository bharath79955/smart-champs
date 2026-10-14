import { Link } from "react-router-dom";
import {
  GraduationCap,
  Mail,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 lg:grid-cols-4 lg:px-16 lg:py-16">
        <div className="lg:col-span-2">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 text-white">
              <GraduationCap size={25} />
            </span>
            <span className="text-xl font-extrabold text-white">
              Smart <span className="text-indigo-400">Champs</span>
            </span>
          </Link>

          <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
            Build valuable skills, discover new interests, and take the
            next step in your learning journey with Smart Champs.
          </p>

          <a
            href="mailto:hello@smartchamps.example"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium transition hover:text-white"
          >
            <Mail size={16} />
            Contact our team
          </a>
        </div>

        <div>
          <h3 className="font-bold text-white">Explore</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link className="hover:text-white" to="/">
              Home
            </Link>
            <Link className="hover:text-white" to="/courses">
              All Courses
            </Link>
            <Link className="hover:text-white" to="/my-learning">
              My Learning
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-white">Get Started</h3>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            Find your next course and start learning today.
          </p>
          <Link
            to="/courses"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-500"
          >
            Browse courses <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-slate-500 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-16">
          <p>
            © {new Date().getFullYear()} Smart Champs. All rights reserved.
          </p>
          <p>Learn more. Grow further.</p>
        </div>
      </div>
    </footer>
  );
}