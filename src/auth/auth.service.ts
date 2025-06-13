import { ForbiddenException, Injectable } from '@nestjs/common';
import { RefreshDto } from './refresh.dto';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: AuthDto) {
    const user = await this.userService.getUser(dto.login);
    if (!user) throw new ForbiddenException();

    const accessToken = await this.jwtService.signAsync({
      login: user.login,
      userId: user.id,
    });

    if (!accessToken) throw new ForbiddenException();

    return { accessToken };
  }

  async signup(dto: AuthDto) {
    const user = await this.userService.post(dto);

    const accessToken = await this.jwtService.signAsync({
      login: user.login,
      userId: user.id,
    });

    if (!accessToken && !user) throw new ForbiddenException();

    return {
      id: user.id,
      accessToken,
    };
  }

  refresh(dto: RefreshDto) {}
}
