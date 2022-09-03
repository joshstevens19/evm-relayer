export const databaseMappingsToCustomTypes: {
  dbColumnNames: string[];
  transform: ((value: string) => any) | ((value: number) => any);
}[] = [];
