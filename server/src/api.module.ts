import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { RelayNetworkController } from './controllers/relay-network/relay-network.controller';
import { RelayNetworkDbService } from './database/services/relay-network.db/relay-network.db.service';
import { RelayNetworkService } from './services/relay-network/relay-network.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [RelayNetworkController],
  providers: [RelayNetworkService, RelayNetworkDbService],
})
export class APIModule {}
