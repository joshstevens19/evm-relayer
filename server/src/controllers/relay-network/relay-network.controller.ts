import { Controller, Get } from '@nestjs/common';
import {
  EnabledNetwork,
  SupportedNetwork,
} from '../../services/relay-network/models';
import { RelayNetworkService } from '../../services/relay-network/relay-network.service';

@Controller('relay/network')
export class RelayNetworkController {
  constructor(private readonly _relayNetworkService: RelayNetworkService) {}

  @Get('supported')
  public supportedNetworks(): Promise<SupportedNetwork[]> {
    return this._relayNetworkService.supportedNetworks();
  }

  @Get('enabled')
  public enabledNetworks(): Promise<EnabledNetwork[]> {
    return this._relayNetworkService.enabledNetworks();
  }
}
