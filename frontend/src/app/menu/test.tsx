// "use client";

// import React, { useState, useEffect } from "react";
// import { Provider, useSelector, useDispatch } from "react-redux";
// import { RootState, store } from "@/app/store";
// import {
//   createMenuItem,
//   deleteMenuItem,
//   fetchMenuItems,
//   updateMenuItemApi,
// } from "@/app/menuSlice";
// import { toast } from "sonner";
// import { InfoIcon, CrossIcon } from "lucide-react";

// import MenuDropdown from "./components/MenuDropdown";
// import ExpandCollapseButtons from "./components/ExpandCollapseButtons";
// import Tree, { TreeNode } from "./components/MenuTree";
// import ManageMenuItem from "./components/ManageMenu";


// /** Flattens nested TreeNode[] into a single array for easy parent lookup */
// const flattenTree = (nodes: TreeNode[]): TreeNode[] => {
//   let all: TreeNode[] = [];
//   for (const node of nodes) {
//     all.push(node);
//     if (node.children?.length) {
//       all = [...all, ...flattenTree(node.children)];
//     }
//   }
//   return all;
// };

// export default function MenuPage() {
//   const dispatch = useDispatch();
//   const { currentMenuId } = useSelector((state: RootState) => state.menu);
//   const [treeData, setTreeData] = useState<TreeNode[]>([]);

//   // Expand/collapse state for all nodes
//   const [expandedNodeIds, setExpandedNodeIds] = useState<string[]>([]);

//   // 1. Fetch menu items
//   useEffect(() => {
//     if (!currentMenuId) return;
//     dispatch(fetchMenuItems(currentMenuId) as any).then((action: any) => {
//       if (action.type === fetchMenuItems.fulfilled.type) {
//         setTreeData(action.payload);
//       }
//     });
//   }, [currentMenuId, dispatch]);

//   // 2. After data changes, auto-expand once
//   useEffect(() => {
//     if (!treeData.length) return;
//     handleExpandAll();
//   }, [treeData]);

//   /** Flatten once for parent lookups */
//   const allNodes = flattenTree(treeData);

//   /** Gathers all node IDs for expand-all */
//   const getAllNodeIds = (nodes: TreeNode[]): string[] => {
//     let ids: string[] = [];
//     for (const n of nodes) {
//       ids.push(n.id);
//       if (n.children?.length) {
//         ids = [...ids, ...getAllNodeIds(n.children)];
//       }
//     }
//     return ids;
//   };

//   /** Expand/collapse all */
//   const handleExpandAll = () => {
//     const allIds = getAllNodeIds(treeData);
//     setExpandedNodeIds(allIds);
//   };

//   const handleCollapseAll = () => {
//     setExpandedNodeIds([]);
//   };

//   const [selectedMenuItemDetails, setSelectedMenuItemDetails] = useState({
//     nodeId: "",
//     menuId: "",
//     depth: 0,
//     parentData: "",
//     parentId: "",
//     name: "",
//   });

//   /** Correctly compute depth by climbing up parents until none exist */
//   const calculateDepth = (node: TreeNode): number => {
//     if (!node.parentId) return 0;
//     const parent = allNodes.find((p) => p.id === node.parentId);
//     if (!parent) return 0;
//     return 1 + calculateDepth(parent);
//   };

//   const handleNodeSelect = (node: TreeNode) => {
//     const depth = calculateDepth(node);
//     let parentName = "";
//     if (node.parentId) {
//       const foundParent = allNodes.find((m) => m.id === node.parentId);
//       parentName = foundParent ? foundParent.name : "";
//     }
//     setSelectedMenuItemDetails({
//       nodeId: node.id,
//       menuId: node.menuId,
//       depth,
//       parentData: parentName,
//       parentId: node.parentId ?? "",
//       name: node.name,
//     });
//   };

//   const handleNodePlus = (node: TreeNode) => {
//     const depth = calculateDepth(node);
//     setSelectedMenuItemDetails({
//       nodeId: "",
//       menuId: node.menuId,
//       depth: depth + 1,
//       parentData: node.name,
//       parentId: node.id,
//       name: "",
//     });
//   };
//   // REFETCH helper
//   const refetchData = async () => {
//     if (!currentMenuId) return;
//     console.log("refetching data",currentMenuId);
//     const result = await dispatch(fetchMenuItems(currentMenuId) as any);
//     if (result.type === fetchMenuItems.fulfilled.type) {
//       console.log("result.payload",result.payload);
//       setTreeData(result.payload);
//     }
//   };
//   /** Create or Update, then re-fetch menu items so the Tree updates without a manual refresh */
//   const handleSaveOrUpdate = async (data: {
//     id?: string;
//     menuId: string;
//     parentId: string;
//     name: string;
//   }) => {
//     if(data.name === ""){
//       toast.error("Please fill all the required fields",{
//         icon: <CrossIcon className="w-4 h-4" />,
//       });
//       return;
//     }
//     if (data.id) {
//       await dispatch(updateMenuItemApi({id:data.id,name:data.name}) as any);
//       toast.success("Menu updated successfully",{
//         icon: <InfoIcon className="w-4 h-4" />,
//       });
//     } else {
//       await dispatch(createMenuItem(data) as any);
//       toast.success("Menu created successfully",
//         {
//           icon: <InfoIcon className="w-4 h-4" />,
//         }
//       );
//     }
//     await refetchData();
//     // Reset ManageMenu
//     setSelectedMenuItemDetails({
//       nodeId: "",
//       menuId: "",
//       depth: 0,
//       parentData: "",
//       parentId: "",
//       name: "",
//     });
//   };

//   const handleDelete = async (nodeId: string) => {
//     await dispatch(deleteMenuItem(nodeId) as any);

//     // Re-fetch to refresh updated tree
//     if (currentMenuId) {
//       const result = await dispatch(fetchMenuItems(currentMenuId) as any);
//       if (result.type === fetchMenuItems.fulfilled.type) {
//         setTreeData(result.payload);
//       }
//     }
//   };

//   return (
//     <main className="p-8">
//       <Provider store={store}>
//         <MenuDropdown />
//         <ExpandCollapseButtons
//           onExpandAll={handleExpandAll}
//           onCollapseAll={handleCollapseAll}
//         />

//         <div className="flex gap-8 mt-4">
//           <div className="flex-1">
//             <Tree
//               data={treeData}
//               expandedNodeIds={expandedNodeIds}
//               setExpandedNodeIds={setExpandedNodeIds}
//               onNodeSelect={handleNodeSelect}
//               onNodePlus={handleNodePlus}
//               onNodeDelete={(node) => handleDelete(node.id)}
//             />
//           </div>

//           <div className="flex-1">
//             <ManageMenuItem
//               nodeId={selectedMenuItemDetails.nodeId}
//               menuId={selectedMenuItemDetails.menuId}
//               depth={selectedMenuItemDetails.depth}
//               parentData={selectedMenuItemDetails.parentData}
//               parentId={selectedMenuItemDetails.parentId}
//               name={selectedMenuItemDetails.name}
//               onSave={(d) =>
//                 handleSaveOrUpdate({
//                   id: selectedMenuItemDetails.nodeId || undefined,
//                   menuId: d.menuId,
//                   parentId: d.parentId,
//                   name: d.name,
//                 })
//               }
//             />
//           </div>
//         </div>
//       </Provider>
//     </main>
//   )

// }
