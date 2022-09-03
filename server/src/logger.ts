import pino from 'pino';

const isLocal = process.env.IS_LOCAL === 'true';
const isTest = process.env.NODE_ENV === 'test';

const hooks = {
  logMethod(inputArgs: any, method: any): any {
    if (!inputArgs) return method.apply(this, inputArgs);
    if (inputArgs.length >= 2) {
      const arg1 = inputArgs.shift();
      const arg2 = inputArgs.shift();
      return method.apply(this, [arg2, arg1, ...inputArgs]);
    }
    return method.apply(this, inputArgs.pop());
  },
};
const createLogger = () => {
  if (isTest) {
    return pino({
      level: 'info',
    });
  }
  if (isLocal) {
    return pino({
      level: 'info', // If you want more verbose set as 'debug'
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss',
          ignore: 'pid,hostname',
        },
      },
      hooks,
    });
  }
  return pino({
    formatters: {
      level(level) {
        return { level }; // Datadog format
      },
    },
    level: 'info',
    hooks,
  });
};

const loggerPino = createLogger();
export const logger = {
  log: (msg: string, ...args: any[]) => {
    try {
      loggerPino.debug(msg, args);
    } catch (error) {
      console.error('PINO LOG ERROR: ', error);
    }
  },
  info: (msg: string, ...args: any[]) => {
    try {
      loggerPino.info(msg, args);
    } catch (error) {
      console.error('PINO INFO ERROR: ', args);
    }
  },
  error: (msg: string, ...args: any[]) => {
    try {
      loggerPino.error(msg, args);
    } catch (error) {
      console.error('PINO ERROR ERROR: ', args);
    }
  },
  errorWithArgs: (msg: string, ...args: any[]) => {
    try {
      loggerPino.error(msg, args);
    } catch (error) {
      console.error('PINO ERROR ERROR: ', args);
    }
  },
  debug: (msg: string, ...args: any[]) => {
    try {
      loggerPino.debug(msg, args);
    } catch (error) {
      console.error('PINO DEBUG ERROR: ', args);
    }
  },
  warn: (msg: string, ...args: any[]) => {
    try {
      loggerPino.warn(msg, args);
    } catch (error) {
      console.error('PINO WARN ERROR: ', args);
    }
  },
};
