import { Injectable } from '@nestjs/common';
import { queryDb } from '../../providers/postgres/db-execution';
import { sql } from '../sql-loader';
import { SupportedNetworkDb } from './db-models';
import { EnabledNetworkDb } from './db-models/enabled-network.db';

@Injectable()
export class RelayNetworkDbService {
  /**
   * Get the supported networks the relayer server can support!
   * Any new ones need a PR with mappings to gas station
   */
  public supportedNetworks(): Promise<SupportedNetworkDb[]> {
    return queryDb<SupportedNetworkDb[]>(sql.networks.supportedNetworks);
  }

  /**
   * Get the enabled networks this relayer has got enabled
   */
  public enabledNetworks(): Promise<EnabledNetworkDb[]> {
    return queryDb<EnabledNetworkDb[]>(sql.networks.enabledNetworks);
  }
}
