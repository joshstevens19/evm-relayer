export function getParamOrExit(name: string): string {
  const param = process.env[name];
  if (!param) {
    console.error(`Required config param '${name}' missing`);
    process.exit(1);
  }
  return param;
}

export function getParam(name: string): string | null {
  const param = process.env[name];
  if (!param) {
    return null;
  }
  return param;
}

export function getParamOrDefault(name: string, defaultValue: string): string {
  const param = process.env[name];
  if (!param) {
    return defaultValue;
  }
  return param;
}

export function UrlJoin(base: string, path: string) {
  if (base.endsWith('/')) {
    if (path.startsWith('/')) return `${base}${path.replace('/', '')}`;
    return `${base}${path}`;
  }
  if (path.startsWith('/')) return `${base}${path}`;
  return `${base}/${path}`;
}
