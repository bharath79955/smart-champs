import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Menu,
  X,
  BookOpen,
  LayoutDashboard,
  LogIn,
  LogOut,
  UserRound,
  UserPlus,
  ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

const navLinkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-semibold transition ${
    isActive
      ? "bg-indigo-50 text-indigo-700"
      : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
  }`;

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
  };

  function handleLogout() {
    const success = logout();

    closeMenus();

    if (success) {
      toast.success("You have been logged out.");
      navigate("/", { replace: true });
    } else {
      toast.error("Unable to log out. Please try again.");
    }
  }

  const links = [
    { to: "/", label: "Home", end: true, icon: GraduationCap },
    { to: "/courses", label: "Courses", icon: BookOpen },
    {
      to: "/my-learning",
      label: "My Learning",
      icon: LayoutDashboard,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <nav
        className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Brand */}
        <Link
          to="/"
          onClick={closeMenus}
          className="flex shrink-0 items-center gap-2.5"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-100">
            <GraduationCap size={24} />
          </span>

          <span>
            <span className="block text-lg font-extrabold tracking-tight text-slate-900">
              Smart Champs
            </span>
            <span className="hidden text-[10px] font-semibold tracking-[0.16em] text-slate-500 sm:block">
              LEARN. GROW. SUCCEED.
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={navLinkClass}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop account actions */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileMenuOpen((open) => !open)}
                aria-expanded={profileMenuOpen}
                aria-haspopup="menu"
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 transition hover:bg-slate-50"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-extrabold text-indigo-700">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>

                <span className="max-w-28 truncate text-sm font-semibold text-slate-700">
                  {user?.name?.split(" ")[0] || "My account"}
                </span>

                <ChevronDown size={16} className="text-slate-500" />
              </button>

              {profileMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full mt-2 w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"
                >
                  <div className="border-b border-slate-100 px-3 py-3">
                    <p className="truncate text-sm font-bold text-slate-900">
                      {user?.name}
                    </p>
                    <p className="mt-1 truncate text-xs text-slate-500">
                      {user?.email}
                    </p>
                  </div>

                  <Link
                    to="/my-learning"
                    onClick={closeMenus}
                    role="menuitem"
                    className="mt-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    <LayoutDashboard size={17} />
                    My Learning
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    role="menuitem"
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={17} />
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                <LogIn size={17} />
                Sign in
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-100 transition hover:bg-indigo-700"
              >
                <UserPlus size={17} />
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={
            mobileMenuOpen ? "Close navigation" : "Open navigation"
          }
          aria-expanded={mobileMenuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 md:hidden"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg md:hidden">
          <div className="mx-auto max-w-7xl space-y-1">
            {links.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={closeMenus}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-slate-700 hover:bg-slate-50"
                    }`
                  }
                >
                  <Icon size={18} />
                  {link.label}
                </NavLink>
              );
            })}

            {isAuthenticated ? (
              <>
                <div className="my-2 rounded-xl bg-slate-50 p-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-slate-900">
                        {user?.name}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenus}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <LogIn size={18} />
                  Sign in
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenus}
                  className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                >
                  <UserRound size={18} />
                  Create account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}