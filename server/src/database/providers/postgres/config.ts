import { getParamOrExit } from '../../../utils/env-helpers';

export const DATABASE_NAME = getParamOrExit('DATABASE_NAME');
export const DATABASE_USER = getParamOrExit('DATABASE_USER');
export const DATABASE_PASSWORD = getParamOrExit('DATABASE_PASSWORD');
export const DATABASE_HOST = getParamOrExit('DATABASE_HOST');
export const DATABASE_PORT = Number(getParamOrExit('DATABASE_PORT'));
