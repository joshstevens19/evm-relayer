import pgPromise from 'pg-promise';
import { logger } from '../../../logger';
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USER,
} from './config';

const LOG_DATABASE_QUERIES = process.env.LOG_DATABASE_QUERIES === 'true';

// on resync you dont want this on as it spams the world but on real live sync you need it on
export let LOG_QUERY_FOR_DEV = LOG_DATABASE_QUERIES;
export let setLogQueryForDev = (value: boolean) => {
  if (LOG_DATABASE_QUERIES) {
    LOG_QUERY_FOR_DEV = value;
  }
};

let _queryHook = (_info: any) => {
  if (LOG_QUERY_FOR_DEV) {
    logger.info(_info.query);
  }
};

export const pgp = pgPromise({
  query: (info: any) => {
    _queryHook(info);
  },
  error: (error: any) => {
    if (Array.isArray(error) && 'getErrors' in error) {
      // the error came from method `batch`;
      // let's log the very first error:
      // @ts-ignore
      error = error.getErrors()[0];
    }

    logger.error(`POSTGRES ERROR: ${error.message || error}`, error);

    throw error;
  },
  schema: ['public'],
});

const connectionParams = {
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  database: DATABASE_NAME,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  capSQL: true,
};

const db = pgp(connectionParams);

export default db;
