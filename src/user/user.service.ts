import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { DataBaseService } from 'src/db/db.service';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private userDbService: DataBaseService) {}

  async post(user: CreateUserDto) {
    const created = await this.userDbService.user.create({ data: user });

    return new User({
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
      id: created.id,
      login: user.login,
      version: created.version,
    });
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
    const user = await this.userDbService.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException();

    await this.userDbService.user.delete({ where: { id } });
  }
}
