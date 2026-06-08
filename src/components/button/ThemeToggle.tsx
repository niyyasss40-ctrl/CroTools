import { useEffect, useState } from "react";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";

type Theme = "light" | "dark" | "system";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Ambil dari localStorage saat inisialisasi awal (SSR safe check)
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || "system";
    }
    return "system";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Fungsi untuk menerapkan tema berdasarkan pilihan
    const applyTheme = () => {
      if (theme === "system") {
        // Cek preferensi device (media query)
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
        root.setAttribute("data-theme", systemTheme);
      } else {
        root.setAttribute("data-theme", theme);
      }
    };

    applyTheme();
    localStorage.setItem("theme", theme);

    // Listener jika memilih 'system' dan user mengubah tema OS mereka di tengah jalan
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme();
      
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  return (
    <div className="inline-flex rounded-xl bg-gray-100 p-1 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50">
      <button
        onClick={() => setTheme("light")}
        className={`p-2 rounded-lg transition-all duration-200 ${
          theme === "light"
            ? "bg-white text-amber-500 shadow-sm"
            : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        }`}
        title="Light Mode"
      >
        <FiSun className="w-5 h-5" />
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-lg transition-all duration-200 ${
          theme === "dark"
            ? "bg-gray-900 text-indigo-400 shadow-sm"
            : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        }`}
        title="Dark Mode"
      >
        <FiMoon className="w-5 h-5" />
      </button>

      <button
        onClick={() => setTheme("system")}
        className={`p-2 rounded-lg transition-all duration-200 ${
          theme === "system"
            ? "bg-white dark:bg-gray-700 text-blue-500 dark:text-blue-400 shadow-sm"
            : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        }`}
        title="System Preference"
      >
        <FiMonitor className="w-5 h-5" />
      </button>
    </div>
  );
}