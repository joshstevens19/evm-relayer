import { SupportedNetwork } from './supported-network';

export interface EnabledNetwork extends SupportedNetwork {
  providerUrl: string;
}
