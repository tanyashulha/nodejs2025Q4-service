import { UserDBService } from './../db/user-db/user-db.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-uset.dto';

@Injectable()
export class UserService {
  constructor(private userDbService: UserDBService) {}

  async post(dto: CreateUserDto) {
    return await this.userDbService.add({
      ...dto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  }

  async getAllUsers() {
    return await this.userDbService.getAllUsers();
  }

  async getUserById(id: string) {
    return await this.userDbService.findById(id);
  }

  async updateUserById(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.getUserById(id);
    const updatedUser = {
      ...user,
      version: user.version + 1,
      updatedAt: Date.now(),
      password: updateUserDto.newPassword,
    };

    return this.userDbService.updateUserById(updatedUser);
  }

  async deleteUserById(id: string) {
    return await this.userDbService.deleteUserById(id);
  }
}
