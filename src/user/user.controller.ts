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
  post(@Body() createUserDto: CreateUserDto) {
    return this.userService.post(createUserDto);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
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
