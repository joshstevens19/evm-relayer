import {
  exists as postgresExists,
  none as postgresNone,
  oneOrNone as postgresOneOrNone,
  queryDb as postgresQueryDb,
} from './postgres/db-execution';

/**
 * Database providers this supports for now we can extend it!
 */
export enum DatabaseProvider {
  POSTGRES = 'POSTGRES',
}

// @ts-ignore
export let dbProvider: {
  oneOrNone: <TResponse>(
    query: string,
    params?: Record<string, any> | null,
  ) => Promise<TResponse>;
  none: (query: string, params?: Record<string, any> | null) => Promise<void>;
  exists: (
    query: string,
    params?: Record<string, any> | null,
  ) => Promise<boolean>;
  queryDb: <TResponse>(
    query: string,
    params?: Record<string, any> | null,
  ) => Promise<TResponse>;
} = {};

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
  dbProvider = {
    oneOrNone: postgresOneOrNone,
    none: postgresNone,
    exists: postgresExists,
    queryDb: postgresQueryDb,
  };
};
