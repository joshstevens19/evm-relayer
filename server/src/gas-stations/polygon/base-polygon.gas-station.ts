import { RelaySpeed } from 'src/enums/relay-speed';
import {
  BaseGasStation,
  EIP1559GasPrice,
  GasStationResult,
} from '../base.gas-station';

interface PolygonGasStationResult<T> {
  safeLow: T;
  standard: T;
  fast: T;
  fastest: T;
  blockTime: T;
  blockNumber: T;
}

export class BasePolygonGasStation extends BaseGasStation {
  private _v1 = this._baseUrl + '/v1';
  private _v2 = this._baseUrl + '/v2';

  constructor(private _baseUrl: string) {
    super();
  }

  public async getLegancyGasPrices(): Promise<GasStationResult<number>> {
    const result = await this.request<PolygonGasStationResult<number>>(
      this._v1,
    );
    return this._mapGasPriceToGasStationResult<number>(result);
  }

  public async getLegancyGasPrice(relaySpeed: RelaySpeed): Promise<number> {
    const result = await this.getLegancyGasPrices();
    return result[relaySpeed];
  }

  public async getEIP1559GasPrices(): Promise<
    GasStationResult<EIP1559GasPrice>
  > {
    const result = await this.request<PolygonGasStationResult<EIP1559GasPrice>>(
      this._v2,
    );
    return this._mapGasPriceToGasStationResult<EIP1559GasPrice>(result);
  }

  public async getEIP1559GasPrice(
    relaySpeed: RelaySpeed,
  ): Promise<EIP1559GasPrice> {
    const result = await this.getEIP1559GasPrices();
    return result[relaySpeed];
  }

  /**
   * map the result from gas station API to a gas station result
   * @param input The api result
   */
  private _mapGasPriceToGasStationResult<TResultType>(
    input: PolygonGasStationResult<TResultType>,
  ): GasStationResult<TResultType> {
    return {
      verySlow: input.safeLow,
      slow: input.standard,
      medium: input.fast,
      fast: input.fastest,
      // TODO: What is the super speed? 10% on top or?
      super: input.fastest,
    };
  }
}
