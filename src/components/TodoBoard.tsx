"use client";

import React, { useState, useEffect } from "react";
import { useTodos } from "@/context/TodoContext";
import Column from "./Column";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import { createPortal } from "react-dom";
import Card from "./Card";

export default function TodoBoard() {
  const { todos, moveTodo } = useTodos();
  const [activeTodoId, setActiveTodoId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const columns = {
    todo: todos.filter((t) => t.column === "todo"),
    inprogress: todos.filter((t) => t.column === "inprogress"),
    done: todos.filter((t) => t.column === "done"),
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveTodoId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTodoId(null);
    if (!over) return;

    const todoId = active.id as string;
    const newColumn = over.id as "todo" | "inprogress" | "done";

    moveTodo(todoId, newColumn);
  };

  const activeTodo = todos.find((t) => t.id === activeTodoId) || null;

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex gap-6">
        <Column id="todo" title="To do" items={columns.todo} status="todo" />
        <Column
          id="inprogress"
          title="In progress"
          items={columns.inprogress}
          status="inprogress"
        />
        <Column id="done" title="Done" items={columns.done} status="done" />
      </div>
      {mounted &&
        createPortal(
          <DragOverlay>
            {activeTodo ? <Card todo={activeTodo} /> : null}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );
}
