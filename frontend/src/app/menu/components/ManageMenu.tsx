"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createMenuItem } from "@/app/menuSlice"; // Import your Redux action
import { log } from "console";
import { useMediaQuery } from "react-responsive";

interface ManageMenuProps {
  nodeId?: string;
  menuId?: string;
  parentId?: string;
  depth?: number;
  parentData?: string;
  name?: string;
  onSave: (data: {
    id?: string;
    menuId: string;
    parentId: string;
    name: string;
  }) => void;
}

export default function ManageMenuItem({
  nodeId = "",
  menuId = "",
  parentId = "",
  depth = 0,
  parentData = "",
  name = "",
  onSave,
}: ManageMenuProps) {
  const dispatch = useDispatch();

  const [currentNodeId, setCurrentNodeId] = useState<string>(nodeId);
  const [currentMenuId, setCurrentMenuId] = useState<string>(menuId);
  const [currentParentId, setCurrentParentId] = useState<string>(parentId);
  const [currentDepth, setCurrentDepth] = useState<number>(depth);
  const [currentParentData, setCurrentParentData] = useState<string>(parentData);
  const [currentName, setCurrentName] = useState<string>(name);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  useEffect(() => {
    setCurrentNodeId(nodeId);
    setCurrentMenuId(menuId);
    setCurrentParentId(parentId);
    setCurrentDepth(depth);
    setCurrentParentData(parentData);
    setCurrentName(name);
  }, [nodeId, menuId, parentId, depth, parentData, name]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentName(e.target.value);
  };

  const handleSave = () => {
    onSave({
      id: currentNodeId || undefined,
      menuId: currentMenuId,
      parentId: currentParentId,
      name: currentName,
    });
  };
  const containerWidth = isMobile ? "w-[70%]" : "w-auto";
  return (
    <div className={` bg-transparent ${containerWidth}`}>
      <div>
        <label className="block mb-1 text-sm font-large text-black">
          Menu ID
        </label>
        <input
          type="text"
          value={currentMenuId}
          disabled
          className="w-full rounded-md bg-white px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-large text-black">
          Depth
        </label>
        <input
          type="number"
          value={currentDepth}
          disabled
          className="w-full rounded-md bg-white px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-large text-black">
          Parent Name
        </label>
        <input
          type="text"
          value={currentParentData}
          disabled
          className="w-full rounded-md bg-white px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-large text-black">
          Name
        </label>
        <input
          type="text"
          value={currentName}
          onChange={handleNameChange}
          placeholder="Enter menu name"
          className="w-full rounded-md bg-white px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button
          onClick={handleSave}
          className="rounded-md bg-[#2D37FF] px-6 py-2 text-white font-semibold 
                     hover:bg-[#1620db] active:scale-95 transition-transform"
        >
          {currentNodeId ? "Update" : "Save"}
        </button>
      </div>
    </div>
  );
}
