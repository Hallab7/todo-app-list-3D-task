"use client";

import React from "react";
import { Todo } from "@/types";
import { useTodos } from "@/context/TodoContext";
import { MessageSquare, Paperclip, Menu } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import { useTheme } from "@/context/ThemeContext";

export default function Card({ todo }: { todo: Todo }) {
  const { updateTodo, moveTodo, deleteTodo } = useTodos();
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: todo.id,
      data: { todo },
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  const progressPercent = Math.round((todo.progress / 10) * 100);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`w-full p-4 rounded-lg border transition-shadow ${
        isDragging ? "shadow-lg" : "shadow-sm"
      } ${
        darkMode
          ? "bg-[#292B31] border-gray-700 text-gray-200"
          : "bg-white border-gray-100 text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between w-full">
        <div>
          <h3
            className={`font-semibold text-sm ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            {todo.title}
          </h3>
          {todo.project && (
            <p className={darkMode ? "text-gray-500 text-xs" : "text-gray-400 text-xs"}>
              {todo.project}
            </p>
          )}
        </div>
        <button
          onClick={() => deleteTodo(todo.id)}
          className={`w-7 h-7 rounded-full text-sm border border-2  hover:text-gray-500 ${
            darkMode ? "border-white/10  text-gray-500" : "text-gray-400"
          }`}
        >
          •••
        </button>
      </div>

      {/* Progress */}
      <div className="mt-3">
        <div
          className={`flex items-center justify-between text-xs ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <span className="flex items-center gap-1">
            <Menu size={12} className={darkMode ? "text-gray-500" : "text-gray-400"} />
            Progress
          </span>
          <span className="font-medium">{todo.progress}/10</span>
        </div>
        <div
          className={`h-1.5 mt-1 rounded-full overflow-hidden ${
            darkMode ? "bg-gray-700" : "bg-gray-200"
          }`}
        >
          <div
            style={{ width: `${progressPercent}%` }}
            className={`h-1.5 rounded-full transition-all ${
              todo.progress <= 4 ? "bg-[#FF7979]" : ( todo.progress >=10) ? "bg-green-500" : "bg-orange-400"
            }`}
          ></div>
        </div>
      </div>

      {/* Footer */}
      <div
        className={`mt-4 flex items-center justify-between text-xs ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        <span
          className={`px-3 py-1 rounded-md font-medium ${
            darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"
          }`}
        >
          {todo.date || "No date"}
        </span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <MessageSquare size={14} /> {todo.messageNo || ""}
          </span>
          <span className="flex items-center gap-1">
            <Paperclip size={14} /> {todo.messageNo || ""}
          </span>
        </div>
      </div>
    </div>
  );
}
