import { Test, TestingModule } from '@nestjs/testing';
import { RelayNetworkDbService } from './relay-network.db.service';

describe('RelayNetworkDbService', () => {
  let service: RelayNetworkDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelayNetworkDbService],
    }).compile();

    service = module.get<RelayNetworkDbService>(RelayNetworkDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
