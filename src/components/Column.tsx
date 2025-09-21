"use client";

import React, { useState } from "react";
import Card from "./Card";
import { Todo } from "@/types";
import { useTodos } from "@/context/TodoContext";
import { useDroppable } from "@dnd-kit/core";
import { useTheme } from "@/context/ThemeContext";

type ColumnProps = {
  id: "todo" | "inprogress" | "done";
  title: string;
  items: Todo[];
  status: "todo" | "inprogress" | "done";
};

export default function Column({ id, title, items, status }: ColumnProps) {
  const { addTodo } = useTodos();
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  const [adding, setAdding] = useState(false);
  const [value, setValue] = useState("");

  const { setNodeRef, isOver } = useDroppable({ id });

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!value.trim()) return;

    addTodo(value.trim(), status);

    console.log(`Added ${value.trim()} to ${status}`);
    setValue("");
    setAdding(false);
  };

  return (
    <div
      ref={setNodeRef}
      className={`min-w-80 w-full p-4 px-6  rounded-lg flex flex-col transition-colors ${
        isOver
          ? darkMode
            ? "border-blue-400 bg-[#24262C]"
            : " border-blue-500 bg-blue-50"
          : darkMode
          ? "border-gray-700 bg-[#1a1b1f]"
          : "border-dashed border-2 border-gray-200 bg-white"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div
          className={`text-sm font-semibold ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          {title}{" "}
          <span className={darkMode ? "text-gray-500" : "text-gray-400"}>
            ({items.length})
          </span>
        </div>
        <button
          className={`text-xs flex gap-1 ${
            darkMode
              ? "text-gray-400 hover:text-gray-200"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setAdding((s) => !s)}
        >
          <span
              className={`w-4 h-4 rounded-full flex items-center justify-center text-sm ${
                darkMode
                  ? "bg-white/10 text-gray-300"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              +
            </span>
            Add new task
        </button>
        
              
      </div>

      {/* Add new task form */}
      {adding && (
        <form onSubmit={submit} className="mb-2">
          <input
            className={`w-full p-2 border rounded mb-2 ${
              darkMode
                ? "bg-[#0b0b0c] border-gray-600 text-gray-200 placeholder-gray-500"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
            }`}
            placeholder="Task title"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className={`px-3 py-1 rounded ${
                darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              Add
            </button>
            <button
              type="button"
              className={`px-3 py-1 border rounded ${
                darkMode
                  ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setAdding(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Cards */}
      <div className="space-y-4 overflow-auto max-h-[62vh] w-full">
        {items.map((item) => (
          <Card key={item.id} todo={item} />
        ))}
      </div>
    </div>
  );
}
