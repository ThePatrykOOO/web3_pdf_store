import { NestFactory } from '@nestjs/core';
import { PanelAdminModule } from './panel_admin.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(PanelAdminModule);
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(PanelAdminModule), { fallbackOnErrors: true });
  await app.listen(3002);
}

bootstrap();
