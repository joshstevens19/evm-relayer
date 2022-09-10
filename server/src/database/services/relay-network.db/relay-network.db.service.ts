import { Injectable } from '@nestjs/common';
import { InjectedDBProvider } from '../../providers/injected-db-provider';
import { sql } from '../../sql/sql-loader';
import { SupportedNetworkDb } from './db-models';
import { EnabledNetworkDb } from './db-models/enabled-network.db';

@Injectable()
export class RelayNetworkDbService extends InjectedDBProvider {
  /**
   * Get the supported networks the relayer server can support!
   * Any new ones need a PR with mappings to gas station
   */
  public supportedNetworks(): Promise<SupportedNetworkDb[]> {
    return this.queryDb<SupportedNetworkDb[]>(sql.networks.supportedNetworks);
  }

  /**
   * Get the enabled networks this relayer has got enabled
   */
  public enabledNetworks(): Promise<EnabledNetworkDb[]> {
    return this.queryDb<EnabledNetworkDb[]>(sql.networks.enabledNetworks);
  }

  /**
   * Enable a network to use for your relay
   */
  public enableNetwork(
    networkName: string,
    providerUrls: string[],
  ): Promise<void> {
    return this.none(sql.networks.insertEnabledNetwork, {
      networkName,
      providerUrls,
    });
  }

  /**
   * Disable a network this will mean it cant be used in relays anymore
   */
  public disableNetwork(networkName: string): Promise<void> {
    return this.none(sql.networks.disableEnabledNetwork, {
      networkName,
    });
  }

  /**
   * Add nodes to a enabled network
   */
  public addNetworkNodes(
    networkName: string,
    providerUrls: string[],
  ): Promise<void> {
    return this.none(sql.networks.insertNetworkNodes, {
      networkName,
      providerUrls,
    });
  }

  /**
   * Delete nodes to a enabled network
   */
  public deleteNetworkNodes(
    networkName: string,
    providerUrls: string[],
  ): Promise<void> {
    return this.none(sql.networks.deleteNetworkNodes, {
      networkName,
      providerUrls,
    });
  }
}
