import { formatDataIn, formatDataOut } from './data-interceptors';
import { databaseMappingsToCustomTypes } from './database-mapping-to-custom-types';
import db, { pgp } from './db';
import { outputBulkInsertSql } from './sql-generators';

export const oneOrNone = async <TResponse>(
  query: string,
  params: Record<string, any> | null = null,
): Promise<TResponse | null> => {
  const result = await db.oneOrNone(query, executeFormatDataIn(params));
  if (result === null) {
    return null;
  }

  return formatDataOut<TResponse>(
    result,
    databaseMappingsToCustomTypes,
  ) as TResponse;
};

export const none = async (
  query: string,
  params: Record<string, any> | null = null,
) => {
  await db.none(query, executeFormatDataIn(params));
};

export const exists = async (
  query: string,
  params: Record<string, any> | null = null,
) => {
  const result = await queryDb<any[]>(query, params);
  return result.length > 0;
};

export const queryDb = async <TResponse>(
  query: string,
  params: Record<string, any> | null = null,
) => {
  const result = await db.query(query, executeFormatDataIn(params));
  for (let i = 0; i < result.length; i++) {
    result[i] = formatDataOut(result[i], databaseMappingsToCustomTypes);
  }

  return result as TResponse;
};

export interface BulkRequestDb {
  key: string;
  query: string;
  single?: boolean;
  values?: Record<string, any>;
}

export const multiDb = async <TResponse>(queries: BulkRequestDb[]) => {
  const bulkQuery = pgp.helpers.concat(
    queries.map((q) => {
      return {
        query: q.query,
        values: executeFormatDataIn(q.values || null),
      };
    }),
  );

  const record: Record<string, any> = {};

  const results = await db.multi(bulkQuery);

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const queryRequest = queries[i];

    if (result.length === 0) {
      if (queryRequest.single) {
        record[queryRequest.key] = null;
      } else {
        record[queryRequest.key] = [];
      }
      continue;
    }

    if (queryRequest.single) {
      const formattedResult = formatDataOut<any>(
        result[0],
        databaseMappingsToCustomTypes,
      );
      if (Object.keys(formattedResult).length === 1) {
        record[queryRequest.key] =
          formattedResult[Object.keys(formattedResult)[0]];
      } else {
        record[queryRequest.key] = formattedResult;
      }
    } else {
      record[queryRequest.key] = formatDataOut(
        result,
        databaseMappingsToCustomTypes,
      );
    }
  }

  return record as TResponse;
};

export const bulkInsert = async (
  columns: string[],
  tableName: string,
  values: Record<string, any>[],
) => {
  if (values.length === 0) {
    return;
  }

  await db.none(outputBulkInsertSql(columns, tableName, values));
};

export interface BulkWriteQuery {
  query: string;
  values: Record<string, any>[];
}

export const bulkWriteQuery = async (queries: BulkWriteQuery) => {
  if (!queries.values || queries.values.length === 0) {
    return;
  }

  const bulkQuery = pgp.helpers.concat(
    queries.values.map((values) => {
      return {
        query: queries.query,
        values: executeFormatDataIn(values),
      };
    }),
  );
  await db.none(bulkQuery);
};

/**
 * Executes an SQL function and returns the result.
 * @param name The name of the function to execute.
 * @param args An array of arguments to pass to the function. Arguments can be
 * any primitive type, custom-type or following the IFormatting.ctf interface.
 * Note: Any complex types are serialized to JSON string by default, so in this
 * case you need to pass the custom-type formatted like so:
 * {
 *   rawType: true,
 *   toPostgres: () => `pgp.as.format('row($1, $2)::custom_type', [arg1, arg2])`,
 * }
 * @see IFormatting.ctf
 */
export const callFunc = async <T>(name: string, args: any[]): Promise<T> => {
  const result: { [name: string]: T }[] = await db.tx(() =>
    db.func(name, args),
  );
  return result[0][name];
};

const executeFormatDataIn = (
  params: Record<string, any> | null | undefined,
) => {
  if (!params) {
    return null;
  }

  return formatDataIn(params);
};
