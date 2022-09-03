interface DatabaseMappingsToCustomTypes {
  dbColumnNames: string[];
  transform: ((value: any) => any) | ((value: any) => any);
}

const instanceOfHelperFormat = (object: any) => {
  const type = typeof object;
  return !!(object && ['object'].includes(type) && 'toPostgres' in object);
};

export const formatDataIn = (data: Record<string, any> | Record<any, any>) => {
  const keys = Object.keys(data);
  return keys.reduce((prev: Record<any, any>, next) => {
    if (instanceOfHelperFormat(data[next])) prev[next] = data[next];
    else
      prev[next] =
        data[next] !== undefined && data[next] !== null
          ? JSON.parse(JSON.stringify(data[next]))
          : undefined;
    return prev;
  }, {});
};

export const formatDataOut = <TResponse>(
  data: Record<string, any> | Record<string, any>[],
  mappingsToCustomTypes: any,
): TResponse | TResponse[] => {
  if (Array.isArray(data)) {
    return data.map((d) => _formatDataOut<TResponse>(d, mappingsToCustomTypes));
  } else {
    return _formatDataOut<TResponse>(data, mappingsToCustomTypes);
  }
};

const _formatDataOut = <TResponse>(
  data: Record<string, any>,
  mappingsToCustomTypes: DatabaseMappingsToCustomTypes[],
): TResponse => {
  for (const key in data) {
    // if its null or undefined here do not transform it
    if (data[key] === undefined || data[key] === null) {
      continue;
    }
    const found = mappingsToCustomTypes.find((c) =>
      c.dbColumnNames.find((b) => b === key),
    );
    if (!found) {
      continue;
    }

    // @ts-ignore
    data[key] = found.transform(data[key]);
  }

  return data as TResponse;
};
