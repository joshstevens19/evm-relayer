import { Test, TestingModule } from '@nestjs/testing';
import { RelayNetworkService } from './relay-network.service';

describe('RelayNetworkService', () => {
  let service: RelayNetworkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelayNetworkService],
    }).compile();

    service = module.get<RelayNetworkService>(RelayNetworkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
