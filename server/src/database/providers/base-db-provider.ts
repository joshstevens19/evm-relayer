import { dbProvider } from './db-provider-loader';

export class BaseDBProvider {
  public oneOrNone(
    query: string,
    params: Record<string, any> | null = null,
  ): Promise<any | null> {
    return dbProvider.oneOrNone(query, params);
  }

  public none(query: string, params: Record<string, any> | null = null) {
    return dbProvider.none(query, params);
  }

  public exists(query: string, params: Record<string, any> | null = null) {
    return dbProvider.exists(query, params);
  }

  public queryDb<TResponse>(
    query: string,
    params?: Record<string, any> | null,
  ) {
    return dbProvider.queryDb<TResponse>(query, params);
  }
}
