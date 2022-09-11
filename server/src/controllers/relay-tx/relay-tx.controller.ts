import { Controller, Get, Param, Post, Put } from '@nestjs/common';

@Controller('relay/tx')
export class RelayTxController {
  @Get(':id')
  public getTxById(@Param('id') id: string) {
    // TODO: implement
  }

  @Post('send')
  public sentTx() {
    // TODO: implement
  }

  @Put('replace')
  public replaceTx() {
    // TODO: implement
  }

  @Put('cancel')
  public cancelTx() {
    // TODO: implement
  }

  @Get(':id')
  public getAllRelayTx(@Param('id') id: string) {
    // TODO: implement
  }
}
