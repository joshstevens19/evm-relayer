import { BasePolygonGasStation } from './base-polygon.gas-station';

interface PolygonGasStationResult<T> {
  safeLow: T;
  standard: T;
  fast: T;
  fastest: T;
  blockTime: T;
  blockNumber: T;
}

export class PolygonMumbaiGasStation extends BasePolygonGasStation {
  constructor() {
    super('https://gasstation-mumbai.matic.today');
  }
}
