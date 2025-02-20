import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common';
import { MenuService } from './menus.service';

@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  // GET /menus - Retrieve all menus
  @Get()
  async getMenus() {
    return await this.menuService.getAllMenus();
  }

  // GET /menus/:id - Retrieve a specific menu
  @Get(':id')
  async getMenu(@Param('id') id: string) {
    return await this.menuService.getMenuById(id);
  }

  // POST /menus - Create a new menu
  @Post()
  async createMenu(@Body('name') name: string) {
    return await this.menuService.createMenu(name);
  }

  // PUT /menus/:id/save - Save (update) menu hierarchy/order
  @Put(':id/save')
  async saveMenu(
    @Param('id') id: string,
    @Body('items') items: { id: string; parentId: string | null; order: number }[],
  ) {
    return await this.menuService.saveMenu(id, items);
  }
}
