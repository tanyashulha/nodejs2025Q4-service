import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
} from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { RefreshDto } from './refresh.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/is-public.decorator';
import { AuthRefreshExceptionFilter } from 'src/filters/auth-refresh-exception.filter';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  @UseFilters(AuthRefreshExceptionFilter)
  refresh(@Body() dto: RefreshDto) {
    return this.authService.refresh(dto);
  }
}
