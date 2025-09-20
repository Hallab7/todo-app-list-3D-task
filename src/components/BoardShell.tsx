"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import TodoBoard from "./TodoBoard";
import BoardIcon from "../assets/icons/board.svg"

export default function BoardShell() {
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  return (
    <div
      className={`flex items-start   gap-6 ${
        darkMode ? "bg-[#2A2B2F] text-gray-200" : ""
      }`}
    >
      <div className="flex-1">
        {/* Header */}
        <div className={`pb-2 pl-4 mb-4 flex border-b-2  items-center justify-between
          ${darkMode ? "border-gray-700" : "border-gray-300"}`}>
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium">
              <Image src={BoardIcon} alt="Board Icon" className="inline mr-2 mb-1" /> 
              Board view</div>
            <div className="text-sm text-gray-400">|</div>
            <div className="text-sm text-gray-400 flex items-center cursor-pointer gap-1">
              <span
              className={`w-4 h-4 rounded-full flex items-center justify-center text-sm ${
                darkMode
                  ? "bg-white/10 text-gray-300"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              +
            </span>
              Add view</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className={`px-3 py-1 text-md  ${
                darkMode
                  ? "text-gray-200"
                  : "text-gray-700"
              }`}
            >
              Filter
            </button>
            <button
              className={`px-3 py-1 text-md  ${
                darkMode
                  ? "text-gray-200"
                  : " text-gray-700"
              }`}
            >
              Sort

            </button>
            <button
          className={`w-7 h-7 rounded-full text-xs border border-2  hover:text-gray-500 ${
            darkMode ? "border-white/10  text-gray-500" : "text-gray-400"
          }`}
        >
          •••
        </button>
            <button
              className={`px-3 py-2 px-2 rounded-full text-sm ml-3 ${
                darkMode
                  ? "bg-[#4B69FF] text-white hover:bg-gray-600"
                  : "bg-[#4B69FF] text-white hover:bg-gray-800"
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
