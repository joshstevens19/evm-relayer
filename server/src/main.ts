import { NestFactory } from '@nestjs/core';
import { APIModule } from './api.module';
import { sqlLoader } from './database/services/sql-loader';

async function bootstrap() {
  // load the sql up in memory
  await sqlLoader();

  const app = await NestFactory.create(APIModule);
  await app.listen(3000);
}
bootstrap();
