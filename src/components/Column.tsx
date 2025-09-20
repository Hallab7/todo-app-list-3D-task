"use client";

import React, { useState } from "react";
import Card from "./Card";
import { Todo } from "@/types";
import { useTodos } from "@/context/TodoContext";
import { useDroppable } from "@dnd-kit/core";

type ColumnProps = {
  id: "todo" | "inprogress" | "done"; // droppable id
  title: string;
  items: Todo[];
  status: "todo" | "inprogress" | "done";
};

export default function Column({ id, title, items, status }: ColumnProps) {
  const { addTodo } = useTodos();
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
      className={`w-80 p-3 border-dashed border-2 rounded-lg flex flex-col transition-colors ${
        isOver ? "border-blue-500 bg-blue-50" : "border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-semibold">
          {title} <span className="text-gray-400">({items.length})</span>
        </div>
        <button
          className="text-xs text-gray-500"
          onClick={() => setAdding((s) => !s)}
        >
          + Add new task
        </button>
      </div>

      {adding && (
        <form onSubmit={submit} className="mb-2">
          <input
            className="w-full p-2 border rounded mb-2"
            placeholder="Task title"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-3 py-1 bg-black text-white rounded"
            >
              Add
            </button>
            <button
              type="button"
              className="px-3 py-1 border rounded"
              onClick={() => setAdding(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4 overflow-auto max-h-[64vh]">
        {items.map((item) => (
          <Card key={item.id} todo={item} />
        ))}
      </div>

      <div className="mt-auto text-xs text-gray-400 pt-2">
        Drag your task here...
      </div>
    </div>
  );
}
