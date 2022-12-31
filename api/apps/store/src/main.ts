import {NestFactory} from '@nestjs/core';
import {StoreModule} from './store.module';

async function bootstrap() {
  const app = await NestFactory.create(StoreModule);
  await app.listen(3000);
}

bootstrap();
