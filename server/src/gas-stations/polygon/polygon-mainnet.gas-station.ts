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

export class PolygonMainnetGasStation extends BaseGasStation {
  private _baseUrl = 'https://gasstation-mainnet.matic.network';
  private _v1 = this._baseUrl + '/v1';
  private _v2 = this._baseUrl + '/v2';

  public async getLegancyGasPrices(): Promise<GasStationResult<number>> {
    const result = await this.request<PolygonGasStationResult<number>>(
      this._v1,
    );
    return this._mapLegencyGasPriceToGasStationResult(result);
  }

  public async getLegancyGasPrice(relaySpeed: RelaySpeed): Promise<number> {
    const result = await this.getLegancyGasPrices();
    return result[relaySpeed];
  }

  /**
   * map the result from gas station API to a gas station result
   * @param result The api result
   */
  private _mapLegencyGasPriceToGasStationResult(
    result: PolygonGasStationResult<number>,
  ): GasStationResult<number> {
    return {
      verySlow: result.safeLow,
      slow: result.standard,
      medium: result.fast,
      fast: result.fastest,
      // TODO: What is the super speed? 10% on top or?
      super: result.fastest,
    };
  }

  public async getEIP1559GasPrices(): Promise<
    GasStationResult<EIP1559GasPrice>
  > {
    const result = await this.request<PolygonGasStationResult<EIP1559GasPrice>>(
      this._v2,
    );
    return this._mapEIP1559GasPriceToGasStationResult(result);
  }

  public async getEIP1559GasPrice(
    relaySpeed: RelaySpeed,
  ): Promise<EIP1559GasPrice> {
    const result = await this.getEIP1559GasPrices();
    return result[relaySpeed];
  }

  /**
   * map the result from gas station API to a gas station result
   * @param result The api result
   */
  private _mapEIP1559GasPriceToGasStationResult(
    result: PolygonGasStationResult<EIP1559GasPrice>,
  ): GasStationResult<EIP1559GasPrice> {
    return {
      verySlow: result.safeLow,
      slow: result.standard,
      medium: result.fast,
      fast: result.fastest,
      // TODO: What is the super speed? 10% on top or?
      super: result.fastest,
    };
  }
}
