import { ForbiddenException, Injectable } from '@nestjs/common';
import { RefreshDto } from './refresh.dto';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: AuthDto) {
    const user = await this.userService.getUser(dto.login, dto.password);
    if (!user) throw new ForbiddenException();

    const accessToken = await this.generateAccessToken(user.login, user.id);
    const refreshToken = await this.generateRefreshToken(user.login, user.id);

    if (!accessToken && !refreshToken) throw new ForbiddenException();

    return {
      accessToken,
      refreshToken,
    };
  }

  async signup(dto: AuthDto) {
    const user = await this.userService.post(dto);

    const accessToken = await this.generateAccessToken(user.login, user.id);
    const refreshToken = await this.generateRefreshToken(user.login, user.id);

    if (!accessToken && !user && !refreshToken) throw new ForbiddenException();

    return {
      id: user.id,
      accessToken,
      refreshToken,
    };
  }

  async refresh(dto: RefreshDto) {
    try {
      const params = await this.jwtService.verifyAsync(dto.refreshToken, {
        secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
      });

      const accessToken = await this.generateAccessToken(
        params.login,
        params.userId,
      );

      const refreshToken = await this.generateRefreshToken(
        params.login,
        params.userId,
      );

      return {
        accessToken,
        refreshToken,
      };
    } catch {
      throw new ForbiddenException();
    }
  }

  async generateAccessToken(login: string, userId: string): Promise<string> {
    return await this.jwtService.signAsync({
      login,
      userId,
    });
  }

  async generateRefreshToken(login: string, userId: string): Promise<string> {
    return await this.jwtService.signAsync(
      {
        login,
        userId,
      },
      {
        secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
        expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
      },
    );
  }
}
