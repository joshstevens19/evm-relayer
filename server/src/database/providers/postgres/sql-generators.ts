import { formatDataIn } from './data-interceptors';
import { pgp } from './db';

export const outputBulkInsertSql = (
  columns: string[],
  tableName: string,
  values: Record<string, any>[],
) => {
  const colums = new pgp.helpers.ColumnSet(columns, {
    table: tableName,
  });

  const rawValues = [];
  for (let i = 0; i < values.length; i++) {
    const formatDataInResult = formatDataIn(values[i]);
    let obj: Record<string, any> = {};

    let index = 0;
    for (const formatData in formatDataInResult) {
      obj[columns[index]] = formatDataInResult[formatData];
      index++;
    }

    rawValues.push(obj);
  }

  return pgp.helpers.insert(rawValues, colums);
};

export const outputSql = (query: string, values: Record<string, any>) => {
  return pgp.as.format(query, formatDataIn(values));
};
