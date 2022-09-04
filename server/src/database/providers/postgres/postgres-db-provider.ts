import { BaseDBProvider } from '../base-db-provider';
import { formatDataIn, formatDataOut } from './data-interceptors';
import { databaseMappingsToCustomTypes } from './database-mapping-to-custom-types';
import db, { pgp } from './db';

interface BulkRequestDb {
  key: string;
  query: string;
  single?: boolean;
  values?: Record<string, any>;
}

export class PostgresDbProvider extends BaseDBProvider {
  public async oneOrNone<TResponse>(
    query: string,
    params: Record<string, any>,
  ): Promise<TResponse> {
    const result = await db.oneOrNone(query, this.executeFormatDataIn(params));
    if (result === null) {
      return null;
    }

    return formatDataOut<TResponse>(
      result,
      databaseMappingsToCustomTypes,
    ) as TResponse;
  }

  public async none(query: string, params: Record<string, any>): Promise<void> {
    await db.none(query, this.executeFormatDataIn(params));
  }

  public async exists(
    query: string,
    params: Record<string, any>,
  ): Promise<Boolean> {
    const result = await this.queryDb<any[]>(query, params);
    return result.length > 0;
  }

  public async queryDb<TResponse>(
    query: string,
    params?: Record<string, any>,
  ): Promise<TResponse> {
    const result = await db.query(query, this.executeFormatDataIn(params));
    for (let i = 0; i < result.length; i++) {
      result[i] = formatDataOut(result[i], databaseMappingsToCustomTypes);
    }

    return result as TResponse;
  }

  public executeFormatDataIn(params: Record<string, any> | null | undefined) {
    if (!params) {
      return null;
    }

    return formatDataIn(params);
  }

  public async multiDb<TResponse>(
    queries: BulkRequestDb[],
  ): Promise<TResponse> {
    const bulkQuery = pgp.helpers.concat(
      queries.map((q) => {
        return {
          query: q.query,
          values: this.executeFormatDataIn(q.values || null),
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
  }
}
