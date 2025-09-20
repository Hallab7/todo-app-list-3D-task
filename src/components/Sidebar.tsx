"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTodos } from "@/context/TodoContext";
import { useTheme } from "@/context/ThemeContext";
import {
  User,
  Calendar,
  Map,
  SlidersHorizontal,
  LogOut,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import DashboardIcon from "../assets/icons/dashboard.svg";
import Logo from "../assets/icons/logo.svg";
import ChartIcon from "../assets/icons/chart.svg";
import UploadIcon from "../assets/icons/upload.svg";

export default function Sidebar() {
  const { todos } = useTodos();
  const { theme, setTheme } = useTheme();
  const darkMode = theme === "dark";

  const columns = {
    todo: todos.filter((t) => t.column === "todo"),
    inprogress: todos.filter((t) => t.column === "inprogress"),
    done: todos.filter((t) => t.column === "done"),
  };
  const doneTasks = columns.done.length;
  const inProgressTasks = columns.inprogress.length;
  const todoTasks = columns.todo.length;
  const totalTasks = doneTasks + inProgressTasks + todoTasks;

  const [showTeam, setShowTeam] = useState(false);
  const [showProjects, setShowProjects] = useState(true);
  const [showTasks, setShowTasks] = useState(true);
  const [showReminders, setShowReminders] = useState(false);
  const [showMessengers, setShowMessengers] = useState(false);

  const [activeLeft, setActiveLeft] = useState<
    | "dashboard"
    | "cube"
    | "user"
    | "calendar"
    | "chart"
    | "cloud"
    | "map"
    | "settings"
  >("dashboard");

  return (
    <div className={`flex ${darkMode ? "bg-[#0b0b0c]" : "bg-white"}`}>
      {/* ---------- LEFT DARK VERTICAL BAR ---------- */}
      <div className="fixed top-0 left-0 w-14 h-screen flex flex-col justify-between items-center py-4 px-8 bg-[#1C1D22]">
        <div className="flex flex-col items-center gap-6">
          {/* top dots */}
          <div className="pt-1 flex gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-100/90" />
            <span className="w-1.5 h-1.5 rounded-full bg-gray-100/50" />
            <span className="w-1.5 h-1.5 rounded-full bg-gray-100/20" />
          </div>

          {/* logo */}
          <button
            aria-label="App logo"
            onClick={() => setActiveLeft("cube")}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              activeLeft === "cube" ? "bg-gray-700" : "hover:bg-gray-800/40"
            }`}
          >
            <Image src={Logo} alt="Logo" className="w-6 h-6" />
          </button>

          {/* dashboard */}
          <button
            aria-label="Dashboard"
            onClick={() => setActiveLeft("dashboard")}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              activeLeft === "dashboard" ? "bg-gray-700" : "hover:bg-gray-800/40"
            }`}
          >
            <Image src={DashboardIcon} alt="Dashboard" className="w-6 h-6" />
          </button>

          {/* user */}
          <button
            aria-label="User"
            onClick={() => setActiveLeft("user")}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              activeLeft === "user" ? "bg-gray-700" : "hover:bg-gray-800/40"
            }`}
          >
            <User
              className={`w-5 h-5 ${
                activeLeft === "user" ? "text-white" : "text-gray-400"
              }`}
            />
          </button>

          {/* calendar */}
          <button
            aria-label="Calendar"
            onClick={() => setActiveLeft("calendar")}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              activeLeft === "calendar" ? "bg-gray-700" : "hover:bg-gray-800/40"
            }`}
          >
            <Calendar
              className={`w-5 h-5 ${
                activeLeft === "calendar" ? "text-white" : "text-gray-400"
              }`}
            />
          </button>

          {/* chart */}
          <button
            aria-label="Chart"
            onClick={() => setActiveLeft("chart")}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              activeLeft === "chart" ? "bg-gray-700" : "hover:bg-gray-800/40"
            }`}
          >
            <Image src={ChartIcon} alt="Chart" className="w-6 h-6" />
          </button>

          {/* cloud */}
          <button
            aria-label="Cloud"
            onClick={() => setActiveLeft("cloud")}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              activeLeft === "cloud" ? "bg-gray-700" : "hover:bg-gray-800/40"
            }`}
          >
            <Image src={UploadIcon} alt="Cloud" className="w-6 h-6" />
          </button>

          {/* map */}
          <button
            aria-label="Map"
            onClick={() => setActiveLeft("map")}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              activeLeft === "map" ? "bg-gray-700" : "hover:bg-gray-800/40"
            }`}
          >
            <Map
              className={`w-5 h-5 ${
                activeLeft === "map" ? "text-white" : "text-gray-400"
              }`}
            />
          </button>

          {/* settings */}
          <button
            aria-label="Settings"
            onClick={() => setActiveLeft("settings")}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              activeLeft === "settings" ? "bg-gray-700" : "hover:bg-gray-800/40"
            }`}
          >
            <SlidersHorizontal
              className={`w-5 h-5 ${
                activeLeft === "settings" ? "text-white" : "text-gray-400"
              }`}
            />
          </button>
        </div>

        {/* logout */}
        <div className="mb-1">
          <LogOut className="w-5 h-5 text-gray-400 hover:text-white" />
        </div>
      </div>

      {/* ---------- MAIN SIDEBAR ---------- */}
      <aside
        className={`ml-14 w-[220px] min-h-screen px-6 pt-6 flex flex-col justify-between border-r ${
    darkMode
      ? "bg-[#222327] text-gray-200 border-[#2C2C2E]"
      : "bg-white text-gray-900 border-gray-200"
  }`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="text-xl font-bold">Projects</div>
            <div>
              <button
                className={`w-6 h-6 rounded-full flex items-center justify-center text-lg cursor-pointer ${
                  darkMode
                    ? "bg-[#2C2C2E] text-gray-300"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                +
              </button>
            </div>
          </div>

          {/* Projects */}
          <div className="mb-6">
            <div
              className={`text-sm font-semibold flex items-center justify-between ${
                darkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              <span>Projects</span>
              <button
                onClick={() => setShowProjects(!showProjects)}
                className="p-1"
              >
                {showProjects ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
            <ul
              className={`relative mt-3 space-y-2 text-sm pl-2 transition-all duration-300 ease-in-out ${
                showProjects
                  ? "max-h-60 opacity-100"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              {/* Vertical line */}
              <span
                className="absolute left-1 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-600"
                aria-hidden="true"
              ></span>

              <li className="relative pl-6 text-gray-500 before:content-[''] before:absolute before:-left-1 before:top-1/2 before:w-4 before:h-px before:bg-gray-300 dark:before:bg-gray-600">
                All projects (3)
              </li>

              <li
                className={`relative pl-6 py-1 px-2 font-medium before:content-[''] before:absolute -before:-left-1 before:top-1/2 before:w-4 before:h-px ${
                  darkMode
                    ? "bg-[#2D2D2F] text-white border-gray-500 before:bg-gray-600"
                    : "bg-gray-100 text-gray-900 border-gray-300 before:bg-gray-300"
                }`}
              >
                Design system
              </li>

              <li className="relative pl-6 text-gray-400 before:content-[''] before:absolute before:-left-1 before:top-1/2 before:w-4 before:h-px before:bg-gray-300 dark:before:bg-gray-600">
                User flow
              </li>

              <li className="relative pl-6 text-gray-400 before:content-[''] before:absolute before:-left-1 before:top-1/2 before:w-4 before:h-px before:bg-gray-300 dark:before:bg-gray-600">
                UX research
              </li>
            </ul>
          </div>

          {/* Tasks */}
          <div className="mb-6">
            <div
              className={`text-sm font-semibold flex items-center justify-between ${
                darkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              <span>Tasks</span>
              <button onClick={() => setShowTasks(!showTasks)} className="p-1">
                {showTasks ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
            <ul
              className={`relative mt-3 space-y-2 text-sm pl-2 transition-all duration-300 ease-in-out ${
                showTasks
                  ? "max-h-60 opacity-100"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              <span
                className="absolute left-1 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-600"
                aria-hidden="true"
              ></span>

              <li className="relative pl-6 text-gray-500 before:content-[''] before:absolute before:-left-1 before:top-1/2 before:w-4 before:h-px before:bg-gray-300 dark:before:bg-gray-600">
                All tasks ({totalTasks})
              </li>

              <li className="relative pl-6 text-gray-500 before:content-[''] before:absolute before:-left-1 before:top-1/2 before:w-4 before:h-px before:bg-gray-300 dark:before:bg-gray-600">
                To do ({todoTasks})
              </li>

              <li
                className={`relative pl-6 py-1 px-2 font-medium before:content-[''] before:absolute before:-left-1 before:top-1/2 before:w-4 before:h-px ${
                  darkMode
                    ? "bg-[#2D2D2F] text-white border-gray-500 before:bg-gray-600"
                    : "bg-gray-100 text-gray-900 border-gray-300 before:bg-gray-300"
                }`}
              >
                In Progress ({inProgressTasks})
              </li>

              <li className="relative pl-6 text-gray-400 before:content-[''] before:absolute before:-left-1 before:top-1/2 before:w-4 before:h-px before:bg-gray-300 dark:before:bg-gray-600">
                Done ({doneTasks})
              </li>
            </ul>
          </div>

          {/* Reminders */}
          <div className="mb-6">
            <div
              className={`text-sm font-semibold flex items-center justify-between ${
                darkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              <span>Reminders</span>
              <button
                onClick={() => setShowReminders(!showReminders)}
                className="p-1"
              >
                {showReminders ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
            
          </div>

          {/* Messengers */}
          <div className="mb-6">
            <div
              className={`text-sm font-semibold flex items-center justify-between ${
                darkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              <span>Messengers</span>
              <button
                onClick={() => setShowMessengers(!showMessengers)}
                className="p-1"
              >
                {showMessengers ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Theme Toggle */}
        <div
          className={`flex justify-between items-center text-sm p-1 rounded-full mb-6 ${
            darkMode
              ? "bg-[#2D2D2F] text-gray-200"
              : "bg-gray-100 text-gray-700 border border-gray-200"
          }`}
        >
          <button
            onClick={() => setTheme("light")}
            className={`flex items-center gap-2 p-2 rounded-full ${
              !darkMode
                ? "bg-white text-gray-900"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {/* Sun */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <line x1="12" y1="2" x2="12" y2="4" />
              <line x1="12" y1="20" x2="12" y2="22" />
              <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
              <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
              <line x1="2" y1="12" x2="4" y2="12" />
              <line x1="20" y1="12" x2="22" y2="12" />
              <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
              <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
            </svg>
            <span>Light</span>
          </button>

          <button
            onClick={() => setTheme("dark")}
            className={`flex items-center gap-2 p-2 rounded-full ${
              darkMode
                ? "bg-[#444] text-white"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {/* Moon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
            </svg>
            <span>Dark</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
