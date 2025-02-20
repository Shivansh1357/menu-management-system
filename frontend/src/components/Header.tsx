"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export default function Header() {
  const activeItem = useSelector(
    (state: RootState) => state.menu.activeSidebarItem
  );

  return (
    <header className="w-full h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200">
      {/* Left side: Icon + Title */}
      <div  className="flex flex-row items-center gap-3">
        {/* Provided 24x24 SVG icon */}
        <div className="flex flex-row items-center gap-3 w-10 h-10">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z" fill="#D0D5DD"/>
</svg>
     <svg width="10" height="20" viewBox="0 0 5 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.6733 4.34091L1.39205 16.5312H0.318182L3.59943 4.34091H4.6733Z" fill="#D0D5DD"/>
</svg>

        </div>

        {/* Header Title */}
        <h2 className="text-2xl font-semibold text-gray-900">
          {activeItem}
        </h2>
      </div>

      {/* Right side: Additional actions (if needed) */}
      <div className="flex items-center gap-4">
        {/* You can add other action buttons/icons here */}
      </div>
    </header>
  );
}
