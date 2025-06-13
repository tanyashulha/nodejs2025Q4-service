import * as bcrypt from 'bcrypt';

export function comparePasswordsUtil(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
