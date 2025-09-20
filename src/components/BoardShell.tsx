"use client";

import React from "react";
import TodoBoard from "./TodoBoard";

export default function BoardShell() {
  return (
    <div className="flex items-start gap-6">
      <div className="flex-1">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium">Board view</div>
            <div className="text-sm text-gray-400">| Add view</div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-3 py-1 rounded-full border text-sm">Filter</button>
            <button className="px-3 py-1 rounded-full bg-black text-white text-sm">New template</button>
          </div>
        </div>

        <TodoBoard />
      </div>

      {/* right-side 3D area (for large screens only shown inside TodoBoard too) */}
      {/* <aside className="w-80 pl-6 hidden lg:block">
        <div className="sticky top-6">
          <div className="rounded-lg overflow-hidden h-64 bg-gray-100 flex items-center justify-center">
            <div className="w-full h-full" id="three-root" />
          </div>
          <div className="mt-6 text-sm text-gray-600">
            <div className="font-medium">Your progress</div>
            <div className="text-xs">Interactive 3D cube reacts to completed tasks</div>
          </div>
        </div>
      </aside> */}
    </div>
  );
}
