import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  EnabledNetwork,
  SupportedNetwork,
} from '../../services/relay-network/models';
import { RelayNetworkService } from '../../services/relay-network/relay-network.service';
import { NodeNetworkProviderDto } from './dto';
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
  public async enableNetwork(@Body() enableNetworkDto: EnableNetworkDto) {
    return this._relayNetworkService.enableNetwork(
      enableNetworkDto.name,
      enableNetworkDto.providerUrls,
    );
  }

  @Delete('disable/:name')
  public disableNetwork(@Param('name') name: string): Promise<void> {
    return this._relayNetworkService.disableNetwork(name);
  }

  @Put('provider/add')
  public async addNetworkNodes(
    @Body() nodeNetworkProviderDto: NodeNetworkProviderDto,
  ): Promise<void> {
    return this._relayNetworkService.addNetworkNodes(
      nodeNetworkProviderDto.networkName,
      nodeNetworkProviderDto.providerUrls,
    );
  }

  @Delete('provider/remove')
  public async deleteNetworkNodes(
    @Body() nodeNetworkProviderDto: NodeNetworkProviderDto,
  ): Promise<void> {
    return this._relayNetworkService.deleteNetworkNodes(
      nodeNetworkProviderDto.networkName,
      nodeNetworkProviderDto.providerUrls,
    );
  }
}
