import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-uset.dto';
import { User } from 'src/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async post(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.post(createUserDto);

    return new User(newUser);
  }

  @Get()
  async getAllUsers() {
    const users = await this.userService.getAllUsers();

    return users.map(
      (user) =>
        new User({
          id: user.id,
          login: user.login,
          version: user.version,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }),
    );
  }

  @Get(':id')
  async getUserById(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.getUserById(id);
    if (user) return new User(user);
    throw new NotFoundException();
  }

  @Put(':id')
  async updateUserById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const existingUser = await this.userService.getUserById(id);

    if (!existingUser) throw new NotFoundException();

    if (existingUser.password !== updateUserDto.oldPassword)
      throw new ForbiddenException();

    const updated = this.userService.updateUserById(id, updateUserDto);

    if (updated) return new User(updated);

    throw new NotFoundException();
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUserById(@Param('id', ParseUUIDPipe) id: string) {
    const existingUser = await this.userService.deleteUserById(id);
    if (existingUser) return true;
    throw new NotFoundException();
  }
}
