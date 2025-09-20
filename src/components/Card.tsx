"use client";

import React from "react";
import { Todo } from "@/types";
import { useTodos } from "@/context/TodoContext";
import { MessageSquare, Paperclip, Menu } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";

export default function Card({ todo }: { todo: Todo }) {
  const { updateTodo, moveTodo, deleteTodo } = useTodos();

  // make the card draggable
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: todo.id, // unique identifier for drag
      data: { todo }, // pass todo data along
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  const inc = () => {
    const next = Math.min(10, todo.progress + 1);
    updateTodo(todo.id, {
      progress: next,
      column: next >= 10 ? "done" : todo.column,
    });
  };

  const dec = () => {
    const next = Math.max(0, todo.progress - 1);
    updateTodo(todo.id, { progress: next });
  };

  const moveLeft = () => {
    if (todo.column === "inprogress") moveTodo(todo.id, "todo");
    else if (todo.column === "done") moveTodo(todo.id, "inprogress");
  };

  const moveRight = () => {
    if (todo.column === "todo") moveTodo(todo.id, "inprogress");
    else if (todo.column === "inprogress") moveTodo(todo.id, "done");
  };

  const progressPercent = Math.round((todo.progress / 10) * 100);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition-shadow ${
        isDragging ? "shadow-lg" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-sm text-gray-900">{todo.title}</h3>
          {todo.project && (
            <p className="text-xs text-gray-400">{todo.project}</p>
          )}
        </div>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="text-gray-400 hover:text-red-500"
        >
          •••
        </button>
      </div>

      {/* Progress */}
      <div className="mt-3">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Menu size={12} className="text-gray-400" />
            Progress
          </span>
          <span className="font-medium">{todo.progress}/10</span>
        </div>
        <div className="h-1.5 mt-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            style={{ width: `${progressPercent}%` }}
            className={`h-1.5 rounded-full transition-all ${
              todo.progress >= 10 ? "bg-green-500" : "bg-orange-400"
            }`}
          ></div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <span className="px-3 py-1 bg-gray-100 rounded-md text-gray-600 font-medium">
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
