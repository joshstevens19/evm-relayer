import { Injectable } from '@nestjs/common';
import { RelayNetworkDbService } from '../../database/services/relay-network.db/relay-network.db.service';
import { EnabledNetwork, SupportedNetwork } from './models';

@Injectable()
export class RelayNetworkService {
  constructor(private readonly _relayNetworkDbService: RelayNetworkDbService) {}

  /**
   * Get supported networks the relayer server can support!
   * Any new ones need a PR with mappings to gas station
   */
  public async supportedNetworks(): Promise<SupportedNetwork[]> {
    const dbResult = await this._relayNetworkDbService.supportedNetworks();
    return dbResult.map((network) => {
      return {
        chainId: network.chain_id,
        name: network.name,
      };
    });
  }

  /**
   * Get the enabled networks this relayer has got enabled
   */
  public async enabledNetworks(): Promise<EnabledNetwork[]> {
    const dbResult = await this._relayNetworkDbService.enabledNetworks();
    return dbResult.map((network) => {
      return {
        chainId: network.chain_id,
        name: network.name,
        providerUrl: network.provider_url,
      };
    });
  }

  /**
   * Enable a network to use for your relay
   */
  public enableNetwork(
    networkName: string,
    providerUrls: string[],
  ): Promise<void> {
    return this._relayNetworkDbService.enableNetwork(networkName, providerUrls);
  }
}
