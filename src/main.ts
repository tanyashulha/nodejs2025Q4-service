import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { CanActivateGuard } from './guards/can-activate.guard';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { HttpExceptionFilter } from './filters/logging.filter';
import { LoggingService } from './logging/logging.service';

const PORT = process.env.PORT;
const DEFAULT_PORT = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const jwtService = app.get(JwtService);
  const reflector = app.get(Reflector);
  const logging = app.get(LoggingService);
  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(
    new CanActivateGuard(configService, jwtService, reflector),
  );
  app.useLogger(logging);
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapterHost, logging));

  const configuration = new DocumentBuilder()
    .setTitle('REST Service')
    .setVersion('1.0')
    .build();

  const doc = SwaggerModule.createDocument(app, configuration);
  SwaggerModule.setup('doc', app, doc);

  await app.listen(PORT || DEFAULT_PORT);
}
bootstrap();
