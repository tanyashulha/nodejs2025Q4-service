import { Exclude } from 'class-transformer';

export class User {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(params) {
    Object.assign(this, params);
  }
}
