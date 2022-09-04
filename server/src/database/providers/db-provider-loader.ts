import { BaseDBProvider } from './base-db-provider';
import { PostgresDbProvider } from './postgres/postgres-db-provider';

/**
 * Database providers this supports for now we can extend it!
 */
export enum DatabaseProvider {
  POSTGRES = 'POSTGRES',
}

export let dbProvider: BaseDBProvider;

export const initializeDatabaseProvider = (
  databaseProvider: DatabaseProvider,
) => {
  switch (databaseProvider) {
    case DatabaseProvider.POSTGRES:
      return initializePostgres();
    default:
      throw new Error(`Database provider ${databaseProvider} not supported`);
  }
};

export const initializePostgres = () => {
  dbProvider = new PostgresDbProvider();
};
