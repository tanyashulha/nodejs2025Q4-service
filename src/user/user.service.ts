import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { DataBaseService } from 'src/db/db.service';

@Injectable()
export class UserService {
  constructor(private userDbService: DataBaseService) {}

  async post(user: CreateUserDto) {
    return await this.userDbService.user.create({ data: user });
  }

  async getAllUsers() {
    return await this.userDbService.user.findMany();
  }

  async getUserById(id: string) {
    return await this.userDbService.user.findUnique({
      where: { id },
    });
  }

  async updateUserById(id: string, password: string) {
    return this.userDbService.user.update({
      where: { id },
      data: {
        password: password,
        version: { increment: 1 },
      },
    });
  }

  async deleteUserById(id: string) {
    return await this.userDbService.user.delete({ where: { id } });
  }
}
