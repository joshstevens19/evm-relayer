import { BasePolygonGasStation } from './base-polygon.gas-station';

export class PolygonMainnetGasStation extends BasePolygonGasStation {
  constructor() {
    super('https://gasstation-mainnet.matic.network');
  }
}
