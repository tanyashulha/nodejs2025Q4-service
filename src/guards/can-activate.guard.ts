import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class CanActivateGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(ctx: ExecutionContext) {
    const isPublic = this.isPublickKey(ctx);
    if (!isPublic) {
      const token = this.getToken(ctx);

      if (!token) throw new UnauthorizedException();

      const result = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET_KEY'),
      });

      if (!result) throw new UnauthorizedException();

      ctx.switchToHttp().getRequest()['user'] = result;

      return true;
    }

    return true;
  }

  getToken(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    const [type, token] = req.headers.authorization?.split(' ');

    return type === 'Bearer' ? token : null;
  }

  async isPublickKey(ctx: ExecutionContext) {
    return await this.reflector.getAllAndOverride<boolean>('isPublic', [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
  }
}
