import { NestFactory } from '@nestjs/core';
import { APIModule } from './api.module';

async function bootstrap() {
  const app = await NestFactory.create(APIModule);
  await app.listen(3000);
}
bootstrap();
