import * as bcrypt from 'bcrypt';

export function hashPasswordUtil(value: string, cryptSalt: number) {
  return bcrypt.hash(value, cryptSalt);
}
