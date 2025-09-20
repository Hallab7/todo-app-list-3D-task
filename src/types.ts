export type ColumnType = "todo" | "inprogress" | "done";

export interface Todo {
  id: string;
  title: string;
  project?: string;
  progress: number; // 0..10
  date?: string;
  column: ColumnType;
  messageNo?: number  
}

export interface TodoState {
  todos: Todo[];
}
