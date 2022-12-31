import {NestFactory} from '@nestjs/core';
import {PanelSellerModule} from './panel_seller.module';

async function bootstrap() {
  const app = await NestFactory.create(PanelSellerModule);
  await app.listen(3001);
}

bootstrap();
