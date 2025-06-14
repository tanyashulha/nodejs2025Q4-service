import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { DataBaseService } from 'src/db/db.service';
import { ConfigService } from '@nestjs/config';
import { hashPasswordUtil } from 'src/utils/hash-password.utils';
import { comparePasswordsUtil } from 'src/utils/compare-passwords.utils';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private userDbService: DataBaseService,
    private configService: ConfigService,
  ) {}

  async post(user: CreateUserDto) {
    const cryptSalt: number = parseInt(
      this.configService.get('CRYPT_SALT', '10'),
    );

    const hash = await hashPasswordUtil(user.password, cryptSalt);

    const created = await this.userDbService.user.create({
      data: {
        ...user,
        password: hash,
      },
    });

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
    const cryptSalt: number = parseInt(
      this.configService.get('CRYPT_SALT', '10'),
    );
    const hash = await hashPasswordUtil(password, cryptSalt);

    return this.userDbService.user.update({
      where: { id },
      data: {
        password: hash,
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

  async getUser(login: string, password: string) {
    const existingUser = await this.userDbService.user.findUnique({
      where: { login },
    });

    const isValid = await comparePasswordsUtil(
      password,
      existingUser?.password,
    );

    if (existingUser && isValid) return existingUser;
  }
}
