import fs from 'fs/promises';
var path = require('path');

const getPath = (fileName: string) =>
  path.join(__dirname, '..', 'sql', fileName);

let getSupportedNetworks: string;
let getEnabledNetworks: string;

const getSql = (fileName: string) => {
  return fs.readFile(getPath(fileName), 'utf8');
};

export const sqlLoader = async () => {
  getSupportedNetworks = await getSql('get-supported-networks.sql');
  getEnabledNetworks = await getSql('get-enabled-networks.sql');
};

export const sql = {
  networks: {
    supportedNetworks: getSupportedNetworks,
    enabledNetworks: getEnabledNetworks,
  },
};
