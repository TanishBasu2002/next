import { Module } from '@nestjs/common';
import { UsersController, UsersService } from './users.service';
import { PrismaModule } from 'src/database/prisma.module';


@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}