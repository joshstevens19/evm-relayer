import { NestFactory } from '@nestjs/core';
import { APIModule } from './api.module';
import {
  DatabaseProvider,
  initializeDatabaseProvider,
} from './database/providers/db-provider-loader';
import { sqlLoader } from './database/sql/sql-loader';

async function bootstrap() {
  // startup database
  // this will change to .env file once we support more then postgres
  initializeDatabaseProvider(DatabaseProvider.POSTGRES);

  // load the sql up in memory
  await sqlLoader();

  const app = await NestFactory.create(APIModule);
  await app.listen(3000);
}
bootstrap();
