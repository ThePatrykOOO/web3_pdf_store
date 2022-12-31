import {NestFactory} from '@nestjs/core';
import {PanelAdminModule} from './panel_admin.module';

async function bootstrap() {
  const app = await NestFactory.create(PanelAdminModule);
  await app.listen(3002);
}

bootstrap();
