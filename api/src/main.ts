import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });
  // app.useStaticAssets(join(__dirname, '..', 'uploads'));
  await app.listen(parseInt(process.env.PORT ?? '5000'), '0.0.0.0');
}
bootstrap();
