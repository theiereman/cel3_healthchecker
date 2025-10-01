import { useTheme } from "../../hooks/useTheme.ts";
import { Link, usePage } from "@inertiajs/react";

const Navbar = () => {
  const { url } = usePage();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="rounded-lg bg-stone-100 dark:bg-slate-800 p-4 px-6 flex items-center gap-6 text-slate-900 dark:text-slate-100">
      <div className="flex flex-1 gap-6">
        <Link
          href="/"
          className={`hover:text-gray-300 ${url === "/" ? "font-bold" : ""}`}
        >
          Home
        </Link>
        <Link
          href="/admin/cels"
          className={`hover:text-gray-300 ${url === "/admin/cels" ? "font-bold" : ""}`}
        >
          Admin
        </Link>
      </div>
      <button
        className="theme-toggle p-1 px-2 rounded-lg bg-neutral-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
        onClick={toggleTheme}
      >
        Switch to {isDarkMode ? "light mode" : "dark mode"}
      </button>
    </nav>
  );
};

export default Navbar;
