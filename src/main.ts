import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { CanActivateGuard } from './guards/can-activate.guard';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

const PORT = process.env.PORT;
const DEFAULT_PORT = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(
    new CanActivateGuard(
      app.get(ConfigService),
      app.get(JwtService),
      app.get(Reflector),
    ),
  );
  const configuration = new DocumentBuilder()
    .setTitle('REST Service')
    .setVersion('1.0')
    .build();

  const doc = SwaggerModule.createDocument(app, configuration);
  SwaggerModule.setup('doc', app, doc);

  await app.listen(PORT || DEFAULT_PORT);
}
bootstrap();
