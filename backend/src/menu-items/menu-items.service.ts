import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MenuItemService {
  constructor(private prisma: PrismaService) {}

  // Add a new menu item as a child of a given parent
  async addMenuItem(menuId: string, parentId: string | null, name: string) {
    // Check if the menu exists
    const menuExists = await this.prisma.menu.findUnique({
      where: { id: menuId },
    });

    if (!menuExists) {
      throw new NotFoundException(`Menu with id ${menuId} not found`);
    }

    // Calculate order based on current siblings
    let order = 0;
    if (parentId) {
      const siblings = await this.prisma.menuItem.findMany({
        where: { parentId, menuId },
      });
      order = siblings.length;
    } else {
      const siblings = await this.prisma.menuItem.findMany({
        where: { menuId, parentId: null },
      });
      order = siblings.length;
    }

    const newItem = await this.prisma.menuItem.create({
      data: {
        name,
        order,
        menuId: menuId,
        parentId: parentId ? parentId : null,
      },
    });

    return {
      success: true,
      message: 'Menu item added successfully',
      data: newItem,
    };
  }

  // Update a menu item (e.g., name update)
  async updateMenuItem(id: string, data: { name?: string }) {
    const menuItem = await this.prisma.menuItem.findUnique({ where: { id } });
    if (!menuItem) {
      throw new NotFoundException(`MenuItem with id ${id} not found`);
    }
    const updatedItem = await this.prisma.menuItem.update({
      where: { id },
      data,
    });
    return {
      success: true,
      message: 'Menu item updated successfully',
      data: updatedItem,
    };
  }

  // Delete a menu item
  async deleteMenuItem(id: string) {
    const menuItem = await this.prisma.menuItem.findUnique({ where: { id } });
    if (!menuItem) {
      throw new NotFoundException(`MenuItem with id ${id} not found`);
    }
    await this.prisma.menuItem.delete({ where: { id } });
    return {
      success: true,
      message: 'Menu item deleted successfully',
    };
  }

  // Fetch menu items and structure them as a tree
  async getMenuItems(menuId: string) {
    const items = await this.prisma.menuItem.findMany({
      where: { menuId },
    });

    if (!items.length) {
      throw new NotFoundException(`No menu items found for menu with id ${menuId}`);
    }

    // Create a map to store items by their ID
    const itemMap = new Map<string, any>();
    items.forEach(item => itemMap.set(item.id, { ...item, children: [] }));

    // Build the tree structure
    const rootItems: any[] = [];
    items.forEach(item => {
      if (item.parentId) {
        const parent = itemMap.get(item.parentId);
        if (parent) {
          parent.children.push(itemMap.get(item.id));
        }
      } else {
        rootItems.push(itemMap.get(item.id));
      }
    });

    return {
      success: true,
      message: 'Menu items retrieved successfully',
      data: rootItems,
    };
  }
}
