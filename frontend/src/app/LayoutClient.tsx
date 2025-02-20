"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MenuHeader from "./menu/components/MenuHeader";
import MenuPage from "./menu/page";
import ComingSoon from "@/components/ComingSoon";

export default function LayoutClient() {
  const activeItem = useSelector(
    (state: RootState) => state.menu.activeSidebarItem
  );
  const isMenuPage = activeItem === "Menus";

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />

        {isMenuPage ? (
          <>
            <MenuHeader />
            <MenuPage />
          </>
        ) : (
          <ComingSoon />
        )}
      </div>
    </div>
  );
}