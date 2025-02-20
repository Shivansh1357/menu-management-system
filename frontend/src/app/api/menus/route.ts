// app/api/menus/route.ts
import { NextResponse } from "next/server";

export interface MenuItem {
  id: number;
  label: string;
  children?: MenuItem[];
}

// In-memory data store (resets on server restart)
let menuData: MenuItem[] = [
  {
    id: 1,
    label: "Root Item 1",
    children: [
      { id: 2, label: "Child 1", children: [] },
      { id: 3, label: "Child 2", children: [] },
    ],
  },
  {
    id: 4,
    label: "Root Item 2",
    children: [],
  },
];

/**
 * GET /api/menus
 * Returns the entire menu structure.
 */
export async function GET() {
  return NextResponse.json(menuData);
}

/**
 * POST /api/menus
 * Expects JSON body with the entire menu structure.
 * Overwrites the current menuData and returns the updated data.
 */
export async function POST(request: Request) {
  const body = await request.json() as MenuItem[];
  menuData = body; // Overwrite the in-memory data
  return NextResponse.json(menuData);
}
