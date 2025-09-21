import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import TodoProvider from "@/context/TodoContext";

export const metadata: Metadata = {
  title: "3D Todo App List ",
  description: "Todo App List with 3D progress bar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800 min-h-screen">
        <ThemeProvider>
          <TodoProvider>
          {children}
          </TodoProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
