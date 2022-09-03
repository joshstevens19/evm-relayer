import { Injectable } from '@nestjs/common';
import { BaseDBProvider } from 'src/database/providers/base-db-provider';
import { sql } from '../../sql/sql-loader';
import { SupportedNetworkDb } from './db-models';
import { EnabledNetworkDb } from './db-models/enabled-network.db';

@Injectable()
export class RelayNetworkDbService extends BaseDBProvider {
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
}
