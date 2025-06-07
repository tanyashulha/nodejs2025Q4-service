import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user-dto';
import { UpdateUserDto } from './update-uset-dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async post(@Body() createUserDto: CreateUserDto) {
    return await this.userService.post(createUserDto);
  }

  @Get()
  async getAllUsers() {
    const users = await this.userService.getAllUsers();

    return users.map((user) => ({
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }

  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  updateUserById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUserById(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.deleteUserById(id);
  }
}
