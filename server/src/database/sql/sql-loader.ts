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
    insertEnabledNetwork: string;
    disableEnabledNetwork: string;
    insertNetworkNodes: string;
    deleteNetworkNodes: string;
  };
} = {
  // @ts-ignore
  networks: {},
};

export const sqlLoader = async () => {
  sql.networks.supportedNetworks = await getSql('get-supported-networks.sql');
  sql.networks.enabledNetworks = await getSql('get-enabled-networks.sql');
  sql.networks.insertEnabledNetwork = await getSql(
    'insert-enabled-network.sql',
  );
  sql.networks.disableEnabledNetwork = await getSql(
    'disabled-enabled-network.sql',
  );
  sql.networks.deleteNetworkNodes = await getSql('delete-network-nodes.sql');
  sql.networks.insertNetworkNodes = await getSql('insert-network-nodes.sql');
};
