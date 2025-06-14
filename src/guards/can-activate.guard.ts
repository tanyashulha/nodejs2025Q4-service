import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/decorators/is-public.decorator';

@Injectable()
export class CanActivateGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(ctx: ExecutionContext) {
    const isPublic = await this.isPublickKey(ctx);

    if (isPublic) return true;

    const req = ctx.switchToHttp().getRequest();
    const token = this.getToken(req);

    if (!token) throw new UnauthorizedException();

    const result = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get('JWT_SECRET_KEY'),
    });

    if (!result) throw new UnauthorizedException();

    req['user'] = result;

    return true;
  }

  getToken(req) {
    const [type, token] = req.headers.authorization?.split(' ') || [];

    return type === 'Bearer' ? token : null;
  }

  async isPublickKey(ctx: ExecutionContext) {
    return await this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
  }
}
