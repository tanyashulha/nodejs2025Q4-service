import { Injectable } from '@nestjs/common';
import { IUser } from 'src/intefaces/user.inteface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserDBService {
  users = new Map<string, IUser>();

  async add(user: IUser): Promise<IUser> {
    const id = uuid();
    const { login, password, version, createdAt, updatedAt } = user;
    const newUser: IUser = {
      id,
      login,
      password,
      version,
      createdAt,
      updatedAt,
    };
    this.users.set(id, newUser);

    return newUser;
  }

  async getAllUsers(): Promise<Array<IUser>> {
    return Array.from(this.users.values());
  }

  async findById(id: string): Promise<IUser> {
    return this.users.get(id);
  }

  async updateUserById(user: IUser): Promise<IUser> {
    const existingUser = this.users.get(user?.id);
    if (!existingUser) return;

    const userToUpdate: IUser = {
      ...existingUser,
      login: user.login,
      password: user.password,
      version: user.version,
      updatedAt: user.updatedAt,
    };
    this.users.set(user?.id, userToUpdate);

    return userToUpdate;
  }

  async deleteUserById(id: string): Promise<IUser> {
    const user = this.users.get(id);
    if (user) {
      this.users.delete(id);
      return user;
    }
  }
}
