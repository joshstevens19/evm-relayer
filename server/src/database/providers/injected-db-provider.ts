import { BaseDBProvider } from './base-db-provider';
import { dbProvider } from './db-provider-loader';

export class InjectedDBProvider extends BaseDBProvider {
  public oneOrNone<TResponse>(
    query: string,
    params: Record<string, any>,
  ): Promise<TResponse> {
    return dbProvider.oneOrNone<TResponse>(query, params);
  }

  public none(query: string, params: Record<string, any>): Promise<void> {
    return dbProvider.none(query, params);
  }

  public exists(query: string, params: Record<string, any>): Promise<Boolean> {
    return dbProvider.exists(query, params);
  }

  public queryDb<TResponse>(
    query: string,
    params?: Record<string, any>,
  ): Promise<TResponse> {
    return dbProvider.queryDb<TResponse>(query, params);
  }

  public multiDb<TResponse>(queries: any): Promise<TResponse> {
    return dbProvider.multiDb<TResponse>(queries);
  }
}
