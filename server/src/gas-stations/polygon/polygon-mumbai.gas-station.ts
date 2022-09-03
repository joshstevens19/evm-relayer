import { BasePolygonGasStation } from './base-polygon.gas-station';

export class PolygonMumbaiGasStation extends BasePolygonGasStation {
  constructor() {
    super('https://gasstation-mumbai.matic.today');
  }
}
