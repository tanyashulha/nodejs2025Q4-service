import { ForbiddenException, Injectable } from '@nestjs/common';
import { RefreshDto } from './refresh.dto';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signup(dto: AuthDto) {
    this.userService.post(dto);
  }

  async login(dto: AuthDto) {
    const user = await this.userService.getUser(dto.login);
    if (!user) throw new ForbiddenException();
  }

  refresh(dto: RefreshDto) {}
}
