"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Todo, ColumnType, TodoState } from "@/types";

type Action =
  | { type: "INIT"; payload: Todo[] }
  | { type: "ADD"; payload: Todo }
  | { type: "UPDATE"; payload: { id: string; updates: Partial<Todo> } }
  | { type: "MOVE"; payload: { id: string; column: ColumnType } }
  | { type: "DELETE"; payload: { id: string } };

const sample: Todo[] = [
  { id: "t1", title: "Design new ui presentation", project: "Dribbble marketing", progress: 7, date: "24 Aug 2022", column: "todo", messageNo: 3 },
  { id: "t2", title: "Add more ui/ux mockups", project: "Pinterest promotion", progress: 4, date: "25 Aug 2022", column: "todo", messageNo: 1 },
  { id: "t3", title: "Design few mobile screens", project: "Dropbox mobile app", progress: 3, date: "26 Aug 2022", column: "todo", messageNo: 2 },
  { id: "t4", title: "Design system update", project: "Oreo website project", progress: 3, date: "12 Nov 2022", column: "inprogress", messageNo: 5 },
  { id: "t5", title: "Create brand guideline", project: "Oreo branding project", progress: 7, date: "13 Nov 2022", column: "inprogress", messageNo: 1 },
  { id: "t6", title: "Create wireframe for ios app", project: "Oreo ios app project", progress: 4, date: "14 Nov 2022", column: "inprogress", messageNo: 3 },
  { id: "t7", title: "Add product to the market", project: "Ui8 marketplace", progress: 10, date: "6 Jan 2022", column: "done", messageNo: 4 },
  { id: "t8", title: "Launch product promotion", project: "Kickstarter campaign", progress: 10, date: "7 Jan 2022", column: "done", messageNo: 2 },
  { id: "t9", title: "Make twitter banner", project: "Twitter marketing", progress: 10, date: "8 Jan 2022", column: "done", messageNo: 6 }
];

// 🔧 Get initial todos safely (SSR-friendly)
const getInitialTodos = (): Todo[] => {
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("todo3d_v1");
      if (raw) return JSON.parse(raw);
    } catch {}
  }
  return sample;
};

function reducer(state: TodoState, action: Action): TodoState {
  switch (action.type) {
    case "INIT":
      return { todos: action.payload };
    case "ADD":
      return { todos: [action.payload, ...state.todos] };
    case "UPDATE":
      return {
        todos: state.todos.map(t =>
          t.id === action.payload.id ? { ...t, ...action.payload.updates } : t
        )
      };
    case "MOVE":
      return {
        todos: state.todos.map(t =>
          t.id === action.payload.id ? { ...t, column: action.payload.column } : t
        )
      };
    case "DELETE":
      return { todos: state.todos.filter(t => t.id !== action.payload.id) };
    default:
      return state;
  }
}

type ContextValue = {
  todos: Todo[];
  addTodo: (title: string, column: ColumnType, project?: string) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  moveTodo: (id: string, column: ColumnType) => void;
  deleteTodo: (id: string) => void;
};

const TodoContext = createContext<ContextValue | null>(null);

// 🟢 Helper: format date or return "Today"
const formatDate = (d: Date) => {
  const today = new Date();
  const isToday =
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear();

  if (isToday) return "Today";

  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function TodoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { todos: getInitialTodos() });

  // ✅ Persist to localStorage safely
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("todo3d_v1", JSON.stringify(state.todos));
      } catch {}
    }
  }, [state.todos]);

  const addTodo = (title: string, column: ColumnType, project?: string) => {
    const newTodo: Todo = {
      id: uuidv4(),
      title,
      project,
      progress: column === "done" ? 10 : 0, // auto 10 if done
      date: formatDate(new Date()),
      column,
    };
    dispatch({ type: "ADD", payload: newTodo });
  };

  const updateTodo = (id: string, updates: Partial<Todo>) =>
    dispatch({ type: "UPDATE", payload: { id, updates } });

  const moveTodo = (id: string, column: ColumnType) =>
    dispatch({ type: "MOVE", payload: { id, column } });

  const deleteTodo = (id: string) =>
    dispatch({ type: "DELETE", payload: { id } });

  return (
    <TodoContext.Provider
      value={{ todos: state.todos, addTodo, updateTodo, moveTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export const useTodos = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodos must be used inside TodoProvider");
  return ctx;
};
