import fs from 'fs/promises';
var path = require('path');

const getPath = (fileName: string) =>
  path.join(__dirname, '..', 'sql', fileName);

const getSql = (fileName: string) => {
  return fs.readFile(getPath(fileName), 'utf8');
};

export const sql: {
  networks: {
    supportedNetworks: string;
    enabledNetworks: string;
  };
} = {
  // @ts-ignore
  networks: {},
};

export const sqlLoader = async () => {
  sql.networks.supportedNetworks = await getSql('get-supported-networks.sql');
  sql.networks.enabledNetworks = await getSql('get-enabled-networks.sql');
};
