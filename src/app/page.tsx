"use client";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import BoardShell from "@/components/BoardShell";
import { useTodos } from "@/context/TodoContext";
import { useTheme } from "@/context/ThemeContext";
import { Calendar, Bell, Search } from "lucide-react";
import AvatarIcon from "../assets/icons/avatar.png";
import CubeBackground from "@/components/CubeBackground";

export default function Page() {
  const { todos } = useTodos();  
  const { theme } = useTheme();
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

  const percentageProgress =
    totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div
      className={`min-h-screen flex ${
        darkMode ? "bg-[#2A2B2F] text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold relative z-10">
              Welcome back, Vincent 👋
            </h1>
            <div className="relative">
              <div className="absolute -top-12 -left-20 w-32 h-32 z-0">
                <CubeBackground percentage={percentageProgress} size={1.2} />
              </div>
            </div>

            <div className="flex items-center gap-5 font-semibold">
              <Search
                className={`hidden sm:block text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}
                size={20}
              />
              <Bell
                className={`hidden sm:block text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}
                size={20}
              />
              <div
                className={`hidden sm:flex items-center text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                <Calendar className="inline mr-2" size={20} />
                {formatDate(new Date())}
              </div>
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <Image src={AvatarIcon} alt="avatar" width={32} height={32} />
              </div>
            </div>
          </div>

          {/* Board container */}
          <div className={`${darkMode ? "bg-[#2A2B2F]" : ""}`}>
            <BoardShell />
          </div>
        </div>
      </main>
    </div>
  );
}
