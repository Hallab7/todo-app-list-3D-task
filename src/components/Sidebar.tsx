"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTodos } from "@/context/TodoContext";
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
const { todos, addTodo } = useTodos();

  const columns = {
    todo: todos.filter(t => t.column === "todo"),
    inprogress: todos.filter(t => t.column === "inprogress"),
    done: todos.filter(t => t.column === "done")
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
  const [darkMode, setDarkMode] = useState(false);

  const [activeLeft, setActiveLeft] = useState<
    "dashboard" | "cube" | "user" | "calendar" | "chart" | "cloud" | "map" | "settings"
  >("dashboard");

  return (
    <div className={`flex ${darkMode ? "bg-[#0b0b0c]" : "bg-white"}`}>
      {/* ---------- LEFT DARK VERTICAL BAR ---------- */}
      <div className="w-14 min-h-screen flex flex-col justify-between items-center py-4 px-8 bg-[#111217]">
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
        className={`w-[220px] min-h-screen p-6 flex flex-col justify-between border-r ${
          darkMode
            ? "bg-[#1C1C1E] text-gray-200 border-[#2C2C2E]"
            : "bg-white text-gray-900 border-gray-200"
        }`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="text-xl font-bold">Projects</div>
            <div
              className={`w-6 h-6 rounded flex items-center justify-center text-lg cursor-pointer ${
                darkMode
                  ? "bg-[#2C2C2E] text-gray-300"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              +
            </div>
          </div>

          {/* Team */}
          <div className="mb-6">
            <div
              className={`text-sm font-semibold flex items-center justify-between ${
                darkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              <span>Team</span>
              <button onClick={() => setShowTeam(!showTeam)} className="p-1">
                {showTeam ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
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
              className={`mt-3 space-y-2 text-sm transition-all duration-300 ease-in-out ${
                showProjects
                  ? "max-h-60 opacity-100"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              <li className="pl-4 text-gray-500">All projects (3)</li>
              <li
                className={`pl-4 rounded-md py-1 px-2 font-medium border-l-2 ${
                  darkMode
                    ? "bg-[#2D2D2F] text-white border-gray-500"
                    : "bg-gray-100 text-gray-900 border-gray-300"
                }`}
              >
                Design system
              </li>
              <li className="pl-6 border-l text-gray-400">User flow</li>
              <li className="pl-6 border-l text-gray-400">Ux research</li>
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
              className={`mt-3 space-y-2 text-sm transition-all duration-300 ease-in-out ${
                showTasks
                  ? "max-h-60 opacity-100"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              <li className="pl-4 text-gray-500">All tasks ({totalTasks})</li>
              <li className="pl-6 border-l text-gray-500">To do ({todoTasks})</li>
              <li
                className={`pl-6 rounded-md py-1 px-2 font-medium border-l-2 ${
                  darkMode
                    ? "bg-[#2D2D2F] text-white border-gray-500"
                    : "bg-gray-100 text-gray-900 border-gray-300"
                }`}
              >
                In Progress ({inProgressTasks})
              </li>
              <li className="pl-6 border-l text-gray-400">Done ({doneTasks})</li>
            </ul>
          </div>

          {/* Reminders & Messengers */}
          <div className="mb-6 space-y-4">
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
          className={`flex justify-between items-center text-sm p-1 rounded-full ${
            darkMode
              ? "bg-[#2D2D2F] text-gray-200"
              : "bg-gray-100 text-gray-700 border border-gray-200"
          }`}
        >
          <button
            onClick={() => setDarkMode(false)}
            className={`flex items-center gap-2 p-2 rounded-full ${
              !darkMode
                ? "bg-white text-gray-900"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {/* Sunshine Icon */}
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
            onClick={() => setDarkMode(true)}
            className={`flex items-center gap-2 p-2 rounded-full ${
              darkMode
                ? "bg-[#444] text-white"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {/* Moon Icon */}
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                strokeWidth="1.6"
              />
            </svg>
            <span>Dark</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
