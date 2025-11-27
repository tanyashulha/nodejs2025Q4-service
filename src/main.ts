import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';

const PORT = process.env.PORT;
const DEFAULT_PORT = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configuration = new DocumentBuilder()
    .setTitle('REST Service')
    .setVersion('1.0')
    .build();

  const doc = SwaggerModule.createDocument(app, configuration);
  SwaggerModule.setup('doc', app, doc);

  await app.listen(PORT || DEFAULT_PORT);
}
bootstrap();
