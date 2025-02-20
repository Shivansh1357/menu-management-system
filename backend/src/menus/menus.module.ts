import { Module } from '@nestjs/common';
import { MenuService } from './menus.service';
import { MenuController } from './menus.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [MenuService],
  controllers: [MenuController],
})
export class MenuModule {}
