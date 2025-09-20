"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import TodoBoard from "./TodoBoard";

export default function BoardShell() {
  const { theme } = useTheme();
  const darkMode = theme === "dark"; // 👈 derive boolean

  return (
    <div
      className={`flex items-start gap-6 ${
        darkMode ? "bg-[#2A2B2F] text-gray-200" : ""
      }`}
    >
      <div className="flex-1">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium">Board view</div>
            <div className="text-sm text-gray-400">| Add view</div>
          </div>
          <div className="flex items-center gap-3">
            <button
              className={`px-3 py-1 rounded-full border text-sm ${
                darkMode
                  ? "border-gray-600 text-gray-200 hover:bg-gray-800"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              Filter
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm ${
                darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              New template
            </button>
          </div>
        </div>

        {/* Board */}
        <TodoBoard />
      </div>
    </div>
  );
}
