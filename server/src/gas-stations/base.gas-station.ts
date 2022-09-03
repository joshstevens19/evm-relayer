import axios from 'axios';
import { RelaySpeed } from '../enums/relay-speed';

export interface EIP1559GasPrice {
  maxPriorityFee: number;
  maxFee: number;
}

export interface GasStationResult<T> {
  verySlow: T;
  slow: T;
  medium: T;
  fast: T;
  super: T;
}

/**
 * Base class for gas stations to enforce a common interface.
 */
export abstract class BaseGasStation {
  /**
   * Get the gas price for all supported speeds
   */
  public abstract getLegancyGasPrices(): Promise<GasStationResult<number>>;

  /**
   * Get the gas price for a single speed
   */
  public abstract getLegancyGasPrice(relaySpeed: RelaySpeed): Promise<number>;

  /**
   * Get EIP-1559 gas prices for all supported speeds
   */
  public abstract getEIP1559GasPrices(): Promise<
    GasStationResult<EIP1559GasPrice>
  >;

  /**
   * Get EIP-1559 gas price for a single speed
   */
  public abstract getEIP1559GasPrice(
    relaySpeed: RelaySpeed,
  ): Promise<EIP1559GasPrice>;

  /**
   * Do the eth station api call
   */
  public async request<T>(url: string): Promise<T> {
    const result = await axios.get(url);
    return result.data;
  }
}
