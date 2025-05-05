import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Get,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserQueryDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get('get')
  getAll(@Query() query: GetUserQueryDto) {
    return this.usersService.getAll(query);
  }

  @Get('/get/:userId')
  get(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.get(userId);
  }

  @Delete('/delete')
  deleteAll() {
    return this.usersService.deleteAll();
  }

  @Delete('/delete/:userId')
  delete(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.delete(userId);
  }

  @Patch('/update/:userId')
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, dto);
  }
}
