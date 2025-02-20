"use client";

import React from "react";
import { useMediaQuery } from "react-responsive";

interface ExpandCollapseButtonsProps {
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

/**
 * Renders two pill-shaped buttons side by side:
 *  - "Expand All" in a dark background
 *  - "Collapse All" in a white background with a dark border
 */
const ExpandCollapseButtons: React.FC<ExpandCollapseButtonsProps> = ({
  onExpandAll,
  onCollapseAll,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const handleExpandAll = () => {
    onExpandAll();
  };

  const handleCollapseAll = () => {
    onCollapseAll();
  };
  const containerWidth = isMobile ? "w-[70%]" : "w-auto";
  return (
    <div className={`flex items-center space-x-4 mt-4 ${containerWidth}`}>
      {/* Dark pill button: Expand All */}
      <button
        onClick={handleExpandAll}
        className="rounded-full bg-[#1D1F2C] text-white px-6 py-2
                   font-medium hover:opacity-90 transition-opacity
                   active:scale-95 transition-transform"
        aria-label="Expand all nodes"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleExpandAll()}
      >
        Expand All
      </button>

      {/* Outlined pill button: Collapse All */}
      <button
        onClick={handleCollapseAll}
        className="rounded-full border border-[#1D1F2C] text-[#1D1F2C]
                   bg-white px-6 py-2 font-medium hover:bg-gray-100
                   active:scale-95 transition-transform"
        aria-label="Collapse all nodes"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleCollapseAll()}
      >
        Collapse All
      </button>
    </div>
  );
};

export default ExpandCollapseButtons;
