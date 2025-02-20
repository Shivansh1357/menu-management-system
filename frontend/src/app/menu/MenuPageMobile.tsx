"use client";

import React, { SetStateAction, Dispatch } from "react";
import MenuDropdown from "./components/MenuDropdown";
import ExpandCollapseButtons from "./components/ExpandCollapseButtons";
import Tree from "./components/MenuTree";
import ManageMenuItem from "./components/ManageMenu";
import type { TreeNode } from "./components/MenuTree";


interface MenuPageMobileProps {
  treeData: TreeNode[];
  handleExpandAll: () => void;
  handleCollapseAll: () => void;
  handleNodePlus: (node: TreeNode) => void;
  handleNodeSelect: (node: TreeNode) => void;
  handleSaveOrUpdate: (data: {
    id?: string;
    menuId: string;
    parentId: string;
    name: string;
  }) => void;
  handleDelete: (id: string) => void;
  expandedNodeIds: string[];
  selectedMenuItemDetails: {
    nodeId: string;
    menuId: string;
    depth: number;
    parentData: string;
    parentId: string;
    name: string;
  };
  setExpandedNodeIds: Dispatch<SetStateAction<string[]>>;
}

export default function MenuPageMobile({
  treeData,
  handleExpandAll,
  handleCollapseAll,
  handleNodePlus,
  expandedNodeIds,
  setExpandedNodeIds,
  handleNodeSelect,
  handleSaveOrUpdate,
  selectedMenuItemDetails,
  handleDelete,
}: MenuPageMobileProps) {
  return (
    <main className="w-screen min-h-screen bg-gray-50 ">
      <div className="max-w-md  p-4 flex flex-col gap-4">
        {/* Dropdown */}
        <MenuDropdown />

        <ExpandCollapseButtons
          onExpandAll={handleExpandAll}
          onCollapseAll={handleCollapseAll}
        />

        {/* Tree */}
        {/* <div className="bg-white rounded shadow p-4"> */}
          <Tree
            data={treeData}
            expandedNodeIds={expandedNodeIds}
            setExpandedNodeIds={setExpandedNodeIds} 
            onNodeSelect={(node) => handleNodeSelect(node)}
            onNodePlus={handleNodePlus}
            onNodeDelete={(node) => handleDelete(node.id)}

          />
        {/* </div> */}

        {/* ManageMenuItem below the tree */}
        {/* <div className="bg-white rounded shadow p-4"> */}
          <ManageMenuItem
            nodeId={selectedMenuItemDetails.nodeId}
            menuId={selectedMenuItemDetails.menuId}
            depth={selectedMenuItemDetails.depth}
            parentData={selectedMenuItemDetails.parentData}
            parentId={selectedMenuItemDetails.parentId}
            name={selectedMenuItemDetails.name}
            onSave={(d) =>
                handleSaveOrUpdate({
                  id: selectedMenuItemDetails.nodeId || undefined,
                  menuId: d.menuId,
                  parentId: d.parentId,
                  name: d.name,
                })
              }
          />
        {/* </div> */}
      </div>
    </main>
  );
}
