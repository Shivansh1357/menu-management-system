"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { fetchMenus, setSelectedMenuId, createMenu } from "../../menuSlice";
import { toast } from "sonner";
import { useMediaQuery } from "react-responsive";

const MenuDropdown: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const [typedMenuName, setTypedMenuName] = useState("");
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { menus, status, error } = useSelector(
    (state: RootState) => state.menu
  );

  useEffect(() => {
    setMounted(true);
    if (status === "idle") {
      dispatch(fetchMenus());
    }
  }, [dispatch, status]);

  if (!mounted) return null;

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelectMenu = (menuId: string, menuName: string) => {
    dispatch(setSelectedMenuId(menuId));
    setTypedMenuName(menuName);
    setIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypedMenuName(e.target.value);
  };

  const handleCreateMenu = async () => {
    if (!typedMenuName.trim()) return;
    try {
      await dispatch(
        createMenu(typedMenuName.trim()) as any
      );
      toast.success("Menu created successfully!");
      setTypedMenuName("");
      setIsOpen(false);
    } catch (err) {
      toast.error("Failed to create menu.");
    }
  };

  const filteredMenus = menus?.filter((m) =>
    m.name.toLowerCase().includes(typedMenuName.toLowerCase())
  );

  const showAddMenuButton =
    typedMenuName.trim() !== "" &&
    !menus.some(
      (m) => m.name.toLowerCase() === typedMenuName.trim().toLowerCase()
    );

  if (status === "loading") {
    return <div className="text-sm text-gray-700">Loading menus...</div>;
  }

  if (status === "failed") {
    return <div className="text-red-600">Error: {error}</div>;
  }
  const containerWidth = isMobile ? "w-[70%]" : "w-auto";
  return (
    <div className={`relative inline-block ${containerWidth}`}>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={typedMenuName}
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}
          placeholder="Select or create Menu..."
          className="w-52 px-4 py-2 border border-gray-300 rounded-md
                     text-sm text-gray-700 focus:outline-none
                     focus:ring-2 focus:ring-blue-600
                     placeholder:text-gray-400"
          aria-label="Menu name"
        />
        <button
          onClick={toggleDropdown}
          className="p-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50
                     focus:outline-none active:scale-95 transition-transform"
          aria-label="Toggle menu list"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && toggleDropdown()}
        >
          <svg
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {showAddMenuButton && (
          <button
            onClick={handleCreateMenu}
            title="Add new menu"
            className="p-2 border border-blue-600 rounded-md bg-blue-600 text-white
                       hover:bg-blue-700 active:scale-95 transition-transform"
            aria-label="Create new menu"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleCreateMenu()}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )}
      </div>

      {isOpen && (
        <div
          className="absolute left-0 mt-1 w-52 rounded-md border 
                     border-gray-200 bg-white shadow-lg z-10"
        >
          {filteredMenus && filteredMenus.length > 0 ? (
            filteredMenus.map((menu) => (
              <button
                key={menu.id}
                onClick={() => handleSelectMenu(menu.id, menu.name)}
                className="w-full text-left px-4 py-2 text-sm
                           text-gray-700 hover:bg-gray-100
                           focus:outline-none focus:bg-gray-100 
                           active:scale-95 transition-transform"
                aria-label={`Select ${menu.name}`}
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSelectMenu(menu.id, menu.name)
                }
              >
                {menu.name}
              </button>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">
              No matching menus
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MenuDropdown;
