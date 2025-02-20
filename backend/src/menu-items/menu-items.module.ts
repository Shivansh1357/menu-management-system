import { Module } from '@nestjs/common';
import { MenuItemService } from './menu-items.service';
import { MenuItemController } from './menu-items.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [MenuItemService],
  controllers: [MenuItemController],
})
export class MenuItemModule {}
