import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  // Get all menus with a wrapped response
  async getAllMenus() {
    const menus = await this.prisma.menu.findMany();
    return {
      success: true,
      message: 'Menus retrieved successfully',
      data: menus,
    };
  }

  // Get a specific menu (with hierarchical items)
  async getMenuById(id: string) {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
      include: {
        items: {
          orderBy: { order: 'asc' },
          include: { children: true },
        },
      },
    });
    if (!menu) {
      throw new NotFoundException(`Menu with id ${id} not found`);
    }
    return {
      success: true,
      message: 'Menu retrieved successfully',
      data: menu,
    };
  }

  // Create a new menu with an auto-created root item
  async createMenu(name: string) {
    const menu = await this.prisma.menu.create({
      data: {
        name,
        items: {
          create: {
            name: 'Root',
            order: 0,
          },
        },
      },
    });
    return {
      success: true,
      message: 'Menu created successfully',
      data: menu,
    };
  }

  // Save menu items (updating hierarchy/order)
  async saveMenu(id: string, items: { id: string; parentId: string | null; order: number }[]) {
    const updatedItems = await Promise.all(
      items.map((item) =>
        this.prisma.menuItem.update({
          where: { id: item.id },
          data: {
            parentId: item.parentId,
            order: item.order,
          },
        }),
      ),
    );
    return {
      success: true,
      message: 'Menu items updated successfully',
      data: updatedItems,
    };
  }
}
