import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MenuModule } from './menus/menus.module';
import { MenuItemModule } from './menu-items/menu-items.module';
@Module({
  imports: [PrismaModule, MenuModule, MenuItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
