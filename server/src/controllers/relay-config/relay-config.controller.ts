import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('relay/configuration')
export class RelayConfigController {
  @Get(':id')
  public getRelay(@Param('id') id: string) {
    // TODO: implement
  }

  @Post(':id/whitelisted-address')
  public addWhitelistedAddress() {
    // TODO: implement
  }

  @Delete(':id/whitelisted-address')
  public deleteWhitelistedAddress() {
    // TODO: implement
  }

  @Delete(':id/delete')
  public deleteRelay(@Param('id') id: string) {
    // TODO: implement
  }

  @Put(':id/pause')
  public pauseRelay(@Param('id') id: string) {
    // TODO: implement
  }

  @Put(':id/unpause')
  public unpauseRelay(@Param('id') id: string) {
    // TODO: implement
  }

  @Put(':id/speed/:speed')
  public updateRelaySpeed(
    @Param('id') id: string,
    @Param('speed') speed: string,
  ) {
    // TODO: implement
  }

  @Put(':id/gas-price/:cap')
  public updateRelayMaxGasPrice(
    @Param('id') id: string,
    @Param('cap') cap: string,
  ) {
    // TODO: implement
  }

  @Put(':id/eip-1559')
  public updateEIP1559(@Param('id') id: string) {
    // TODO: implement
  }

  @Post(':id/api-key')
  public addAPIKey() {
    // TODO: implement
  }

  @Delete(':id/api-key')
  public deleteAPIKey() {
    // TODO: implement
  }
}
