import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  EnabledNetwork,
  SupportedNetwork,
} from '../../services/relay-network/models';
import { RelayNetworkService } from '../../services/relay-network/relay-network.service';
import { EnableNetworkDto } from './dto/enable-network.dto';

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

  @Post('enable')
  async enableNetwork(@Body() enableNetworkDto: EnableNetworkDto) {
    return this._relayNetworkService.enableNetwork(
      enableNetworkDto.name,
      enableNetworkDto.providerUrls,
    );
  }
}
