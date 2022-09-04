export abstract class BaseDBProvider {
  public abstract oneOrNone<TResponse>(
    query: string,
    params: Record<string, any> | null,
  ): Promise<TResponse | null>;

  public abstract none(
    query: string,
    params: Record<string, any> | null,
  ): Promise<void>;

  public abstract exists(
    query: string,
    params: Record<string, any> | null,
  ): Promise<Boolean>;

  public abstract queryDb<TResponse>(
    query: string,
    params?: Record<string, any> | null,
  ): Promise<TResponse>;

  public abstract multiDb<TResponse>(queries: any): Promise<TResponse>;
}
