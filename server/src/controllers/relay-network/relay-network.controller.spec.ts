import { Test, TestingModule } from '@nestjs/testing';
import { RelayNetworkController } from './relay-network.controller';

describe('RelayNetworkController', () => {
  let controller: RelayNetworkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RelayNetworkController],
    }).compile();

    controller = module.get<RelayNetworkController>(RelayNetworkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
