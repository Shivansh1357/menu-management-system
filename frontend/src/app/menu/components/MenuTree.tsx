// "use client";

// import React, { useState } from "react";

// export interface TreeNode {
//   id: string;
//   name: string;
//   parentId: string | null;
//   order: number;
//   menuId: string;
//   children?: TreeNode[];
// }

// interface TreeProps {
//   data: TreeNode[];
//   onNodePlus?: (node: TreeNode) => void; 
//   // Optional callback when the plus button is clicked
// }

// const Tree: React.FC<TreeProps> = ({ data, onNodePlus }) => {
//   // Keep track of the selected node
//   const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

//   // Handle node click => select node
//   const handleNodeClick = (node: TreeNode) => {
//     setSelectedNodeId(node.id);
//   };

//   // Recursively render each node
//   const renderNodes = (nodes: TreeNode[], level = 0): React.ReactNode[] => {
//     return nodes.map((node) => {
//       return (
//         <TreeNodeItem
//           key={node.id}
//           node={node}
//           level={level}
//           selectedNodeId={selectedNodeId}
//           onSelect={handleNodeClick}
//           onNodePlus={onNodePlus}
//         />
//       );
//     });
//   };

//   return (
//     <div className="p-2">
//       {renderNodes(data)}
//     </div>
//   );
// };

// export default Tree;

// /** Individual Tree Node component (recursive) */
// interface TreeNodeItemProps {
//   node: TreeNode;
//   level: number;
//   selectedNodeId: string | null;
//   onSelect: (node: TreeNode) => void;
//   onNodePlus?: (node: TreeNode) => void;
// }

// const TreeNodeItem: React.FC<TreeNodeItemProps> = ({
//   node,
//   level,
//   selectedNodeId,
//   onSelect,
//   onNodePlus,
// }) => {
//   // local state to track expand/collapse
//   const [expanded, setExpanded] = useState(true);

//   const hasChildren = node.children && node.children.length > 0;
//   const isSelected = node.id === selectedNodeId;

//   const toggleExpand = () => {
//     setExpanded((prev) => !prev);
//   };

//   // Indentation per level. Adjust "ml-5" or "ml-[20px]" to taste.
//   return (
//     <div className="mb-1">
//       {/* Node row */}
//       <div
//         className="flex items-center cursor-pointer group"
//         style={{ marginLeft: `${level * 16}px` }} // 16px indent per level
//         onClick={() => onSelect(node)}
//       >
//         {/* Expand/Collapse icon if children exist */}
//         {hasChildren && (
//           <button
//             className="mr-1 text-gray-500 hover:text-gray-700"
//             onClick={(e) => {
//               e.stopPropagation(); // Prevent node select on icon click
//               toggleExpand();
//             }}
//           >
//             {expanded ? (
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M19 9l-7 7-7-7" />
//               </svg>
//             ) : (
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M9 5l7 7-7 7" />
//               </svg>
//             )}
//           </button>
//         )}

//         {/* Node label */}
//         <span
//           className={`px-2 py-1 rounded transition-colors
//             ${
//               isSelected
//                 ? "bg-gray-200 text-gray-800"
//                 : "hover:bg-gray-100 text-gray-700"
//             }
//           `}
//         >
//           {node.name}
//         </span>

//         {/* The plus button (blue circle) only if the node is selected */}
//         {isSelected && (
//           <button
//             className="ml-2 bg-blue-600 hover:bg-blue-700 text-white 
//                        rounded-full w-6 h-6 flex items-center justify-center
//                        text-sm"
//             onClick={(e) => {
//               e.stopPropagation();
//               onNodePlus?.(node);
//             }}
//           >
//             {/* Simple plus icon (or text "+") */}
//             <svg
//               className="w-3 h-3"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               viewBox="0 0 24 24"
//             >
//               <path d="M12 5v14m-7-7h14" />
//             </svg>
//           </button>
//         )}
//       </div>

//       {/* Children, if expanded */}
//       {hasChildren && expanded && (
//         <div className="mt-1">
//           {node.children!.map((child) => (
//             <TreeNodeItem
//               key={child.id}
//               node={child}
//               level={level + 1}
//               selectedNodeId={selectedNodeId}
//               onSelect={onSelect}
//               onNodePlus={onNodePlus}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };


"use client";

import { TrashIcon } from "lucide-react";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { toast } from "sonner";

export interface TreeNode {
  id: string;
  name: string;
  parentId: string | null;
  order: number;
  menuId: string;
  children?: TreeNode[];
}

interface TreeProps {
  data: TreeNode[];
  expandedNodeIds: string[];
  setExpandedNodeIds: React.Dispatch<React.SetStateAction<string[]>>;
  onNodePlus?: (node: TreeNode) => void;
  onNodeDelete?: (node: TreeNode) => void;
  onNodeSelect?: (node: TreeNode) => void;
}

const Tree: React.FC<TreeProps> = ({
  data,
  expandedNodeIds,
  setExpandedNodeIds,
  onNodePlus,
  onNodeDelete,
  onNodeSelect,
}) => {
  const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>(
    null
  );

  const handleNodeClick = (node: TreeNode) => {
    setSelectedNodeId(node.id);
    onNodeSelect?.(node);
  };

  const renderNodes = (nodes: TreeNode[], level = 0): React.ReactNode[] => {
    return nodes.map((node) => (
      <TreeNodeItem
        key={node.id}
        node={node}
        level={level}
        selectedNodeId={selectedNodeId}
        onSelect={handleNodeClick}
        expandedNodeIds={expandedNodeIds}
        setExpandedNodeIds={setExpandedNodeIds}
        onNodePlus={onNodePlus}
        onNodeDelete={onNodeDelete}
      />
    ));
  };

  return <div className="p-2">{renderNodes(data)}</div>;
};

export default Tree;

interface TreeNodeItemProps {
  node: TreeNode;
  level: number;
  selectedNodeId: string | null;
  onSelect: (node: TreeNode) => void;
  expandedNodeIds: string[];
  setExpandedNodeIds: React.Dispatch<React.SetStateAction<string[]>>;
  onNodePlus?: (node: TreeNode) => void;
  onNodeDelete?: (node: TreeNode) => void;
}

const TreeNodeItem: React.FC<TreeNodeItemProps> = ({
  node,
  level,
  selectedNodeId,
  onSelect,
  expandedNodeIds,
  setExpandedNodeIds,
  onNodePlus,
  onNodeDelete,
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  const hasChildren = !!node.children?.length;
  const isSelected = node.id === selectedNodeId;
  const isExpanded = expandedNodeIds.includes(node.id);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const handleToggleExpand = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.stopPropagation();
    setExpandedNodeIds((prev) => {
      if (isExpanded) {
        return prev.filter((id) => id !== node.id);
      }
      return [...prev, node.id];
    });
  };

  const handleConfirmDelete = () => {
    setIsDeleteDialogOpen(false);
    onNodeDelete?.(node);
    toast.success(`Deleted node: ${node.name}`,{
      position: "top-right",
      duration: 3000,
      icon: <TrashIcon className="w-4 h-4" />,
    });
  };
  const containerWidth = isMobile ? "w-[70%]" : "w-auto";
  return (
    <div className={`mb-1 ${containerWidth}`}>
      <div
        className="flex items-center cursor-pointer group"
        style={{ marginLeft: `${level * 16}px` }}
        onClick={() => onSelect(node)}
        aria-label={`Select node ${node.name}`}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onSelect(node)}
      >
        {hasChildren && (
          <button
            className="mr-1 text-gray-500 hover:text-gray-700"
            onClick={handleToggleExpand}
            aria-label={isExpanded ? "Collapse node" : "Expand node"}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleToggleExpand(e as unknown as React.MouseEvent);
              }
            }}
          >
            {isExpanded ? (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        )}

        <span
          className={`px-2 py-1 rounded transition-colors ${
            isSelected
              ? "bg-gray-200 text-gray-800"
              : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          {node.name}
        </span>

        <div className="flex items-center space-x-2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {onNodePlus && (
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
              onClick={(e) => {
                e.stopPropagation();
                onNodePlus(node);
              }}
              aria-label="Add child node"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onNodePlus(node)}
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 5v14m-7-7h14" />
              </svg>
            </button>
          )}

          {onNodeDelete && (
            <button
              className="bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
              onClick={(e) => {
                e.stopPropagation();
                setIsDeleteDialogOpen(true);
              }}
              aria-label="Delete node"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setIsDeleteDialogOpen(true)}
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M3 6h18M9 6v12m6-12v12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="mt-1">
          {node.children!.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              level={level + 1}
              selectedNodeId={selectedNodeId}
              onSelect={onSelect}
              expandedNodeIds={expandedNodeIds}
              setExpandedNodeIds={setExpandedNodeIds}
              onNodePlus={onNodePlus}
              onNodeDelete={onNodeDelete}
            />
          ))}
        </div>
      )}

      {isDeleteDialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          aria-label="Delete confirmation dialog"
        >
          <div className="bg-white p-6 rounded-lg w-full max-w-sm">
            <h2 className="text-xl font-semibold text-gray-800">
              Confirm Delete
            </h2>
            <p className="text-gray-600 mt-2">
              Are you sure you want to delete &quot;{node.name}&quot;?
            </p>
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700"
                aria-label="Cancel delete"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && setIsDeleteDialogOpen(false)
                }
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                aria-label="Confirm delete"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleConfirmDelete()}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
