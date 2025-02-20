"use client";

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface MenuItem {
  id: string;
  name: string;
  order: number;
  menuId: string;
  parentId: string | null;
  children?: MenuItem[];
}

export interface Menu {
  id: string;
  name: string;
  createdAt: string;
  items?: MenuItem[];
}

interface MenuState {
  menus: Menu[];
  currentMenu?: Menu;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  currentMenuId?: string;
  activeSidebarItem: string;
}

const initialState: MenuState = {
  menus: [],
  currentMenu: undefined,
  status: 'idle',
  error: null,
  currentMenuId: undefined,
  activeSidebarItem: 'Menus',
};

/**
 * GET /menus
 * Returns { success, message, data: Menu[] }
 */
export const fetchMenus = createAsyncThunk<Menu[]>(
  'menu/fetchMenus',
  async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menus`);
    return response.data.data;
  }
);

/**
 * POST /menus
 * Request body: { name: string }
 * Returns { success, message, data: Menu }
 */
export const createMenu = createAsyncThunk<Menu, string>(
  'menu/createMenu',
  async (menuName) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/menus`, { name: menuName });
    return response.data.data;
  }
);

/**
 * GET /menus/:id
 * Returns { success, message, data: Menu }
 */
export const fetchMenuById = createAsyncThunk<Menu, string>(
  'menu/fetchMenuById',
  async (menuId) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menus/${menuId}`);
    return response.data.data;
  }
);

/**
 * PUT /menus/:id/save
 * Request body: { items: MenuItem[] }
 * Returns { success, message, data: Menu }
 */
export const saveMenu = createAsyncThunk<Menu, { menuId: string; items: MenuItem[] }>(
  'menu/saveMenu',
  async ({ menuId, items }) => {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/menus/${menuId}/save`, { items });
    return response.data.data;
  }
);

/**
 * POST /menu-items
 * Request body: { menuId, parentId, name }
 * Returns { success, message, data: MenuItem }
 */
export const createMenuItem = createAsyncThunk<
  MenuItem,
  { menuId: string; parentId: string | null; name: string }
>(
  'menu/createMenuItem',
  async ({ menuId, parentId, name }) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/menu-items`, { menuId, parentId, name });
    return response.data.data;
  }
);

/**
 * PUT /menu-items/:id
 * Request body: { name }
 * Returns { success, message, data: MenuItem }
 */
export const updateMenuItemApi = createAsyncThunk<MenuItem, { id: string; name: string }>(
  'menu/updateMenuItem',
  async ({ id, name }) => {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/menu-items/${id}`, { name });
    return response.data.data;
  }
);

/**
 * DELETE /menu-items/:id
 * Returns { success, message, ... }
 */
export const deleteMenuItem= createAsyncThunk<string, string>(
  'menu/deleteMenuItem',
  async (menuItemId) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/menu-items/${menuItemId}`);
    return menuItemId;
  }
);

export const fetchMenuItems = createAsyncThunk<MenuItem[], string>(
  'menu/fetchMenuItems',
  async (menuId) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menu-items/${menuId}`);
    return response.data.data;
  }
);

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setActiveSidebarItem: (state, action: PayloadAction<string>) => {
      state.activeSidebarItem = action.payload;
    },
    setSelectedMenuId: (state, action: PayloadAction<string>) => {
      state.currentMenuId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all menus
      .addCase(fetchMenus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenus.fulfilled, (state, action: PayloadAction<Menu[]>) => {
        state.status = 'succeeded';
        state.menus = action.payload;
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch menus';
      })
      // Create a new menu
      .addCase(createMenu.fulfilled, (state, action: PayloadAction<Menu>) => {
        state.menus.push(action.payload);
      })
      // Fetch a menu by ID
      .addCase(fetchMenuById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenuById.fulfilled, (state, action: PayloadAction<Menu>) => {
        state.status = 'succeeded';
        state.currentMenu = action.payload;
      })
      .addCase(fetchMenuById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch menu by ID';
      })
      // Save (update) a menu
      .addCase(saveMenu.fulfilled, (state, action: PayloadAction<Menu>) => {
        state.currentMenu = action.payload;
      })
      // Create a new menu item
      .addCase(createMenuItem.fulfilled, (state, action: PayloadAction<MenuItem>) => {
        if (state.currentMenu) {
          if (!state.currentMenu.items) {
            state.currentMenu.items = [];
          }
          state.currentMenu.items.push(action.payload);
        }
      })
      // Update a menu item
      .addCase(updateMenuItemApi.fulfilled, (state, action: PayloadAction<MenuItem>) => {
        if (state.currentMenu && state.currentMenu.items) {
          const updateRecursively = (items: MenuItem[]) => {
            items.forEach((item, index, arr) => {
              if (item.id === action.payload.id) {
                arr[index] = action.payload;
              } else if (item.children) {
                updateRecursively(item.children);
              }
            });
          };
          updateRecursively(state.currentMenu.items);
        }
      })
      // Delete a menu item
      .addCase(deleteMenuItem.fulfilled, (state, action: PayloadAction<string>) => {
        if (state.currentMenu && state.currentMenu.items) {
          const deleteRecursively = (items: MenuItem[]): MenuItem[] => {
            return items.filter((item) => {
              if (item.children) {
                item.children = deleteRecursively(item.children);
              }
              return item.id !== action.payload;
            });
          };
          state.currentMenu.items = deleteRecursively(state.currentMenu.items);
        }
      })
      // Fetch menu items
      .addCase(fetchMenuItems.fulfilled, (state, action: PayloadAction<MenuItem[]>) => {
        state.status = 'succeeded';
        if (state.currentMenu) {
          state.currentMenu.items = action.payload;
        }
      }); 
  },
});

export const { setActiveSidebarItem, setSelectedMenuId } = menuSlice.actions;
export default menuSlice.reducer;
