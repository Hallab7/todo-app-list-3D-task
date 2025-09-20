"use client";

import TodoProvider from "@/context/TodoContext";
import Sidebar from "@/components/Sidebar";
import BoardShell from "@/components/BoardShell";
import { useTheme } from "@/context/ThemeContext";
import { Calendar, Bell, Search } from "lucide-react";

export default function Page() {
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  const formatDate = (d: Date) => {
    const today = new Date();
    const isToday =
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear();

    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <TodoProvider>
      <div
        className={`min-h-screen flex ${
          darkMode ? "bg-[#2A2B2F] text-gray-100" : "bg-gray-50 text-gray-900"
        }`}
      >
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Welcome back, Vincent 👋</h1>
              <div className="flex items-center gap-2 font-semibold">
                <div
                  className={`hidden sm:block text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  <Search className="inline mr-4" size={20} />
                </div>
                <div
                  className={`hidden sm:block text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  <Bell className="inline mr-4" size={20} />
                </div>
                <div
                  className={`hidden sm:flex items-center text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  <Calendar className="inline mr-2" size={20} />
                  {formatDate(new Date())}
                </div>
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img src="/profile.jpg" alt="avatar" />
                </div>
              </div>
            </div>

            {/* Board container */}
            <div
              className={`rounded-2xl shadow ${
                darkMode ? "bg-[#2A2B2F]" : ""
              }`}
            >
              <BoardShell />
            </div>
          </div>
        </main>
      </div>
    </TodoProvider>
  );
}
