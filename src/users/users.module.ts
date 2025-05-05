import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserModel } from './models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [SequelizeModule.forFeature([UserModel])],
})
export class UsersModule {}
