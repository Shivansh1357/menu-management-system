import { Controller, Post, Put, Delete, Body, Param, Get } from '@nestjs/common';
import { MenuItemService } from './menu-items.service';

@Controller('menu-items')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  // POST /menu-items - Add a new menu item
  @Post()
  async addMenuItem(
    @Body('menuId') menuId: string,
    @Body('parentId') parentId: string | null,
    @Body('name') name: string,
  ) {
    return await this.menuItemService.addMenuItem(menuId, parentId, name);
  }

  // PUT /menu-items/:id - Update a menu item
  @Put(':id')
  async updateMenuItem(@Param('id') id: string, @Body() body: { name?: string }) {
    return await this.menuItemService.updateMenuItem(id, body);
  }

  // DELETE /menu-items/:id - Delete a menu item
  @Delete(':id')
  async deleteMenuItem(@Param('id') id: string) {
    return await this.menuItemService.deleteMenuItem(id);
  }

  // GET /menu-items/:menuId - Get menu items as a tree
  @Get(':menuId')
  async getMenuItems(@Param('menuId') menuId: string) {
    return await this.menuItemService.getMenuItems(menuId);
  }
}
