export class User {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(params) {
    Object.assign(this, params);
  }
}
